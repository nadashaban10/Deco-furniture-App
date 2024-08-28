import Header from "../components/Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../redux/reducers/orderSlice";
import OrderDetails from "./OrderDetails";
import Footer from "../components/Footer";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const orderHistory = useSelector((state) => state.order.history);

  // console.log("order History", orderHistory);

  useEffect(() => {
    dispatch(getOrders({ userId }));
  }, [dispatch, userId]);

  return (
    <div>
      <Header />
      <div className="w-[85%] lg:w[90%] mx-auto flex flex-col gap-6 justify-center my-10">
        <h1 className="text-3xl text-center font-semibold"> Order History </h1>
        <div className="flex items-center justify-center flex-col">
          {orderHistory.map((order, index) => (
            <OrderDetails order={order} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory;
