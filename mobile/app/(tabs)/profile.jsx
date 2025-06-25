import { 
  View, Text, FlatList, TouchableOpacity, 
  Alert,
  ActivityIndicator} from 'react-native';
import styles from '../../assets/styles/profile.styles';
import { Image } from 'expo-image';

import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { API_URL } from '../../constants/api';
import { useAuthStore } from '../../store/authStore';
import ProfileHeader from '../../components/ProfileHeader';
import LogoutButton from '../../components/LogoutButton';
import COLORS from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  // books : liste des livres de l'utilisateur
  // setBooks : fonction pour mettre à jour la liste des livres
  const [books, setBooks] = useState([]);
  // isLoading : indique si les données sont en cours de chargement
  // setIsLoading : fonction pour changer l'état de chargement
  const [isLoading, setIsLoading] = useState(true);
  // refreshing : indique si une actualisation (pull-to-refresh) est en cours
  // setRefreshing : fonction pour changer l'état d'actualisation
  const [refreshing, setRefreshing] = useState(false);
  // deleteBookId : identifiant du livre sélectionné pour la suppression
  // setDeleteBookId : fonction pour mettre à jour l'identifiant du livre à supprimer
  const [deleteBookId, setDeleteBookId] = useState(null);


  // token : le token d'authentification de l'utilisateur
  // useAuthStore : hook pour accéder au store d'authentification
  const { token } = useAuthStore();
  // router : permet de naviguer entre les pages de l'application
  const router = useRouter();

  // Fonction asynchrone pour récupérer les livres de l'utilisateur depuis l'API
  const fetchData = async () => {
    try {
      // Active l'indicateur de chargement
      setIsLoading(true);
      // Appel à l'API pour récupérer les livres de l'utilisateur
      const response = await fetch(`${API_URL}/books/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // On récupère les données de la réponse
      const data = await response.json();
      // Si la réponse n'est pas correcte, on lève une erreur
      if (!response.ok) throw new Error(data.message || 'Erreur lors de la récupération des livres');

      // On met à jour la liste des livres avec les données reçues
      setBooks(data);
    } catch (error) {
      // En cas d'erreur, on affiche un message dans la console et une alerte à l'utilisateur
      console.error('Erreur lors de la récupération des données:', error);
      Alert.alert('Erreur', 'Impossible de récupérer les livres. Veuillez essayer de rafraichir.');
    } finally {
      // Désactive l'indicateur de chargement
      setIsLoading(false);
    }
  }; 
  
  // useEffect pour charger les livres de l'utilisateur au premier rendu du composant
  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteBook = async (bookId) => {
    try {
      setDeleteBookId(bookId);
      // Appel à l'API pour supprimer le livre
      const response = await fetch(`${API_URL}/books/${bookId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Erreur lors de la suppression de la recommandation');

      // Met à jour la liste des livres en filtrant celui qui a été supprimé
      setBooks(books.filter((book) => book._id !== bookId));
      Alert.alert('Succès', 'Le livre a été supprimé avec succès.');
    } catch (error) {
        Alert.alert('Erreur',error.message || 'Impossible de supprimer la recommandation.');
    } finally {
      setDeleteBookId(null);
    }
  };

  const confirmDelete = (bookId) => {
    Alert.alert(
      'Supprimer le livre',
      'Êtes-vous sûr de vouloir supprimer ce livre ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => handleDeleteBook(bookId)
        },
      ]
    );
  };

  const renderBookItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Image source={item.image} style={styles.bookImage} />
      <View style={styles.bookInfo}> 
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer} >{renderRatingStars(item.rating)}</View>
        <Text style={styles.bookCaption} numberOfLines={2}>{item.caption}</Text>
        <Text style={styles.bookDate}>{new Date(item.createdAt).toLocaleDateString()} </Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item._id)}>
        {deleteBookId === item._id ? (
          <ActivityIndicator size="small" color={COLORS.primary} /> 
        ) : (
           <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
        )}
      </TouchableOpacity>
    </View>
  );

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i < rating ? 'star' : 'star-outline'}
          size={14}
          color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>

      <ProfileHeader />
      <LogoutButton />

      {/* Affichage de la liste des livres de l'utilisateur */}
      <View style={styles.booksHeader}>
        <Text style={styles.booksTitle}>Vos recommandations 📚</Text>
        <Text style={styles.booksCount}>{books.length} Livres</Text>
      </View>
      {/* FlatList : composant pour afficher la liste des livres de l'utilisateur de façon performante*/}
      <FlatList
        // data : les livres à afficher
        data={books}
        // renderItem : fonction pour afficher chaque livre (définie plus haut dans le composant)
        renderItem={renderBookItem}
        // keyExtractor : permet de donner une clé unique à chaque livre (ici, l'identifiant _id)
        keyExtractor={(item) => item._id}
         // showsVerticalScrollIndicator : masque la barre de défilement verticale
        showsVerticalScrollIndicator={false}
         // contentContainerStyle : applique un style personnalisé au conteneur de la liste
        contentContainerStyle={styles.booksList}
        // ListEmptyComponent : composant affiché si la liste des livres est vide
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={50} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>Aucune recommandation trouvé.</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push('/create')}>
              <Text style={styles.addButtonText}>Ajouter un livre</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  )
}