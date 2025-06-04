import { View, Text,
  KeyboardAvoidingView, Platform,
  ScrollView, TextInput,
  TouchableOpacity, Alert,
  Image,
ActivityIndicator, } 
from 'react-native';
import { useState } from "react";
import { useRouter } from "expo-router";
import styles from "../../assets/styles/create.styles";
import COLORS from '../../constants/colors';
import { Ionicons} from "@expo/vector-icons"
import { useAuthStore } from "../../store/authStore";


import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export default function Create() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(3);
  const [image, setImage] = useState(null); //pour afficher l'image selectionner
  const [imageBase64, setImageBase64] = useState(null); //transforme image en texte
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  /* Récupérer le token de connexion stocké dans le stockage local (AsyncStorage)
  * sous la clé "token"*/
  const {token} = useAuthStore();

  const pickImage = async () => {
    try {
      //Demander l'autorisation
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log({status});
        if (status !== "granted"){
          Alert.alert("Permission Denied", "Nous avons besoin d'accéder à votre galerie pour charger une image");
          return;
        }
      }
      //lancer la galerie
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images", // Spécifie le type de média à sélectionner
        allowsEditing: true, // Autorise l'édition de l'image sélectionnée
        aspect: [4, 3], // Définit le rapport d'aspect de l'image (4:3)
        quality: 0.5, // Définit la qualité de l'image (entre 0 et 1)
        base64: true, // Renvoie l'image sous forme de chaîne de caractères en base64
      });
      if (!result.canceled) {
        console.log("Résultat ici: ", result);
        setImage(result.assets[0].uri); // Met à jour l'état de l'image avec l'URI de l'image 
         
        if(result.assets[0].base64) {
          setImageBase64(result.assets[0].base64);
        } else {
          const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
              encoding: FileSystem.EncodigType.Base64,
          });
          setImageBase64(base64); //mise a jour 
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "There was a problem selecting your image");
    }
  };
  const handleSubmit = async () => {
    if (!title || !caption || !imageBase64 || !rating) {
      Alert.alert("Error", "Veuillez remplir tout les champs");
      return;
    }
    try {
      /* Définir l'état de chargement sur true pour indiquer que 
      l'application est en train de charger*/
    setLoading(true);
      // Découpe l'URL de l'image en un tableau de parties en utilisant le point (.) comme séparateur
      const uriParts = image.split(".");
      // Extrait l'extension de fichier à partir de la dernière partie de l'URL
      const fileType = uriParts[uriParts.length - 1];
      // Détermine le type MIME de l'image en fonction de l'extension de fichier
      // Si l'extension de fichier n'est pas vide, utilise-la pour construire le type MIME
      // Sinon, utilise la valeur par défaut "image/jpeg"
      const imageType = fileType ? `ìmage/${fileType.toLowerCase()}` : "image/jpeg";
    // Construit une URL de données pour l'image en utilisant le 
    // type MIME déterminé et les données d'image encodées en base64
    const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

    fetch
    
    } catch (error) {
      
    }
  };
  /*Cette fonction crée un composant de sélection de notation avec 5 étoiles.
 * L'utilisateur peut sélectionner une note en cliquant sur une étoile.*/
  const renderRatingPicker = () => {
    // Tableau pour stocker les étoiles
    const stars = [];
    // Boucle pour créer les 5 étoiles
    for (let i =1; i <= 5; i++) {
      // Ajout d'une étoile au tableau
      stars.push(
        // Composant de touche pour l'étoile
        <TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.starButton}>
          {/* Composant d'icône pour l'étoile*/}
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={32}
            color={i <= rating ? "#fab400" : COLORS.textSecondary}
          />
        </TouchableOpacity>
      );
    }
    // Retourne le composant de sélection de notation
    return <View style={styles.ratingContainer}>{stars}</View>
  };

  return (
    <KeyboardAvoidingView
      style={{ flex:1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>

        <View style={styles.card}>
          {/*HEADER */}
          <View>
            <Text style={styles.title}>Ajouter une recommandation</Text>
            <Text style={styles.subtitle}>Partager vos favoris avec la communauté</Text>
          </View>
         
          <View style={styles.form}>
             {/*Titre du livre*/}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Titre du livre</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Entrer le titre du livre'
                  placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChangeText={setTitle}
                />

              </View>
            </View>
            {/*Notation*/}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Votre note</Text>
              {renderRatingPicker()}
            </View>
            {/*Image*/}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Image du livre </Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {image ? (
                   <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons 
                      name="image-outline"
                      size={40}
                      color={COLORS.textSecondary} 
                    />
                    <Text style={styles.placeholderText}>Toucher pour selectionner une image</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            {/*Description*/}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.textArea}
                placeholder='Ecrivez votre avis sur ce livre...'
                placeholderTextColor={COLORS.placeholderText}
                value={caption}
                onChangeText={setCaption}
                multiline
              />
            </View>
            {/*Submit*/}
            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <>
                    <Ionicons
                      name='cloud-upload-outline'
                      size={20}
                      color={COLORS.white}
                      style={styles.buttonIcon}
                    />
                    <Text style={styles.buttonText}>Partager</Text>
                  </>
                )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}