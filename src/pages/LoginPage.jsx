import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';
import useAuth from '../hooks/useAuth';
import { Box, TextField, Button, Typography, Alert, CircularProgress, useTheme } from '@mui/material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login: loginUser, loading, error } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme(); // Access the theme

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      dispatch(login({ token: response.data.access_token,refresh_token: response.data.refresh_token }));
      navigate('/dashboard');
    } catch {
      // Error already handled in useAuth
    }
  };

  return (
    <Box
      className="flex items-center justify-center min-h-screen"
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: theme.palette.text.primary,
            textAlign: 'center',
            marginBottom: 2,
          }}
        >
          Login
        </Typography>
        {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
        <TextField
          fullWidth
          label="Username"
          variant="filled"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            style: {
              backgroundColor: theme.palette.inputBackground,
              color: theme.palette.inputText,
            },
          }}
          InputLabelProps={{
            style: { color: theme.palette.inputPlaceholder },
          }}
        />
        <TextField
          fullWidth
          label="Password"
          variant="filled"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            style: {
              backgroundColor: theme.palette.inputBackground,
              color: theme.palette.inputText,
            },
          }}
          InputLabelProps={{
            style: { color: theme.palette.inputPlaceholder },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            marginTop: 2,
            height: 45,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'LOGIN'}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
