import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../redux/reducers/productsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  setQuery,
  clearResults,
  fetchSearch,
} from "../redux/reducers/SearchResults";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";

function SearchBar() {
  const categories = useSelector((state) => state.categories.categories);
  const [category, setCategory] = useState("All Categories");
  const dispatch = useDispatch();

  const handleCategoryClick = (categoryId) => {
    dispatch(fetchProductsByCategory(categoryId));
  };

  //====== Search bar ======//
  const [input, setInput] = useState("");

  const { results, loading, error } = useSelector((state) => state.search);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (input) {
        dispatch(setQuery(input));
        dispatch(fetchSearch(input));
      } else {
        dispatch(clearResults());
      }
    }, 300); // Adjust the debounce delay as needed

    return () => clearTimeout(delayDebounceFn);
  }, [input, dispatch]);

  const handleSearchChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="w-full ">
      <div className="flex-1">
        <div className="flex border h-[60px] mt-5 relative items-center gap-6">
          {/* - - - search input - - -  */}
          <div className="w-full">
            <input
              className="border-0 bg-transparent sm:w-[165px] text-slate-500 outline-none px-3 h-full"
              onChange={handleSearchChange}
              value={input}
              type="text"
              placeholder="What do you need?"
            />

            <div className="mt-4 w-[70%] absolute rounded-md  top-[60px] z-10  bg-[#fefefe93] ">
              {loading && <p>Loading...</p>}
              {error && input ? (
                <p className="text-red-500 flex justify-center items-center">
                  {error.message}
                </p>
              ) : (
                results.length > 0 && (
                  <ul className=" p-5 ">
                    {results.map((product) => (
                      <li
                        key={product._id}
                        className="py-2 cursor-pointer hover:scale-105 transition-transform duration-300 hover:bg-[#28292d] hover:text-white  border-b"
                      >
                        <div className="flex items-center">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-10 h-10 object-cover mx-2"
                          />
                          <Link
                            to={`/${product.id}`}
                            className="font-semibold cursor-pointer"
                          >
                            {product.title}
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                )
              )}
            </div>
          </div>
          {results.length > 0 && (
            <button
              className="h-full uppercase font-semibold px-8 text-slate-600"
              onClick={() => {
                dispatch(clearResults(input));
                setInput("");
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
          <button className="h-full uppercase sm:w-[150px] font-semibold px-6 w-5/12 text-white bg-[#1F212A] hover:bg-[#BC9B80] transition-all duration-300 flex items-center justify-center gap-6">
            Search
            <FaMagnifyingGlass />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
