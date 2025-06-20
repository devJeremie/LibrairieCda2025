import { View, Text } from 'react-native';
import styles from '../../assets/styles/profile.styles';

import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { API_URL } from '../../constants/api';
import { useAuthStore } from '../../store/authStore';

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

  return (
    <View>
      <Text>Onglet profil</Text>
    </View>
  )
}