import React from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { RxVideo } from "react-icons/rx";
import { HiOutlineBell } from "react-icons/hi2";
import ProfileImg from "../fragments/ProfileImg.jsx";
import { useSelector } from "react-redux";
import { CiStickyNote } from "react-icons/ci";
import FooterButton from './FooterButton.jsx'


const Footer = ({ count }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (

    <div className="bg-white dark:bg-black flex w-full lg:w-[10%] fixed lg:absolute right-0 left-0 bottom-0 h-[50px] lg:h-[100dvh] pt-0 lg:pt-[60px] border-t-2  border-[#f5f5f5] dark:border-[#202020]">
      <div className="h-full lg:h-[98%] w-full lg:my-2 justify-around flex flex-row lg:flex-col relative gap-0 overflow-scroll hide-scrollbar  lg:border-r-[3px] border-[#f5f5f5] dark:border-[#202020]">
        <FooterButton
          Icon={BiHomeAlt2}
          Name="Home"
          To='/'
        />

        {currentUser && (
        <FooterButton
          Icon={HiOutlineBell}
          Name="Notifications"
          To="/notification"
          count={count}
        />
            
        )}
        <FooterButton
          Icon={CiStickyNote}
          Name="Scripts"
          To="/notes"
        />
        <FooterButton
          Icon={RxVideo}
          Name="Videos"
          To="/videos"
        />
        <ProfileImg />
      </div>
    </div>
  );
};

export default Footer;
