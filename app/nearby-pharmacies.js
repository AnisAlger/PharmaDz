import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const pharmacies = [
  {
    name: "Pharmacie cherarm",
    distance: "1.2 km",
    status: "Available",
    image: require("../assets/pharmacy1.jpg"),
  },
  {
    name: "Pharmacie Spipha",
    distance: "2.8 km",
    status: "Available",
    image: require("../assets/pharmacy2.jpeg"),
  },
  {
    name: "Pharmacie Des Vergers",
    distance: "3.9 km",
    status: "Available",
    image: require("../assets/pharmacy3.jpeg"),
  },
  {
    name: "Pharmacie Brise Marine",
    distance: "4.4 km",
    status: "Available",
    image: require("../assets/pharmacy4.jpeg"),
  },
  {
    name: "Pharmacie Gammarth",
    distance: "6.7 km",
    status: "Available",
    image: require("../assets/pharmacy5.jpeg"),
  },
  {
    name: "Pharmacie Lounis",
    distance: "7.5 km",
    status: "Unavailable",
    image: require("../assets/pharmacy6.jpeg"),
  },
];

export default function NearbyPharmaciesScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={pharmacies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.thumbnail} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.distance}>{item.distance}</Text>
              <Text
                style={[
                  styles.status,
                  { color: item.status === "Available" ? "#1E88E5" : "#999" },
                ]}
              >
                {item.status}
              </Text>
            </View>
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
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  distance: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: "500",
  },
});
