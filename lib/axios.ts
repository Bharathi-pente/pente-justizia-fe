import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import keycloak from './keycloak';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - inject Keycloak token
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (keycloak.token) {
      // Refresh token if it's about to expire (within 30 seconds)
      try {
        await keycloak.updateToken(30);
      } catch (error) {
        console.error('Failed to refresh token:', error);
        keycloak.logout();
        return Promise.reject(error);
      }

      config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      try {
        // Try to refresh the token
        const refreshed = await keycloak.updateToken(30);
        if (refreshed && error.config) {
          // Retry the original request with new token
          error.config.headers.Authorization = `Bearer ${keycloak.token}`;
          return axiosInstance.request(error.config);
        }
      } catch (refreshError) {
        // Token refresh failed, logout user
        console.error('Token refresh failed, logging out:', refreshError);
        keycloak.logout();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
