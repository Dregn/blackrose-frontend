import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../services/api';

// Async Thunks for API Calls
export const fetchRecords = createAsyncThunk('table/fetchRecords', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/record/');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const addRecord = createAsyncThunk('table/addRecord', async (newRecord, { rejectWithValue }) => {
  try {
    const response = await axios.post('/record/', newRecord);
    return newRecord; // Only return the record to avoid adding the success message to the table
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const updateRecord = createAsyncThunk('table/updateRecord', async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    await axios.put(`/record/${id}/`, updatedData);
    return { id, updatedData };
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const deleteRecord = createAsyncThunk('table/deleteRecord', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/record/${id}/`); // Ensure this matches your backend endpoint
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Slice
const tableSlice = createSlice({
  name: 'table',
  initialState: {
    records: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecords.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.records = action.payload;
      })
      .addCase(fetchRecords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default tableSlice.reducer;
