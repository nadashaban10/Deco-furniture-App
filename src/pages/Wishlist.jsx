import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/product/ProductCard";
import {
  fetchWishlistItems,
  removeProductFromWishList,
} from "../redux/reducers/wishListSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Wishlist() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.wishlist);
  console.log("items in wishlist", items);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    dispatch(fetchWishlistItems(userId));
  }, [dispatch, userId, items]);

  const handleRemove = (productId) => {
    dispatch(removeProductFromWishList({ userId, productId }));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className="flex flex-wrap mx-[100px] my-[100px]">
        <div className="w-full">
          <div className="text-center flex justify-center items-center flex-col text-3xl mt-4 text-slate-600 font-semibold relative pb-[45px]">
            <h2>Products in wish list</h2>
            <div className="w-[200px] h-[2px] bg-[#BC9B80] mt-4"></div>
          </div>
        </div>
        {items.length > 0 ? (
          items.map((product) => (
            <div key={product.id} className="m-2">
              <ProductCard product={product.productId}   />
              
            </div>
          ))
        ) : (
          <div>No items in wishlist</div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Wishlist;
