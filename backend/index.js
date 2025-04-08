// Importation du framework Express
import express from "express";

// Création d'une instance de l'application Express
const app = express();

// Définition du port d'écoute du serveur
app.listen(3000, () => {
     // Message de confirmation lorsque le serveur est en cours d'exécution
    console.log("Server is running on port 3000" )
});