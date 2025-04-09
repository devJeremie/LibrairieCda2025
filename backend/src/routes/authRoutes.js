// Importation du module Express.js
import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Création d'un objet Router pour gérer les routes de l'application
const router = express.Router();

//création token et expiration dans 15j
const generateToken = (userId) => {
  return jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: "15d"});
}

/**
 * Route pour l'inscription d'un utilisateur
 * Méthode : POST
 * URL : /register
 */
router.post("/register", async (req,res) => {
     // Cette fonction sera appelée lorsque la route /register est appelée en méthode POST
    try {
      // Extraction des données de la requête (email, username, password) à partir du corps de la requête (req.body)
      const { email, username, password } = req.body;
       
      // Vérification si les champs obligatoires (username, email, password) sont présents dans la requête
      if(!username || !email || !password) {
         // Si un ou plusieurs champs obligatoires sont manquants, renvoi d'une erreur 400 avec un message d'erreur
        return res.status(400).json({ message: "Veuillez fournir tous les champs"});
      }

      if(password.length < 6) {
        return res.status(400).json({ message: "Le mot de passe doit contenir au moins 6 caractères"});
      }

      if(username.length < 3) {
        return res.status(400).json({ message: "Le nom d'utilisateur doit contenir au moins 3 caractères"});
      }

      //Vérification de l'existence d'un user avec meme mail et meme pseudo.
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Cet email existe déjà"});
      } 

      const existingUserName = await User.findOne({ username });
      if (existingUserName) {
        return res.status(400).json({ message: "Ce nom d'utilisateur existe déjà"});
      } 

      //Création avatar aléatoire
      const profileImage = `https://api.dicebear.com/7.x/aventurier/svg?seed=${username}`;

      //Création nouveau User si tout est ok
      const user = new User({ 
        email, 
        username, 
        password,
        profileImage,
      })
      await user.save();

      const token = generateToken(user._id);

      res.status(201).json({
        token,
        user:{
          id:user._id,
          username:user.username,
          email: user.email,
          profileImage: user.profileImage
        },
      })
    } catch (error) {
      console.log("Erreur dans la route register",error);
      res.status(500).json({ message: "Erreur serveur" });
    }
});

router.post("/login", async (req,res) => {
    res.send("login");
});

export default router;