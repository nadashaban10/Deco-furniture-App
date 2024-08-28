import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../redux/reducers/cartSlice";
import { useNavigate } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";

const CartItem = ({ productId, quantity, discountedPrice }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   const findDetails = productIds.filter(
  //     (productId) => productId.id === productId
  //   )[0];
  //   setProductsDetails(findDetails);
  // }, [productId, productIds]);

  const handleNavigateToProduct = () => {
    navigate(`/${productId.id}`);
  };

  if (!productId) {
    return null; // or a loading spinner if needed
  }

  const handleDeleteItem = () => {
    dispatch(
      removeFromCart({
        userId,
        productId: productId.id,
      })
    );
  };

  return (
    <div className="flex items-center bg-white text-black p-2 my-3 border-b-2 border-slate-700 gap-2">
      <div
        className="flex w-3/12 sm:w-3/12 h-[100px] justify-center items-center overflow-hidden"
        onClick={handleNavigateToProduct}
      >
        <img
          src={productId.image}
          alt={productId.title}
          className="w-full sm:w-full h-full object-cover"
        ></img>
      </div>
      <div className="w-4/12 p-3">
        <h3 className="font-semibold w-[7px] sm:w-[5px]">{productId.title}</h3>
        {productId.discount ? (
          <span className="">
            <span className="line-through mr-2">
              {productId.price.toFixed(2)}$
            </span>
            <span className="text-green-600">
              {discountedPrice.toFixed(2)}$
            </span>
          </span>
        ) : (
          <p>{productId.price} $</p>
        )}
      </div>
      <div className="w-3/12 flex justify-between items-center">
        <div>
        
        <div className="font-semibold mr-1">Qty {quantity}</div>
        </div>
        <button
          className=" text-slate-600 hover:text-[#BC9B80] text-lg transition-all duration-300 "
          onClick={handleDeleteItem}
        >
          <IoCloseCircle />
        </button>
        {/* <button
          className="h-full w-10 font-bold text-2xl hover:text-[#BC9B80] flex justify-center items-center"
          onClick={handleMinusQuantity}
        >
          -
        </button> */}
      </div>
    </div>
  );
};

export default CartItem;
