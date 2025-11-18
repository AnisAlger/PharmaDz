import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";

export default function EditProfileScreen({ navigation }) {
  const isDark = useColorScheme() === "dark";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    phone: "",
    password: "",
  });

  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#ffffff" },
      ]}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/guest")}>
            <MaterialIcons
              name="arrow-back-ios-new"
              size={30}
              color={isDark ? "#3b82f6" : "#3b82f6"}
              paddingTop={50}
            />
          </TouchableOpacity>

          <Text style={[styles.title, { color: isDark ? "#fff" : "#111" }]}>
            Edit Profile
          </Text>

          <TouchableOpacity>
            <MaterialIcons
              name="edit"
              size={30}
              color={isDark ? "#3b82f6" : "#3b82f6"}
              paddingTop={50}
            />
          </TouchableOpacity>
        </View>

        {/* PROFILE IMAGE */}
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDU6h-q8MrQe0jwBbHsh-o8ndVb8uCs72MWQtF-ZcqVs8KZ1wXPCt_5LAAwIc9AVXZvD03wLuu-TwDZDG1xgzxaW46N_7xWbgJQwBJwZImG3pXdvDwR4qmMzEkgALFR1coTADA5NYSbj5tpzFEPmJm5lhF1fZiaI5CsH_ZJgKSn0r8umYXs96dbT4szmzqQ3veD3ca6n9nt9LGFB7fVIs4sX6QXtKYzce2LvqjhTcGaPLSqDLnTTlt_DlW66FlEXH8BizBCs1r0FvU",
            }}
            style={[
              styles.avatar,
              { borderColor: isDark ? "#374151" : "#e5e7eb" },
            ]}
          />
        </View>

        {/* FORM */}
        <View style={styles.form}>
          <Input
            label="First Name"
            value={form.firstName}
            onChange={(v) => updateField("firstName", v)}
            isDark={isDark}
          />
          <Input
            label="Last Name"
            value={form.lastName}
            onChange={(v) => updateField("lastName", v)}
            isDark={isDark}
          />
          <Input
            label="Email"
            value={form.email}
            onChange={(v) => updateField("email", v)}
            isDark={isDark}
          />
          <Input
            label="Birthday"
            value={form.birthday}
            onChange={(v) => updateField("birthday", v)}
            isDark={isDark}
          />
          <Input
            label="Phone Number"
            value={form.phone}
            onChange={(v) => updateField("phone", v)}
            isDark={isDark}
          />
          <Input
            label="Password"
            value={form.password}
            secureTextEntry={true}
            onChange={(v) => updateField("password", v)}
            isDark={isDark}
          />
        </View>
      </ScrollView>
    </View>
  );
}

/* COMPONENT INPUT */
function Input({ label, value, onChange, secureTextEntry, isDark }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={[
          styles.label,
          { color: isDark ? "#d1d5db" : "#374151" },
        ]}
      >
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1f2937" : "#f1f5f9",
            borderColor: isDark ? "#4b5563" : "#cbd5e1",
            color: isDark ? "#e5e7eb" : "#374151",
          },
        ]}
        placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
      />
    </View>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    paddingTop: 50,
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -60 }],
    fontSize: 22,
    fontWeight: "700",
  },

  imageWrapper: {
    paddingTop: 50,
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 4,
  },

  form: {
    width: "100%",
    marginTop: 10,
    marginBottom: 30,
    
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },

  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 16,
  },
});
