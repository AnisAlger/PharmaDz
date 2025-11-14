import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View
} from "react-native";

export default function RegisterScreen({ navigation }) {
  const isDark = useColorScheme() === "dark";

  const [form, setForm] = useState({
    nationalId: "",
    firstName: "",
    lastName: "",
    birthday: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };
 const [agree, setAgree] = useState(false);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#111827" : "#ffffff" },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* HEADER */}
        <View style={styles.header}>
           <Image
          source={require("../assets/ajouter.png")} // <-- mets ton chemin ici
          style={styles.logoImage}
          resizeMode="contain"
        />
          <Text style={[styles.title, { color: "#3B82F6" }]}>PharmaDz</Text>
        </View>

        {/* FORM */}
        <View style={styles.form}>
          <InputField
            placeholder="National ID Number"
            value={form.nationalId}
            onChange={(v) => handleChange("nationalId", v)}
            dark={isDark}
          />

          <InputField
            placeholder="First Name"
            value={form.firstName}
            onChange={(v) => handleChange("firstName", v)}
            dark={isDark}
          />

          <InputField
            placeholder="Last Name"
            value={form.lastName}
            onChange={(v) => handleChange("lastName", v)}
            dark={isDark}
          />

          <InputField
            placeholder="Birthday DD/MM/YYYY"
            value={form.birthday}
            onChange={(v) => handleChange("birthday", v)}
            dark={isDark}
          />

          <InputField
            placeholder="Email Address"
            value={form.email}
            onChange={(v) => handleChange("email", v)}
            dark={isDark}
          />

          <InputField
            placeholder="Phone Number"
            value={form.phone}
            onChange={(v) => handleChange("phone", v)}
            dark={isDark}
          />

          <InputField
            placeholder="Confirm Password"
            secureTextEntry
            value={form.password}
            onChange={(v) => handleChange("password", v)}
            dark={isDark}
          />
        <View style={styles.termsContainer}>
  <TouchableOpacity
    style={[
      styles.checkbox,
      { backgroundColor: agree ? "#3B82F6" : "transparent",
        borderColor: isDark ? "#4b5563" : "#9ca3af"
      }
    ]}
    onPress={() => setAgree(!agree)}
  />

  <Text style={[styles.termsText, { color: isDark ? "#e5e7eb" : "#4b5563" }]}>
    I agree to the{" "}
    <Text style={styles.termsLink}>Terms & Privacy Policy</Text>
  </Text>
</View>

          {/* NEXT BUTTON */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
