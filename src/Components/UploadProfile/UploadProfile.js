import React, { useEffect, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { uploadProfile } from "../../Redux/action";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loading from "./Pulse-1s-200px.svg";

function UploadProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { upload, loading, error, success } = useSelector(
    (state) => state.uploadprofile
  );
  const { userInfo } = useSelector((state) => state.login);
  const isLogin = userInfo?.user?.token;
  const [showForm, setShowForm] = useState(true);

  const [pic, setPic] = useState(null);

  const formData = new FormData();
  formData.append("profile-image", pic);

  useEffect(() => {
    if (!isLogin) {
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
    } else if (success) {
      setShowForm(false);
      toast.success(upload.message, {
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
  }, [navigate, dispatch, loading, error, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(uploadProfile(formData));
  };
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
            <form className="flex flex-col w-1/2 mx-auto bg-slate-300 my-20 rounded-xl font-['Quicksand']">
              <div className="mx-auto pt-7 text-2xl font-bold">
                Upload Your Image Profile
              </div>
              <div className="mx-auto mt-4 text-slate-500">
                JPG, PNG files are allowed
              </div>
              <label className="flex flex-col bg-slate-200 mt-10 p-8 m-14 rounded-xl cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    setPic(e.target.files[0]);
                  }}
                ></input>
                <MdCloudUpload className="mx-auto w-16 h-16" />
                <div className="mx-auto mt-4">
                  Please Click and Upload Your File.
                </div>
              </label>
              <button
                type="submit"
                className="bg-slate-500 w-40 p-3 rounded-lg mx-auto mb-4 hover:bg-slate-400 text-slate-200 transition-all duration-200"
                onClick={submitHandler}
              >
                Done
              </button>
            </form>
          )}
        </>
      )}
    </>
  );
}

export default UploadProfile;
