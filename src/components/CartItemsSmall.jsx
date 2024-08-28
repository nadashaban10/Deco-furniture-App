import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../redux/reducers/cartSlice";

import { useNavigate } from "react-router-dom";

const CartItemsSmall = ({ productId, quantity }) => {
  const [discountPrice, setDiscountPrice] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);

  // console.log("product entered:", productId);
  // console.log("userId:", userId);

  const handleNavigateToProduct = () => {
    navigate(`/${productId.id}`);
  };

  useEffect(() => {
    if (productId.discount) {
      setDiscountPrice(
        ((productId.price * productId.discount) / 100).toFixed(2)
      );
    }
  }, [productId.discount, productId.price]);

  // ============ Handle Buttons
  const handlePlusQuantity = () => {
    dispatch(
      addToCart({
        userId,
        productId: productId.id,
        quantity: 1,
      })
    );
  };

  const handleMinusQuantity = () => {
    dispatch(
      decreaseQuantity({
        userId,
        productId: productId.id,
        quantity,
      })
    );
  };
  const handleDeleteItem = () => {
    dispatch(
      removeFromCart({
        userId,
        productId: productId.id,
      })
    );
  };

  if (!productId) {
    return null; // or a loading spinner if needed
  }
  return (
    <>
      <div className="w-full text-slate-600 text-lg flex flex-wrap">
        <div
          className="flex sm:w-full w-6/12 cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={handleNavigateToProduct}
        >
          <div className="flex gap-2 justify-start items-center">
            {/* <img
              className="w-[80px] h-[80px] mr-2"
              src={productId.image}
              alt={productId.title}
            /> */}
            <div className="pr-4 text-lg">
              {/* <h2 className="text-md font-semibold">Product Name </h2> */}
              <span className="text-md font-semibold">{productId.title}</span>
              <div className="text-sm text-[#BC9B80]">{productId.brand}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-6/12 sm:w-full sm:mt-3">
          <div className="pl-4 text-center sm:pl-0">
            <span className="font-semibold text-lg">Total price</span>
            <h2 className="text-lg">
              {productId.discount
                ? `${discountPrice * quantity}$`
                : `${(productId.price * quantity).toFixed(2)}$`}
            </h2>
          </div>
          <div className="pl-4 text-center sm:pl-0">
            <span className="font-semibold text-lg">Quantity</span>
            <h2 className="text-lg">{quantity}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItemsSmall;
