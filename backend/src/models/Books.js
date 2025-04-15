import mongoose from "mongoose"; 

//#region SCHEMA LIVRE
// Création d'un nouveau schéma pour les livres
const bookSchema = new mongoose.Schema({
    // Titre du livre (obligatoire)
    title: {
        type: String,
        required: true,
    },
    // Description du livre (obligatoire)
    caption:{
        type:String,
        required:true
    },
    // URL de l'image du livre (obligatoire)
    image: {
        type: String,
        required: true,
    },
    // Note du livre (obligatoire, entre 1 et 5)
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    // Référence à l'utilisateur qui a créé le livre (obligatoire)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {timestamps: true});
//#endregion
const Book = mongoose.model("Book", bookSchema);

export default Book;