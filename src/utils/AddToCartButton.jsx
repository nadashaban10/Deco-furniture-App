import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/reducers/cartSlice";

const AddToCartButton = ({ product, userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickAddToCart = (e, product) => {
    e.stopPropagation();

    // Calculate Discounted price
    const discountedPrice = product.discount
      ? product.price - (product.price * product.discount) / 100
      : product.price;
    // dispatch adding to cart action
    if (userId) {
      dispatch(
        addToCart({
          userId,
          productId: product.id,
          quantity: 1,
          // price: product.price,
          // discountedPrice, // Pass the calculated discounted price
        })
      );
    } else {
      navigate("/login"); // Redirect to login if the user is not logged in
    }
  };
  return (
    <>
      <button
        onClick={(e) => handleClickAddToCart(e, product)}
        className="h-full uppercase font-semibold px-[4rem] text-white bg-[#1F212A] hover:bg-[#BC9B80] transition-all duration-300"
      >
        Add to cart
      </button>
    </>
  );
};

export default AddToCartButton;
