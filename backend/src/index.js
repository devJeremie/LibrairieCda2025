// Importation du framework Express
import express from "express";
import "dotenv/config";

import authRoutes from "./routes/authRoutes.js";

// Création d'une instance de l'application Express
const app = express();
const PORT = process.env.PORT || 3000; 

app.use("/api/auth",authRoutes);

// Définition du port d'écoute du serveur
app.listen(PORT, () => {
     // Message de confirmation lorsque le serveur est en cours d'exécution
    console.log(`Server is running on port ${PORT}` )
});