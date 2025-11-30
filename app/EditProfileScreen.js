import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { router } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { userApi } from '../services/api';

export default function EditProfileScreen({ navigation }) {
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    phone: "",
    password: "",
  });

  // Load user data whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      (async () => {
        setLoading(true);
        try {
          const userJson = await AsyncStorage.getItem('user');
          console.log('EditProfile - Retrieved user from storage:', userJson);
          if (userJson) {
            const user = JSON.parse(userJson);
            console.log('EditProfile - Parsed user object:', user);
            setUserId(user._id); // Store user ID for updates
            setForm({
              firstName: user.firstName || "",
              lastName: user.lastName || "",
              email: user.email || "",
              birthday: user.birthday || "",
              phone: user.phone || "",
              password: "", // Don't load password from storage for security
            });
          } else {
            console.log('EditProfile - No user data found in AsyncStorage');
          }
        } catch (e) {
          console.warn('Failed to load user data', e);
        } finally {
          setLoading(false);
        }
      })();
    }, [])
  );

  const updateField = (key, value) => {
    if (isEditing) {
      setForm({ ...form, [key]: value });
    }
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      // User pressed check — save changes to backend
      if (!userId) {
        Alert.alert("Error", "User ID not found");
        return;
      }

      setSaving(true);
      try {
        // Prepare update data (exclude password if empty)
        const updateData = {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          birthday: form.birthday,
          phone: form.phone,
        };
        
        // Only include password if it was entered
        if (form.password) {
          updateData.password = form.password;
        }

        // Call backend to update user
        const response = await userApi.updateUser(userId, updateData);
        console.log('User updated successfully:', response.data);

        // Update AsyncStorage with new user data
        const updatedUser = response.data.data || response.data;
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

        Alert.alert("Success", "Profile updated successfully!");
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update user:', error);
        Alert.alert("Error", "Failed to update profile. Please try again.");
      } finally {
        setSaving(false);
      }
    } else {
      // User pressed edit — enable editing mode
      setIsEditing(true);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#ffffff" },
      ]}
    >
      {loading ? (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={isDark ? "#3b82f6" : "#3b82f6"} />
        </View>
      ) : (
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
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

          <TouchableOpacity onPress={handleEditToggle} disabled={saving}>
            <MaterialIcons
              name={isEditing ? "check" : "edit"}
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
            editable={isEditing}
          />
          <Input
            label="Last Name"
            value={form.lastName}
            onChange={(v) => updateField("lastName", v)}
            isDark={isDark}
            editable={isEditing}
          />
          <Input
            label="Email"
            value={form.email}
            onChange={(v) => updateField("email", v)}
            isDark={isDark}
            editable={isEditing}
          />
          <Input
            label="Birthday"
            value={form.birthday}
            onChange={(v) => updateField("birthday", v)}
            isDark={isDark}
            editable={isEditing}
          />
          <Input
            label="Phone Number"
            value={form.phone}
            onChange={(v) => updateField("phone", v)}
            isDark={isDark}
            editable={isEditing}
          />
          <Input
            label="Password"
            value={form.password}
            secureTextEntry={true}
            onChange={(v) => updateField("password", v)}
            isDark={isDark}
            editable={isEditing}
          />
        </View>
      </ScrollView>
      )}
    </View>
  );
}

/* COMPONENT INPUT */
function Input({ label, value, onChange, secureTextEntry, isDark, editable }) {
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
        placeholder={label}
        editable={editable}
        style={[
          styles.input,
          {
            backgroundColor: editable ? (isDark ? "#1f2937" : "#f1f5f9") : (isDark ? "#374151" : "#e5e7eb"),
            borderColor: isDark ? "#4b5563" : "#cbd5e1",
            color: isDark ? "#e5e7eb" : "#374151",
            opacity: editable ? 1 : 0.6,
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
