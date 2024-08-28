import { useDispatch, useSelector } from "react-redux";

const CartSummery = () => {
  const shippingFee = 30;
  const taxes = 50;
  const cartTotalAmount = useSelector((state) => state.cart.totalPrice);
  const totalAfterCalculate = shippingFee + cartTotalAmount + taxes;

  return (
    <div className="pl-3 md-lg:pl-0 md-lg:mt-5 text-slate-600">
      <div className="bg-white p-10 flex flex-col gap-3 border ">
        <h2 className="text-3xl text-black">Cart summery</h2>
        <hr></hr>
        <div className=" pt-4 flex justify-between items-center">
          <span className="text-lg">Order Totals</span>
          <span className="text-lg ">{cartTotalAmount.toFixed(2)}$</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg ">Shipping Fee</span>
          <span className="text-lg ">{shippingFee}$</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg ">Taxes</span>
          <span className="text-lg ">{taxes}$</span>
        </div>
        {/* <div className="flex gap-2">
          <input
            className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-300 rounded-sm"
            type="text"
            placeholder="Voucher coupon"
          />
          <button className="bg-[#059473] text-white px-4 py-1 rounded-sm uppercase text-sm">
            Apply
          </button>
        </div> */}
        <hr></hr>
        <div className="flex justify-between items-center py-5">
          <span className="text-2xl font-semibold">Total</span>
          <span className="text-2xl font-semibold">
            {totalAfterCalculate.toFixed(2)}$
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartSummery;
