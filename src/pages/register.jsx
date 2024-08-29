import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { register } from "../redux/reducers/authSlice";
import { FaFacebookF, FaGooglePlusG } from "react-icons/fa";

import '../../src/images/logo-only.png'
const Register = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: true,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(state))
      .then(() => navigate("/login"))
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  return (
    <>
      <Header />
      <div className="relative bg-[url('../../src/images/logo-only.png')] flex items-center bg-cover bg-center h-[80vh] pt-2 pb-2 justify-center pl-5 ">
        <div className="absolute inset-0 bg-white opacity-50"></div>
        <div className="relative bg-white p-8 border-none max-w-lg font-serif w-full">
          <h1 className="text-2xl font-bold mb-6 text-slate-600 text-center">
            Register Page
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                className="block text-slate-600 text-sm font-bold mb-1"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={state.name}
                onChange={inputHandle}
                className="input-field w-full px-2 py-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-[#e0e0e0] focus:border-[#e0e0e0]"
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-sm text-slate-600 font-bold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={state.email}
                onChange={inputHandle}
                className="input-field w-full px-2 py-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-[#e0e0e0] focus:border-[#e0e0e0]"
                required
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-slate-600 text-sm font-bold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="At least 6 characters"
                value={state.password}
                onChange={inputHandle}
                className="input-field w-full px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#e0e0e0] focus:border-[#e0e0e0]"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full mt-4 p-2 font-bold text-slate-600 border-none bg-[#E0D8BE]"
            >
              Register
            </button>
          </form>
          <div className="flex justify-center items-center mt-5">
            <div className="h-[1px] bg-slate-300 w-[95%]"></div>
            <span className="px-3 text-slate-600">Or</span>
            <div className="h-[1px] bg-slate-300 w-[95%]"></div>
          </div>

          <div className="flex justify-center items-center mt-5">
            <span className="px-3 text-slate-600">
              Already have an account?
            </span>
            <a href="/login" className="text-[#BC9B80]">
              Login
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
