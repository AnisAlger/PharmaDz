import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MedicationScreen = () => {
  const [query, setQuery] = useState('');
  const suggestions = [
    'Doliprane',
    'Doliprane 1000mg',
    'Doliprane 500mg',
    'Doliprane Enfant',
    'Doliprane Sachet 500mg',
    'Doliprane Suppo',
  ];

  // ✅ Only show suggestions if the query starts with "dol"
  const filtered = suggestions.filter(item =>
    query.toLowerCase().startsWith('dol') &&
    item.toLowerCase().startsWith(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search bar with icon inside white square */}
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

      {/* Suggestions list */}
      <FlatList
        data={filtered}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.suggestionItem}>
            <Text style={styles.suggestionText}>{item}</Text>
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
    backgroundColor: '#f0f0f0ff',              // ✅ white square background
    width: ICON_BOX_SIZE,
    height: ICON_BOX_SIZE,
    borderRadius: ICON_BOX_SIZE * 0.2,    // ✅ ~20% rounded corners
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