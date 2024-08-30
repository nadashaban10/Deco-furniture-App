import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/reducers/categoriesSlice";
import { fetchProductsByCategory } from "../redux/reducers/productsSlice";

const Banner = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    dispatch(fetchProductsByCategory(categoryId));
    navigate(`/category/${categoryId}`);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    mdtablet: {
      breakpoint: { max: 768, min: 600 },
      items: 3,
    },
    smtablet: {
      breakpoint: { max: 600, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="w-[87%] m-auto relative">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-3xl mt-4 text-slate-600 font-semibold relative pb-[45px]">
          <h2>Top Categories</h2>
          <div className="w-[100px] h-[2px] bg-[#BC9B80] mt-4"></div>
        </div>
        <Carousel
          className="z-0"
          autoPlay={true}
          infinite={true}
          arrows={true}
          transitionDuration={500}
          responsive={responsive}
        >
          {categories.map((category, index) => (
            <Link
              className="h-fit block"
              key={category.id}
              to={`/category/${category.id}`}
              state={{
                categoryId: category.id,
                categoryName: category.name,
              }} // Pass state
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="w-full h-full relative custom-hover-effect transform transition-all duration-500 p-3">
                <img
                  src={`http://localhost:3000/images/products/${
                    index + 1
                  }.webp`}
                  alt="products"
                />
                <div className="absolute bottom-10 w-full flex justify-center left-0 mx-auto items-center ">
                  <span className="py-[2px] px-6 bg-[#3330305d] text-white hover:bg-[#BC9B80] transition-all duration-300 ">
                    {category.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;