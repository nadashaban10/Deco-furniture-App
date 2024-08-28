import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, selectAllCart } from "../redux/reducers/cartSlice";
import { IoIosArrowForward } from "react-icons/io";
import CartItemsSmall from "../components/CartItemsSmall";
import CartSummery from "../components/CartSummery";
import { placeOrder } from "../redux/reducers/orderSlice";

const Shipping = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const cart = useSelector(selectAllCart);
  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [res, setRes] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    shippingAddress1: "",
    shippingAddress2: "",
    phone: "",
    city: "",
    email: "",
    country: "",

    // orderItems:,
    // totalPrice:},
    // userId: ,
  });
  const [errors, setErrors] = useState({
    form: "",
    cart: "",
  });

  const order = {
    ...info,
    orderItems: cart,
    userId,
  };
  console.log("order action:", order);
  const [finalCart, setFinalCart] = useState([]);

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cart: "Your cart is empty. Add items to your cart before placing an order.",
      }));
      return;
    }

    if (
      !info.name ||
      !info.shippingAddress1 ||
      !info.phone ||
      !info.email ||
      !info.city ||
      !info.country
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: "Please fill out all required fields.",
      }));
      return;
    }

    setErrors({
      form: "",
      cart: "",
    });
    const orderData = {
      ...info,
      orderItems: cart,
      userId,
    };

    setFinalCart(cart); // Store a copy of cart

    dispatch(placeOrder(orderData)).then(() => {
      setOrderPlaced(true);
      dispatch(clearCart({ userId }));
    });
  };

  const inputHandle = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const save = (e) => {
    e.preventDefault();
    const {
      name,
      shippingAddress1,
      shippingAddress2,
      phone,
      email,
      city,
      country,
    } = info;

    if (!name || !shippingAddress1 || !phone || !email || !city || !country) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: "Please fill out all required fields.",
      }));
      return;
    }
  };

  console.log("data in shipping: ", info);

  return (
    <div>
      <Header />
      {!orderPlaced ? (
        <>
          <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
            <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
              <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
                <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
                  <h2 className="text-3xl font-bold">Shipping Page </h2>
                  <div className="flex justify-center items-center gap-2 text-2xl w-full">
                    <Link to="/">Home</Link>
                    <span className="pt-1">
                      <IoIosArrowForward />
                    </span>
                    <span>Shipping </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="">
            <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
              <div className="w-full flex flex-wrap">
                <div className="w-[67%]  md-lg:w-full">
                  <div className="flex  flex-col gap-3">
                    <div className=" border p-6 shadow-sm ">
                      <h2 className="text-3xl py-3 "> Shipping information</h2>
                      <hr className=" mb-1 " />
                      {!res && (
                        <>
                          <form onSubmit={save}>
                            {errors.form && (
                              <p className="text-red-500">{errors.form}</p>
                            )}
                            <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                              <div className="flex flex-col gap-1 m-2 w-full">
                                <label htmlFor="name"> Name </label>
                                <input
                                  onChange={inputHandle}
                                  value={info.name}
                                  type="text"
                                  className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 "
                                  name="name"
                                  id="name"
                                  placeholder="Name"
                                />
                              </div>

                              <div className="flex flex-col gap-1 m-2 w-full">
                                <label htmlFor="phone"> Phone </label>
                                <input
                                  onChange={inputHandle}
                                  value={info.phone}
                                  type="text"
                                  className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 "
                                  name="phone"
                                  id="phone"
                                  placeholder="Phone"
                                />
                              </div>
                            </div>

                            <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                              <div className="flex flex-col gap-1 m-2 w-full">
                                <label htmlFor="post"> Email </label>
                                <input
                                  onChange={inputHandle}
                                  value={info.email}
                                  type="text"
                                  className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 "
                                  name="email"
                                  id="email"
                                  placeholder="email"
                                />
                              </div>

                              <div className="flex flex-col gap-1 m-2 w-full">
                                <label htmlFor="zip"> Zip </label>
                                <input
                                  onChange={inputHandle}
                                  value={info.zip}
                                  type="text"
                                  className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 "
                                  name="zip"
                                  id="zip"
                                  placeholder="zip"
                                />
                              </div>
                            </div>

                            <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                              <div className="flex flex-col gap-1 m-2 w-full">
                                <label htmlFor="country"> Country </label>
                                <input
                                  onChange={inputHandle}
                                  value={info.country}
                                  type="text"
                                  className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 "
                                  name="country"
                                  id="country"
                                  placeholder="Country"
                                />
                              </div>

                              <div className="flex flex-col gap-1 m-2 w-full">
                                <label htmlFor="city"> City </label>
                                <input
                                  onChange={inputHandle}
                                  value={info.city}
                                  type="text"
                                  className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 "
                                  name="city"
                                  id="city"
                                  placeholder="City"
                                />
                              </div>
                            </div>

                            <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                              <div className="flex flex-col gap-1 m-2 w-full">
                                <label htmlFor="shippingAddress1">
                                  {" "}
                                  Shipping Address 1{" "}
                                </label>
                                <input
                                  onChange={inputHandle}
                                  value={info.shippingAddress1}
                                  type="text"
                                  className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 "
                                  name="shippingAddress1"
                                  id="shippingAddress1"
                                  placeholder="Address 1"
                                />
                              </div>
                            </div>
                            <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                              <div className="flex flex-col gap-1 m-2 w-full">
                                <label htmlFor="shippingAddress2">
                                  {" "}
                                  Shipping Address 2{" "}
                                </label>
                                <input
                                  onChange={inputHandle}
                                  value={info.shippingAddress2}
                                  type="text"
                                  className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 "
                                  name="shippingAddress2"
                                  id="shippingAddress2"
                                  placeholder="Address 2"
                                />
                              </div>
                            </div>
                          </form>
                        </>
                      )}

                      {res && (
                        <div className="flex flex-col gap-1">
                          <h2 className="text-slate-600 font-semibold pb-2">
                            Deliver To / {info.name}
                          </h2>
                          <p>
                            <span>
                              {info.phone} <br /> {info.shippingAddress2} <br />
                              {info.shippingAddress1} <br />
                              {info.city} <br />
                              {info.country} <br />{" "}
                            </span>

                            <span
                              onClick={() => setRes(false)}
                              className="text-indigo-500 cursor-pointer"
                            >
                              Change{" "}
                            </span>
                          </p>

                          <p className="text-slate-600 text-sm">{info.email}</p>
                        </div>
                      )}
                    </div>
                    <h1 className="text-3xl font-semibold py-3">
                      Your order items
                    </h1>
                    <div className="flex bg-white p-4 flex-col gap-2">
                      {cart.map((item, index) => (
                        <div className="w-full flex flex-wrap">
                          <div className="w-full border-b py-5">
                            <CartItemsSmall
                              productId={item.productId}
                              quantity={item.quantity}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link to="/shop">
                      <button className="ml-6 h-full text-white bg-black hover:bg-[#BC9B80] transition-all duration-300 px-10 py-[10px]">
                        continue shopping
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="w-[33%] md-lg:w-full">
                  <CartSummery />
                  <div className="w-full flex justify-center items-center mt-5">
                    <button
                      className="ml-6 h-full text-white bg-[#BC9B80] hover:bg-transparent hover:border-2 hover:border-black hover:text-black transition-all duration-300 px-10 py-[10px]"
                      onClick={handleSubmitOrder}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="py-16 w-[85%] mx-auto items-center text-center">
          <div className="border-b  ">
            <h1 className="text-4xl font-bold text-green-600">
              Order Placed Successfully!
            </h1>
            <p className="text-lg mt-4 pb-5">
              Thank you for your order. Your order details are as follows:
            </p>
          </div>

          <div className="flex justify-around w-[85%] mx-auto">
            <div className="leading-relaxed mt-8 p-6 bg-white inline-block text-left">
              <h2 className="text-3xl font-semibold mb-4">Order Summary</h2>
              <p>
                <strong>Name:</strong> {info.name}
              </p>
              <br></br>
              <p>
                <strong>Shipping Address:</strong> {info.shippingAddress1},{" "}
                {info.city}, {info.country}
              </p>
              <br></br>
              <p>
                <strong>Shipping Address 2:</strong> {info.shippingAddress2},
              </p>
              <br></br>
              <p>
                <strong>Email:</strong> {info.email}
              </p>
              <br></br>
              <p>
                <strong>Phone:</strong> {info.phone}
              </p>
            </div>
            <div className="mt-8 p-6 bg-white inline-block text-left">
              <h2 className="text-3xl font-semibold mb-4 ">Order Items:</h2>
              <ul>
                {finalCart.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item.productId.title} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link to="/shop">
            <button className="mt-6 text-white bg-black hover:bg-[#BC9B80] transition-all duration-300 px-10 py-[10px]">
              Continue Shopping
            </button>
          </Link>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Shipping;
