import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import Footer from "../components/Footer";
import AddToCartButton from "../utils/AddToCartButton.jsx";

const ProductDetails = () => {
  const [discountPrice, setDiscountPrice] = useState(0);
  const [productDetails, setProductsDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const { userId } = useSelector((state) => state.auth);

  const categoryDetails = categories.find(
    (category) => productDetails?.category === category.id
  );
  const categoryName = categoryDetails
    ? categoryDetails.name
    : "Unknown Category";

  // Calculate the discounted price
  useEffect(() => {
    if (productDetails?.discount) {
      const calculatedDiscountPrice = (
        productDetails.price -
        (productDetails.price * productDetails.discount) / 100
      ).toFixed(2);
      setDiscountPrice(calculatedDiscountPrice);
    }
  }, [productDetails]);

  const { id } = useParams();

  // ======= Debugging codes
  console.log("product id: ", id);
  console.log("product Details: ", productDetails);

  // ======== Get Product details

  useEffect(() => {
    const findDetails = products.find((product) => product.id === id);
    if (findDetails) {
      setProductsDetails(findDetails);
    } else {
      setProductsDetails(null);
    }
  }, [id, products]);

  const handleMinusQuantity = () => {
    setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
  };
  const handlePlusQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div>
      <Header />
      {productDetails ? (
        <div className="mx-auto w-[85%] md-lg:h-fit md-lg:mb-5 md-lg:pb-10 h-screen mt-[100px]">
          <div className="grid grid-cols-2 md-lg:flex md-lg:flex-col  mt-9 mx-auto px-[20px]">
            <div className="flex justify-center items-center p-5">
              <img
                src={productDetails.image}
                alt=""
                className="w-full p-10"
              ></img>
            </div>

            <div className="p-[70px] bg-[#FAF9F7] ">
              <h1 className="text-4xl font-bold md-lg:text-3xl">
                {productDetails.title}
              </h1>
              <h3 className="pt-3 overflow-hidden mb-5 hover:text-[#BC9B80]">
                <Link to="">{categoryName}</Link>
              </h3>
              {/* ============ */}
              <hr></hr>
              <div className="my-[40px] line-clamp-3 text-lg ">
                <p>{productDetails.description}</p>
              </div>
              {/* ============ */}
              <hr></hr>

              <div className="p-5 flex justify-center items-center flex-col">
                <div className="mt-5 px-10 gap-4 flex md-lg:justify-center md-lg:flex-wrap items-center">
                  <h3 className="text-xl">Price:</h3>
                  <div className="text-2xl flex">
                    {productDetails.discount ? (
                      <>
                        <h2 className="line-through mr-5">
                          {productDetails.price}$
                        </h2>
                        <h2 className=" font-semibold">{discountPrice}$</h2>
                      </>
                    ) : (
                      <span className="line-through">
                        {productDetails.price}$
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-5 gap-4 px-10 flex md-lg:justify-center md-lg:flex-wrap items-center">
                  <h3 className="text-xl">Rating:</h3>
                  <div className="flex">
                    <Rating rating={productDetails.rating} size={30} />
                  </div>
                  <p className="text-md font-semibold">
                    {productDetails.rating}
                  </p>
                </div>
              </div>
              {/* ======== add to cart buttons */}
              <div className="h-[50px] md-lg:mb-5 gap-5 mt-10 md-lg:flex-wrap flex justify-center">
                <div className=" bg-white p-2  text-black flex gap-2 justify-center items-center">
                  <button
                    className=" h-full w-10 font-bold text-xl flex justify-center hover:text-[#BC9B80] items-center"
                    onClick={(e) => handlePlusQuantity(e, productDetails)}
                  >
                    +
                  </button>
                  <span className="h-full w-10 font-bold text-xl flex justify-center items-center">
                    {quantity}
                  </span>
                  <button
                    className=" h-full w-10 font-bold text-2xl hover:text-[#BC9B80] flex justify-center items-center"
                    onClick={() => handleMinusQuantity()}
                  >
                    -
                  </button>
                </div>
                <AddToCartButton product={productDetails} userId={userId} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center m-10 p-10 text-3xl">
          <p className=" ">Product Not found !!</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetails;
