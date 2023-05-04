import React, { useEffect } from "react";
import { IoIosArrowForward, IoIosOptions } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsPersonBoundingBox } from "react-icons/bs";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Setting() {
  const { userInfo } = useSelector((state) => state.login);

  const navigate = useNavigate();
  const isLogin = userInfo?.user?.token;

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex items-start">
      <div className="flex  flex-col left-0 w-[300px] h-[135vh] bg-slate-600 text-slate-300 text-xl font-['Quicksand'] rounded-tr-xl ">
        <div className="flex items-center gap-3 border-b-[1px] py-5 pl-3">
          <SlSettings />
          <div>Setting</div>
        </div>
        <div
          className="flex items-center gap-3 py-10 pl-3 hover:bg-slate-500 transition-all duration-200 rounded-lg cursor-pointer"
          onClick={() => navigate("/setting/changeprofile")}
        >
          <IoIosOptions />
          Change Profile
          <IoIosArrowForward />
        </div>
        <div
          className="flex items-center gap-3 pl-3 py-10 hover:bg-slate-500 transition-all duration-200  rounded-lg cursor-pointer"
          onClick={() => navigate("/setting/changepassword")}
        >
          <RiLockPasswordLine />
          Change Password
          <IoIosArrowForward />
        </div>
        <div
          className="flex items-center gap-3 pl-3 py-10 hover:bg-slate-500 transition-all duration-200  rounded-lg cursor-pointer"
          onClick={() => navigate("/setting/uploadprofile")}
        >
          <BsPersonBoundingBox />
          Upload Avatar
          <IoIosArrowForward />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Setting;
