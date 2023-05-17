import React from "react";

import { MdKeyboardArrowLeft } from "react-icons/md";
import { AiOutlineArrowUp } from "react-icons/ai";

const Footer = () => {
  const goTopCtrl = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="flex flex-col mt-5 font-['Quicksand']">
      <div className="flex justify-between items-center bg-slate-200 h-60">
        <div className="flex flex-col  gap-10 w-96 items-center p-2">
          <div className="font-['Bruno_Ace_SC'] text-2xl">Hesam Shopping</div>
          <div className="text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perspiciatis, cumque?
          </div>
        </div>

        <div>
          <h2 className="font-semibold">Quick Access</h2>
          <ul className="mt-3">
            <li>
              <a
                href={"/"}
                className=" flex items-center justify-end gap-2 transition-all duration-200 hover:gap-3 mt-1"
              >
                About
                <MdKeyboardArrowLeft className="transition-all duration-200 hover:text-yellow-500 text-2xl" />
              </a>
            </li>
            <li>
              <a
                href={"/"}
                className=" flex items-center justify-end gap-2 transition-all duration-200 hover:gap-3 mt-1"
              >
                Weblog
                <MdKeyboardArrowLeft className="transition-all duration-200 hover:text-yellow-500 text-2xl" />
              </a>
            </li>
            <li>
              <a
                href={"/"}
                className=" flex items-center justify-end gap-2 transition-all duration-200 hover:gap-3 mt-1"
              >
                Privacy
                <MdKeyboardArrowLeft className="transition-all duration-200 hover:text-yellow-500 text-2xl" />
              </a>
            </li>
            <li>
              <a
                href={"/"}
                className=" flex items-center justify-end gap-2 transition-all duration-200 hover:gap-3 mt-1"
              >
                Tell me
                <MdKeyboardArrowLeft className="transition-all duration-200 hover:text-yellow-500 text-2xl" />
              </a>
            </li>
          </ul>
        </div>
        <div className="mr-10">
          <h2 className="text-end font-semibold">Purchase Guide</h2>
          <ul className="mt-3">
            <li>
              <a
                href={"/"}
                className=" flex items-center justify-end gap-2 transition-all duration-200 hover:gap-3 mt-1"
              >
                Frequently Asked Questions
                <MdKeyboardArrowLeft className="transition-all duration-200 hover:text-yellow-500 text-2xl" />
              </a>
            </li>
            <li>
              <a
                href={"/"}
                className=" flex items-center justify-end gap-2 transition-all duration-200 hover:gap-3 mt-1"
              >
                How to buy?
                <MdKeyboardArrowLeft className="transition-all duration-200 hover:text-yellow-500 text-2xl" />
              </a>
            </li>
            <li>
              <a
                href={"/"}
                className=" flex items-center justify-end gap-2 transition-all duration-200 hover:gap-3 mt-1"
              >
                Rules for using products
                <MdKeyboardArrowLeft className="transition-all duration-200 hover:text-yellow-500 text-2xl" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="ml-2">
          <AiOutlineArrowUp
            onClick={() => goTopCtrl()}
            className="fixed left-4 bottom-2 bg-yellow-400 text-5xl rounded-lg p-2 cursor-pointer transition-all duration-300 hover:text-white hover:bg-slate-400"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
