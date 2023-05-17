import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../Redux/action";
import Loading from "./Pulse-1s-200px.svg";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import cartEmpty from "./empty-cart.svg";


function AllOrder() {
  const { order, loading, error } = useSelector((state) => state.allorder);
  const { userInfo } = useSelector((state) => state.login);
  
  const isLogin = userInfo?.user?.token;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
    dispatch(getAllOrder());
  }, []);

  return (
    <>
      {order === undefined ? (
        <div className="flex flex-col gap-3 container mx-auto w-[100%] text-center bg-slate-300 p-10 rounded-xl font-['futura'] text-2xl my-20">
          <img
            alt="cart empty"
            src={cartEmpty}
            width={200}
            height={200}
            className="mx-auto"
          />
          <div>Your order is Empty!</div>
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
            Order History
          </h1>
          <div className="flex flex-col gap-3 font-['Quicksand']">
            {order?.map((item) => {
              return (
                <div className="border-b-2">
                  {item.orderItems.map((item2) => {
                    return (
                      <div
                        className="flex justify-between items-center m-2 p-3 rounded-lg  py-7 cursor-default "
                        onClick={() => navigate(`/orderDetails/${item._id}`)}
                      >
                        <img
                          alt="alt"
                          src={item2.product.image}
                          className="w-24 h-24 rounded-2xl"
                        />
                        <div className="flex flex-col">
                          <div
                            title={item2.product.name}
                            className="pb-4 font-bold w-60 truncate"
                          >
                            {item2.product.name}
                          </div>
                          <div>Brand : {item2.product.brand}</div>
                          <div>Color : {item2.product.color}</div>
                        </div>
                        <div>$ {item2.product.price}</div>
                        <div>{item2.qty}</div>
                        <div>${item2.product.price * item2.qty}</div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default AllOrder;
