import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../../Redux/action";
import Loading from "./Pulse-1s-200px.svg";
import { ToastContainer, toast } from "react-toastify";
import { IoIosArrowRoundBack } from "react-icons/io";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { IoIosWarning } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { addToCart } from "../../Redux/action";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productdetails
  );
  const { cartItems } = useSelector((state) => state.cart);
  const itemInCart = cartItems?.find((item) => item.product === id);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [id]);

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
      dispatch(addToCart(id, qty));
      navigate("/cart");
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[100vh]">
          <img alt="Loading" src={Loading} width={100} height={100} />
        </div>
      ) : error ? (
        toast.error(error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        })
      ) : (
        <div className="flex justify-between items-start">
          <ToastContainer />
          <div className="flex justify-center items-center h-[90vh] w-[50%]">
            <img
              alt="product"
              src={product.image}
              className=" rounded-xl h-[60%]"
            />
          </div>
          <div className="flex flex-col gap-3 w-[50%]">
            <div className="flex items-center gap-3 mt-28">
              <IoIosArrowRoundBack
                className="border-2 border-slate-600 rounded-full text-2xl w-10 h-10 p-2 cursor-pointer"
                onClick={() => navigate("/")}
              />
              <div className="font-[Arial_Narrow]">Back</div>
            </div>
            <div className="my-3 font-['impact'] text-2xl">{product.name}</div>
            <div className="font-['Avenir_Next_Condensed'] text-sm text-slate-500">
              {product.description}
            </div>
            <div className="flex items-center  mt-20 border-b-2 border-black w-[27rem] pb-3">
              <div className="text-sm">Delivery Time</div>
              <div className="font-bold text-sm pl-72">Today</div>
            </div>
            <div className="flex items-center  border-b-2 border-black w-[27rem] pb-3">
              <div className="text-sm">Count in Stock</div>
              <div className="ml-[290px] font-bold">
                {product.countInStock} Pcs
              </div>
            </div>
            <div className="flex items-center border-b-2 border-black w-[27rem] pb-3 pt-3">
              <div className="text-sm">Price</div>
              <div className="font-bold text-sm ml-[360px]">
                ${product.price}
              </div>
            </div>
            {product.countInStock === 0 && (
              <div className="flex items-center gap-3 bg-yellow-100 p-2 text-yellow-400 rounded-xl w-[27rem]">
                <IoIosWarning />
                This Product is not available
              </div>
            )}

            <div className="flex items-center gap-2 m-12">
              <button
                disabled={product.countInStock === 0}
                className="flex items-center border-[1px] border-black rounded-full gap-3 p-2 cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-default"
                onClick={addToCartHandler}
              >
                <div className="text-2xl">Add To Cart</div>
                <IoCartOutline className="text-2xl bg-black text-white rounded-full p-1 w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
