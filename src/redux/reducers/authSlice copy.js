import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api2 } from '../../api/api';
import { jwtDecode } from "jwt-decode";



// ===== get token

export const token = localStorage.getItem('token');

// ====== decode token and get UserId
const decodeToken = (token) => {
  try {
    if (token) {
      const userInfo = jwtDecode(token);
      return userInfo.userId;
    }
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
  return null;
};


// ======= GET USER details
// export const getUser = createAsyncThunk(
//   'auth/getUser',
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await api2.get('/users/profile', userId);
//       console.log('response user', response)
//       const userInfo = response.data;
//       return userInfo;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const getUser = createAsyncThunk('auth/getUser', async () => {
  const response = await api2.get('/users/profile');
  console.log('response user', response)
  const userInfo = response.data;
  return userInfo;
});


// =======  User LOGIN
export const logInUser = createAsyncThunk(
  'auth/logInUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api2.post('/users/login', { email, password });

      console.log('api response login', response)
      const { token } = response.data;
      // localStorage.setItem("userName", user?.name);
      localStorage.setItem('token', token);

      return { token };

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
    userId: token ? decodeToken(token) : null,
    userInfo: null,
    isAuthenticated: !!token,
    loading: false,
    error: null,
  },
  reducers: {
    logOutUser: (state) => {
      state.userId = null;
      state.userInfo = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token'); // Clear token from localStorage
    },
    loadUserFromToken: (state, action) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.isAuthenticated = true;
        state.userId = decodeToken(token);
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
        state.userId = decodeToken(token);
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
        state.userId = decodeToken(token);
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Action payload:', action.payload); // Log action payload
        state.userInfo = action.payload; // Store fetched user details
      });
  },
});

export default authSlice.reducer;
export const { logOutUser, loadUserFromToken } = authSlice.actions;
