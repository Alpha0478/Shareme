import React, { Suspense, useEffect, useState } from "react";
import Navigation from "../fragments/Navigation.jsx";
import { FaUserCog } from "react-icons/fa";
import SubmitBtn from "./SubmitBtn.jsx";
import DisabledBtn from "./DisabledBtn.jsx"
import InputField from './InputField.jsx'
import FormControl from "./FormControl.jsx";
import { containsSymbols } from "../fragments/helper.js";


const CreateAccount = ({ setToggleCreateAccount }) => {
  const CompleteRegistration = React.lazy(() =>
    import("./CompleteRegistration.jsx")
  );

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [ready, setReady] = useState(false);
  const [nameMatch,setNameMatch] = useState(false)
  const [toggleCompleteRegistration, setToggleCompleteRegistration] =
    useState(false);

  

  const firstnameInvldCharResult = containsSymbols(
    firstname.toUpperCase()
  );
  const lastnameInvldCharResult = containsSymbols(lastname.toUpperCase());

  useEffect(() => {
    if (
      !firstnameInvldCharResult &&
      !lastnameInvldCharResult &&
      nameMatch === false &&
      firstname &&
      lastname &&
      dateOfBirth
    ) {
      setReady(true);
    } else {
      setReady(false);
    }

    if(firstname.toUpperCase() === lastname.toUpperCase() && firstname.length !== 0){
      setNameMatch(true)
    }else{
      setNameMatch(false)
    }

  }, [firstname, lastname, dateOfBirth,nameMatch]);

  const handleBackBtnCLick = (e) => {
    e.preventDefault();
    setToggleCreateAccount(false);
  };

  const header = "Create Account";

  return (
    <>
      <div className="bg-white dark:bg-black flex flex-col top-0 overflow-scroll hide-scrollbar z-10 w-full absolute h-full  items-center justify-center">
        <Navigation header={header} handleBackBtnCLick={handleBackBtnCLick} />
        <div className="flex flex-col items-center justify-center z-10 w-full lg:w-1/2  overflow-scroll px-[50px] absolute hide-scrollbar">
          <FaUserCog fontSize={50} className="mb-[40px] text-[#00acee]"/>

          <form id="logIn" className="flex flex-col w-full mt-[20px]">

            <InputField id="firstname" placeholder="Firstname" Func={(e)=>setFirstName(e.target.value)}/>
              <FormControl Error={nameMatch} Name="first and last name should not match"/>
              <FormControl Error={firstnameInvldCharResult} Name="firstname contains invalid character"/>

            <InputField id="lastname" placeholder="Lastname" Func={(e)=>setLastName(e.target.value)}/>
              <FormControl Error={nameMatch} Name="first and last name should not match"/>
              <FormControl Error={lastnameInvldCharResult} Name="lastname contains invalid character"/>
           
            <InputField id="date" placeholder="date" Func={(e)=>setDateOfBirth(e.target.value)}/>

          </form>
          {ready ? (
            <SubmitBtn Name="Next" Func={()=>setToggleCompleteRegistration(true)}/>
          ) : (
            <DisabledBtn Name="Missing details"/>
          )}
        </div>
      </div>
      {toggleCompleteRegistration && (
        <Suspense>
          <CompleteRegistration
            setToggleCompleteRegistration={setToggleCompleteRegistration}
            firstname={firstname}
            lastname={lastname}
            dateOfBirth={dateOfBirth}
          />
        </Suspense>
      )}
    </>
  );
};

export default CreateAccount;
