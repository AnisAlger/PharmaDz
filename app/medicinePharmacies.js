import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { pharmacyApi } from "../services/api";

export default function MedicinePharmacies() {
  const { medicineId } = useLocalSearchParams(); // get medicineId from router
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!medicineId) return;

    const fetchPharmacies = async () => {
      try {
        setLoading(true);
        const response = await pharmacyApi.getPharmaciesByMedicine(medicineId);
        setPharmacies(response.data.data || []);
      } catch (error) {
        console.error("Error loading pharmacies for this medicine:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, [medicineId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1E88E5" />
      </View>
    );
  }

  if (!pharmacies.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No pharmacies have this medicine in stock.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pharmacies}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.pharmacy.name}</Text>
            <Text style={styles.address}>{item.pharmacy.address}</Text>

            <View style={styles.infoRow}>
              <Text style={styles.stock}>Stock: {item.stock}</Text>
              <Text style={styles.price}>{item.price.toFixed(2)} DA</Text>
            </View>

            <Text style={styles.phone}>Phone: {item.pharmacy.phone}</Text>
            <Text style={styles.email}>Email: {item.pharmacy.email || "N/A"}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#555",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E88E5",
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  stock: {
    fontSize: 14,
    color: "#2E7D32",
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#E65100",
    fontWeight: "bold",
  },
  phone: {
    fontSize: 14,
    color: "#555",
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
});
