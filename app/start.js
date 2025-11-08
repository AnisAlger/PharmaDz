import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const StartScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Logo et nom */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/ajouter.png")} // même image que dans login.js
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>PharmaDz</Text>
      </View>

      {/* Bouton Start */}
      <TouchableOpacity
         style={styles.startButton}
         onPress={() => router.push("/login")} // <-- Utilise router.push
         >
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 60,
  },
  logoImage: {
    width: 40, 
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1E90FF",
  },
  startButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 12,
    shadowColor: "#1E90FF",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
});
