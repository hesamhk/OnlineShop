import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderAction } from "../../Redux/action";
import * as Yup from "yup";
import { FaExclamation } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "./Pulse-1s-200px.svg";
import { ToastContainer, toast } from "react-toastify";

function Address() {
  const { order, loading, error } = useSelector((state) => state.order);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [orderItems, setOrderItems] = useState([]);
  const navigate = useNavigate();

  const isLogin = userInfo?.user?.token;

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, []);

  const totalP = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.qty,
    0
  );

  const formik = useFormik({
    initialValues: {
      city: "",
      postalCode: "",
      phoneNumber: "",
      address: "",
    },
    onSubmit: (values) => {
      dispatch(
        orderAction(
          orderItems,
          values.address,
          values.city,
          values.postalCode,
          values.phoneNumber,
          totalP
        )
      );
      navigate("/checkout");
    },
    validationSchema: Yup.object({
      city: Yup.string().required("Required"),
      postalCode: Yup.string().required("Required"),
      phoneNumber: Yup.string()
        .required("Required")
        .matches(
          /(0|\+98)?([ ]|,|-|[()]){0,2}9[1|2|3|4]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}/,
          "Invalid Mobile Number"
        ),
      address: Yup.string()
        .required("Required")
        .min(10, "Must be at least 10 characters"),
    }),
  });

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[100vh] mx-auto">
          <img alt="Loading" src={Loading} width={100} height={100} />
        </div>
      ) : error ? (
        (toast.error(error.message, {
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
        <div
          className="container mx-auto w-full h-[100%] my-10 pr-6 py-5 rounded-xl font-['Quicksand'] "
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <h1 className="pl-28 pt-28  text-2xl font-semibold">
            Add New Address
          </h1>
          <form
            className="flex flex-col gap-4 pl-28 pt-14"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
          >
            <input
              placeholder="City"
              className="p-2 outline-none border-2 border-black rounded-lg w-72"
              {...formik.getFieldProps("city")}
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="flex items-center gap-2 text-yellow-500 bg-yellow-100 p-2 rounded-xl w-72">
                <FaExclamation />
                <div>{formik.errors.city}</div>
              </div>
            ) : null}
            <input
              placeholder="Postal Code"
              className="p-2 outline-none border-2 border-black rounded-lg w-96"
              {...formik.getFieldProps("postalCode")}
            />
            {formik.touched.postalCode && formik.errors.postalCode ? (
              <div className="flex items-center gap-2 text-yellow-500 bg-yellow-100 p-2 rounded-xl w-96">
                <FaExclamation />
                <div>{formik.errors.postalCode}</div>
              </div>
            ) : null}
            <input
              placeholder="Phone Number"
              className="p-2 outline-none border-2 border-black rounded-lg w-96"
              {...formik.getFieldProps("phoneNumber")}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="flex items-center gap-2 text-yellow-500 bg-yellow-100 p-2 rounded-xl w-96">
                <FaExclamation />
                <div>{formik.errors.phoneNumber}</div>
              </div>
            ) : null}
            <input
              placeholder="Address"
              className="pl-2 h-36 pt-2  outline-none border-2 border-black rounded-lg resize-none"
              {...formik.getFieldProps("address")}
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="flex items-center gap-2 text-yellow-500 bg-yellow-100 p-2 rounded-xl">
                <FaExclamation />
                <div>{formik.errors.address}</div>
              </div>
            ) : null}
            <button
              type="submit"
              className="bg-black text-white rounded-xl p-3 w-28 mx-auto hover:bg-slate-500 active:bg-slate-700 disabled:bg-slate-400"
              disabled={!formik.isValid}
              onClick={() => {
                cartItems.map((item) => {
                  orderItems.push({ product: item.product, qty: item.qty });
                });
              }}
            >
              Next
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Address;
