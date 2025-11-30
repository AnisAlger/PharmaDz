import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const SettingItem = ({ icon, label, color, onPress }) => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.item,
        { backgroundColor: isDark ? "#1e293b" : "#ffffff" },
      ]}
    >
      <MaterialIcons name={icon} size={28} color={color || "#2563eb"} />
      <Text
        style={[
          styles.itemText,
          { color: isDark ? "#e2e8f0" : "#334155" },
        ]}
      >
        {label}
      </Text>
      <MaterialIcons
        name="chevron-right"
        size={26}
        color={isDark ? "#64748b" : "#94a3b8"}
      />
    </TouchableOpacity>
  );
};

export default function SettingsScreen({ navigation }) {
  const isDark = useColorScheme() === "dark";

  const handleLogout = async () => {
    Alert.alert(
      "Log out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log out",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('user');
              await AsyncStorage.removeItem('token');
            } catch (e) {
              console.warn('Error clearing storage during logout', e);
            }
            // Replace the navigation stack with login
            router.replace('/login');
          },
        },
      ],
    );
  };

  const handleSecurity = () => {
    Alert.alert("Security", "Security settings coming soon!");
  };

  const handleNotification = () => {
    Alert.alert("Notifications", "Notification preferences coming soon!");
  };

  const handlePrivacy = () => {
    Alert.alert("Privacy", "Privacy settings coming soon!");
  };

  const handleTermsAndPolicy = () => {
    Alert.alert(
      "Terms & Privacy Policy",
      "Our Terms of Service and Privacy Policy are available on our website."
    );
  };

  const handleHelpAndSupport = () => {
    Alert.alert(
      "Help & Support",
      "Contact us at support@pharmadz.com or visit our website for more information."
    );
  };

  const handleSubscription = () => {
    Alert.alert("My Subscription", "Subscription management coming soon!");
  };

  const handleReportProblem = () => {
    Alert.alert(
      "Report a Problem",
      "Please describe the issue and we'll get back to you soon.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send Report",
          onPress: () => {
            Alert.alert("Thank you!", "Your report has been submitted.");
          },
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0f172a" : "#f8fafc" },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
  <TouchableOpacity
    style={styles.backButton}
    onPress={() => router.back()}
  >
    <Image
      source={require("../assets/retour.png")}
      style={styles.logoImage}
      resizeMode="contain"
    />
  </TouchableOpacity>

  <View style={styles.centerContainer}>
    <Text
      style={[
        styles.headerTitle,
        { color: isDark ? "#fff" : "#000" }
      ]}
    >
      Settings
    </Text>
  </View>

  
  <View style={{ width: 40 }} />
</View>


      {/* Content */}
      <ScrollView style={{ flex: 1 }}>
        {/* First Section */}
<View
  style={[
    styles.section,
    { backgroundColor: isDark ? "#1e293b" : "#ffffff" },
  ]}
>
  <SettingItem icon="security" label="Security" onPress={handleSecurity} />
  <SettingItem icon="notifications" label="Notification" onPress={handleNotification} />
  <SettingItem icon="lock" label="Privacy" onPress={handlePrivacy} />
  <SettingItem icon="description" label="Terms & Privacy Policy" onPress={handleTermsAndPolicy} />
</View>

{/* Second Section */}
<View
  style={[
    styles.section,
    { backgroundColor: isDark ? "#1e293b" : "#ffffff" },
  ]}
>
  <SettingItem icon="help" label="Help & Support" onPress={handleHelpAndSupport} />
  <SettingItem icon="credit-card" label="My Subscription" onPress={handleSubscription} />
  <SettingItem icon="flag" label="Report a problem" onPress={handleReportProblem} />

  {/* Leave logout as is (fully functional) */}
  <TouchableOpacity
    style={[
      styles.item,
      { backgroundColor: "transparent" },
    ]}
    onPress={handleLogout}
  >
    <MaterialIcons name="logout" size={28} color="#ef4444" />
    <Text style={[styles.itemText, { color: "#ef4444" }]}>
      Log out
    </Text>
  </TouchableOpacity>
</View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 70,
  },

  centerContainer: {
  flex: 1,
  alignItems: "center",
},

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    borderRadius: 50,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
  },

  /* Sections */
  section: {
    borderRadius: 16,
    paddingVertical: 4,
    marginBottom: 25,
    overflow: "hidden",
  },

  /* Setting item */
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    gap: 16,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },

});
