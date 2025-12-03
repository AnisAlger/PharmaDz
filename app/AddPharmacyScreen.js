import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

const AddPharmacyScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async () => {
    if (!name || !address || !phone || !latitude || !longitude) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8800/api/pharmacies", {
        name,
        address,
        phone,
        email,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        isActive,
      });

      if (response.status === 201) {
        Alert.alert("Succès", "Pharmacie ajoutée avec succès !");
        // reset form
        setName("");
        setAddress("");
        setPhone("");
        setEmail("");
        setLatitude("");
        setLongitude("");
        setIsActive(true);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Erreur", "Impossible d'ajouter la pharmacie. Vérifiez le serveur et les champs.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ajouter une Pharmacie</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Adresse"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Téléphone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="Email (optionnel)"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Latitude"
        keyboardType="decimal-pad"
        value={latitude}
        onChangeText={setLatitude}
      />

      <TextInput
        style={styles.input}
        placeholder="Longitude"
        keyboardType="decimal-pad"
        value={longitude}
        onChangeText={setLongitude}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isActive ? "#4CAF50" : "#F44336" }]}
        onPress={() => setIsActive(!isActive)}
      >
        <Text style={styles.buttonText}>
          {isActive ? "Active" : "Inactive"} (Cliquer pour changer)
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Ajouter la Pharmacie</Text>
      </TouchableOpacity>

      {/* --- BOUTON POUR ALLER À LA LISTE DES PHARMACIES --- */}
      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: "#FFA500", marginTop: 10 }]}
        onPress={() => navigation.navigate("PharmacyListScreen")}
      >
        <Text style={styles.submitButtonText}>Voir la liste des pharmacies</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddPharmacyScreen;
