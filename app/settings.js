import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import {
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
    onPress={() => router.push("/guest")}
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
          <SettingItem icon="security" label="Security" />
          <SettingItem icon="notifications" label="Notification" />
          <SettingItem icon="lock" label="Privacy" />
          <SettingItem icon="description" label="Terms & Privacy Policy" />
        </View>

        {/* Second Section */}
        <View
          style={[
            styles.section,
            { backgroundColor: isDark ? "#1e293b" : "#ffffff" },
          ]}
        >
          <SettingItem icon="help" label="Help & Support" />
          <SettingItem icon="credit-card" label="My Subscription" />
          <SettingItem icon="flag" label="Report a problem" />

          <TouchableOpacity
            style={[
              styles.item,
              { backgroundColor: "transparent" },
            ]}
            onPress={() => router.push("/login")}
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
