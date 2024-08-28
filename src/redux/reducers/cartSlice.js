import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api2 } from '../../api/api';


// ========== ADD to the cart 
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api2.post('cart/add', info);
      console.log('CART API response:', data); // Log API response
      return fulfillWithValue(data);
    } catch (error) {
      console.error('API error:', error.message); // Log any errors
      return rejectWithValue(error.response.data);
    }
  });

// ========== REMOVE item totally from the cart 
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      // Make sure the endpoint and payload match your backend API
      const { data } = await api2.delete(`/cart/removeitem`, { data: { userId, productId } });
      console.log('CART API response:', data); // Log API response
      return data;
    } catch (error) {
      console.error('API error:', error.message); // Log any errors
      return rejectWithValue(error.response.data);
    }
  }
);
// ========== Decrease Quantity the cart 
export const decreaseQuantity = createAsyncThunk(
  'cart/decreaseQuantity',
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      // Make sure the endpoint and payload match your backend API
      const { data } = await api2.delete(`/cart/remove`, { data: { userId, productId, quantity } });
      console.log('CART API response:', data); // Log API response
      return data;
    } catch (error) {
      console.error('API error:', error.message); // Log any errors
      return rejectWithValue(error.response.data);
    }
  }
);


// ========== CLEAR the cart 
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async ({ userId }, { rejectWithValue }) => {
    try {
      // Make sure the endpoint and payload match your backend API
      const { data } = await api2.delete(`cart/clear/${userId}`);
      console.log('CART API response:', data); // Log API response
      return data;
    } catch (error) {
      console.error('API error:', error.message); // Log any errors
      return rejectWithValue(error.response.data);
    }
  }
);
// ========== Fetch the cart 
export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId, { rejectWithValue }) => {
  try {
    const response = await api2.post('/cart/items', { userId });
    console.log('Api Response fetch cart:', response.data)
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
    cartId: '',
    status: 'idle',
    statusTab: false,
  },
  reducers: {
    toggleStatusTab(state) {
      state.statusTab = !state.statusTab
    },

  },
  // Handle Api thunks requests
  extraReducers: (builder) => {
    builder
      // ============= add to cart Reducers 
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.statusTab = true;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
        console.error('addToCart failed:', action.payload);
      })
      // ============= Delete Item Reducers 
      .addCase(removeFromCart.pending, (state, action) => {
        state.items = state.items.filter(item => item.productId !== action.meta.arg.productId);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Use the items from the response data to update the state
        state.items = action.payload.items;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.error('Delete item failed:', action.payload);
      })

      // ============= Fetch cart Reducers 
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items
        state.totalPrice = action.payload.totalPrice
        state.cartId = action.payload.id

        console.log(' fetch action payload', action.payload.items)
        // state.statusTab = true;
      })
      // ============ Clear cart
      .addCase(clearCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = []
        console.log('action payload', action.payload)
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Use the items from the response data to update the state
        state.items = action.payload.items;

      })
  }
});

// Selectors
export const selectAllCart = (state) => state.cart.items;
// Selector to find totalQuantity
export const selectTotalQuantity = (state) => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};


// Exporting actions and reducer
export const { toggleStatusTab } = cartSlice.actions;
export default cartSlice.reducer;
