import React from 'react';
import Navigation from '../fragments/Navigation.jsx';
import { FaUserCircle } from 'react-icons/fa';
import { RestartAnimation } from "../App.js";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  TfiFlagAlt,
  TfiHelpAlt,
  TfiLock,
} from "react-icons/tfi";
import { logoutSucces } from "../redux/userSlice.js";
import axios from 'axios';
import {motion} from 'framer-motion'
import Theme from './Theme.jsx';


const AccountSettings = ({ setToggleAccountSettings }) => {
  const { currentUser } = useSelector(state => state.user)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBackBtnCLick = (e) => {
    e.preventDefault();
    setToggleAccountSettings(false)
  }




  // const Edit = ({ Func, Title, subTitle,Name }) => {
  //   return (
  //     <div className='pb-5 pt-5 pl-3 flex flex-row'>
  //       <h2 className='font-base font-medium'>{Title}</h2>

  //       <div className='text-[#999] flex flex-row absolute w-[95%] items-cente mt-[25px] ml-[5px]'>
  //         {currentUser.username ? (
  //           Func
  //         ) : (
  //            subTitle 
  //         )}
  //         {Name &&(
  //           <FaEdit className='absolute right-10' fontSize={15} />
  //         )}
  //       </div>
  //     </div>
  //   )
  // }

  const handleLogout = async () => {
    if (currentUser) {
      const res = await axios.get("/auth/logout");
      navigate('/')
      RestartAnimation({message:"Logout successful"})
      dispatch(logoutSucces(res));
    }
  };

  const Button = ({ Func,Icon, Name }) => {
    return (
      <button className="flex flex-row text-sm gap-3 p-5"
       onClick={Func}
      >
        <Icon className="text-[#606060] dark:text-[#999]" fontSize={20} />
        {Name}
      </button>
    )
  }

  const header = "Account Settings"

  return (
    <>
    <div onClick={()=>setToggleAccountSettings(false)} className='hidden sm:flex flex flex-col left-0 bg-[#000000a7] z-10 w-full h-full fixed '>
    </div>
    <motion.div 
      className="bg-white dark:bg-black flex flex-col hide-scrollbar fixed z-10 w-full lg:w-[90%] h-full items-center"
      initial={{opacity: 0}}
      animate = {{opacity: 1}}
      exit= {{opacity: 0}}
    >

      <Navigation header={header} handleBackBtnCLick={handleBackBtnCLick} />
      <div className=" mt-[70px] flex flex-col overflow-scroll absolute h-full w-full hide-scrollbar">
         <text className='pl-3 font-bold text-lg text-[#505050] dark:text-[#999]'>Account</text>
           <Button Icon={FaUserCircle} Name="Account Details" />
           <Button Icon={TfiLock} Name="Privacy Settings" />

         <text className='pl-3 font-bold text-lg text-[#505050] dark:text-[#999]'>Support</text>
          <Button Icon={TfiHelpAlt} Name="Help"/>
          <Button Icon={TfiFlagAlt} Name="Report a Problem"/>
         <text className='pl-3 font-bold text-lg text-[#505050] dark:text-[#999]'>About Us</text>
          <Button Icon={TfiHelpAlt} Name="Terms of Service"/>
          <Button Icon={TfiHelpAlt} Name="Privacy Policy"/>
         <text className='pl-3 font-bold text-lg text-[#505050] dark:text-[#999]'>Accessibility</text>
          <Theme/>

          {currentUser &&(
            <Button Func={()=>handleLogout()} Icon={FaSignOutAlt} Name="Log out"/>
          )}
        </div>
{/* 
      <div className="hide-scrollbar w-full lg:w-3/4 flex flex-col pt-[50px]">
        <div className="w-full bg-[#f5f5f5] pb-5 mt-5">
          <div className='relative'>
            <Edit Func={currentUser.firstname} Title="Firstname"/>
            <Edit Func={currentUser.lastname} Title="Lastname"/>
            <Edit Func={currentUser.email} Title="Email"/>
            <Edit Func={currentUser.dateOfBirth} Title="Date of Birth"  />
          </div>
        </div>
      </div> */}
    </motion.div>
    </>
  )
}

export default AccountSettings











