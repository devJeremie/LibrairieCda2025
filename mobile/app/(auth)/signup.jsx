import { 
  View, Text, 
  KeyboardAvoidingView, Platform,
} from 'react-native'
import styles from '../../assets/styles/signup.styles';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Signup() {
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
          <View style={styles.header}>
            <Text style={styles.title}>Librairie <Icon name="book" size={24} color="#e0a931" /></Text>
            <Text style={styles.subtitle}>Partage tes livres préféré</Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}