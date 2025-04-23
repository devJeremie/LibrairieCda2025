import { 
  View, Text,
  Image,
  TextInput,
 } from 'react-native'
import styles from "../../assets/styles/login.styles";
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';

export default function Login() {
    // État pour stocker l'adresse e-mail de l'utilisateur
    const [email, setEmail] = useState("");
    // État pour stocker le mot de passe de l'utilisateur
    const [password, setPassword] = useState("");
    // État pour gérer l'affichage du mot de passe
    const [showPassword, setShowPassword] = useState(false);
    // État pour gérer l'état de chargement de la page
    const [isLoading, setIsLoading] = useState(false);

     // Fonction pour gérer la connexion de l'utilisateur
    const handleLogin = () => {}

  // Retourne le composant JSX pour la page de connexion
  return (
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
        </View>

      </View>
    </View>
  )
}