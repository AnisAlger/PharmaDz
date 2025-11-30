import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function WelcomeTabIndex() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.title}>Welcome to PharmaDz</Text>
      <Text style={styles.message}>Edit the file</Text>
      <Text style={styles.filepath}>app/(tabs)/index.tsx</Text>
      <Text style={styles.hint}>Save changes to that file and reload the app to see updates here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
  filepath: {
    marginTop: 8,
    fontSize: 14,
    color: '#111827',
    fontFamily: 'monospace',
  },
  hint: {
    marginTop: 16,
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
  },
});
