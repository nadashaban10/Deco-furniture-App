import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const OrderDetails = ({ order }) => {
  const [productDetails, setProductsDetails] = useState([]);
  const { products } = useSelector((state) => state.products);
  console.log("order:", order);
  console.log("product details:", productDetails);

  // ======== Get Product details
  useEffect(() => {
    // Combine orderItems with product details
    // map over ite order items
    const details = order.orderItems.map((item) => {
      // or each item get its id and find the details of that product
      const product = products.find((product) => product.id === item.productId);
      // Then include the quantity to the item
      return {
        ...item, // Include quantity and other orderItem details
        product, // Attach the product details
      };
    });
    if (details) {
      setProductsDetails(details);
    }
  }, [products, order]);

  // Convert to Date object
  const date = new Date(order.createdAt);

  // Options for formatting
  const options = {
    weekday: "long", // e.g., 'Tuesday'
    year: "numeric", // e.g., '2024'
    month: "long", // e.g., 'August'
    day: "numeric", // e.g., '27'
    hour: "2-digit", // e.g., '10'
    minute: "2-digit", // e.g., '44'
    second: "2-digit", // e.g., '00'
    hour12: true, // 12-hour format
  };

  // Format date
  const formattedDate = date.toLocaleDateString("en-US", options);
  // Calculate total price
  const totalPrice = productDetails
    .reduce((acc, item) => {
      const itemPrice = item.discountedPrice || item.price;
      return acc + itemPrice * item.quantity;
    }, 0)
    .toFixed(2);

  console.log("details:", productDetails);

  return (
    <div className="flex justify-around flex-wrap w-full mx-auto border-b-2 border-black mb-4 p-4">
      <div className="leading-relaxed mt-8 p-6inline-block text-left">
        <div className="mb-5">
          <h2 className="text-2xl font-semibold">
            Order Nu {order.orderNumber}
          </h2>
          <span className="mb-5 text-slate-600">
            placed at: {formattedDate}
          </span>
        </div>

        <p>
          <strong>Name:</strong> {order.name}
        </p>
        <br></br>
        <p>
          <strong>Shipping Address 1: </strong> {order.shippingAddress1},{" "}
          {order.city}, {order.country}
        </p>
        <br></br>
        <p>
          <strong>Shipping Address 2:</strong> {order.shippingAddress2},
        </p>
        <br></br>
        <p>
          <strong>Email:</strong> {order.email}
        </p>
        <br></br>
        <p>
          <strong>Phone:</strong> {order.phone}
        </p>
      </div>
      <div className="mt-8 p-6 bg-white inline-block text-left">
        <div className="border-b-2 border-black mb-3 py-5">
          <h2 className="text-3xl font-semibold mb-4 ">Order Items:</h2>
          <ul>
            {productDetails.map((item, index) => (
              <li key={index} className="mb-2">
                {item.product ? item.product.title : "Product not found"} - Qty:{" "}
                {item.quantity} -{" "}
                {item.discountedPrice ? (
                  <>
                    <span className="line-through mr-2">${item.price}</span> $
                    {item.discountedPrice}
                  </>
                ) : (
                  <span className="font-semibold">${item.price}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <span>
          <strong className="mr-5 text-lg">Total price:</strong>
        </span>
        <span>{totalPrice}$</span>

        <div></div>
      </div>
    </div>
  );
};

export default OrderDetails;
