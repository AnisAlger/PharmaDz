import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { medicineApi } from '../services/api'; // ✅ adjust path if different

const MedicationScreen = () => {
  const [query, setQuery] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter(); // Expo Router hook

  // -----------------------------
  //  FETCH MEDICINES FROM BACKEND
  // -----------------------------
  const loadMedicines = async () => {
    try {
      setLoading(true);
      const response = await medicineApi.getMedicines();
      const list = response.data.data || [];

      setMedicines(list);
      setFiltered(list);
    } catch (error) {
      console.log("Error loading medicines:", error?.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedicines();
  }, []);

  // -----------------------------------------
  // FILTER MEDICINES IN REAL TIME AS YOU TYPE
  // -----------------------------------------
  useEffect(() => {
    const q = query.toLowerCase();

    if (!q) {
      setFiltered(medicines);
      return;
    }

    const filteredList = medicines.filter(item =>
      item.name.toLowerCase().includes(q)
    );

    setFiltered(filteredList);
  }, [query, medicines]);

  // -----------------------------
  // RENDER UI
  // -----------------------------
  return (
    <View style={styles.container}>
      
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search medication..."
          value={query}
          onChangeText={setQuery}
        />
        <View style={styles.iconWrapper}>
          <MaterialIcons name="search" size={24} color="#1E88E5" />
        </View>
      </View>

      {/* Loading spinner */}
      {loading && (
        <ActivityIndicator size="large" color="#1E88E5" />
      )}

      {/* Medicines list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => router.push({
              pathname: '/medicinePharmacies', // new page
              params: { medicineId: item._id } // pass selected medicine id
            })}
          >
            <Text style={styles.suggestionText}>{item.name}</Text>

            {item.dosage && (
              <Text style={{ fontSize: 13, color: "#555" }}>
                {item.dosage}
              </Text>
            )}
          </TouchableOpacity>
        )}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default MedicationScreen;

const ICON_BOX_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  iconWrapper: {
    backgroundColor: '#f0f0f0ff',
    width: ICON_BOX_SIZE,
    height: ICON_BOX_SIZE,
    borderRadius: ICON_BOX_SIZE * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  suggestionItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
});
