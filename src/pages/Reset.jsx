import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router';
import Navigation from '../fragments/Navigation.jsx';
import { useLocation } from "react-router-dom";
// import { RestartAnimation } from '../App.js';

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");
  const path = useLocation().pathname
  const navigate = useNavigate()

  const cleanUp = () => {
    setConfirmPassword("")
    setPassword("")
  }

  const handleSigninClick = () => {
    cleanUp()
    document.querySelector("#password").value = ""
    document.querySelector("#confirm_password").value = ""


    if (!password && !confrimPassword) {
    // RestartAnimation("Nothing was inserted")
    console.log("hello")

    } else if (password.toLocaleLowerCase() !== confrimPassword.toLocaleLowerCase()) {
    // RestartAnimation("Nothing was inserted")
    console.log("hello")


    } else {
      handleReset()
    }
  }

  const handleReset = async () => {
    try {
      const res = await axios.post(path, { password, confrimPassword })
      if (res.status === 200) {
        // RestartAnimation(res.data)
    console.log("hello")

        navigate("/signin")
      }

    } catch (err) {
      if (err.response.status === 403) {
        // RestartAnimation(err.response.data)
    console.log("hello")

      }
    }
  }

  const handleBackBtnCLick = (e) => {
    e.preventDefault();
    cleanUp()
    navigate("/signin")
  }

  const header = "Sign Page"
  return (
    <div className="flex flex-col top-0 overflow-scroll hide-scrollbar z-10 absolute h-screen w-full items-center justify-center">

      <Navigation header={header} handleBackBtnCLick={handleBackBtnCLick} />
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 overflow-scroll h-full hide-scrollbar">
        <text className='font-base text-[20px]'>reset password</text>

        <form id="signUp">
          <input
            id="input"
            className="p-[10px] bg-none rounded-[6px] w-full my-[5px] border-2 border-[#999] outline-none"
            type="password"
            autoComplete='true'
            placeholder='new password'
            onChange={e => setPassword(e.target.value)}
          />
          <input
            id="input"
            className="p-[10px] bg-none rounded-[6px] w-full my-[5px] border-2 border-[#999] outline-none"
            type="password"
            autoComplete='true'
            placeholder='confirm password'
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </form>
        {!password || !confrimPassword ? (
          <button
            className="flex flex-row items-center justify-center p-[8px] w-[60%] rounded-full mt-[20px] font-xl"
            style={{ backgroundColor: "#999", color: "white" }}
            type="button"
            onClick={handleSigninClick}
          >
            incomplete details
          </button>
        ) : (
          <button
            className="flex flex-row items-center justify-center p-[8px] w-[60%] rounded-full mt-[20px] font-xl"
            style={{ backgroundColor: "#00acee", color: "white" }}
            type="button"
            onClick={handleSigninClick}
          >
            Reset
          </button>
        )}
      </div>
    </div>

  );
};

export default Reset;