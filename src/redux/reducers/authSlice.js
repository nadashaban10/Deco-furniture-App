import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api2 } from '../../api/api';
import { jwtDecode } from "jwt-decode";


// =======  User LOGIN
export const logInUser = createAsyncThunk(
  'auth/logInUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api2.post('/users/login', { email, password });

      console.log('API response login', response);
      const { token, user } = response.data;
      const { id, name } = user;
      // localStorage.setItem("userName", user?.name);
      localStorage.setItem('token', token);
      localStorage.setItem('userName', name);
     
      return { token, id, name };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Thunk for user registration
export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, name, isAdmin = true }, { rejectWithValue }) => {
    try {
      const response = await api2.post('/users/register', { email, password, name, isAdmin });

      return response.data; // Return the user data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice to handle authentication state
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    userName: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logOutUser: (state) => {
      state.userId = null;
      state.userName = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token'); // Clear token from localStorage
      localStorage.removeItem('userName');
    },
    loadUserFromToken: (state, action) => {
      const token = localStorage.getItem('token');

      if (token) {
        const decodedToken = jwtDecode(token);
        state.userId = decodedToken.userId;
        state.isAuthenticated = true;
        state.userName = localStorage.getItem('userName');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.id;
        state.userName = action.payload.name;
        state.isAuthenticated = true;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.id;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default authSlice.reducer;
export const { logOutUser, loadUserFromToken } = authSlice.actions;
