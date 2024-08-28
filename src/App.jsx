import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Shipping from "./pages/Shipping";
import Register from "./pages/register";
import Login from "./pages/login";
import ProductDetails from "./pages/ProductDetails";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/reducers/productsSlice";
import { fetchCategories } from "./redux/reducers/categoriesSlice";
import { getOrders } from "./redux/reducers/orderSlice";

import { fetchCart, selectTotalQuantity } from "./redux/reducers/cartSlice";
import ScrollToTop from "./utils/ScrollToTop";
import CartTab from "./components/CartTab";
import ProductOfCategory from "./pages/productOfCategory";
import Wishlist from "./pages/Wishlist";
import Dashboard from "./pages/Dashboard";
import { fetchWishlistItems } from "./redux/reducers/wishListSlice";
import OrderHistory from "./pages/OrderHistory";
import ContactUs from "./components/ContactUs";

function App() {
  const dispatch = useDispatch();
  const quantity = useSelector(selectTotalQuantity);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlistItems(userId));
      dispatch(getOrders({ userId }));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) dispatch(fetchCart(userId));
  }, [dispatch, userId, quantity]);

  return (
    <BrowserRouter>
      <CartTab />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/category/:category" element={<ProductOfCategory />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/:id" element={<ProductDetails />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
