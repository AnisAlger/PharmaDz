import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { pharmacyApi } from "../services/api"; // adjust path

export default function NearbyPharmacies() {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Map of static images
  const images = {
    pharmacy1: require("../assets/pharmacy1.jpg"),
    pharmacy2: require("../assets/pharmacy2.jpeg"),
    pharmacy3: require("../assets/pharmacy3.jpeg"),
    pharmacy4: require("../assets/pharmacy4.jpeg"),
    pharmacy5: require("../assets/pharmacy5.jpeg"),
    pharmacy6: require("../assets/pharmacy6.jpeg"),
  };

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await pharmacyApi.getPharmacies();
        // Add image property for each pharmacy
        const pharmaciesWithImages = response.data.data.map((pharmacy, index) => ({
          ...pharmacy,
          image: images[`pharmacy${index + 1}`] || images.pharmacy1,
        }));
        setPharmacies(pharmaciesWithImages);
      } catch (error) {
        console.error("Error loading pharmacies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1E88E5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pharmacies}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/pharmacyDetails",
                params: { pharmacyId: item._id },
              })
            }
          >
            <Image source={item.image} style={styles.image} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.address}>{item.address}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 60, paddingHorizontal: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    alignItems: "center",
  },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  name: { fontSize: 16, fontWeight: "bold", color: "#333" },
  address: { fontSize: 14, color: "#666", marginTop: 2 },
});
