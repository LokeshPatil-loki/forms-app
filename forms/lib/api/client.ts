import axios from "axios";
import { API_URL } from "@/constants/config";
import * as SecureStore from "expo-secure-store";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to headers
apiClient.interceptors.request.use(async (config) => {
  try {
    // Get token directly from SecureStore
    const authData = await SecureStore.getItemAsync("auth-storage");
    if (authData) {
      const parsed = JSON.parse(JSON.parse(authData));
      const token = parsed?.state?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  } catch (error) {
    console.error("Error getting token:", error);
    return config;
  }
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("error occured", error);
    return Promise.reject(error);
  }
);
