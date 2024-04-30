import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Navigation from "../fragments/Navigation.jsx";
import { Link } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import SubmitBtn from "../components/SubmitBtn.jsx";
import DisabledBtn from "../components/DisabledBtn.jsx"
import InputField from "../components/InputField.jsx";
import { RestartAnimation } from "../App.js";

const Forget = () => {
  const [email, setEmail] = useState("");
  const [iLink, setiLink] = useState();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (email.includes("@") && email.includes(".com")) {
      setReady(true);
    } else {
      setReady(false);
    }
  }, [email.length,email]);

  const navigate = useNavigate();

  
  const cleanUp = () => {
    setEmail("");
    setiLink("");
  };

  const handleSigninClick = (e) => {
    cleanUp();
    document.querySelector("#email").value = "";

    if (email) {
      handleForgot(e);
    }
  };

  const handleForgot = async () => {
    try {
      const res = await axios.post("/auth/forgot-password", { email });
      if (res.status === 200) {
        setiLink(res.data);
      }
    } catch (err) {
      if (err.response.data.status === 404) {
        RestartAnimation({message:err.response.data.message});
      }
    }
  };

  const handleBackBtnCLick = (e) => {
    e.preventDefault();
    cleanUp();
    navigate("/signin");
  };

  const header = "forgot password";
  return (
    <div className="bg-white dark:bg-black flex flex-col top-0 overflow-scroll hide-scrollbar z-10 absolute h-[100dvh] w-full items-center justify-center">
      <Navigation header={header} handleBackBtnCLick={handleBackBtnCLick} />

      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 px-[50px] h-full hide-scrollbar">
        <FaUserCog fontSize={50} className="mb-[40px]" />
        {iLink && (
          <Link to={iLink} style={{ color: "#cc1a00" }}>
            link
          </Link>
        )}
        <text className="text-[20px] font-base">forgot password</text>

        <form id="forgot" className="mb-[20px] mt-[10px] w-full">
          <InputField id="email" placeholder="Enter your email" Func={(e) => setEmail(e.target.value)}/>
        </form>

        {ready === false? (
          <DisabledBtn Name="Missing details"/>
        ) : (
           <SubmitBtn Name="forget" func={handleSigninClick}/>
        )}

        <h2 className="font-base font-normal mt-6" style={{ color: "#999" }}>
          Already have an account?
          <Link
            to={"/signin"}
            onClick={() => cleanUp()}
            style={{ color: "#00acee" }}
          >
            Sign in
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Forget;
