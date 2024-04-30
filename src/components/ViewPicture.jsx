import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '../fragments/Navigation.jsx';

const ViewPicture = ({ setViewPic, imgSrc }) => {
  const handleBackBtnCLick = (e) => {
    e.preventDefault();
    setViewPic(false)
  }

  const header = "Picture details"

  return (
    <motion.div
      className="flex flex-col w-full h-screen absolute top-0 z-10 bg-inherit items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
        <Navigation header={header} setViewPic={setViewPic} handleBackBtnCLick={handleBackBtnCLick}/>
        <div className='flex flex-col h-full absolute justify-center items-center w-full lg:w-1/2 md:w-1/2 overflow-scroll hide-scrollbar'>
          <img src={imgSrc} alt="pic details"  className="relative w-full h-auto"/>
        </div>

    </motion.div>
  )
}

export default ViewPicture