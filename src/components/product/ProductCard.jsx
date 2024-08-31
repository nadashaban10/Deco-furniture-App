import { FaRegHeart, FaHeart } from "react-icons/fa";
import Rating from "../Rating";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/reducers/cartSlice";
import AddToCartButton from "../../utils/AddToCartButton";
import { useState, useEffect } from "react";
import { addProductToWishList, removeProductFromWishList } from "../../redux/reducers/wishListSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.auth);

  const [isInWishlist, setIsInWishlist] = useState(true);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsInWishlist(wishlist.includes(product.id));
  }, [product.id]);

  const handleWishlistClick = () => {
    if (!userId) {
      // Optionally, you can show a message to the user indicating they need to log in
      console.log("User must be logged in to modify the wishlist.");
      navigate("/login");
      return;
    }
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (isInWishlist) {
      dispatch(removeProductFromWishList({ userId, productId: product.id }));
      const updatedWishlist = wishlist.filter(id => id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
    } else {
      dispatch(addProductToWishList({ userId, productId: product.id }));
      wishlist.push(product.id);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsInWishlist(true);
    }
  };

  const handleClickAddToCart = (e, product) => {
    e.stopPropagation();

    const discountedPrice = product.discount
      ? product.price - (product.price * 100 - product.discount) / 100
      : product.price;

    if (userId) {
      dispatch(
        addToCart({
          userId,
          productId: product.id,
          quantity: 1,
        })
      );
    } else {
      navigate("/login");
    }
  };

  // Conditional Rendering for Product Details
  return (
    <div
      key={product.id}
      className="border relative group w-[300px] transition-all duration-500 hover:shadow-md hover:-mt-3 cursor-pointer"
      onClick={() => console.log("Product clicked:", product)}
    >
      <div className="relative p-[25px] overflow-hidden ">
        <span className="flex justify-center items-center absolute w-[38px] h-[38px] rounded-md bg-[#ffffffdb] border font-semibold text-xs right-2 top-2">
          <button
            onClick={handleWishlistClick}
            className="focus:outline-none hover:text-red-500"
          >
            {isInWishlist ? (
              <FaHeart className="text-xl text-red-500" />
            ) : (
              <FaRegHeart className="text-xl text-slate-400 hover:text-red-500" />
            )}
          </button>
        </span>
        {product.discount > 0 && (
          <span className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
            {product.discount}%
          </span>
        )}

        {/* Conditional Rendering for Product Image */}
        {product.image ? (
          <Link to={`/${product.id}`}>
            <img
              className="sm:w-full w-full h-[240px]"
              src={product.image}
              alt={product.title}
            />
          </Link>
        ) : (
          <div>No image available</div>
        )}

      </div>

      <div className="py-3 text-slate-600 pl-3 mt-2">
        {/* Conditional Rendering for Product Title */}
        {product.title ? (
          <h2 className="font-semibold text-slate-600 text-lg">
            {product.title}
          </h2>
        ) : (
          <div>No title available</div>
        )}

        <div className="flex flex-col items-start gap-3 my-2 ">
          {/* Price and Discount Handling */}
          {product.discount ? (
            <div>
              <span className="text-lg font-semibold text-green-600 mt-3">
                {(product.price - (product.price * product.discount) / 100).toFixed(2)}$
              </span>
              <span className="text-md ml-3 mt-3 line-through">
                {product.price.toFixed(2)}$
              </span>
            </div>
          ) : (
            <span className="text-lg mt-3">{product.price}$</span>
          )}

          <div className="flex">
            <Rating rating={product.rating} />
          </div>

          <div className="h-[50px] items-center">
            <AddToCartButton  product={product} userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;