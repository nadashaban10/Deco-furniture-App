import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../redux/reducers/cartSlice";

import { useNavigate } from "react-router-dom";

const CartItemsMain = ({ productId, quantity }) => {
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
          className="flex sm:w-full gap-2 w-5/12 cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={handleNavigateToProduct}
        >
          <div className="flex gap-2 justify-start items-center">
            <img
              className="w-[80px] h-[80px] mr-2"
              src={productId.image}
              alt={productId.title}
            />
            <div className="pr-4 text-lg">
              {/* <h2 className="text-md font-semibold">Product Name </h2> */}
              <span className="text-md font-semibold">{productId.title}</span>
              <div className="text-sm text-[#BC9B80]">{productId.brand}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-7/12 sm:w-full sm:mt-3">
          <div className="pl-4 sm:pl-0">
            <span className="font-semibold text-md">Item price </span>
            {productId.discount ? (
              <span>
                <h2 className="text-lg line-through">{productId.price}$</h2>
                <h2 className="text-lg text-green-600">{discountPrice}$</h2>
              </span>
            ) : (
              <span>
                <h2 className="text-lg">{productId.price}$</h2>
              </span>
            )}
          </div>
          <div className="pl-4 sm:pl-0">
            <span className="font-semibold text-lg">Total price</span>
            <h2 className="text-lg">
              {productId.discount
                ? `${discountPrice * quantity}$`
                : `${(productId.price * quantity).toFixed(2)}$`}
            </h2>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="flex  h-[30px] justify-center items-center text-xl">
              <div
                onClick={handleMinusQuantity}
                className="w-7 h-7 flex justify-center items-center cursor-pointer rounded-full bg-gray-200 hover:bg-[#BC9B80] hover:text-white transition-all duration-300"
              >
                -
              </div>
              <div className="px-9 bg-white">{quantity}</div>
              <div
                onClick={handlePlusQuantity}
                className="w-7 h-7 flex justify-center items-center cursor-pointer rounded-full bg-gray-200 hover:bg-[#BC9B80] hover:text-white transition-all duration-300"
              >
                +
              </div>
            </div>
            <button
              className="h-full text-white bg-[#1F212A] hover:bg-[#BC9B80] transition-all duration-300 px-5 py-[3px]"
              onClick={handleDeleteItem}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItemsMain;
