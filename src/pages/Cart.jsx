import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchCart,
  selectAllCart,
  clearCart,
} from "../redux/reducers/cartSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IoIosArrowForward } from "react-icons/io";
import { selectTotalQuantity } from "../redux/reducers/cartSlice";
import CartItemsMain from "../components/CartItemsMain";
import FeaturedProducts from "../components/product/FeaturedProducts";
import CartSummery from "../components/CartSummery";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectAllCart);
  const quantity = useSelector(selectTotalQuantity);
  const { userId } = useSelector((state) => state.auth);

  console.log("userId in Cart component:", userId);
  console.log("cart:", cart);

  useEffect(() => {
    if (userId) dispatch(fetchCart(userId));
  }, [dispatch, userId, quantity]);

  const handleClearCart = () => {
    if (userId) {
      dispatch(clearCart({ userId }));
    } else {
      console.error("User ID is not defined");
    }
  };
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/shipping", {
      state: {
        products: [],
        price: 500,
        shippingFee: 50,
        items: 2,
      },
    });
  };

  return (
    <div>
      <Header />
      <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <div className="flex justify-center mt-[10%] gap-2 text-2xl w-full">
                <Link to="/" className="text-white">
                  Home
                </Link>
                <IoIosArrowForward className="text-white" />
                <span className="text-white ">Card</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
          <h2 className="text-5xl font-semibold text-center">Your cart</h2>
          <div className="flex flex-wrap">
            <div className="w-[67%] md-lg:w-full pr-10">
              <div className="pr-3 md-lg:pr-0">
                <div className="flex flex-col gap-3">
                  <div className="bg-white p-4">
                    <h2 className="text-3xl ">
                      {`Total items in cart (${quantity})`}
                    </h2>
                  </div>
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex bg-white p-4 flex-col gap-2 border-b-2 mb-4"
                    >
                      <CartItemsMain
                        productId={item.productId}
                        quantity={item.quantity}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* ========= buttons */}
              <div className="flex justify-center items-center mt-5">
                {cart.length > 0 ? (
                  <div className="flex justify-between">
                    <button
                      className="h-full text-white bg-black hover:bg-[#BC9B80] transition-all duration-300 px-10 py-[10px]"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </button>
                    <button
                      className="ml-6 h-full text-white bg-black hover:bg-[#BC9B80] transition-all duration-300 px-10 py-[10px]"
                      onClick={redirect}
                    >
                      Proceed to checkout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center">
                    <p className="text-center">
                      Start adding items to your cart
                    </p>

                    <Link to="/shop">
                      <button className="h-full text-white bg-black hover:bg-[#BC9B80] transition-all duration-300 px-10 py-[10px]">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="w-[33%] md-lg:w-full">
              {cart.length > 0 && <CartSummery />}
            </div>
          </div>
        </div>
      </section>
      <FeaturedProducts />

      <Footer />
    </div>
  );
};

export default Cart;
