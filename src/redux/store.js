import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tableReducer from './tableSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    table: tableReducer,
  },
});

export default store;
