import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearCart, toggleStatusTab } from "../redux/reducers/cartSlice";
import CartItem from "./CartItem";

const CartTab = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statusTab = useSelector((state) => state.cart.statusTab);
  const { userId } = useSelector((state) => state.auth);

  const handleClearCart = () => {
    if (userId) {
      dispatch(clearCart({ userId }));
    } else {
      console.error("User ID is not defined");
    }
  };

  const handleNavigateToCart = () => {
    navigate(`/cart`);
    dispatch(toggleStatusTab());
  };

  const handleClose = () => {
    dispatch(toggleStatusTab());
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (statusTab) {
        dispatch(toggleStatusTab());
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [statusTab, dispatch]);

  return (
    statusTab && (
      <div
        className={`fixed z-50 bg-gray-700/50 top-0 right-0 shadow-2xl w-[500px] lg:w-[400px] md:w-[300px] h-full grid grid-rows-[60px_1fr_60px] py-10 px-3 transform transition-all duration-700 ease-in-out ${
          statusTab ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="p-5 text-white text-3xl sm:text-2xl text-center">Shopping Cart</h2>
          <button
            className="h-full text-white bg-transparent border-2 hover:bg-[#BC9B80] transition-all duration-300 px-6 py-2 sm:w-[120px]"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>
        <div className="m-5 overflow-y-auto custom-scrollbar p-4 ">
          {cart.map((item, index) => (
            <CartItem
              key={index}
              productId={item.productId}
              quantity={item.quantity}
              discountedPrice={item.discountedPrice}
            />
          ))}
        </div>
        <div className="grid grid-cols-2">
          <button className="bg-black text-white text-center" onClick={handleClose}>
            Close
          </button>
          <button
            className="bg-[#BC9B80] text-white text-center"
            onClick={handleNavigateToCart}
          >
            Checkout
          </button>
        </div>
      </div>
    )
  );
};

export default CartTab;