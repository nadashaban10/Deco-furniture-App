import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { fetchTheLatest, fetchProducts, fetchDiscountedProducts, fetchByRating } from "../../redux/reducers/productsSlice";
import Rating from "../Rating";

function Products({ title }) {
  const dispatch = useDispatch();
  const { products, discountedProducts, topRatedProducts, latestProducts } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (title === "Discounted Products") {
      dispatch(fetchDiscountedProducts());
    } else if (title === "Top rated") {
      dispatch(fetchByRating());
    } else if (title === "Latest Products") { 
      dispatch(fetchTheLatest());
    }else {
      dispatch(fetchProducts());
    }
  }, [dispatch, title]);

  useEffect(() => {
    if (title === "Discounted Products") {
      setFilteredProducts(discountedProducts || []);
    } else if (title === "Top rated") {
      setFilteredProducts(topRatedProducts || []);
    } else {
      setFilteredProducts(latestProducts || []);
    }
  }, [title, products, discountedProducts, topRatedProducts, latestProducts]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const CustomButton = ({ next, previous }) => {
    return (
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold text-slate-600">{title}</div>
        <div className="flex justify-center items-center gap-3 text-slate-600 mr-10">
          <button
            onClick={previous}
            className="w-[30px] h-[30px] bg-slate-300 flex justify-center items-center "
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={next}
            className="w-[30px] h-[30px] bg-slate-300 hover:bg-slate-500 flex justify-center items-center "
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col-reverse gap-4">
      <Carousel
        autoPlay={false}
        infinite={false}
        arrows={false}
        responsive={responsive}
        renderButtonGroupOutside={true}
        customButtonGroup={<CustomButton />}
      >
        {filteredProducts.map((product, index) => (
          <div key={index} className="flex flex-col gap-4 ">
            {/*Modified the rendering logic to display three products vertically within each slide.*/}
            {filteredProducts.slice(index * 3, index * 3 + 3).map((product) => (
              <div key={product._id} className="flex flex-col justify-start items-start  gap-4">
                <Link to={`/${product.id}`} className="flex justify-start items-start custom-hover-effect">
                  <img className="w-[140px] h-[140px]" src={product.image} alt={product.title} />
                  <div className="hover:text-[#BC9B80] py-3 px-3 flex flex-col justify-start items-start gap-1">
                    <h2 className="hover:text-[#BC9B80] text-slate-600">{product.title}</h2>
                    <span className="text-slate-600 text-lg font-semibold hover:text-[#BC9B80]">
                      ${product.price}
                    </span>
                    {title === "Discounted Products" && (
                     
                      <span className="text-red-600 text-sm hover:text-[#BC9B80]">
                        discount: ${product.discount}
                        
                      </span>
                      
                    )}
                     
                    <div className="flex">
                      <Rating rating={product.rating} />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Products;