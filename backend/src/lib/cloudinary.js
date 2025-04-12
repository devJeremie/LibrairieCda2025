// Importation de la bibliothèque Cloudinary (version 2)
import { v2 as cloudinary } from "cloudinary";
// Importation de la configuration des variables d'environnement

import "dotenv/config";

// Configuration de Cloudinary avec les clés d'API
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary