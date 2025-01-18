import axios from 'axios';
import store from '../redux/store';
import { logout, login } from '../redux/authSlice';
import { refreshAuthToken } from './authService'; // Function to refresh token

const api = axios.create({
  baseURL: 'https://blackrose-assignment.onrender.com', // Replace with your backend's base URL
  timeout: 5000,
});

// Request interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to unauthorized access (401)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loop

      try {
        const { data } = await refreshAuthToken(); // Call to refresh token API
        const newToken = data.token;

        // Update token in Redux store and sessionStorage
        store.dispatch(login({ token: newToken }));
        sessionStorage.setItem('token', newToken);

        // Update the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);

        // Logout the user if refresh token fails
        store.dispatch(logout());
        sessionStorage.removeItem('token');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
