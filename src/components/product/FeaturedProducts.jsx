import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from "../Rating";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../../redux/reducers/productsSlice";
import { addToCart } from "../../redux/reducers/cartSlice";
import ProductCard from "./ProductCard";

const FeaturedProducts = ({ categoryId, id='featured' } ) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsByCategory(categoryId));
  }, [dispatch, categoryId]);

  const handleClickAddToCart = (e, product) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        productId: product.id,
        quantity: 1,
      })
    );
  };

  return (
    <div className="flex flex-wrap mx-auto">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-3xl mt-4 text-slate-600 font-semibold relative pb-[45px]">
          <h2>Featured Products</h2>
          <div className="w-[100px] h-[2px] bg-[#BC9B80] mt-4"></div>
        </div>
      </div>

      <div className="w-full flex justify-center flex-wrap  gap-5">
        {products.slice(0, 5).map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};
export default FeaturedProducts;