import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { pharmacyApi } from "../services/api";

export default function PharmacyDetails() {
  const { pharmacyId } = useLocalSearchParams();
  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pharmacyId) return;

    const fetchPharmacy = async () => {
      try {
        const response = await pharmacyApi.getPharmacy(pharmacyId);
        setPharmacy(response.data);
      } catch (error) {
        console.error("Error loading pharmacy details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacy();
  }, [pharmacyId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1E88E5" />
      </View>
    );
  }

  if (!pharmacy) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundText}>Pharmacy not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={styles.card}>
        <Text style={styles.name}>{pharmacy.name}</Text>

        <Text style={styles.label}>Address</Text>
        <Text style={styles.text}>{pharmacy.address}</Text>

        <Text style={styles.label}>Phone</Text>
        <Text style={styles.text}>{pharmacy.phone}</Text>

        {pharmacy.email && (
          <>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.text}>{pharmacy.email}</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f7",
    padding: 20,
    paddingTop: 60,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 16,
    color: "#888",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E88E5",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginTop: 12,
    marginBottom: 4,
    fontWeight: "600",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});
