import { Link } from "expo-router";
import { 
  Text, View,
  StyleSheet, 
} from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style ={styles.title}>Welcome to react native CDA</Text>

      <Link href="/login">Connexion</Link>
      <Link href="/login">Inscription</Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }, 
  title: {
    color: "blue",
  }
})
