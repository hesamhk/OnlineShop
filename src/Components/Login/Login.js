import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { RxPerson } from "react-icons/rx";
import { TfiKey } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../Redux/action";
import { FaExclamation } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";
import Loading from "./Pulse-1s-200px.svg";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.login);

  const isLogin = userInfo?.user;
  const [showForm, setShowForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isLogin) {
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
  }, [dispatch, navigate, isLogin, loading, error]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(userLogin(values.email, values.password));
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email")
        .required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Invalid Password"
        )
        .required("Required"),
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
            <div className="flex flex-col items-center mt-40">
              <div className=" mt-auto text-5xl font-bold font-['kodchasan'] ">
                Login
              </div>
              <form
                // key={error}
                className="flex flex-col gap-6 mx-auto mt-16  "
                onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit(e);
                }}
              >
                <div className="flex justify-between items-center border-2 border-black rounded-full p-2 w-96">
                  <input
                    placeholder="Email"
                    className="outline-none py-2 px-2 font-['kodchasan'] w-full"
                    {...formik.getFieldProps("email")}
                  />
                  <RxPerson className="w-8 h-6 mr-4 text-slate-400" />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="flex items-center gap-2 text-yellow-500 bg-yellow-100 p-2 rounded-xl">
                    <FaExclamation />
                    <div>{formik.errors.email}</div>
                  </div>
                ) : null}
                <div className="flex justify-between items-center border-2 border-black rounded-full p-2 w-96">
                  <input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    className="outline-none py-2 px-2 font-['kodchasan'] w-full"
                    {...formik.getFieldProps("password")}
                  />
                  {showPassword ? (
                    <BsEyeFill
                      className="w-8 h-6 mr-2 text-slate-400"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <BsEyeSlashFill
                      className="w-8 h-6 mr-2 text-slate-400"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="flex items-center gap-2 text-yellow-500 bg-yellow-100 p-2 rounded-xl">
                    <FaExclamation />
                    <div>{formik.errors.password}</div>
                  </div>
                ) : null}
                <button
                  type="submit"
                  className="bg-black text-white py-2 rounded-full text-2xl w-1/2 mx-auto hover:bg-gray-700 transition-all duration-200"
                >
                  Login
                </button>
              </form>
              <div className="flex justify-start items-center mt-4 font-['kodchasan'] h-10">
                Do you not have an account?
                <div
                  className="cursor-pointer hover:border-b-[1px] border-cyan-500 hover:text-sky-500 hove ml-2 transition-all duration-100"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {/* {error && !loading && (
        <div className="flex flex-col items-center mt-40">
          <div className=" mt-auto text-5xl font-bold font-['kodchasan'] ">
            Login
          </div>
          <form
            className="flex flex-col gap-6 mx-auto mt-16  "
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
          >
            <div className="flex justify-between items-center border-2 border-black rounded-full p-2 w-96">
              <input
                placeholder="Email"
                className="outline-none py-2 px-2 font-['kodchasan'] w-full"
                {...formik.getFieldProps("email")}
              />
              <RxPerson className="w-8 h-6 mr-4 text-slate-400" />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="flex items-center gap-2 text-yellow-500 bg-yellow-100 p-2 rounded-xl">
                <FaExclamation />
                <div>{formik.errors.email}</div>
              </div>
            ) : null}
            <div className="flex justify-between items-center border-2 border-black rounded-full p-2 w-96">
              <input
                placeholder="Password"
                type="password"
                className="outline-none py-2 px-2 font-['kodchasan'] w-full"
                {...formik.getFieldProps("password")}
              />
              <TfiKey className="w-8 h-6 mr-2 text-slate-400 rotate-[135deg]" />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="flex items-center gap-2 text-yellow-500 bg-yellow-100 p-2 rounded-xl">
                <FaExclamation />
                <div>{formik.errors.password}</div>
              </div>
            ) : null}
            <button
              type="submit"
              className="bg-black text-white py-2 rounded-full text-2xl w-1/2 mx-auto hover:bg-gray-700"
            >
              Login
            </button>
          </form>
          <div className="flex justify-start items-center mt-4 font-['kodchasan'] h-10">
            Do you have an Account ?
            <div
              className="cursor-pointer hover:border-b-[1px] border-cyan-500 hover:text-sky-500 hove ml-2"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

export default Login;
