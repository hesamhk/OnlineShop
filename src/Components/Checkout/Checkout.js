import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cartEmpty from "./empty-cart.svg";
import Loading from "./Pulse-1s-200px.svg";
import { cartItemsReset } from "../../Redux/action";
import { ToastContainer, toast } from "react-toastify";

function Checkout() {
  const { order, loading, error } = useSelector((state) => state.order);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isCartItems = localStorage.getItem("cartItems");

  const { userInfo } = useSelector((state) => state.login);
  const isLogin = userInfo?.user?.token;

  const handleDone = () => {
    dispatch(cartItemsReset());
    toast.success("Order placed successfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    <ToastContainer />;
    window.location.reload();
  };

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [cartItems, order, isCartItems]);

  return (
    <>
      {!order?.orderItems ? (
        <div className="flex flex-col gap-3 container mx-auto w-[100%] text-center bg-slate-300 p-10 rounded-xl font-['futura'] text-2xl my-20">
          <img
            alt="cart empty"
            src={cartEmpty}
            width={200}
            height={200}
            className="mx-auto"
          />

          <div>Your cart is Empty!</div>
        </div>
      ) : !isCartItems ? (
        <div className="flex flex-col gap-3 container mx-auto w-[100%] text-center bg-slate-300 p-10 rounded-xl font-['futura'] text-2xl my-20">
          <img
            alt="cart empty"
            src={cartEmpty}
            width={200}
            height={200}
            className="mx-auto"
          />

          <div>Your cart is Empty!</div>
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center h-[100vh]">
          <img alt="Loading" src={Loading} width={100} height={100} />
        </div>
      ) : error ? (
        <>
          {toast.error(error.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
          })}
          <ToastContainer />
        </>
      ) : (
        <div className="container mx-auto">
          <h1 className="text-2xl mt-20 font-['Quicksand'] font-bold border-b-2 pb-5">
            Checkout
          </h1>
          <div className="flex flex-col gap-3 font-['Quicksand']">
            {order?.orderItems?.map((item) => {
              return (
                <div className="flex justify-between items-center m-2 p-3 rounded-lg border-b-2  py-7 ">
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
                    <div>Address : {order.shippingAddress.address}</div>
                  </div>
                  <div>$ {item.product.price}</div>
                  <div>{item.qty}</div>
                  <div>${item.product.price * item.qty}</div>
                </div>
              );
            })}
            <div className="flex items-center mx-auto">
              <button
                className="bg-black text-white p-4 rounded-xl w-32 mx-10 hover:bg-gray-600"
                onClick={() => navigate("/cart")}
              >
                Edit
              </button>
              <button
                className="bg-black text-white p-4 rounded-xl w-32 mx-10 hover:bg-gray-600"
                onClick={handleDone}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
