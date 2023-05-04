import React from "react";
import { TbCar } from "react-icons/tb";
import { BsAirplaneEngines } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Product({ product }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6 w-72 shadow-xl rounded-md h-[32rem] cursor-pointer">
      <div className="text-red-500 text-xl font-semibold p-4 font-['Grand_Hotel']">
        Special Sale
      </div>
      <div>
        <img
          src={product.image}
          alt="alt"
          className="h-48 w-48 rounded-lg ml-12"
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
        <div className="pl-2 font-['couture']">$ {product.price}</div>
        <div className="mr-2 bg-red-500 text-white p-1 rounded-2xl">50%</div>
      </div>
    </div>
  );
}

export default Product;
