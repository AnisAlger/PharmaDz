import axios from "axios";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_URL = "http://localhost:8800/api/pharmacies";

const PharmacyListScreen = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isActive, setIsActive] = useState(true);

  // --- FETCH PHARMACIES ---
  const fetchPharmacies = async () => {
    try {
      const res = await axios.get(API_URL);
      setPharmacies(res.data.data || []);
      setLoading(false);
    } catch (error) {
      console.log("Fetch error:", error);
      Alert.alert("Erreur", "Impossible de charger les pharmacies.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPharmacies();
  }, []);

  // --- OPEN MODAL WITH PHARMACY DATA ---
  const openModal = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setName(pharmacy.name);
    setAddress(pharmacy.address);
    setPhone(pharmacy.phone);
    setEmail(pharmacy.email || "");
    setLatitude(pharmacy.latitude ? pharmacy.latitude.toString() : "");
    setLongitude(pharmacy.longitude ? pharmacy.longitude.toString() : "");
    setIsActive(pharmacy.isActive);
    setModalVisible(true);
  };

  // --- UPDATE PHARMACY ---
  const updatePharmacy = async () => {
    if (!name || !address || !phone || !latitude || !longitude) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      await axios.put(`${API_URL}/${selectedPharmacy._id}`, {
        name,
        address,
        phone,
        email,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        isActive,
      });

      // Update local state
      setPharmacies((prev) =>
        prev.map((ph) =>
          ph._id === selectedPharmacy._id
            ? { ...ph, name, address, phone, email, latitude: parseFloat(latitude), longitude: parseFloat(longitude), isActive }
            : ph
        )
      );

      setModalVisible(false);
      setSelectedPharmacy(null);
      Alert.alert("Succès", "Pharmacie mise à jour !");
    } catch (error) {
      console.log("Update error:", error);
      Alert.alert("Erreur", "Impossible de mettre à jour la pharmacie.");
    }
  };

  // --- DELETE PHARMACY ---
  const deletePharmacy = (id) => {
    console.log("Attempting to delete pharmacy:", id);
    
    Alert.alert(
      "Confirmer la suppression", 
      "Voulez-vous vraiment supprimer cette pharmacie ? Cette action est irréversible.",
      [
        { 
          text: "Annuler", 
          style: "cancel",
          onPress: () => console.log("Delete cancelled")
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              console.log("Sending DELETE request to:", `${API_URL}/${id}`);
              
              // Essayer d'abord la route normale
              const response = await axios.delete(`${API_URL}/${id}`);
              console.log("Delete response:", response.data);
              
              // Mettre à jour l'état local
              setPharmacies((prev) => {
                const newList = prev.filter((ph) => ph._id !== id);
                console.log(`Pharmacy ${id} removed. New list length:`, newList.length);
                return newList;
              });
              
              Alert.alert("Succès", "Pharmacie supprimée avec succès");
            } catch (error) {
              console.log("DELETE error details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                url: error.config?.url
              });
              
              // Si la route normale échoue, essayer la route debug
              if (error.response?.status === 400 || error.response?.status === 404) {
                try {
                  console.log("Trying debug route...");
                  const debugResponse = await axios.delete(`${API_URL}/debug/${id}`);
                  console.log("Debug delete response:", debugResponse.data);
                  
                  setPharmacies((prev) => prev.filter((ph) => ph._id !== id));
                  Alert.alert("Succès", "Pharmacie supprimée (via debug route)");
                } catch (debugError) {
                  console.log("Debug delete error:", debugError.response?.data);
                  Alert.alert(
                    "Erreur de validation", 
                    debugError.response?.data?.errors?.[0]?.message || 
                    "Impossible de supprimer la pharmacie. Erreur de validation."
                  );
                }
              } else {
                Alert.alert(
                  "Erreur", 
                  error.response?.data?.error || 
                  error.response?.data?.message || 
                  "Impossible de supprimer la pharmacie."
                );
              }
            }
          },
        },
      ]
    );
  };

  // --- RENDER ITEM ---
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{item.address}</Text>
        <Text>Téléphone: {item.phone}</Text>
        <Text>Email: {item.email || "N/A"}</Text>
        <Text>Status: {item.isActive ? "Active" : "Inactive"}</Text>
      </View>

      <View style={styles.actions}>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>{item.isActive ? "Active" : "Inactive"}</Text>
          <Switch
            value={item.isActive}
            onValueChange={async () => {
              try {
                await axios.put(`${API_URL}/${item._id}`, { isActive: !item.isActive });
                setPharmacies((prev) =>
                  prev.map((ph) => (ph._id === item._id ? { ...ph, isActive: !item.isActive } : ph))
                );
              } catch (error) {
                console.log("Toggle error:", error);
                Alert.alert("Erreur", "Impossible de changer le statut.");
              }
            }}
          />
        </View>

        <TouchableOpacity style={styles.editButton} onPress={() => openModal(item)}>
          <Text style={styles.buttonText}>Modifier</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={() => deletePharmacy(item._id)}>
          <Text style={styles.buttonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Pharmacies ({pharmacies.length})</Text>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Chargement des pharmacies...</Text>
        </View>
      ) : pharmacies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>Aucune pharmacie disponible</Text>
        </View>
      ) : (
        <FlatList
          data={pharmacies}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          refreshing={loading}
          onRefresh={fetchPharmacies}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* --- MODAL --- */}
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalTitle}>Modifier la Pharmacie</Text>

            <TextInput style={styles.input} placeholder="Nom" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Adresse" value={address} onChangeText={setAddress} />
            <TextInput style={styles.input} placeholder="Téléphone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Latitude" value={latitude} onChangeText={setLatitude} keyboardType="decimal-pad" />
            <TextInput style={styles.input} placeholder="Longitude" value={longitude} onChangeText={setLongitude} keyboardType="decimal-pad" />

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>Active:</Text>
              <Switch value={isActive} onValueChange={setIsActive} />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={updatePharmacy}>
              <Text style={styles.submitButtonText}>Mettre à jour</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.submitButton, styles.cancelButton]}
              onPress={() => {
                setModalVisible(false);
                setSelectedPharmacy(null);
              }}
            >
              <Text style={styles.submitButtonText}>Annuler</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f5f5f5" 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20, 
    textAlign: "center",
    color: "#333"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  listContent: {
    paddingBottom: 20
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  name: { 
    fontWeight: "bold", 
    fontSize: 16, 
    marginBottom: 4,
    color: "#2196F3"
  },
  actions: { 
    justifyContent: "space-between", 
    alignItems: "flex-end",
    marginLeft: 10
  },
  switchContainer: {
    alignItems: "center",
    marginBottom: 10
  },
  switchLabel: {
    fontSize: 12,
    marginBottom: 4,
    color: "#666"
  },
  editButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 6,
    marginVertical: 4,
    minWidth: 80,
    alignItems: "center"
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 6,
    marginVertical: 4,
    minWidth: 80,
    alignItems: "center"
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold",
    fontSize: 12
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  modalContainer: { 
    padding: 20, 
    backgroundColor: "#fff", 
    flexGrow: 1 
  },
  modalTitle: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 20, 
    textAlign: "center",
    color: "#333"
  },
  input: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 12,
    fontSize: 16
  },
  switchRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between",
    marginVertical: 15,
    paddingHorizontal: 5
  },
  switchText: {
    fontSize: 16,
    color: "#333"
  },
  submitButton: { 
    backgroundColor: "#4CAF50", 
    padding: 15, 
    borderRadius: 8, 
    alignItems: "center",
    marginTop: 10
  },
  cancelButton: {
    backgroundColor: "#999"
  },
  submitButtonText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
  }
});

export default PharmacyListScreen;