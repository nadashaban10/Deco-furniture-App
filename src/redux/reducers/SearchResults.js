import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsByCategory } from "./productsSlice";
import { api2 } from "../../api/api";


export const fetchSearch = createAsyncThunk(
    'search/fetchSearch',
    async(query, {rejectWithValue}) => {
        try {
            const response = await api2.post('products/search', {query});
            
            return response.data;
        }
        catch(error) {
            return rejectWithValue(error.response.data)
        }
        });

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        query: '',
        results: [],
        loading: false,
        error: null,
    },
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload
        },
        clearResults: (state) => {
            state.results = [];
          },
    },

    extraReducers: (builder) => {
       builder
      .addCase(fetchSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {setQuery, clearResults} = searchSlice.actions;
export default searchSlice.reducer;