// Importation de la bibliothèque Mongoose pour interagir avec MongoDB
import mongoose from "mongoose";

// Exportation de la fonction de connexion à la base de données
export const connectDB = async () => {

    // Bloc try-catch pour gérer les erreurs de connexion
    try{
         // Connexion à la base de données MongoDB en utilisant l'URI stockée dans la variable d'environnement MONGO_URI
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // Affichage d'un message de connexion réussie avec l'hôte de la base de données
        console.log(`Connected to MongoDB ${conn.connection.host}`);
    }catch (error) {
         // Affichage d'un message d'erreur en cas de problème de connexion
        console.log("Error connecting to database", error);
        process.exit(1); // exit with failure
    }

}