import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/action";
import Product from "../Product/Product";
import { ToastContainer, toast } from "react-toastify";
import Loading from "./Pulse-1s-200px.svg";

const Main = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div className="container mx-auto my-10">
      <div className="flex-col gap-3">
        <div className="flex gap-1 text-2xl">
          All <div className="font-bold">Prodcuts</div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-[100vh]">
            <img alt="Loading" src={Loading} width={100} height={100} />
          </div>
        ) : error ? (
          (toast.error(error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
          }),
          (<ToastContainer />))
        ) : (
          <div className="flex items-center gap-7 flex-wrap my-10">
            {products.map((product) => {
              return <Product product={product} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
