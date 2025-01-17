import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: sessionStorage.getItem('token') || null,
  isAuthenticated: !!sessionStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      sessionStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('refresh_token', action.payload.refresh_token); // Save token to sessionStorage
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem('token'); // Remove token from sessionStorage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
