import React, { Suspense, useState } from "react";
import Navigation from "../fragments/Navigation.jsx";
import { FaUserCircle } from "react-icons/fa";
import { GoMail } from 'react-icons/go'
import { useEffect } from "react";
import SubmitBtn from "./SubmitBtn.jsx";
import DisabledBtn from "./DisabledBtn.jsx"
import InputField from "./InputField.jsx";
import FormControl from "./FormControl.jsx";
import { containsSymbols } from "../fragments/helper.js";
import axios from "axios";
import { RestartAnimation } from "../App.js";

const CompleteRegistration = ({
  setToggleCompleteRegistration,
  firstname,
  lastname,
  dateOfBirth
}) => {
  const AccountPassword = React.lazy(() =>
    import("../components/AccountPassword.jsx")
  );
  const [profileName, setProfileName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [readyToSignUp, setReadyToSignUp] = useState(false);
  const [toggleAccountPassword, setToggleAccountPassword] = useState(false);


  const nameInvldCharResult = containsSymbols(name);
  const profileNameInvldCharResult = containsSymbols(profileName);


  useEffect(() => {
    if (
      !nameInvldCharResult &&
      !profileNameInvldCharResult &&
      name.length >= 4 &&
      profileName.length >= 4 &&
      email.includes("@") &&
      name.length <= 15 &&
      name &&
      email
    ) {
      setReadyToSignUp(true);
    } else {
      setReadyToSignUp(false);
    }
  }, [name.length, email.length, profileName.length]);

  const handleBackBtnCLick = (e) => {
    e.preventDefault();
    setToggleCompleteRegistration(false);
  };

  const checkUser = async (e) => {
    e.preventDefault();

    try{

     const res = await axios.post("/auth/getuser", { profileName });
      if(res.status === 404){

       checkEmail(e)
      } 
    }catch(err){
      console.log(err)
      if (err.response.status === 409) {
        RestartAnimation({message:"Profile Name already taken"});
      } 
    }
  }

  const checkEmail = async (e) => {
    e.preventDefault();

    try{
    const res = await axios.post("/auth/getemail", { email });
      if(res.status === 200){
        setToggleAccountPassword(true)
      } 
    }catch(err){
      if (err.response.status === 409) {
        RestartAnimation({message:"Email already taken"});
      } 
    }
  }
 
  const header = "username & email";
  return (
    <>
      <div className="bg-white dark:bg-black flex flex-col top-0 overflow-scroll hide-scrollbar overflow-scroll z-10 absolute h-[100dvh] w-full items-center justify-center">
        <Navigation header={header} handleBackBtnCLick={handleBackBtnCLick} />

        <div className="flex flex-col items-center justify-center z-50 w-full lg:w-1/2 overflow-scroll absolute px-[50px]  hide-scrollbar">
          <div className="flex flex-row text-[#00acee] mb-[40px] items-center gap-5">
            <FaUserCircle fontSize={40} />
            &
            <GoMail fontSize={50} />
          </div>

          <form id="signUp" className="flex flex-col w-full mb-[0px]">
            <InputField id="username" placeholder="Profile name" Func={(e) => setProfileName(e.target.value)} />

            <div className="flex w-full flex-col text-sm h-[40px] flex flex-row">
              <FormControl Error={profileName.length < 4 || profileName.length > 15} Name="Must be between 4 to 15 characters" />
              <FormControl Error={profileNameInvldCharResult} Name="should not contain symbols" />
            </div>

            <InputField id="username" placeholder="Username" Func={(e) => setName(e.target.value)} />


            <div className="flex w-full flex-col text-sm h-[40px] flex flex-row">
              <FormControl Error={name.length < 4 || name.length > 15} Name="Must be between 4 to 15 characters" />
              <FormControl Error={nameInvldCharResult} Name="should not contain symbols" />
            </div>

            <InputField id="email" placeholder="Email" Func={(e) => setEmail(e.target.value)} />
            <FormControl Error={!email.includes("@")} Name="Must contain @" />
          </form>

          {readyToSignUp ? (
            <SubmitBtn Name="Next" Func={(e) => checkUser(e)} />
          ) : (
            <DisabledBtn Name="Missing details" />
          )}
        </div>
      </div>
      {toggleAccountPassword && (
        <Suspense>
          <AccountPassword profileName={profileName} firstname={firstname} lastname={lastname} dateOfBirth={dateOfBirth} email={email} username={name} setToggleAccountPassword={setToggleAccountPassword} />
        </Suspense>
      )}
    </>
  );
};

export default CompleteRegistration;
