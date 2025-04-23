// Importation des composants et hooks nécessaires
import { View, StyleSheet, } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS  from '../constants/colors';

// Définition d'un composant fonctionnel nommé SafeScreen
export default function SafeScreen({ children }) {
    // Utilisation du hook useSafeAreaInsets pour obtenir les informations de la zone de sécurité
    const insets = useSafeAreaInsets();

    // Retourne un composant View avec un style personnalisé
    return <View style={[styles.container, {paddingTop: insets.top}]}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
});