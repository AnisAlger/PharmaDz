import { MaterialIcons } from "@expo/vector-icons"; // Material icons (equivalent to "material-symbols-outlined")
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

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#111827" : "#ffffff" },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push("/settings")}
        >
          <Image
            source={require("../assets/parametres.png")}
            style={styles.headerIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Image
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-bTbhAmBhp_iFXXZKVmZd4zFuYCPY--wapy8_xLVadv9XMO7tHuztLiMZOZhr_r1tA7adj6MdGvgoweGUre1w-XuLoQKmR2RuT64EH8TGlIzqrNdO1NOfvjEJ74NFn6uHv9nWW6kT_rLCpxY0N3JRh8qMSQLkKzcdPWxwGhTS09mgRZMu6aIwuD6MSUKGuzDiufMGPn5rOxjF6aMTia78w7AN3tvE-2Q6zRmHXFpe_rqbQa4MmHZSSBGaTaBcclYxft2e82HxwXw",
          }}
          style={styles.avatar}
        />
      </View>

      {/* Main */}
      <ScrollView contentContainerStyle={styles.main}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/ajouter.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text
            style={[
              styles.logoText,
              { color: isDark ? "#e5e7eb" : "#1E90FF" },
            ]}
          >
            PharmaDz
          </Text>
        </View>

        {/* Buttons grid */}
        <View style={styles.grid}>
          <FeatureButton
            icon="pill"
            label="Search for a medicine"
            isDark={isDark}
          />
          <FeatureButton
            icon="map"
            label="Nearby Pharmacies"
            isDark={isDark}
          />
          <FeatureButton
            icon="upload-file"
            label="Send Prescription"
            isDark={isDark}
          />
          <FeatureButton icon="person" label="Profile" isDark={isDark} />
        </View>
      </ScrollView>
    </View>
  );
};

const FeatureButton = ({ icon, label, isDark }) => (
  <TouchableOpacity
    activeOpacity={0.85}
    style={[
      styles.card,
      { backgroundColor: isDark ? "#2563eb" : "#3b82f6" },
    ]}
  >
    <MaterialIcons name={icon} size={48} color="#fff" />
    <Text style={styles.cardText}>{label}</Text>
  </TouchableOpacity>
);

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    borderRadius: 50,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  main: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 40,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  card: {
    width: "45%",
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 8,
    textAlign: "center",
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});
