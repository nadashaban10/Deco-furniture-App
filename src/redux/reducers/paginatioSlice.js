// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { api2 } from '../../api/api';

// // Fetch paginated products
// export const fetchPaginatedProduct = createAsyncThunk(
//   'products/fetchPaginatedProduct',
//   async ({ page, limit }) => {
//     const response = await api2.post('/products/pagination', { page, limit });
//     console.log('response pagination:', response.data)
//     return response.data;
//   }
// );


// const paginatedProductSlice = createSlice({
//   name: 'paginatedProducts',
//   initialState: {
//     products: [],
//     page: 1,
//     totalPages: 0,
//     totalProducts: 0,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     setPage: (state, action) => {
//       state.page = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPaginatedProduct.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchPaginatedProduct.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.products = action.payload.products;
//         state.totalPages = action.payload.totalPages;
//         state.totalProducts = action.payload.totalProducts;
//       })
//       .addCase(fetchPaginatedProduct.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setPage } = paginatedProductSlice.actions;

// export default paginatedProductSlice.reducer;