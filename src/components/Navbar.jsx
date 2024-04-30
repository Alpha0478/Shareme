import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TfiClose, TfiMenu } from "react-icons/tfi";
import { IoMdAdd } from "react-icons/io";
import { TfiSearch } from "react-icons/tfi";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";

const Navbar = ({ setToggleAddpost, toggleSidebar, setToggleSidebar }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleClear = () => {
    document.querySelector("#input").value = "";
    setSearch("");
  };

  const handleUplodBtnClick = () => {
    if (currentUser) {
      setToggleAddpost(true);
    } else {
      navigate("/signin");
    }
  };
  return (
    <div className=" bg-white dark:bg-black text-black dark:text-white lg:mx-4 z-10 flex fixed items-center top-0 right-0 left-0 justify-center lg:border-b-[3px] border-[#f5f5f5] dark:border-[#202020] h-[50px] lg:h-[60px]">
      <div className="hidden lg:flex">
        <div className=" h-[45px] items-center flex flex-row absolute left-16 justify-center">
          <img src={logo} alt="logo" className="w-32" />
        </div>
        <div className="flex relative">
          <input
            className="flex flex-row items-center  justify-center bg-[#f5f5f5] dark:bg-[#202020] pl-[25px] dark:bg-[#202020] h-[45px] rounded-full font-base text-lg w-[500px] outline-none items-center "
            id="input"
            type="text"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex flex-row items-center h-full px-[10px] absolute right-0">
            <div className=" gap-[20px] flex flex-row h-[85%] w-full px-[20px] items-center border-l-[1px] border-[#606060]">
              <TfiClose
                fontSize={10}
                onClick={handleClear}
                className="cursor-pointer hover:text-[#00acee]"
              />
              <TfiSearch className="text-xl font-bold cursor-pointer hover:text-[#00acee]" />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex absolute right-6">
        <div className="flex flex-row justify-around items-center gap-[20px]">
          <button
            className="bg-[#e5e5e5] dark:bg-[#202020] hover:bg-[#00acee] hover:text-white flex  flex-row items-center justify-center w-[90px] h-[40px] rounded-lg p-[2px] font-lg"
            onClick={() => {
              handleUplodBtnClick();
            }}
          >
            {currentUser ? (
              <>
                <IoMdAdd fontSize={20} />
                <text className="font-bold">Upload</text>
              </>
            ) : (
              <text className="font-bold">Login</text>
            )}
          </button>
        </div>
      </div>

      <div className="text-[#606060] dark:text-[#999] flex  sm:hidden absolute w-full h-full  border-b-2  border-[#f5f5f5] dark:border-[#202020]">
        <div className="w-full h-full items-center flex flex-row justify-around ">
          <div
            className="z-0 flex flex-col relative items-center cursor-pointer px-0"
            alt="Menu button"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          >
            <TfiMenu fontSize={25} />
          </div>
          <Link to="/">
            <img src={logo} alt="logo" className="w-32" />
            {/* LOGO */}
            {/* <div className="text-black dark:text-white flex flex-row relative items-center cursor-pointer gap-2">
              <div className="flex w-[30px] h-[30px] border-2 items-center justify-center rounded-lg border-black dark:border-white">
                <div className=" bg-[#cc1a00] w-[15px] h-[15px] rounded-full "></div>
              </div>
               <text className="text-[25px]">Notify</text>
            </div> */}
            <div className="text-black dark:text-white flex flex-row relative items-center cursor-pointer gap-2">
              {/* <div className="flex w-[30px] h-[30px] border-2 items-center justify-center rounded-lg border-black dark:border-white">
                <div className=" bg-[#cc1a00] w-[15px] h-[15px] rounded-full "></div>
              </div> */}
              {/* <text className="text-[25px]">Symow</text> */}
            </div>
          </Link>
          {currentUser ? (
            <div className="flex flex-row gap-5">
              <div
                className="mt-0.5 flex flex-col relative items-center"
                alt="Search button"
              >
                <TfiSearch className="cursor-pointer" fontSize={20} />
              </div>

              <div className="flex flex-col relative items-center cursor-pointer">
                <button
                  className="border-2 p-[2px] rounded-full border-[#606060] dark:border-[#999]"
                  aria-label="Upload button"
                  onClick={() => {
                    handleUplodBtnClick();
                  }}
                >
                  <IoMdAdd fontSize={15} />
                </button>
              </div>
            </div>
          ) : (
            <button
              className="bg-[#e5e5e5] dark:bg-[#202020] hover:bg-[#00acee] hover:text-white flex  flex-row items-center justify-center w-[90px] h-[40px] rounded-lg p-[2px] font-lg"
              onClick={() => {
                handleUplodBtnClick();
              }}
            >
              <text className="font-bold">Login</text>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
