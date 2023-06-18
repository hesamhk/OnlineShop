import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { SlSettings } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { SlLogout } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { getProducts, getProfile, userLogout } from "../../Redux/action";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const searchRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState([]);
  const [isProfileFetched, setProfileFetched] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    dispatch(getProducts());

    if (!isProfileFetched) {
      dispatch(getProfile());
      setProfileFetched(true);
    }

    const token = user?.user?.token;
    const tokenExpired = token && new Date().getTime() >= token.expiresIn;
    if (tokenExpired) {
      dispatch(userLogout());
    }

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, isProfileFetched]);

  useEffect(() => {
    if (searchValue.length > 0) {
      setOpenSearch(true);
    }

    if (searchValue.length > 0) {
      const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchValue);
      });
      setResult(filteredProducts);
    } else {
      setResult([]);
    }

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [products, searchValue]);

  return (
    <div className="flex justify-between items-center  p-3 shadow-md rounded-lg sticky top-0 bg-white w-full">
      <div
        className=" text-2xl cursor-pointer font-['Bruno_Ace_SC']"
        onClick={() => navigate("/")}
      >
        Hesam Shopping
      </div>
      <div className="flex flex-col">
        <div className="flex items-center border-black border-2 p-2 rounded-lg ">
          <BsSearch />
          <input
            type="text"
            placeholder="Search Product ..."
            className="rounded-lg pl-5 w-96 outline-none "
            value={searchValue}
            onChange={handleChange}
          />
        </div>
        {openSearch ? (
          <ul
            ref={searchRef}
            className="absolute top-[65px] bg-slate-50 rounded-b-lg  max-h-80 w-[420px] overflow-scroll"
          >
            {result.map((item) => {
              return (
                <li
                  onClick={() => {
                    navigate(`productDetails/${item._id}`);
                    setOpenSearch(false);
                    setSearchValue("");
                  }}
                  className="flex justify-start items-center px-3 py-4 border-b-[1px] border-slate-300 cursor-pointer hover:bg-slate-200 transition-all duration-200"
                >
                  <img alt="alt" src={item.image} className="w-1/4 h-20" />
                  <div className="truncate pl-6" title={item.name}>
                    {item.name}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
      <div className="flex justify-evenly items-center">
        <div className="relative">
          <BsCart3
            className=" border-r-2 border-slate-300 m-4 w-10 h-6 pr-2 cursor-pointer hover:text-gray-500 transition-all duration-200"
            onClick={() => navigate("cart")}
          />
          <div className=" absolute top-2 right-[25px] bg-black rounded-full text-white px-1 text-xs">
            {cartItems?.length}
          </div>
        </div>
        <>
          {userInfo?.user ? (
            <>
              <div className="bg-slate-100 p-2 rounded-lg flex items-center gap-2 font-['kodchasan'] cursor-pointer hover:bg-slate-200 transition-all duration-200">
                <div onClick={() => setOpen(!open)}>{userInfo.user.email}</div>
                {open ? (
                  <IoCloseOutline
                    className="transition-all duration-300 "
                    onClick={() => setOpen(false)}
                  />
                ) : (
                  <IoIosArrowDown
                    className="transition-all duration-300 "
                    onClick={() => setOpen(true)}
                  />
                )}
              </div>
              <>
                {open ? (
                  <ul
                    ref={menuRef}
                    className=" bg-slate-100 w-56 rounded-xl absolute right-1 top-16 font-['kodchasan'] opacity-70"
                  >
                    <div
                      className="flex items-center gap-3 w-full hover:bg-slate-200 p-1 rounded-xl cursor-pointer transition-all duration-200 "
                      onClick={() => {
                        navigate("profile");
                        setOpen(false);
                      }}
                    >
                      <CgProfile className="w-5 h-6" />
                      <li
                        className="py-2"
                        onClick={() => {
                          navigate("profile");
                          setOpen(false);
                        }}
                      >
                        Profile
                      </li>
                    </div>
                    <div
                      className="flex items-center gap-3 w-full hover:bg-slate-200 p-1 rounded-xl cursor-pointer transition-all duration-200"
                      onClick={() => {
                        navigate("allorder");
                        setOpen(false);
                      }}
                    >
                      <AiOutlineUnorderedList className="w-5 h-6" />
                      <li className="py-2 ">Order</li>
                    </div>
                    <div
                      className="flex items-center gap-3 w-full hover:bg-slate-200 p-1 rounded-xl cursor-pointer transition-all duration-200"
                      onClick={() => {
                        navigate("setting");
                        setOpen(false);
                      }}
                    >
                      <SlSettings className="w-5 h-6" />
                      <li
                        className="py-2 "
                        onClick={() => {
                          navigate("setting");
                          setOpen(false);
                        }}
                      >
                        Setting
                      </li>
                    </div>
                    <div
                      className="flex items-center gap-3 w-full hover:bg-slate-200 p-1 rounded-xl cursor-pointer transition-all duration-200"
                      onClick={() => dispatch(userLogout())}
                    >
                      <SlLogout className="w-5 h-6" />
                      <li className="py-2 ">LogOut</li>
                    </div>
                  </ul>
                ) : null}
              </>
            </>
          ) : (
            <div className="flex justify-between items-center">
              <button
                className="m-3 p-[5px] border-slate-400 border-2 bg-white rounded-md transition-all duration-200 hover:bg-slate-400 hover:text-white"
                onClick={() => navigate("login")}
              >
                Log in
              </button>
              <button
                className="bg-sky-500 p-2 rounded-md text-white transition-all duration-200 hover:bg-sky-400"
                onClick={() => navigate("signup")}
              >
                Signup
              </button>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default Header;
