// Importation du framework Express
import express from "express";
import cors from "cors";
import "dotenv/config";
import job from "./lib/cron.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

import { connectDB } from "./lib/db.js";

// Création d'une instance de l'application Express
const app = express();
const PORT = process.env.PORT || 3000; 

// Définition du middleware pour parser les requêtes HTTP en JSON
job.start();
//app.use(express.json());
//création d'un middleware pour parser les requêtes JSON avec une limite de taille de 10 Mo
app.use(express.json({ limit: '10mb' })); 
// Définition du middleware pour parser les requêtes HTTP avec des données encodées en URL
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use( cors());

//Définition des routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Définition du port d'écoute du serveur
app.listen(PORT, () => {
     // Message de confirmation lorsque le serveur est en cours d'exécution
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
