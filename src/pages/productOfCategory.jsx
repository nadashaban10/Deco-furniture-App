import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { fetchProductsByCategory } from "../redux/reducers/productsSlice";
import FeaturedProducts from "../components/product/FeaturedProducts";
import { FaRegHeart, FaEye } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from "../components/Rating";
import ProductCard from "../components/product/ProductCard";
import HeaderSecond from "../components/HeaderSecond";

function ProductOfCategory() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const location = useLocation(); // Retrieve passed state from location
  const { categoryName } = location.state || {}; // Destructure categoryName from state

  useEffect(() => {
    if (category) {
      dispatch(fetchProductsByCategory(category));
    }
  }, [dispatch, category]);

  const handleProductClick = (product) => {
    console.log("Product clicked:", product);
    navigate(`/product/${product.id}`);
  };

  return (
    <>
      <Header />
      <HeaderSecond />
      <div className="flex flex-col mb-10">
        <div className="w-[85%] mx-auto mt-3flex items-center justify-center">
          <h1 className="text-3xl text-center py-5 mt-5 font-semibold">
            {categoryName ? `Products for ${categoryName}` : "Products"}
          </h1>
        </div>
        <div>
          {products.length > 0 ? (
            <div className="flex flex-wrap mx-auto">
              <div className="w-full">
                <div className="text-center flex justify-center items-center flex-col text-3xl mt-4 text-slate-600 font-semibold relative pb-[45px]"></div>
              </div>
              <div className="w-full flex justify-center flex-wrap gap-5">
                {products.slice(0, 8).map((product, id) => (
                  <ProductCard product={product} key={id} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center py-10">
              No products found in this category.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductOfCategory;
