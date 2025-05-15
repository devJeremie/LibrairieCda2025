import { Link } from "expo-router";
import { 
  Text, View,
  StyleSheet,
  TouchableOpacity, 
} from "react-native";
import { useAuthStore } from "../store/authStore"
import { useEffect } from "react";

export default function Index() {
  // Récupération des informations de l'utilisateur et du token d'authentification
  // à partir du store d'authentification
  const {user, token, checkAuth, logout}= useAuthStore()

  console.log(user, token);
  // Utilisation de l'hook useEffect pour exécuter la fonction checkAuth
  // lors du montage du composant (déclenché une seule fois)
  useEffect( () => {
    // Vérification de l'authentification de l'utilisateur
    checkAuth()
  },[])
  return (
    <View style={styles.container}>
      <Text style ={styles.title}>Bonjour {user?.username}</Text>

      <TouchableOpacity onPress={logout}>
        <Text>Déconnexion</Text>
      </TouchableOpacity>

      <Link href="/(auth)">Connexion</Link>
      <Link href="/(auth)/signup">Inscription</Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }, 
  title: {
    color: "blue",
  }
})
