import express from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Books.js";

// Création d'un objet Router pour gérer les routes de l'application
const router = express.Router();

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
        //user: req.user._id,
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
})

export default router;