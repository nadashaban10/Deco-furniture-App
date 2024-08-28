import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

const Dashboard = () => {
  return (
    <div>
      <Header />

      <div className="w-[85%] lg:w[90%] mx-auto flex mt-8">
        {/* ======= side ===== */}
        <div className={`w-2/12 bg-[#FAF9F7] z-50 top-0  mr-6`}>
          <div className="h-[70px] hover:bg-[#BC9B80] hover:text-black transition-all duration-500 mt-3 flex justify-center items-center px-3">
            <p className="text-slate-600 text-xl text-center ">Profile</p>
            <Link to="/" className="text-slate-600 p-5 text-xl text-center ">
              <span>
                <CgProfile />
              </span>
            </Link>
          </div>
          <hr></hr>
          <div className="h-[70px]  hover:bg-[#BC9B80] hover:text-black transition-all duration-500 mt-3 flex justify-center items-center px-3">
            <p className="text-slate-600 text-xl text-center ">Orders</p>
            <Link to="/" className="text-slate-600 p-5 text-xl text-center ">
              <span>
                <FaCartShopping />
              </span>
            </Link>
          </div>
        </div>
        {/* ====== main ====== */}
        <div className="w-10/12 "></div>
      </div>
    </div>
  );
};

export default Dashboard;
