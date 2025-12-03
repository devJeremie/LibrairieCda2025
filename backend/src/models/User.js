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
},{ timestamps: true});

//Hash du password avant sauvegarde en Bdd
userSchema.pre('save', async function(next) {         //on peut sortir next
    if(!this.isModified("password")) return next();   //ici aussi on peut sortir next

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next(); //et donc on sort next ici aussi
});

//Comparaison du mot de passe
userSchema.methods.comparePassword = async function(userPassword) {
    // Utilisation de la méthode bcrypt.compare pour comparer les deux mots de passe
    // Cette méthode renvoie une promesse qui résout à true si les mots de passe correspondent, et à false sinon
    return await bcrypt.compare(userPassword, this.password);
}

// Création du modèle de données "User "
const User = mongoose.model("User", userSchema);

export default User;