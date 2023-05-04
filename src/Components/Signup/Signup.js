import React, { useEffect, useState } from "react";
import Setup from "./6971baf7fbf7ea34f04d4e22af50e49a.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { userSignup } from "../../Redux/action";
import * as Yup from "yup";
import { FaExclamation } from "react-icons/fa";
import Loading from "./Pulse-1s-200px.svg";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const { userInfo, loading, error, success } = useSelector(
    (state) => state.signup
  );
  const dispatch = useDispatch();

  const isSignup = localStorage.getItem("userInfo");
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    if (isSignup) {
      navigate("/");
    }
    if (error) {
      setShowForm(false);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      setShowForm(true);
    } else {
      setShowForm(true);
    }
  }, [dispatch, navigate, isSignup, loading, error]);

  if (success) {
    toast.success("Registration was successful", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobile: "",
    },
    onSubmit: (values) => {
      dispatch(
        userSignup(
          values.username,
          values.email,
          values.password,
          values.mobile
        )
      );
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, "Must be 20 charecter")
        .min(7, "It must be at least 7 letters")
        .matches(/^[a-z0-9_\.]+$/, "Invalid Username")
        .required("Required"),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email")
        .required("Requierd"),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Invalid Password"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      mobile: Yup.string()
        .required("Required")
        .matches(
          /(0|\+98)?([ ]|,|-|[()]){0,2}9[1|2|3|4]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}/,
          "Invalid Mobile Number"
        ),
    }),
  });

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[100vh]">
          <img alt="Loading" src={Loading} width={100} height={100} />
        </div>
      ) : (
        <>
          {error && <ToastContainer />}
          {showForm && (
            <div className="flex items-start">
              <div className="w-[50%] h-[100%]">
                <img
                  alt="alt"
                  src={Setup}
                  className=" w-full h-[100vh] rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col w-[50%]">
                <div className="font-['kodchasan'] font-bold text-5xl m-14">
                  Sign Up
                </div>
                <form
                  className="flex flex-col gap-8"
                  onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit(e);
                  }}
                >
                  <div className="flex items-center gap-14 ml-14   font-['kodchasan']">
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        placeholder="Username"
                        className="border-b-2 outline-none p-2 focus:border-black"
                        {...formik.getFieldProps("username")}
                      />
                      {formik.touched.username && formik.errors.username ? (
                        <div className="flex items-center gap-2 text-yellow-500 bg-yellow-100 p-2 rounded-xl">
                          <FaExclamation />
                          <div>{formik.errors.username}</div>
                        </div>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        placeholder="Email"
                        className="border-b-2 outline-none p-2 w-96 focus:border-black"
                        {...formik.getFieldProps("email")}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="flex items-center gap-2 text-yellow-500 bg-yellow-100 p-2 rounded-xl">
                          <FaExclamation />
                          <div>{formik.errors.email}</div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="border-b-2 outline-none p-2 ml-14 font-['kodchasan'] w-2/3 focus:border-black"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="flex items-center gap-2 text-yellow-500 bg-yellow-100 p-2 ml-12 w-2/3 rounded-xl">
                      <FaExclamation />
                      <div>{formik.errors.password}</div>
                    </div>
                  ) : null}
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="border-b-2 outline-none p-2 ml-14 font-['kodchasan'] w-2/3 focus:border-black"
                    {...formik.getFieldProps("confirmPassword")}
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="flex items-center gap-2 text-yellow-500 bg-yellow-100 p-2 ml-12 w-2/3 rounded-xl">
                      <FaExclamation />
                      <div>{formik.errors.confirmPassword}</div>
                    </div>
                  ) : null}
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="border-b-2 outline-none p-2 ml-14 font-['kodchasan'] w-2/3 focus:border-black"
                    {...formik.getFieldProps("mobile")}
                  />
                  {formik.touched.mobile && formik.errors.mobile ? (
                    <div className="flex items-center gap-2 text-yellow-500 bg-yellow-100 p-2 ml-12 w-2/3 rounded-xl">
                      <FaExclamation />
                      <div>{formik.errors.mobile}</div>
                    </div>
                  ) : null}
                  <button
                    type="submit"
                    className="bg-black text-white p-3 rounded-full w-52 ml-14  font-['kodchasan'] text-xl hover:bg-gray-700"
                  >
                    Sign Up
                  </button>
                  <ToastContainer />
                </form>
                <div className="flex justify-start items-center font-['kodchasan'] h-10 ml-14">
                  Do you have an Account ?
                  <div
                    className="cursor-pointer hover:border-b-[1px] border-cyan-500 hover:text-sky-500 ml-2"
                    onClick={() => navigate("/login")}
                  >
                    Log in
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Signup;
