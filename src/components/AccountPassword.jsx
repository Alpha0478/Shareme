import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice.js";
import { useNavigate } from "react-router";
import Navigation from "../fragments/Navigation.jsx";
import { TfiLock } from "react-icons/tfi";
import { useEffect } from "react";
import SubmitBtn from "./SubmitBtn.jsx";
import DisabledBtn from "./DisabledBtn.jsx"
import FormControl from "./FormControl.jsx";
import InputField from "./InputField.jsx";
import { RestartAnimation } from "../App.js";
import { containsLowercase,containsNumbers,containsUppercase } from "../fragments/helper.js";

const AccountPassword = ({
  username,
  firstname,
  lastname,
  profileName,
  dateOfBirth,
  email,
  setToggleAccountPassword,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [readyToSignUp, setReadyToSignUp] = useState(false);
  const [passwordMatch,setPasswordMatch] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passwordHasNumbersResult = containsNumbers(password);
  const passwordHasLowercaseResult = containsLowercase(password);
  const passwordHasUppercaseResult = containsUppercase(password);

  useEffect(() => {
    if (
      passwordMatch 
    ) {
      setReadyToSignUp(true);
    } else {
      setReadyToSignUp(false);
    }

    if(password.toLowerCase() === confirmPassword.toLowerCase() && password.length !== 0){
      setPasswordMatch(true)
    }else{
      setPasswordMatch(false)
    }
  }, [password,confirmPassword,passwordMatch]);

  const cleanUp = () => {
    setPassword("");
    setConfirmPassword("");
  };

  const handleSigninClick = (e) => {
    handleSignUp(e);
    document.querySelector("#password").value = "";
    document.querySelector("#confirmPassword").value = "";
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signup", { profileName,username,firstname,lastname,dateOfBirth,email,password });
      console.log(res.data)
      dispatch(loginSuccess(res.data));
      handleLogin(e);
    } catch (err) {
      console.log(err)
      dispatch(loginFailure());
      if (err.response.status === 500) {
        RestartAnimation({message:"No Connection"});
      } else if (err.response.status === 409) {
        RestartAnimation({message:"Profile Name already taken"});
      } 
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", {profileName, password });
      dispatch(loginSuccess(res.data));
      console.log("Login Successful");
      navigate("/");
      cleanUp();
    } catch (err) {
      console.log(err)
    //  if (err.response.status === 500) {
    //     console.log("No Conncection");
    //   }
      dispatch(loginFailure());
    }
  };

  const handleBackBtnCLick = (e) => {
    e.preventDefault();
    setToggleAccountPassword(false);
  };

  const header = "account password";
  return (
    <>
      <div className="bg-white dark:bg-black flex flex-col top-0 overflow-scroll hide-scrollbar overflow-scroll z-10 absolute h-[100dvh] w-full items-center justify-center">
        <Navigation header={header} handleBackBtnCLick={handleBackBtnCLick} />

        <div className="flex text-black flex-col items-center justify-center z-50 w-full lg:w-1/2 overflow-scroll absolute px-[50px]  hide-scrollbar">
          <TfiLock fontSize={50} className="mb-[40px] text-[#00acee]"/>

          <form id="signUp" className="flex flex-col w-full mb-[0px]">
            <InputField id="password" placeholder="Password" Func={(e) => setPassword(e.target.value)}/>
              <div className="flex flex-col text-sm mb-[20px] h-[40px] flex flex-row">
                <FormControl Error={password.length <= 8} Name="Must contain 8 characters"/>
                <FormControl Error={!(passwordHasLowercaseResult && passwordHasUppercaseResult)} Name="Must contain Small & Capital letters"/>
                <FormControl Error={!passwordHasNumbersResult} Name="Must contain numbers"/>
              </div>
            <InputField id="confirmPassword" placeholder="password" text="Confirm" Func={(e) => setConfirmPassword(e.target.value)}/>
              <FormControl Error={!passwordMatch} Name="Password should match"/>
          </form>
          {readyToSignUp ? (
            <SubmitBtn Name="Create Account" Func={(e)=>handleSigninClick(e)}/>
          ) : (
            <DisabledBtn Name= "Missing details"/>
          )}
        </div>
      </div>
    </>
  );
};

export default AccountPassword;
