import React from 'react'
import { NavLink } from "react-router-dom";

const FooterButton = ({ Icon, Name, To,count }) => {

    const isActiveStyles =
        "text-[#00acee] lg:hover:bg-[#f5f5f5] lg:dark:hover:bg-[#202020] lg:mx-2";
    const notActiveStyles =
        "text-[#606060] dark:text-[#999] rounded-sm lg:mx-2 lg:dark:text-[#999] lg:hover:bg-[#f5f5f5] lg:dark:hover:bg-[#202020] hover:text-black dark:hover:text-white";
    return (
        <>
            <NavLink
                aria-label={Name + "page"}
                to={To}
                className={({ isActive }) =>
                    isActive ? isActiveStyles : notActiveStyles
                }
            >

                <div className="flex flex-col items-center cursor-pointer w-full h-full z-0 font-bold justify-end text-[12px]">
                    <div className="relative">
                        <Icon className="cursor-pointer" fontSize={24} />
                        {count ? <div className="text-white bg-[#cc1a00] w-[15px] h-[15px] flex absolute top-[-2px] right-[-4px] justify-center items-center text-[10px] rounded-full ">{count}</div> : ""}
                    </div>
                    {Name}
                </div>
            </NavLink>
        </>
    )
}

export default FooterButton