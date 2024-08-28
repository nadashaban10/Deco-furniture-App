import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegHeart } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import { Link as ScrollLink } from 'react-scroll'
import { GiHamburgerMenu } from 'react-icons/gi'

function Nav({ pathname, wishlist, handleCartClick, setshowSideBar, showSideBar }) {
  return (
    <div>
      {/*  ============== Main HEADER ======== */}
      <div className="w-white mt-6 pt-4">
        <div className="w-[85%] h-[120px] md-lg:h-[120px] lg:w-[90%] mx-auto">
          <div className="md-lg:h-[100px] flex justify-between items-center flex-wrap">
            {/* ===== Left part ====== */}
            <div className="md-lg:w-full w-3/12">
              <div className="flex justify-between items-center">
                <Link to="/">
                  <img
                    src="https://deco-furniture-app.vercel.app/images/logo-only.png"
                    alt="logo"
                    style={{ width: "220px" }}
                  />
                </Link>
                <div
                  className="justify-center items-center cursor-pointer lg:hidden xl:hidden md-lg:flex hidden"
                  onClick={() => setshowSideBar(!showSideBar)}
                >
                  <span>
                    <GiHamburgerMenu size="40px" color="#4B505E" />
                  </span>
                </div>
              </div>
            </div>
            {/* ====== two-third part ====== */}
            <div className="w-9/12 md-lg:w-full">
              <div className="flex justify-between items-center md-lg:justify-center flex-wrap pl-8">
                {/* - - Menu - - */}
                <ul className="flex justify-start items-start gap-8 uppercase md-lg:hidden text-lg">
                  <li>
                    <Link
                      to="/"
                      className={`p-2 block ${
                        pathname === "/" ? "text-[#BC9B80]" : "text-slate-600"
                      } hover:text-[#BC9B80]`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shop"
                      className={`p-2 block ${
                        pathname === "/shop"
                          ? "text-[#BC9B80]"
                          : "text-slate-600"
                      } hover:text-[#BC9B80]`}
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className={`p-2 block ${
                        pathname === "/blog"
                          ? "text-[#BC9B80]"
                          : "text-slate-600"
                      } hover:text-[#BC9B80]`}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <ScrollLink
                      to="footer"
                      spy={true}
                      smooth={true}
                      duration={500}
                      className={`p-2 cursor-pointer block ${
                        pathname === "/about"
                          ? "text-[#BC9B80]"
                          : "text-slate-600"
                      } hover:text-[#BC9B80]`}
                    >
                      about us
                    </ScrollLink>
                  </li>
                </ul>
                {/* - - Icons - - */}
                <div className="flex md-lg:hidden justify-center items-center gap-5">
                  <div className="flex justify-center gap-5">
                    {/* Wishlist */}
                    <div className="flex relative justify-center items-center cursor-pointer rounded-full w-[40px] h-[40px] text-[#1F212A] hover:text-[#BC9B80]">
                      <span className="text-3xl">
                        <FaRegHeart />
                      </span>
                      <div className="absolute w-[20px] h-[20px] bg-[#BC9B80] text-white flex justify-center items-center rounded-full -top-[3px] -right-[6px]">
                        {wishlist}
                      </div>
                    </div>
                    {/* Shopping Cart */}
                    <div className="flex relative justify-center items-center cursor-pointer rounded-full w-[40px] h-[40px] text-[#1F212A] hover:text-[#BC9B80]">
                      <span onClick={handleCartClick} className="text-3xl">
                        <FiShoppingCart />
                      </span>
                      <div className="absolute w-[20px] h-[20px] bg-[#BC9B80] text-white flex justify-center items-center rounded-full -top-[3px] -right-[6px]">
                        {wishlist}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Sidebar */}
                <div className="hidden md-lg:block">
                  <div
                    onClick={() => setshowSideBar(true)}
                    className={`fixed duration-500 transition-all ${
                      showSideBar ? "invisible" : "visible"
                    } w-screen h-screen md-lg:block bg-[rgba(188,155,128,0.55)] mt-5 top-0 left-0 z-50`}
                  ></div>
                  <div
                    className={`w-[300px] z-[100] transition-all duration-500 fixed ${
                      showSideBar
                        ? "-left-[300px]"
                        : "left-0 top-0 overflow-auto bg-white h-screen py-6 px-8"
                    }`}
                  >
                    <Link to="/">
                      <img
                        src="http://localhost:3000/images/logo-sm.png"
                        alt="logo"
                        style={{ width: "220px", marginTop: "20px" }}
                      />
                    </Link>
                    {/* - - Menu - - */}
                    <ul className="m-4 pt-3 flex flex-col h-[60%] justify-start items-start gap-5 uppercase text-lg">
                      <li>
                        <Link
                          to="/"
                          className={`py-2 block ${
                            pathname === "/" ? "text-[#BC9B80]" : "text-slate-600"
                          } hover:text-[#BC9B80]`}
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/shop"
                          className={`py-2 block ${
                            pathname === "/shop" ? "text-[#BC9B80]" : "text-slate-600"
                          } hover:text-[#BC9B80]`}
                        >
                          Shop
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/blog"
                          className={`py-2 block ${
                            pathname === "/blog" ? "text-[#BC9B80]" : "text-slate-600"
                          } hover:text-[#BC9B80]`}
                        >
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/about"
                          className={`py-2 block ${
                            pathname === "/about" ? "text-[#BC9B80]" : "text-slate-600"
                          } hover:text-[#BC9B80]`}
                        >
                          about us
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/contact"
                          className={`py-2 block ${
                            pathname === "/contact" ? "text-[#BC9B80]" : "text-slate-600"
                          } hover:text-[#BC9B80]`}
                        >
                          contact us
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* End of Sidebar */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav