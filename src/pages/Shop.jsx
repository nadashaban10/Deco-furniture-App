import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Range } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/reducers/categoriesSlice";
import {
  fetchProducts,
  fetchProductsByCategory,
  fetchBySliderPrice,
} from "../redux/reducers/productsSlice";
import {
  sortProductsByPriceAsc,
  sortProductsByPriceDesc,
  fetchSortedProducts,
} from "../redux/reducers/sortedProductSlice";
import StarRating from "../utils/StarRating";
import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import ShopProducts from "../components/product/ShopProducts";
import Pagination from "../components/Pagination";
import Products from "../components/product/Products";
import CartTab from "../components/CartTab";

const Shop = () => {
  const [filter, setFilter] = useState(true);
  const [rating, setRating] = useState(0);
  const [styleView, setStyleView] = useState("grid");
  const dispatch = useDispatch();
  const [isSorted, setIsSorted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceValues, setPriceValues] = useState([1, 3000]);

  const { categories } = useSelector((state) => state.categories);
  const [productLength, setProductLength] = useState(0);
  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    setProductLength(products.length);
  }, [products]);

  useEffect(() => {
    // Fetch products based on selected category or all products if no category is selected
    if (selectedCategory === null) {
      dispatch(fetchProducts()); // Fetch all products
    } else {
      dispatch(fetchProductsByCategory(selectedCategory));
    }
  }, [dispatch, selectedCategory]);

  useEffect(() => {
    dispatch(fetchSortedProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchBySliderPrice({ minPrice: priceValues[0], maxPrice: priceValues[1] })
    );
  }, [priceValues, dispatch]);

  const handleCategoryClick = (category) => {
    dispatch(fetchProductsByCategory(category));
    setSelectedCategory(category);
  };
  const handleShowAllClick = () => {
    setSelectedCategory(null);
    // onCategorySelect(null); // Notify parent component to show all categories
  };

  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "ascending") {
      dispatch(sortProductsByPriceAsc());
      setIsSorted(true);
    } else if (selectedValue === "descending") {
      dispatch(sortProductsByPriceDesc());
      setIsSorted(true);
    } else {
      setIsSorted(false);
    }
  };

  return (
    <div>
      <Header />
      <section
        className="h-[400px] md-lg:h-[300px] bg-cover mt-5 bg-no-repeat bg-center relative w-full "
        style={{
          backgroundImage: "url(https://e-commerce-project-deploy.vercel.app/images/banner/3.jpg)",
        }}
      >
        <div className="custom-black-overlay">
          <div className="h-full mx-auto w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%]">
            <div className="flex flex-col justify-center gap-2 items-center h-full text-white">
              <h2 className="font-semibold text-3xl">Shop</h2>
              <div className="flex justify-center items-center gap-4 text-xl w-full">
                <Link to="/"> Home</Link>
                <span>
                  <MdKeyboardArrowRight />
                </span>
                <span>Shop</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="h-full mx-auto w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%]">
          <div className={`md:block hidden ${!filter ? "mb-6" : "mb-0"}`}>
            <button
              className="text-center w-full py-3 px-3 bg-[#BC9B80] text-white"
              onClick={() => setFilter(!filter)}
            >
              Filter Product
            </button>
          </div>

          <div className="w-full flex flex-wrap">
            <div
              className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 ${
                filter
                  ? "md:h-0 md:overflow-hidden md:mb-6"
                  : "md:h-auto md:overflow-auto md:mb-0"
              }`}
            >
              <h2 className="text-3xl text-slate-600 mb-3 font-semibold">
                Category
              </h2>
              <div className="py-2 mb-5">
                <div className="flex justify-start items-center gap-2 py-1 px-4">
                  <input
                    type="radio"
                    id="showAll"
                    className="w-5 h-5 accent-slate-600"
                    name="category"
                    checked={selectedCategory === null}
                    onChange={handleShowAllClick}
                  />
                  <label className="text-slate-500" htmlFor="showAll">
                    All Categories
                  </label>
                </div>
                {categories.map((category) => (
                  <div
                    className="flex justify-start items-center gap-2 py-1 px-4"
                    key={category.id}
                  >
                    <input
                      type="radio"
                      id={category.id}
                      name="category"
                      className="w-5 h-5 accent-slate-600"
                      checked={selectedCategory === category.id}
                      onChange={() => handleCategoryClick(category.id)}
                    />
                    <label className="text-slate-500" htmlFor={category.id}>
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>

              <div className="border-t-2 py-8 flex flex-col gap-5 mb-5">
                <h2 className="text-3xl text-slate-600 mb-3 font-semibold">
                  Price
                </h2>
                <Range
                  step={10}
                  min={1}
                  max={3000}
                  values={priceValues}
                  onChange={(values) => setPriceValues(values)}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      className="w-[80%] h-[5px] bg-slate-200 rounded-full cursor-pointer"
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      className="w-[20px] h-[20px] rounded-full bg-white border-[#BC9B80] border-2"
                      {...props}
                    />
                  )}
                />
                <span className="text-slate-600">
                  Price Range:{" "}
                  <span className="text-[#BC9B80]">
                    ${Math.floor(priceValues[0])} - $
                    {Math.floor(priceValues[1])}
                  </span>
                </span>
              </div>

              <div className="flex flex-col gap-4 py-5 border-t-2">
                <h2 className="text-3xl text-slate-600 mb-1 font-semibold">
                  Rating
                </h2>
                <div className="flex flex-col gap-3">
                  <div>
                    <StarRating
                      max={5}
                      color="#BC9B80"
                      size="35"
                      onSetRating={(rating) => setRating(rating)}
                    />
                  </div>
                </div>
              </div>

              <div className="py-5 flex flex-col gap-4 md:hidden">
                <Products title="Latest Products" />
              </div>
            </div>

            <div className="w-9/12 md-lg:w-8/12 md:w-full">
              <div className="pl-8 md:pl-0">
                <div className="py-4 bg-white mb-10 px-5 rounded-sm flex justify-between border items-start">
                  <h2 className="text-slate-600 font-medium">
                    products: {productLength}
                  </h2>
                  <div className="flex justify-center items-center gap-3">
                    <select
                      onChange={handleSortChange}
                      className="p-1 border outline-0 text-slate-600"
                    >
                      <option value=""> Sort By</option>
                      <option value="ascending"> Low to High Price </option>
                      <option value="descending"> High to Low price</option>
                    </select>
                  </div>
                </div>

                <div className="pb-8">
                  <ShopProducts style={styleView} isSorted={isSorted} />
                </div>

                <div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shop;
