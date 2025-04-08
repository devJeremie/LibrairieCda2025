// Importation du module Express.js
import express from "express";

// Création d'un objet Router pour gérer les routes de l'application
const router = express.Router();

/**
 * Route pour l'inscription d'un utilisateur
 * Méthode : POST
 * URL : /register
 */
router.post("/register", (req,res) => {
     // Cette fonction sera appelée lorsque la route /register est appelée en méthode POST
    res.send("register");
      // La fonction renvoie simplement la chaîne de caractères "register"
});

router.post("/login", (req,res) => {
    res.send("login");
});

export default router;