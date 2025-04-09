// Importation de la bibliothèque Mongoose
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// Définition du schéma de données pour les utilisateurs
const userSchema = new mongoose.Schema({
      // Champ de données "username" et leur types
    username: {
        type: String,
        required: true,
        unique: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profileImage: {
        type: String,
        default: ''
    }
});

//Hash du password avant sauvegarde en Bdd
userSchema.pre('save', async function(next) {
    if(!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next()
})

// Création du modèle de données "User "
const User = mongoose.model("User", userSchema);

export default User;