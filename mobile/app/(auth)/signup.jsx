import { 
  View, Text, 
  KeyboardAvoidingView, Platform,
  TextInput,
} from 'react-native'
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../assets/styles/signup.styles';
import COLORS from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Signup() {
      // État pour stocker le username de l'utilisateur
      const [username, setUsername] = useState(false);
      // État pour stocker l'adresse e-mail de l'utilisateur
      const [email, setEmail] = useState("");
      // État pour stocker le mot de passe de l'utilisateur
      const [password, setPassword] = useState("");
      // État pour gérer l'affichage du mot de passe
      const [showPassword, setShowPassword] = useState(false);
      // État pour gérer l'état de chargement de la page
      const [isLoading, setIsLoading] = useState(false);

      // Fonction pour gérer la connexion de l'utilisateur
      const handleSignup = () => {}

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
            
            //#endregion
          </View>
          
          
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}