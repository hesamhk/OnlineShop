import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Redux/action";
import * as Yup from "yup";
import { FaExclamation } from "react-icons/fa";
import Loading from "./Pulse-1s-200px.svg";
import { ToastContainer, toast } from "react-toastify";

function ChangeProfile() {
  const { user, loading, error, success } = useSelector(
    (state) => state.changeprofile
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
      toast.success(user.message, {
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
      firstname: "",
      lastname: "",
      gender: "",
      age: "",
      city: "",
    },
    onSubmit: (values) => {
      dispatch(
        changeProfile(
          values.firstname,
          values.lastname,
          values.gender,
          values.age,
          values.city
        )
      );
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .required("Required")
        .min(3, "contain at least three letters"),
      lastname: Yup.string()
        .required("Required")
        .min(3, "contain at least three letters"),
      age: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
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
              <div className=" text-2xl  font-bold">Change Profile</div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit(e);
                }}
                className="flex flex-col m-4 border-2 p-10 rounded-lg"
              >
                <div>FirstName :</div>
                <input
                  placeholder="First Name"
                  className="mt-3 p-2 outline-none border-2 rounded-md focus:border-black"
                  {...formik.getFieldProps("firstname")}
                />
                {formik.touched.firstname && formik.errors.firstname ? (
                  <div className="flex items-center gap-2 text-yellow-500 bg-yellow-100 p-2 rounded-xl mt-2">
                    <FaExclamation />
                    <div>{formik.errors.firstname}</div>
                  </div>
                ) : null}
                <div className="mt-4">Last Name :</div>
                <input
                  placeholder="Last Name"
                  className="mt-3 p-2 outline-none border-2 rounded-md focus:border-black"
                  {...formik.getFieldProps("lastname")}
                />
                {formik.touched.lastname && formik.errors.lastname ? (
                  <div className="flex items-center gap-2 text-yellow-500 bg-yellow-100 p-2 rounded-xl mt-2">
                    <FaExclamation />
                    <div>{formik.errors.lastname}</div>
                  </div>
                ) : null}
                <div className="mt-4">Gender :</div>
                <input
                  placeholder="Gender"
                  className="mt-3 p-2 outline-none border-2 rounded-md focus:border-black"
                  {...formik.getFieldProps("gender")}
                />
                <div className="mt-4">Age :</div>
                <input
                  placeholder="Age"
                  className="mt-3 p-2 outline-none border-2 rounded-md focus:border-black"
                  {...formik.getFieldProps("age")}
                />
                {formik.touched.age && formik.errors.age ? (
                  <div className="flex items-center gap-2 text-yellow-500 bg-yellow-100 p-2 rounded-xl mt-2">
                    <FaExclamation />
                    <div>{formik.errors.age}</div>
                  </div>
                ) : null}
                <div className="mt-4">City :</div>
                <input
                  placeholder="City"
                  className="mt-3 p-2 outline-none border-2 rounded-md focus:border-black"
                  {...formik.getFieldProps("city")}
                />
                {formik.touched.city && formik.errors.city ? (
                  <div className="flex items-center gap-2 text-yellow-500 bg-yellow-100 p-2 rounded-xl mt-2">
                    <FaExclamation />
                    <div>{formik.errors.city}</div>
                  </div>
                ) : null}
                <button
                  type="submit"
                  className="bg-blue-500 rounded-lg p-2 text-white w-36 mx-auto mt-4 hover:bg-blue-400 transition-all duration-200"
                >
                  Save
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ChangeProfile;
