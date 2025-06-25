import express from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Books.js";
import protectRoute from "../middleware/auth.middleware.js"

// Création d'un objet Router pour gérer les routes de l'application
const router = express.Router();
//#region  Unlivre
router.post("/", protectRoute, async (req,res) => {
    try {
        // Récupération des données de la requête (titre, légende, note, image)
        const { title, caption, rating, image} = req.body;
       
        // Vérification que tous les champs sont remplis
       if (!image || !title || !caption || !rating) { 
        // Retour d'une erreur 400 si un champ est manquant
        return res.status(400).json({ message: "Veuillez fournir tous les champs"});
       }

        //Charge les images de cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);

        const imageUrl = uploadResponse.secure_url

       // Création d'un nouveau livre avec les données récupérées
        const newBook = new Book({
            title,
            caption,
            rating,
            image: imageUrl,
            user: req.user._id,
        });
       // Enregistrement du livre en base de données
       await newBook.save()
        // Retour du livre créé avec un code de statut 201
       res.status(201).json(newBook)

    } catch (error) {
        // Gestion des erreurs
        console.log("Erreur de création du livre", error);
        res.status(500).json({ message: error.message });
    }
});
//#endregion






//#region Tout les livres
// Route pour récupérer tous les livres
router.get("/", protectRoute, async (req,res) => {
    //exemple d'appel pour le frontend react native
    //const response ) await fetch("http://localhost:3000/api/books?page=1&limit=5");
    try {
         // Récupération des paramètres de pagination
        const page = req.query.page || 1;// Numéro de page par défaut : 1
        const limit = req.query.limit || 2;// Nombre de livres par page par défaut : 2
        const skip = (page - 1) * limit; // Calcul du nombre de livres à sauter

        // Recherche des livres dans la base de données
        const books = await Book.find()
            .sort({ createdAt: -1})// Tri des livres par date de création décroissante
            .skip(skip)// Saut des livres précédents
            .limit(limit)// Limite du nombre de livres à récupérer
            .populate("user", "username profileImage");// Récupération des informations de l'utilisateur
        // Comptage du nombre total de livres
        const totalBooks = await Book.countDocuments();
         // Envoi de la réponse avec les livres et les informations de pagination
        res.send({
            books,
            currentPage: page,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
        });
    } catch (error) {
        // Gestion des erreurs
       console.log("Erreur dans la route pour tout les livres", error);
       res.status(500).json({ message: "Erreur serveur interne" });
    }
});
//#endregion







//#region Recommandation des livres sur profil
// Route pour récupérer les livres d'un utilisateur spécifique
router.get("/user", protectRoute, async (req, res) => {
    try {
        // Recherche des livres de l'utilisateur connecté et tri des livres par date de création décroissante
        const books = await Book.find({ user: req.user._id}).sort({ createdAt: -1});
        // Envoi de la réponse avec les livres de l'utilisateur
        res.json(books);
    } catch (error) {
        // Gestion des erreurs
        console.error("Erreur lors de la récupération des livres de l'utilisateur:", error.message);
        res.status(500).json({ message: "Erreur serveur"});
    }
});


//#endregion








//#region Suppression de livre
// Route pour supprimer un livre
router.delete("/:id", protectRoute, async (req, res) => {
    try {
        // Récupération du livre à supprimer en fonction de son ID
        const book = await Book.findById(req.params.id); //id etant la wild card
         // Vérification si le livre existe
        if (!book) return res.status(404).json({ message: "Le livre n'a pas été trouvé"});
         // Vérification si l'utilisateur est autorisé à supprimer le livre
        if (book.user.toString() !== req.user._id.toString())
            return res.status(401).json({ message: "Pas autorisé"});
         // Suppression de l'image associée au livre si elle est hébergée sur Cloudinary
        if (book.image && book.image.includes("cloudinary")) {
            try {
                // Récupération de l'ID public de l'image
                const publicId = book.image.split("/").pop().split(".")[0];
                // Suppression de l'image sur Cloudinary
                await cloudinary.uploader.destroy(publicId);
            } catch (deleteError) {
                // Gestion de l'erreur en cas de problème lors de la suppression de l'image
                console.log("Erreur de suppression d'image depuis cloudinary", deleteError)
            }
        }
        // Suppression du livre de la base de données
        await book.deleteOne();
        // Envoi d'une réponse de succès
        res.json({ message: "Le livre a été supprimé avec succès" });
    } catch (error) {
        // Gestion des erreurs
        console.log("Erreur de suppression du livre", error);
        res.status(500).json({ message: "Erreur serveur interne" });
    }
    //#endregion
});


export default router;