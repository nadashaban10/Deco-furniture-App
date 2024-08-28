import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Category from "../components/Category";
import FeaturedProducts from "../components/product/FeaturedProducts";
import Products from "../components/product/Products";
import Footer from "../components/Footer";
import HeaderSecond from "../components/HeaderSecond";
const Home = () => {
  return (
    <div>
      <Header />
      <HeaderSecond />
      <Banner />
      <Category />
      <div className="py-[50px]">
        <FeaturedProducts />
      </div>
      <div className="py-10">
        <div className="w-[85%] flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
            <div className="overflow-hidden">
              <Products title="Latest Products" />
            </div>
            <div className="overflow-hidden">
              <Products title="Top rated" />
            </div>
            <div className="overflow-hidden ">
              <Products title="Discounted Products" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
