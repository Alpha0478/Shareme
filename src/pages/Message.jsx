import React  from 'react';
import {useNavigate } from 'react-router';
import Navigation from '../fragments/Navigation.jsx';

const Message = () => {
  const navigate = useNavigate()


  const handleBackBtnCLick= (e) =>{
    e.preventDefault();
    navigate("/")
  }
  const header = "Messages"

  return (
    <div 
    className="flex flex-col top-0 overflow-scroll z-10 w-full h-full absolute hide-scrollbar"
    >
        <Navigation header={header} handleBackBtnCLick={handleBackBtnCLick}/>
    
       
    </div>
  )
}

export default  Message