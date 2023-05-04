import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../Redux/action";
import * as Yup from "yup";
import Loading from "./Pulse-1s-200px.svg";
import { ToastContainer, toast } from "react-toastify";
import { FaExclamation } from "react-icons/fa";

function ChangePassword() {
  const { pass, loading, error, success } = useSelector(
    (state) => state.changepassword
  );
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
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
    } else if (success) {
      setShowForm(false);
      toast.success(pass.message, {
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
  }, [dispatch, loading, error, success]);

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
    },
    onSubmit: (values) => {
      dispatch(changePassword(values.old_password, values.new_password));
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required("Required"),
      new_password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Invalid Password"
        ),
    }),
  });

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[100vh] mx-auto">
          <img alt="Loading" src={Loading} width={100} height={100} />
        </div>
      ) : (
        <>
          {error && <ToastContainer />}
          {success && <ToastContainer />}
          {showForm && (
            <div className="p-12 font-['Quicksand'] w-full ">
              <div className=" text-2xl  font-bold">ChangePassword</div>
              <form
                className="flex flex-col m-4 border-2 p-10 rounded-lg"
                onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit(e);
                }}
              >
                <div>Old Password :</div>
                <input
                  type="password"
                  placeholder="Old Password"
                  className="mt-3 p-2 outline-none border-2 rounded-md focus:border-black"
                  {...formik.getFieldProps("old_password")}
                />
                {formik.touched.old_password && formik.errors.old_password ? (
                  <div className="flex items-center gap-2 text-yellow-500 bg-yellow-100 p-2 rounded-xl mt-2">
                    <FaExclamation />
                    <div>{formik.errors.old_password}</div>
                  </div>
                ) : null}
                <div className="mt-4">New Password :</div>
                <input
                  type="password"
                  placeholder="New Password"
                  className="mt-3 p-2 outline-none border-2 rounded-md focus:border-black"
                  {...formik.getFieldProps("new_password")}
                />
                {formik.touched.new_password && formik.errors.new_password ? (
                  <div className="flex items-center gap-2 text-yellow-500 bg-yellow-100 p-2 rounded-xl mt-2">
                    <FaExclamation />
                    <div>{formik.errors.new_password}</div>
                  </div>
                ) : null}
                <button
                  type="submit"
                  className="bg-blue-500 rounded-lg p-2 text-white w-36 mx-auto mt-4 hover:bg-blue-400 transition-all duration-200"
                >
                  Edit
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ChangePassword;
