import api from './api';

/**
 * Login API call
 * @param {string} username - The user's username
 * @param {string} password - The user's password
 * @returns {Promise} - Axios response with token
 */
export const loginUser = async (username, password) => {
  return await api.post('/auth/login', { username, password });
};

/**
 * Refresh token API call
 * @returns {Promise} - Axios response with new token
 */
export const refreshAuthToken = async () => {
  return await api.post('/auth/refresh', {
    refresh_token: sessionStorage.getItem('refresh_token'), // Refresh token stored in sessionStorage
  });
};
