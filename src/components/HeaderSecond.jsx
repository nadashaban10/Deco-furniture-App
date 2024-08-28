import { MdKeyboardArrowDown } from "react-icons/md";
import SearchBar from "./SearchBar";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../redux/reducers/productsSlice";
import { Link, useNavigate } from "react-router-dom";

const HeaderSecond = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const navigate = useNavigate();
  console.log("categories:", categories);

  const [showCategory, setShowCategory] = useState(false);
  const categoryRef = useRef(null);

  const handleCategoryClick = (categoryId, categoryName) => {
    dispatch(fetchProductsByCategory(categoryId));
    setShowCategory(false); // Close dropdown after selection
    navigate(`/category/${categoryId}`); // Navigate to the new page with categoryId
    setSelectedCategory(categoryName);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategory(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-[85%] border-t-[1.5px] lg:w-[90%] mx-auto">
      <div className="flex w-full md-lg:flex-wrap gap-4">
        {/* Part ONE I All Categories Button */}
        <div className="w-3/12 md-lg:w-full">
          <div className="bg-white relative" ref={categoryRef}>
            {/* Category Button */}
            <div
              onClick={() => setShowCategory(!showCategory)}
              className="duration-500 transition-all text-[#1F212A] h-[60px] mt-5 flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-semibold cursor-pointer bg-[#FAF9F7] custom-before pt-2"
            >
              <div className="flex justify-center items-center gap-3">
                <span className="text-2xl"></span>
                <span>{selectedCategory}</span>
              </div>
              <span className="text-2xl">
                <MdKeyboardArrowDown />
              </span>
            </div>

            {/* Category list */}
            <div
              className={`${
                showCategory ? "h-auto" : "h-0"
              } overflow-hidden transition-all md-lg:relative duration-500 absolute z-[20] w-full bg-[#FAF9F7]`}
            >
              <ul className="py-2 m-[10px] font-medium">
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className="flex justify-start m-[10px] relative hover:translate-x-3 transition-all duration-500 gap-2 items-center py-[6px] px-[24px]"
                  >
                    <Link
                      className="block"
                      to={`/category/${category.id}`}
                      state={{
                        categoryId: category.id,
                        categoryName: category.name,
                      }} // Pass state
                      onClick={() =>
                        handleCategoryClick(category.id, category.name)
                      }
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <SearchBar />
      </div>
    </div>
  );
};

export default HeaderSecond;
