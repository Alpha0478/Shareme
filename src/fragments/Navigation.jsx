import React from "react";
import { TfiArrowLeft } from "react-icons/tfi";

const Navigation = ({
  header,
  handleBackBtnCLick,
  savebtn,
  nextbtn,
  savebtn2,
  cancelbtn,
  searchbar,
}) => {
  const styles =
    " flex flex-row top-0 z-10 absolute w-full lg:border-b-[3px] border-[#f5f5f5] dark:border-[#202020] h-[50px] lg:h-[60px]";

  return (
    <>
      <div className={styles}>
        <div className="w-full h-full relative items-center justify-around flex flex-row ">
          {handleBackBtnCLick || cancelbtn ? (
            <button
              className="flex flex-row cursor-pointer left-0 w-[42px] h-[42px] absolute ml-[4px] items-center hover:border-2 hover:text-[#00acee] border-[#00acee] justify-center hover:rounded-full"
              onClick={handleBackBtnCLick}>
              {!cancelbtn ? <TfiArrowLeft fontSize={25} /> : cancelbtn}
            </button>
          ) : ""}

          <h2 className="font-medium text-xl">{header}</h2>
          {savebtn}
          {savebtn2}
          {searchbar}
          {nextbtn}
        </div>
      </div>
    </>
  );
};

export default Navigation;
