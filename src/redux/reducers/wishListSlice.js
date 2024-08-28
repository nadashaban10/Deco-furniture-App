import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api2 } from "../../api/api";

export const addProductToWishList = createAsyncThunk(
  'wishlist/addProductToWishList',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await api2.post('/wishlist/add', { userId, productId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeProductFromWishList = createAsyncThunk(
  'wishlist/removeProductFromWishList',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await api2.delete('/wishlist/remove', { data: { userId, productId } });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearWishlist = createAsyncThunk(
  'wishlist/clearWishlist',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api2.delete(`/wishlist/clear/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchWishlistItems = createAsyncThunk(
  'wishlist/fetchWishlistItems',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api2.post('/wishlist/items', { userId });
      const dataaa = response.data;
      console.log('the data', dataaa)
      return dataaa
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addProductToWishList.fulfilled, (state, action) => {
        console.log("addProductToWishList fulfilled:", action.payload);
        state.items = action.payload.products;
      })
      .addCase(removeProductFromWishList.fulfilled, (state, action) => {
        console.log("removeProductFromWishList fulfilled:", action.payload);
        state.items = action.payload.products;
      })
      .addCase(clearWishlist.fulfilled, (state) => {
        console.log("clearWishlist fulfilled");
        state.items = [];
      })
      .addCase(fetchWishlistItems.fulfilled, (state, action) => {
        console.log("fetchWishlistItems fulfilled:", action.payload);
        state.items = action.payload.products;
      });
  }
});

export default wishlistSlice.reducer;