import { Stack, Slot, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "react-native";

import { useAuthStore} from "../store/authStore";
import { useEffect } from "react";

export default function RootLayout() {

  // Importation du router pour la navigation entre les pages
  const router = useRouter();
  // Récupération des segments de l'URL actuelle
  const segments = useSegments();

 // console.log("segments:", segments);
 
 // Récupération des données d'authentification (fonction de vérification, utilisateur et token)
 const {checkAuth, user, token} = useAuthStore()

  // Effet qui vérifie l'authentification lors du montage du composant
  useEffect(() => {
    // Vérification de l'authentification
    checkAuth();
  },[])  // Dépendances : aucune (exécuté une seule fois)

  // Effet qui gère la redirection en fonction de l'authentification et de l'URL actuelle
  useEffect(() => {
    // Si les segments sont vides, ne rien faire
    // Vérification si les segments de l'URL sont définis et non vides
     if (!segments || segments.length === 0) return;
    // Vérification si l'on est sur la page d'authentification
    const inAuthScreen = segments[0] === "(auth)";
    // Vérification si l'utilisateur est connecté (présence de token et d'utilisateur)
    const isSignedIn = user && token;

     // Si l'utilisateur n'est pas connecté et que l'on n'est pas sur la
     //  page d'authentification, redirection vers la page d'authentification
    if(!isSignedIn && !inAuthScreen) router.replace("/(auth)");
    // Si l'utilisateur est connecté et que l'on est sur la page d'authentification, 
    // redirection vers la page des onglets
    else if(isSignedIn && inAuthScreen) router.replace("/(tabs)");
  }, [user, token, segments]); // Dépendances : utilisateur, token et segments de l'URL

 //SafeScreen peut creer un warning de montage on peut l'enlever si besoin
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false}}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
        {/* <Slot /> */}
      </SafeScreen>
      <StatusBar style="dark"/>
    </SafeAreaProvider>
  );
}
