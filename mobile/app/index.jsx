import { Link } from "expo-router";
import { 
  Text, View,
  StyleSheet, 
} from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style ={styles.title}>Welcome to react native CDA</Text>

      <Link href="/(auth)">Connexion</Link>
      <Link href="/(auth)/signup">Inscription</Link>

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
