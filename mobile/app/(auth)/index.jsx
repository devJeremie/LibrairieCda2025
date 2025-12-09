import { 
  View, Text,
  Image,TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
 } from 'react-native'
import { Link } from "expo-router";
import styles from "../../assets/styles/login.styles";
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';

import { useAuthStore } from "../../store/authStore";

export default function Login() {
    // État pour stocker l'adresse e-mail de l'utilisateur
    const [email, setEmail] = useState("");
    // État pour stocker le mot de passe de l'utilisateur
    const [password, setPassword] = useState("");
    // État pour gérer l'affichage du mot de passe
    const [showPassword, setShowPassword] = useState(false);
    // État pour gérer l'état de chargement de la page
    const { isCheckingAuth, isLoading, login } = useAuthStore();

     // Fonction pour gérer la connexion de l'utilisateur
    const handleLogin = async () => {
      const result = await login(email, password);

      if (!result.success) Alert.alert("Erreur", result.error);
    };

    if (isCheckingAuth) return null;

  // Retourne le composant JSX pour la page de connexion
  return (
    //Composant pour éviter que le clavier ne cache le contenu de la page
    // sur les appareils mobiles
    <KeyboardAvoidingView
      // Style pour prendre toute la hauteur de l'écran
      style={{flex:1}}
      // Comportement pour gérer l'apparition du clavier
      // - Sur iOS, ajoute un padding pour décaler le contenu
      // - Sur Android, modifie la hauteur de la vue pour décaler le contenu
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/*Image*/}
        <View>
          <Image 
            source={require("../../assets/images/Reading-glasses-bro.png")} 
            style={styles.illustrationImage} 
            resizeMode="contain"
          />
        </View>
        <View style={styles.card}>
          <View style={styles.formContainer}>
            // #region Email
            {/*Email*/}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Entrer votre email"
                    placeholderTextColor={COLORS.placeholderText}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-adress'
                    autoCapitalize='none'
                  />
                </View>
              </View>
          
            // #endregion
            // #region Password
            {/*Mot de passe*/}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mot de passe</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name='lock-closed-outline'
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Entrer votre mot de passe'
                  placeholderTextColor={COLORS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                /**
                * Bouton pour afficher/masquer le mot de passe
                */
                <TouchableOpacity
                /**
                 * Fonction appelée lors du clic sur le bouton
                 * Inverse la valeur de showPassword pour afficher ou masquer le mot de passe
                 */
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  /**
                  * Icone pour afficher/masquer le mot de passe
                  * Utilise l'icone "eye-outline" si le mot de passe est visible, "eye-off-outline" sinon
                  */
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            //#region Bouton Login
            <TouchableOpacity 
              style={styles.button} 
              /* Fonction appelée lors du clic sur le bouton (elle nexiste pas encore) */
              onPress={handleLogin} disabled={isLoading}
            >
              {/* Affichage d'un indicateur de chargement si isLoading est true */}
              {isLoading ? (<ActivityIndicator color="#fff" />
              ) : (
                /* Affichage du texte "Login" si isLoading est false */
                <Text style={styles.buttonText}>Connexion</Text>
              )}
            </TouchableOpacity>
            //#endregion
            //#region Footer
            <View style={styles.footer}>
              <Text style={styles.footerText}>Vous n'avez pas de compte?</Text>
              <Link href="/signup" asChild>
                <TouchableOpacity>
                  <Text style={styles.link}>S'inscrire</Text>
                </TouchableOpacity>
              </Link>
            </View>
            //#endregion
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}