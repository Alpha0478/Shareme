import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  TfiFlagAlt,
  TfiHelpAlt,
  TfiLock,
  TfiSettings,
} from "react-icons/tfi";
import axios from "axios";
import { logoutSucces } from "../redux/userSlice.js";
import Theme from './Theme.jsx'
import { RestartAnimation } from "../App.js";



const Sidebar = ({ setToggleSidebar}) => {
  const handleCloseSidebar = () => {
    setToggleSidebar(false);
  };
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (currentUser) {
      const res = await axios.get("/auth/logout");
      RestartAnimation({message:"Logout successful"})
      dispatch(logoutSucces(res));
      navigate("/");
      handleCloseSidebar();
    }
  };

  const Button = ({Func, Icon, Name }) => {
    return (
      <button className="flex flex-row gap-3 p-5 p-5"
       onClick={Func}
      >
        <Icon fontSize={20} className="text-[#606060] dark:text-[#999]"/>
        {Name}
      </button>
    )
  }

  return (

    <>
      <div
        className="absolute flex flex-col h-[100dvh] overflow-y-hidden bg-[#000000a7] hide-scrollbar z-10 w-full"
        onClick={() => setToggleSidebar(false)}
      ></div>
      <div className="bg-[#f5f5f5] dark:bg-[#202020] overflow-y-hidden flex flex-col fixed h-[100vh] hide-scrollbar w-3/5 lg:w-1/4 z-10 border-r border-gray-200">
        <div className=" mt-[70px] flex flex-col overflow-y-hidden absolute h-full w-full hide-scrollbar">
          <Button Icon={TfiHelpAlt} Name="Help"/>
          <Button Icon={TfiFlagAlt} Name="Report a problem"/>
          <Button Icon={TfiLock} Name="Privacy" />
          <Button Icon={TfiSettings} Name="Settings" />
          <Theme />
          
          {currentUser &&(
          <Button Func={() => handleLogout()} Icon={FaSignOutAlt} Name="Log out" />
          )}
        </div>
      </div>
    </>

  );
};
export default Sidebar;
