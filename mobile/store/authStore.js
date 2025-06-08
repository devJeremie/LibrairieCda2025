// Importation de la fonction create de la bibliothèque Zustand
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/api";
// Création du store d'authentification
export const useAuthStore = create((set) => ({
    // État initial du store
    user: null, // Utilisateur actuellement connecté
    token: null, // Jeton d'authentification
    isLoading: false, // Jeton d'authentification
    //#region Register
    // Fonction d'inscription 
    register: async (username, email, password) => {
        // Définition de l'état de chargement à true
        set({ isLoading: true });
        try {
            // Envoi d'une requête POST à l'API d'inscription
            //peut etre devra t'on enlever le /api
            const response = await fetch(`${API_URL}/auth/register`,{
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
if (!response.ok) throw new Error(data.message || "Quelque chose s'est mal passé");
// Stockage des données utilisateur et du jeton dans le stockage local
await AsyncStorage.setItem("user", JSON.stringify(data.user));
await AsyncStorage.setItem("token", data.token);
// Mise à jour de l'état du store avec les données utilisateur et le jeton
set({ token: data.token, user: data.user, isLoading: false });
// Retour de la réponse avec succès
return { success: true };
        // Gestion des erreurs
        } catch (error) {
    // Réinitialisation de l'état de chargement
    set({ isLoading: false });

    return { success: false, error: error.message };
}
    }, //#endregion
//#region Login
// Fonction de login
    login: async (email, password) => {
    // Définir l'état de chargement sur true
    set({ isLoading: true });
    try {
        // Envoyer une requête POST à l'API pour se connecter
        //peut etre devra t'on enlever le /api
        const response = await fetch(`${API_URL}/auth/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Envoyer les informations de connexion sous forme de JSON
            body: JSON.stringify({
                email,
                password,
            }),
        });
        // Récupérer les données de la réponse
        const data = await response.json();
        // Si la réponse n'est pas OK, lancer une erreur
        if (!response.ok) throw new Error(data.message || "Quelque chose s'est mal passé");
        // Stocker les informations de l'utilisateur et le token dans le stockage local
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        await AsyncStorage.setItem("token", data.token);
        // Définir les informations de l'utilisateur et le token dans l'état
        set({ token: data.token, user: data.user, isLoading: false });
        // Retourner un objet avec un succès
        return { success: true };
    } catch (error) {
        // Définir l'état de chargement sur false en cas d'erreur
        set({ isLoading: false });
        // Retourner un objet avec une erreur
        return { success: false, error: error.message };
    }
},
    //#endregion
    //#region Authentification
    // Vérifie l'authentification de l'utilisateur
    checkAuth: async () => {
        try {
            // Récupère le jeton d'authentification stocké dans le stockage local
            const token = await AsyncStorage.getItem("token");
            // Récupère les informations de l'utilisateur stockées dans le stockage local
            const userJson = await AsyncStorage.getItem("user");
            // Parse les informations de l'utilisateur en objet JSON
            const user = userJson ? JSON.parse(userJson) : null;

            // Met à jour l'état de l'application avec les informations d'authentification
            set({ token, user });
            // Gère les erreurs qui pourraient survenir lors de la vérification de l'authentification
        } catch (error) {
            console.log("Authentification check echoué", error);
        }
    }, //#endregion
        //#region Logout
        //Fonction de déconnexion
        logout: async () => {
            // Supprimer le jeton d'authentification du stockage local
            await AsyncStorage.removeItem("token");
            // Supprimer les informations de l'utilisateur du stockage local
            await AsyncStorage.removeItem("user");
            // Réinitialiser les valeurs de l'utilisateur et du jeton dans le store
            set({ token: null, user: null });
        },//#endregion
}));