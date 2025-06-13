import { 
  View, Text,
  TouchableOpacity, FlatList, 
} from 'react-native'

import { Image } from 'expo-image';
import { Ionicons} from "@expo/vector-icons"
import { useAuthStore } from '../../store/authStore'
import { useState } from "react";
import { useEffect } from "react";
import styles from '../../assets/styles/home.styles';
import { API_URL } from '../../constants/api';
import { formatPublishDate } from '../../lib/utils';

export default function Home() {
  // Récupère le token d'authentification depuis le store
  const { token } = useAuthStore();
  // books : liste des livres récupérés depuis l'API
  // setBooks : fonction pour mettre à jour la liste des livres
  const [books, setBooks] = useState([]);
  // loading : indique si les données sont en cours de chargement
  // setLoading : fonction pour changer l'état de chargement
  const [loading, setLoading] = useState(true);
  // refreshing : indique si une actualisation (pull-to-refresh) est en cours
  // setRefreshing : fonction pour changer l'état d'actualisation
  const [refreshing, setRefreshing] = useState(false);
  // page : numéro de la page courante pour la pagination
  // setPage : fonction pour changer la page courante
  const [page, setPage] = useState(1);
  // hasMore : indique s'il y a encore des livres à charger (pour la pagination)
  // setHasMore : fonction pour changer l'état de hasMore
  const [hasMore, setHasMore] = useState(true);

  // Fonction asynchrone pour récupérer les livres depuis l'API
  // pageNum : numéro de la page à charger (pour la pagination)
  // refresh : indique si c'est un rafraîchissement (remise à zéro de la liste)
  const fetchBooks = async (pageNum=1, refresh=false) => {
    try {
      // Si c'est un rafraîchissement, on active l'indicateur de rafraîchissement
      if (refresh) setRefreshing(true);
      // Sinon, si c'est la première page, on active l'indicateur de chargement
      else if ( pageNum === 1 ) setLoading(true);

      // Appel à l'API pour récupérer les livres avec pagination (5 livres par page)
      const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=5`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // On récupère les données de la réponse
      const data = await response.json();
      // Si la réponse n'est pas OK, on lève une erreur
      if (!response.ok) throw new Error(data.message || 'Echec du fetch des livres');

      //On ajoute les nouveaux livres à la liste existante
      setBooks(prevBooks => [...prevBooks, ...data.books]);

      // On met à jour l'état pour savoir s'il reste des pages à charger
      setHasMore(pageNum < data.totalPages);
      // On met à jour le numéro de la page courante
      setPage(pageNum);

    } catch (error) {
      console.log('Erreur dans le fetch des livres ', error);
    } finally{
      // On désactive les indicateurs de chargement ou de rafraîchissement
      if (refresh) setRefreshing(false);
      else setLoading(false);
    }
  };

  // useEffect : effet qui sera exécuté au montage du composant (équivalent à componentDidMount)
  // Ici, il permet de charger les livres dès l'affichage de la page
  useEffect(() => {
    fetchBooks();
  }, []);

  // Fonction pour charger plus de livres (pagination)
  const handleLoadMore = async () => {};

    // Fonction pour afficher chaque livre dans la liste
  // item : objet représentant un livre (contenant les infos de l'utilisateur)
  const renderItem = ({ item }) => (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          {/* Affiche l'image de profil de l'utilisateur */}
          <Image source={{ uri: item.user.profileImage }}
            style={styles.avatar}
          />
          {/* Affiche le nom d'utilisateur */}
          <Text style={styles.username}>{item.user.username}</Text> 
        </View>
      </View>

      <View style={styles.bookImageContainer}>
        <Image
          source={item.image}
          style={styles.bookImage}
          contentFit="cover"
        />
      </View>

      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          {renderRatingStars(item.rating)}
        </View>
        <Text style={styles.caption}>{item.caption}</Text>
        <Text style={styles.date}>Partagé le : {formatPublishDate(item.createdAt)}</Text>
      </View>
    </View>
  );

  // Fonction pour afficher les étoiles de notation d'un livre
  // rating : note du livre (nombre d'étoiles pleines à afficher)
  const renderRatingStars = (rating) => {
    const stars = [];
    // Boucle pour générer 5 étoiles
    for (let i = 1; i < 6; i++) {
      stars.push(
        // Affiche une étoile pleine si i <= rating, sinon une étoile vide
        <Ionicons
          key={i} // Clé unique pour chaque étoile
          name={i <= rating ? 'star' : 'star-outline'}
          size={16}
          color={i <= rating ? '#f4b400' : COLORS.textSecondary}
          style={{ marginRight: 2 }}
        />
      );
    }
    // Retourne le tableau d'étoiles à afficher
    return stars;
  }

  // Affichage du composant principal
  // FlatList : composant pour afficher la liste des livres de façon performante
  // - data : données à afficher (ici la liste des livres)
  // - renderItem : fonction pour afficher chaque élément (livre)
  // - keyExtractor : fonction pour extraire une clé unique pour chaque livre
  // - contentContainerStyle : style appliqué au conteneur de la liste
  // - showsVerticalScrollIndicator : masque la barre de défilement verticale
  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}