import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Redux/action";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, loading, error } = useSelector((state) => state.user);
  const { userInfo } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const navigate= useNavigate()
  const isLogin = userInfo?.user?.token;

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
    dispatch(getProfile());
  }, [dispatch]);
  return (
    <div className="container mx-auto p-12 m-4 font-['Quicksand']">
      <div className="text-2xl font-semibold">My Profile</div>
      <div className="flex flex-col m-7 gap-3">
        <div className="flex items-start font-medium p-8 gap-4 border-2 rounded-xl">
          <img
            alt="profile"
            src={user?.user?.image}
            height={100}
            width={100}
            className="rounded-[100%]"
          />
          <div className="flex flex-col ">
            <div className="text-2xl">{user?.user?.username}</div>
            <div className="pt-3 text-slate-400">User Site</div>
          </div>
        </div>
        <div className="flex flex-col border-2 p-6 rounded-xl">
          <div className="text-xl font-semibold">Personal Information</div>
          <div className="flex items-center justify-between py-3">
            <div className="flex flex-col gap-1">
              <div className="text-slate-400">Fist Name</div>
              <div className="font-black mx-auto">{user?.user?.firstname}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-slate-400">Last Name</div>
              <div className="font-black mx-auto">{user?.user?.lastname}</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="text-slate-400">Email address</div>
              <div className="font-black">{user?.user?.email}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-slate-400">Phone Number</div>
              <div className="font-black mx-auto">{user?.user?.mobile}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col border-2 p-6 rounded-xl">
          <div className="text-xl font-blackold">Address</div>
          <div className="flex items-center justify-between py-3">
            <div className="flex flex-col gap-1">
              <div className="text-slate-400">Country</div>
              <div className="font-black">Iran</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-slate-400 mx-auto">City</div>
              <div className="font-black">{user?.user?.city}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
