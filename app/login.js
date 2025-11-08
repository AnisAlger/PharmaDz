import { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/ajouter.png")} // <-- mets ton chemin ici
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>PharmaDz</Text>
      </View>

      {/* Formulaire */}
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Lien Sign up */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>
          Don't have account?{" "}
          <Text style={styles.signupLink}>Sign up</Text>
        </Text>
      </View>

      {/* Lien Guest */}
      <View style={styles.guestContainer}>
        <Text style={styles.guestLink}>Log in as guest</Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
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
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 14,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 14,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  signupContainer: {
    marginTop: 25,
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    color: "#555",
  },
  signupLink: {
    color: "#1E90FF",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  guestContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  guestLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
});
