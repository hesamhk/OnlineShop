import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneOrder } from "../../Redux/action";
import { useNavigate, useParams } from "react-router-dom";

function OrderDetails() {
  const { order, loading, error } = useSelector((state) => state.oneorder);
  const { userInfo } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const orderItems = order?.orderItems;

  const isLogin = userInfo?.user?.token;

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
    dispatch(getOneOrder(id));
  }, [id]);
  return (
    <div className="container mx-auto font-['Quicksand']">
      <h1 className="text-2xl mt-20  font-bold border-b-2 pb-5">
        Order Details
      </h1>
      <div className="flex flex-col gap-3">
        {orderItems?.map((item) => {
          return (
            <div className="flex justify-between items-center m-2 p-3 rounded-lg border-b-2  py-7 ">
              {console.log(orderItems)}
              {console.log(order)}
              <img
                alt="alt"
                src={item.product.image}
                className="w-24 h-24 rounded-2xl"
              />
              <div className="flex flex-col">
                <div
                  title={item.product.name}
                  className="pb-4 font-bold w-60 truncate"
                >
                  {item.product.name}
                </div>
                <div>Brand : {item.product.brand}</div>
                <div>Color : {item.product.color}</div>
                <div>Category : {item.product.category}</div>
              </div>
              <div>$ {item.product.price}</div>
              <div>{item.qty}</div>
              <div>${item.product.price * item.qty}</div>
            </div>
          );
        })}
      </div>
      <div className="border-2 p-3 rounded-xl my-3">
        <div className=" flex justify-between items-center">
          <div className="flex flex-col gap-4">
            <div className="text-slate-400">Address</div>
            <div className="font-bold">{order?.shippingAddress?.address}</div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-slate-400">Subtotal</div>
            <div className="font-bold mx-auto">$ {order?.totalPrice}</div>
          </div>
        </div>
        <div className=" flex justify-between items-center">
          <div className="flex flex-col gap-4 my-7">
            <div className="text-slate-400">Postal Code</div>
            <div className="font-bold mx-auto">
              {order?.shippingAddress?.postalCode}
            </div>
          </div>
          <div className="flex flex-col gap-4 my-3">
            <div className="text-slate-400">Payment Method</div>
            <div className="font-bold mx-auto">{order?.paymentMethod}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
