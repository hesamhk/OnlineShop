import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import { minus, plus, removeProduct } from "../../Redux/action";
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import cartEmpty from "./empty-cart.svg";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const isLogin = userInfo?.user?.token;
  const isCartItems = localStorage.getItem("cartItems");

  const totalPrice = cartItems?.reduce(
    (acc, curr) => acc + curr.price * curr.qty,
    0
  );

  const removeProductHandler = (id) => {
    dispatch(removeProduct(id));
  };

  const onQtyChange = (index, quantity) => {
    setSelected(index);
    dispatch(
      quantity > cartItems[index].qty
        ? plus(cartItems[index].product)
        : minus(cartItems[index].product)
    );
  };

  return (
    <>
      {!isCartItems || cartItems.length === 0 ? (
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
      ) : (
        <div className="flex justify-between items-start">
          <div className="flex flex-col container m-12 my-14 w-[60%]">
            <div className="text-3xl font-semibold">Cart</div>
            <div className="flex justify-between items-center mt-7 pb-3 text-slate-400 ">
              <div>Product</div>
              <div>Quantity</div>
              <div>Price</div>
            </div>
            {cartItems.map((item, index) => {
              return (
                <div className="flex justify-between items-start border-t-2">
                  <div className="flex m-8">
                    <img
                      alt="product"
                      src={item.image}
                      className="w-24 h-24 rounded-2xl"
                    />
                    <div className="flex flex-col gap-3 ml-5">
                      <div
                        className="font-['Arial_Narrow'] w-48  truncate"
                        title={item.name}
                      >
                        {item.name}
                      </div>
                      <div className="text-slate-400">Black</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-5 items-center border-2 border-black  rounded-xl mt-8 mr-[350px]">
                      <AiOutlineMinusCircle
                        className={
                          item.qty === 1
                            ? "pointer-events-none text-2xl m-1 cursor-pointer opacity-25"
                            : "text-2xl m-1 cursor-pointer"
                        }
                        onClick={() => onQtyChange(index, item.qty - 1)}
                      />
                      <div>{item.qty}</div>
                      <AiFillPlusCircle
                        className={
                          item.countInStock <= item.qty
                            ? "pointer-events-none text-2xl m-1 cursor-pointer opacity-25"
                            : "text-2xl m-1 cursor-pointer"
                        }
                        onClick={() => onQtyChange(index, item.qty + 1)}
                      />
                    </div>
                    <div
                      className="flex gap-1 items-center m-3 cursor-pointer hover:text-slate-400 transition-all duration-200 w-1/5"
                      onClick={() => removeProductHandler(item.product)}
                    >
                      <RiDeleteBin5Line />
                      <div>Remove</div>
                    </div>
                  </div>
                  <div className="absolute right-[530px] mt-9 font-['Din_Alternate']">
                    ${item.price}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-2 m-12 my-32 w-[27%] border-2 p-4 rounded-xl">
            <div className="flex justify-between items-center">
              <div className="text-slate-500">Subtotal</div>
              <div className="font-['Din_Alternate']">
                ${Math.floor(totalPrice)}
              </div>
            </div>
            <div className="flex justify-between items-center my-3 border-b-2 border-dashed pb-5">
              <div className="text-slate-500">Discount</div>
              <div className="text-slate-500 font-['Din_Alternate']">$0</div>
            </div>
            <div className="flex justify-between items-center ">
              <div>Grand Total</div>
              <div className="font-['Din_Alternate']">
                ${Math.floor(totalPrice)}
              </div>
            </div>
            <button
              className="bg-black text-white rounded-xl p-3 mt-3 hover:bg-gray-700 transition-all duration-200"
              onClick={() => {
                if (!isLogin) {
                  navigate("/login");
                } else {
                  navigate("/address");
                }
              }}
            >
              Checkout Now
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
