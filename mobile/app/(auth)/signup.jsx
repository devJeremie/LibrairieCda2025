import { 
  View, Text, 
  KeyboardAvoidingView, Platform,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import styles from '../../assets/styles/signup.styles';
import COLORS from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';

export default function Signup() {
      // État pour stocker le username de l'utilisateur
      const [username, setUsername] = useState("");
      // État pour stocker l'adresse e-mail de l'utilisateur
      const [email, setEmail] = useState("");
      // État pour stocker le mot de passe de l'utilisateur
      const [password, setPassword] = useState("");
      // État pour gérer l'affichage du mot de passe
      const [showPassword, setShowPassword] = useState(false);
      // État pour gérer l'état de chargement de la page
      const { user ,isLoading, register } = useAuthStore();
      

      const router = useRouter();

      // Fonction pour gérer la connexion de l'utilisateur
      // Cette fonction est appelée lorsque l'utilisateur clique sur le bouton d'inscription
      const handleSignup = async () => {
        console.log('Signup est bien appelé');
        // Appel de la fonction d'inscription avec les informations de l'utilisateur
        const result = await register(username, email, password);
         console.log('register a bien renvoye une reponse');
        // Vérification du résultat de l'inscription
        if (!result.success) Alert.alert("Error", result.error);
      };
      console.log('Inscription réussi');

  return (
    <KeyboardAvoidingView
      // Style pour prendre toute la hauteur de l'écran
      style={{flex:1}}
      // Comportement pour gérer l'apparition du clavier
      // - Sur iOS, ajoute un padding pour décaler le contenu
      // - Sur Android, modifie la hauteur de la vue pour décaler le contenu
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          //#region Header
          <View style={styles.header}>
            <Text style={styles.title}>Librairie <Icon name="book" size={24} color="#e0a931" /></Text>
            <Text style={styles.subtitle}>Partage tes livres préféré</Text>
          </View>
          //endregion



          //#region Formulaire
          <View style={styles.container}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nom d'utilisateur</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Votre nom ici'
                  placeholderTextColor={COLORS.placeholderText}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize='none'
                />
              </View>
            </View>
            //#endregion





            //#region EMail
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
                  placeholder='Votre mail ici'
                  placeholderTextColor={COLORS.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize='none'
                  keyboardType='email-address'
                />
              </View>
            </View>
            //#endregion




            //#region Mot de passe
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mot de passe</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Votre mot de passe ici'
                  placeholderTextColor={COLORS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'} 
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
            //#endregion
            //#region Bouton
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? (
              <ActivityIndicator color="#fff"/>
               ) : (
              <Text style={styles.buttonText}>Inscrivez-vous</Text>
              )}
            </TouchableOpacity>
            //#endregion
            //#region Footer
            <View style={styles.footer}>
              <Text style={styles.footerText}>Vous avez déjà un compte?</Text>
              <TouchableOpacity
                onPress={() => router.back()}
              >
                <Text style={styles.link}>Connexion</Text>
              </TouchableOpacity>
            </View>
            //endregion
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}