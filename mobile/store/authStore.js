// Importation de la fonction create de la bibliothèque Zustand
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Création du store d'authentification
export const useAuthStore = create((set) => ({
    // État initial du store
    user: null, // Utilisateur actuellement connecté
    token: null, // Jeton d'authentification
    isLoading: false, // Jeton d'authentification

    // Fonction d'inscription
    register: async (username,email,password) => {
        // Définition de l'état de chargement à true
        set({ isLoading: true });
        try {
            // Envoi d'une requête POST à l'API d'inscription
            const response = await fetch("https://librairie-backend.onrender.com/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
            })
            // Récupération des données de la réponse
            const data = await response.json();
            // Vérification si la réponse est OK (200-299)
            if(!response.ok) throw new Error(data.message || "Quelque chose s'est mal passé");
            // Stockage des données utilisateur et du jeton dans le stockage local
            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            await AsyncStorage.setItem("token", data.token);
            // Mise à jour de l'état du store avec les données utilisateur et le jeton
            set({token: data.token, user: data.user, isLoading: false});
            // Retour de la réponse avec succès
            return {success: true};
        // Gestion des erreurs
        } catch (error) {
            // Réinitialisation de l'état de chargement
            set({ isLoading: false});

            return { success: false, error: error.message };
        }
    },
}));