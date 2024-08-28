import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api2 } from '../../api/api';


// Initial state with a more structured format
const initialState = {
  categories: [],
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  try {
    const response = await api2.get('categories/');
    // console.log('API response:', response.data); // Log API response
    return response.data;
  } catch (error) {
    console.error('API error:', error.message); // Log any errors
    return error.message;
  }
});



// Slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // console.log('Action payload:', action.payload); // Log action payload
        state.categories = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
