import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';

// Platform-aware base URL. For Expo Go on an Android phone use your PC LAN IP.
// Change the android/default value if your machine IP changes.
const API_BASE_URL = Platform.select({
  ios: 'http://localhost:8800', // iOS simulator
  android: 'http://192.168.137.1:8800', // Android device (Expo Go) — update to your PC IP if different
  default: 'http://192.168.1.8:8800',
}) as string;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Attach token from AsyncStorage (if any) to requests
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      // assign header property to avoid strict Axios header typing issues
      (config.headers as any) = {
        ...(config.headers || {}),
        Authorization: `Bearer ${token}`,
      };
    }
  } catch (e) {
    // ignore
  }
  return config;
}, (error) => Promise.reject(error));

// Export functions for each endpoint
export const userApi = {
  // User management endpoints
  getUsers: () => api.get('/api/users'),
  getUser: (userId: string) => api.get(`/api/users/${userId}`),
  createUser: (data: any) => api.post('/api/users', data),
  updateUser: (userId: string, data: any) => api.put(`/api/users/${userId}`, data),
  deleteUser: (userId: string) => api.delete(`/api/users/${userId}`),

  // Authentication endpoints
  login: (data: { email: string; password: string }) => api.post('/api/auth/login', data),
};
export const medicineApi = {
  getMedicines: () => api.get('/api/medicines'),
  getMedicine: (id: string) => api.get(`/api/medicines/${id}`),
  createMedicine: (data: any) => api.post('/api/medicines', data),
  updateMedicine: (id: string, data: any) => api.put(`/api/medicines/${id}`, data),
  deleteMedicine: (id: string) => api.delete(`/api/medicines/${id}`),
};

export const pharmacyApi = {
  // Get all pharmacies
  getPharmacies: () => api.get('/api/pharmacies'),

  // Get single pharmacy by id
  getPharmacy: (id: string) => api.get(`/api/pharmacies/${id}`),

  // Get pharmacies that have a specific medicine
  getPharmaciesByMedicine: (medicineId: string) =>
    api.get(`/api/medicine/${medicineId}/pharmacies`),

  // Create new pharmacy (or multiple)
  createPharmacy: (data: any | any[]) => api.post('/api/pharmacies', data),

  // Update a pharmacy
  updatePharmacy: (id: string, data: any) => api.put(`/api/pharmacies/${id}`, data),

  // Delete a pharmacy
  deletePharmacy: (id: string) => api.delete(`/api/pharmacies/${id}`),
};




export default api;