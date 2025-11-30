import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { router } from 'expo-router';
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";
import { userApi } from '../services/api';

const LoginScreen = () => {
  const isDark = useColorScheme() === "dark";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    // Validate inputs
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await userApi.login({ email, password });
      
      if (response.data.data) {
        const user = response.data.data;
        let token = null;
        try {
          await AsyncStorage.setItem('user', JSON.stringify(user));
          token = response?.data?.token || response?.data?.data?.token;
          if (token) await AsyncStorage.setItem('token', token);
        } catch (e) {
          console.warn('Failed saving user to storage', e);
        }
        Alert.alert("Success", "Login successful!");
        // Debug logs: confirm user/token stored and navigation call
        console.log('LOGIN OK — user:', user, 'token:', token);
        (async () => {
          try {
            const stored = await AsyncStorage.getItem('user');
            console.log('stored user (from AsyncStorage):', stored);
          } catch (e) {
            console.warn('Failed reading stored user for debug', e);
          }
        })();
        // Replace navigation stack with main screen
        router.replace('main');
      }
    } catch (error) {
      console.error('Login error raw:', error);
      if (error?.response) {
        console.error('Response data:', error.response.data);
        Alert.alert('Login Failed', error.response.data?.error || error.response.data?.message || 'Invalid credentials');
      } else if (error?.request) {
        console.error('No response received - request:', error.request);
        Alert.alert('Network error', 'Unable to reach the server. Check your backend and network connectivity.');
      } else {
        console.error('Error message:', error.message);
        Alert.alert('Error', error.message || 'An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

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
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.passwordInput,
            {
              backgroundColor: isDark ? "#1f2937" : "#fff",
              color: isDark ? "#fff" : "#000",
              borderColor: isDark ? "#4b5563" : "#ccc"
            }
          ]}
          placeholder="Password"
          secureTextEntry={!showPassword}
          placeholderTextColor={isDark ? "#9ca3af" : "#777"}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={() => setShowPassword(!showPassword)}
        >
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color={isDark ? "#9ca3af" : "#6b7280"}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isDark ? "#3b82f6" : "#1E90FF" },
          loading && { opacity: 0.6 }
        ]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" size="large" />
        ) : (
          <Text style={styles.buttonText}>Log In</Text>
        )}
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
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  passwordInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    padding: 14,
    paddingRight: 50,
  },
  passwordToggle: {
    position: "absolute",
    right: 15,
    padding: 10,
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
