import { useState } from 'react';
import { loginUser } from '../services/authService';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (username, password) => {
    setLoading(true);
    setError('');
    try {
      const response = await loginUser(username, password);
      return response;
    } catch (err) {
      // Handle different error types
      if (err.response) {
        // Server responded with a status other than 2xx
        if (err.response.status === 401) {
          setError('Unauthorized: Invalid username or password');
        } else if (err.response.status === 403) {
          setError('Forbidden: You do not have access to this resource');
        } else {
          setError(`Error: ${err.response.data.message || 'Something went wrong'}`);
        }
      } else if (err.request) {
        // Request was made but no response was received
        setError('Network error: Unable to reach the server');
      } else {
        // Something happened in setting up the request
        setError(`Unexpected error: ${err.message}`);
      }
      throw err; // Re-throw the error for further handling
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useAuth;
