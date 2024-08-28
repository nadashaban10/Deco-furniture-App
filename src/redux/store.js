import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./reducers/categoriesSlice";
import productsReducer from "./reducers/productsSlice";
import sortedProductReducer from "./reducers/sortedProductSlice";
import cartReducer from "./reducers/cartSlice";
import searchReducer from './reducers/SearchResults'
import authReducer from "./reducers/authSlice";
import wishlistReducer from "./reducers/wishListSlice";
import orderReducer from "./reducers/orderSlice";
import contactReducer from "./reducers/contactSlice";
//import paginatedProductsReducer from './reducers/paginatioSlice'


export const store = configureStore({
        reducer: {
                categories: categoriesReducer,
                products: productsReducer,
                cart: cartReducer,
                sortedProducts: sortedProductReducer,
                auth: authReducer,
                search: searchReducer,
                wishlist: wishlistReducer,
                order: orderReducer,
                contact: contactReducer
                //paginatedProducts: paginatedProductsReducer

        }
});