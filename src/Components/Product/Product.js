import React, { useState } from "react";
import { TbCar } from "react-icons/tb";
import { BsAirplaneEngines } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { addToCart } from "../../Redux/action";

function Product({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const { cartItems } = useSelector((state) => state.cart);
  const itemInCart = cartItems?.find((item) => item.product === product._id);

  const addToCartHandler = () => {
    if (itemInCart) {
      toast.error("This product is already in your cart.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } else {
      dispatch(addToCart(product._id, qty));
    }
  };

  return (
    <div className="flex flex-col gap-6 w-72 shadow-xl rounded-md h-[33rem] mt-5 hover:mt-1 transition-all duration-200">
      <ToastContainer />
      <div className="text-red-500 text-xl font-semibold p-4 font-['Grand_Hotel']">
        Special Sale
      </div>
      <div>
        <img
          src={product.image}
          alt="alt"
          className="h-48 w-48 rounded-lg ml-12 cursor-pointer"
          onClick={() => navigate(`/productDetails/${product._id}`)}
        />
      </div>
      <div className="flex items-center gap-2 bg-slate-100 w-36 p-2 rounded-lg mx-4">
        <TbCar className="text-red-600 text-xl" />
        <div className=" text-slate-500">Free Delivery</div>
      </div>
      <div
        className="text-md pl-4 font-['couture'] truncate"
        title={product.name}
      >
        {product.name}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center gap-2 pl-2">
          <BsAirplaneEngines className="text-blue-700" />
          <div className="text-sm">Shipping Today</div>
        </div>
        <div className="flex items-center gap-2 pr-2">
          <AiFillStar className="text-yellow-400" />
          <div className="text-sm">{product.rating}</div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="pl-2 font-['Futura'] flex items-center gap-3">
          <div>$ {product.price}</div>
          <button
            disabled={product.countInStock === 0}
            className="text-xl cursor-pointer bg-slate-600 p-2 w-9 h-9 rounded-xl text-slate-100 hover:bg-slate-400 hover:text-slate-200 transition-all duration-200 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-default"
            onClick={addToCartHandler}
          >
            <BsCartPlus />
          </button>
        </div>
        <div className="mr-2 bg-red-500 text-white p-1 rounded-2xl">50%</div>
      </div>
    </div>
  );
}

export default Product;
