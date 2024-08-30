import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/nav";
import { logInUser } from "../redux/reducers/authSlice";
import { FaFacebookF, FaGooglePlusG } from "react-icons/fa";
import Header from "../components/Header";
import loginimage from '../images/banner/3.jpg';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logInUser({ email, password }))
      .unwrap()
      .then((response) => {
        console.log("Logged in successfully:", response);
        navigate("/");
      })
      .catch((err) => {
        console.error("Failed to login:", err);
      });
  };

  const inputHandle = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
      setName(name);
    }
  };

  return (
    <>
      <Header />
      <div
        className="relative flex items-center bg-cover bg-center h-[70vh] pt-2 pb-2 justify-center pl-5"
        style={{ backgroundImage: `url(${loginimage})` }}
      >
        <div className="flex justify-center items-center absolute inset-0 bg-white opacity-50"></div>
        <div className="relative bg-white p-8 border-none max-w-md font-serif w-full">
          <h1 className="text-2xl font-bold mb-6 text-slate-600 text-center">
            Log In
          </h1>
          <form onSubmit={handleSubmit}>
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
                value={email}
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
                placeholder="Password"
                value={password}
                onChange={inputHandle}
                className="input-field w-full px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#e0e0e0] focus:border-[#e0e0e0]"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full mt-4 p-2 font-bold text-slate-600 border-none bg-[#E0D8BE]"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
          <div className="flex justify-center items-center mt-5">
            <span className="px-3 text-slate-600">Don't have an account?</span>
            <a href="/register" className="text-[#BC9B80]">
              {" "}
              Create account
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;