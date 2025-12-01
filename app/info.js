import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View
} from "react-native";
import { userApi } from "../services/api";

export default function RegisterScreen() {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();

  const [form, setForm] = useState({
    nationalId: "",
    firstName: "",
    lastName: "",
    birthday: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  // DatePicker
  const [showPicker, setShowPicker] = useState(false);
  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0];
      handleChange("birthday", formatted);
    }
  };

  const handleSignup = async () => {
    if (!form.nationalId || !form.firstName || !form.lastName || !form.email || !form.phone || !form.password || !form.birthday) {
      return Alert.alert("Error", "Please fill in all fields.");
    }
    if (!agree) return Alert.alert("Error", "Please agree to the Terms & Privacy Policy.");

    // Validation mot de passe
    const passwordIsValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()\-_=+!<>?]).{8,}$/.test(form.password);
    if (!passwordIsValid) {
      return Alert.alert(
        "Weak password",
        "Password must contain:\n• 8 characters minimum\n• 1 uppercase letter\n• 1 number\n• 1 special character"
      );
    }

    setLoading(true);
    try {
      await userApi.createUser({
        nationalIdNumber: form.nationalId,
        firstName: form.firstName,
        lastName: form.lastName,
        birthday: form.birthday,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("login");
    } catch (error) {
      console.log("Signup error:", error);
      if (error?.response?.data) {
        Alert.alert("Signup Failed", error.response.data.message || error.response.data.error);
      } else if (error?.request) {
        Alert.alert("Network Error", "Unable to reach server. Check your backend.");
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // Ajuster si besoin
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, { backgroundColor: isDark ? "#111827" : "#ffffff" }]}>
          <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
            {/* HEADER */}
            <View style={styles.header}>
              <Image
                source={require("../assets/ajouter.png")}
                style={styles.logoImage}
                resizeMode="contain"
              />
              <Text style={[styles.title, { color: "#3B82F6" }]}>PharmaDz</Text>
            </View>

            {/* FORM */}
            <View style={styles.form}>
              <InputField placeholder="National ID Number" value={form.nationalId} onChange={(v) => handleChange("nationalId", v)} dark={isDark} />
              <InputField placeholder="First Name" value={form.firstName} onChange={(v) => handleChange("firstName", v)} dark={isDark} />
              <InputField placeholder="Last Name" value={form.lastName} onChange={(v) => handleChange("lastName", v)} dark={isDark} />

              {/* DatePicker */}
              <TouchableOpacity
                onPress={() => setShowPicker(true)}
                style={[styles.input, { backgroundColor: isDark ? "#1f2937" : "#ffffff", justifyContent: "center" }]}
              >
                <Text style={{ color: form.birthday ? (isDark ? "#fff" : "#000") : "#9ca3af" }}>
                  {form.birthday || "Select Birthday"}
                </Text>
              </TouchableOpacity>
              {showPicker && <DateTimePicker value={new Date()} mode="date" display="spinner" onChange={handleDateChange} />}

              <InputField placeholder="Email Address" value={form.email} onChange={(v) => handleChange("email", v)} dark={isDark} />
              <InputField placeholder="Phone Number" value={form.phone} onChange={(v) => handleChange("phone", v)} dark={isDark} />
              <InputField placeholder="Password" secureTextEntry value={form.password} onChange={(v) => handleChange("password", v)} dark={isDark} />

              {/* TERMS */}
              <View style={styles.termsContainer}>
                <TouchableOpacity
                  style={[styles.checkbox, { backgroundColor: agree ? "#3B82F6" : "transparent", borderColor: isDark ? "#4b5563" : "#9ca3af" }]}
                  onPress={() => setAgree(!agree)}
                />
                <Text style={[styles.termsText, { color: isDark ? "#e5e7eb" : "#4b5563" }]}>
                  I agree to the <Text style={styles.termsLink}>Terms & Privacy Policy</Text>
                </Text>
              </View>

              {/* BUTTON */}
              <TouchableOpacity style={[styles.button, loading && { opacity: 0.6 }]} onPress={handleSignup} disabled={loading}>
                {loading ? <ActivityIndicator color="white" size="large" /> : <Text style={styles.buttonText}>Next</Text>}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

/* ----------- COMPONENT FOR INPUTS ----------- */
const InputField = ({ placeholder, value, onChange, secureTextEntry, dark }) => (
  <TextInput
    style={[
      styles.input,
      {
        backgroundColor: dark ? "#1f2937" : "#ffffff",
        color: dark ? "#fff" : "#000",
        borderColor: dark ? "#4b5563" : "#d1d5db",
      },
    ]}
    placeholder={placeholder}
    placeholderTextColor={dark ? "#9ca3af" : "#9ca3af"}
    value={value}
    secureTextEntry={secureTextEntry}
    onChangeText={onChange}
  />
);

/* ----------- STYLES ----------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scroll: {
    padding: 20,
    justifyContent: "center",
    minHeight: "100%",
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    paddingTop: 20,
  },

  title: {
    fontSize: 42,
    fontWeight: "700",
    marginLeft: 10,
  },

  form: {
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
    paddingBottom: 40,
  },

  input: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 50,
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 18,
  },

  button: {
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    borderRadius: 50,
    marginTop: 15,
    shadowColor: "#3B82F6",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
  },

  logoImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },

  termsContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 5,
  marginBottom: 10,
},

checkbox: {
  width: 22,
  height: 22,
  borderWidth: 2,
  borderRadius: 6,
  marginRight: 10,
},

termsText: {
  fontSize: 14,
  flexShrink: 1,
},

termsLink: {
  color: "#3B82F6",
  fontWeight: "600",
  textDecorationLine: "underline",
},

});
