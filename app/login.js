import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";

const LoginScreen = () => {
  const isDark = useColorScheme() === "dark";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#111827" : "#fff" }
      ]}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/ajouter.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={[styles.logoText, { color: isDark ? "#60A5FA" : "#1E90FF" }]}>
          PharmaDz
        </Text>
      </View>

      {/* Formulaire */}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1f2937" : "#fff",
            color: isDark ? "#fff" : "#000",
            borderColor: isDark ? "#4b5563" : "#ccc"
          }
        ]}
        placeholder="Email Address"
        placeholderTextColor={isDark ? "#9ca3af" : "#777"}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1f2937" : "#fff",
            color: isDark ? "#fff" : "#000",
            borderColor: isDark ? "#4b5563" : "#ccc"
          }
        ]}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={isDark ? "#9ca3af" : "#777"}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isDark ? "#3b82f6" : "#1E90FF" }
        ]}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Lien Sign up */}
      <View style={styles.signupContainer}>
        <Text
          style={[
            styles.signupText,
            { color: isDark ? "#d1d5db" : "#555" }
          ]}
        >
          Don't have account ?
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("info")}>
          <Text
            style={[
              styles.signupLink,
              { color: isDark ? "#60A5FA" : "#1E90FF" }
            ]}
          >
            {" "}Sign up
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lien Guest */}
      <TouchableOpacity
        style={styles.guestContainer}
        onPress={() => navigation.navigate("guest")}
      >
        <Text
          style={[
            styles.guestLink,
            { color: isDark ? "#60A5FA" : "#1E90FF" }
          ]}
        >
          Log in as guest
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 20,
    padding: 14,
    marginBottom: 20,
  },
  button: {
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
    flexDirection: "row",
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    fontSize: 14,
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
    textDecorationLine: "underline",
  },
});
