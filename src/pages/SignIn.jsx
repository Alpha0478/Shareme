import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice.js";
import { auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";
import Navigation from "../fragments/Navigation.jsx";
import { Link } from "react-router-dom";
import SubmitBtn from "../components/SubmitBtn.jsx";
import PrimaryBtn from "../components/PrimaryBtn.jsx";
import DisabledBtn from "../components/DisabledBtn.jsx"
import { RestartAnimation } from "../App.js";
import InputField from '../components/InputField.jsx'
import FormControl from '../components/FormControl.jsx'

const SignIn = () => {
  const [profileName, setProfileName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cleanUp = () => {
    setProfileName("");
    setPassword("");
  };


  useEffect(() => {
    if (profileName.length === 0) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [profileName.length]);

  useEffect(() => {
    if (password.length === 0) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password.length]);

  const handleLoginClick = (e) => {
    cleanUp();
    document.querySelector("#username").value = "";
    document.querySelector("#password").value = "";
    if (profileName && password) {
      handleLogin(e);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signin", { profileName, password });
      if(res.data){
        dispatch(loginSuccess(res.data));
        RestartAnimation({message:"Login successfull"})
        navigate("/");
        cleanUp();
      }
     
    } catch (err) {
      if (err.response.status === 404) {
         RestartAnimation({message:"Invalid credentials"})
      } else if (err.response.status === 500) {
        RestartAnimation({message:"No connection"})

      }
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
            res.status === 200 && navigate("/");
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
        console.log(error);
      });
  };



  const header = "Login Page";
  return (
    <>
      <div className="flex flex-col top-0 overflow-scroll hide-scrollbar z-10 w-full absolute h-full items-center justify-center">
        <Navigation header={header} />

        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 overflow-scroll px-[50px] mt-[60px]  absolute hide-scrollbar">
          <text className="text-[20px] font-base">Sign in to continue</text>
          <PrimaryBtn Icon={<FcGoogle fontSize={25} className="mr-4" />} Name="Sign in with Google" Func={signInWithGoogle}/>

          <text className="text-[20px] font-base">or</text>

          <div className="relatvie w-full mb-[20px]">
          <form id="logIn" className="flex flex-col w-full ">
            <InputField id="username" Func={(e) => setProfileName(e.target.value)} placeholder="Username"/>
            <FormControl Error={nameError} Name="username is required"/>
            
            <InputField id="password" Func={(e) => setPassword(e.target.value)} placeholder="Password" FromPassword={true}/>
            <FormControl Error={passwordError} Name="password is required"/>
          </form>
    
          <Link
            to={"/forgot-password"}
            onClick={() => cleanUp()}
            style={{ color: "#00acee" }}
            className="absolute right-12 mt-1"
          >
            Forgot Your Password?
          </Link>
          </div>
          {!profileName || !password ? (
            <DisabledBtn Name="Missing details" />
          ) : (
            <SubmitBtn Name="Login" Func={handleLoginClick} />
          )}

          <h2 className="font-base font-normal mt-4" style={{ color: "#999" }}>
            Don't have an account?
            <Link
              to={"/signup"}
              onClick={() => cleanUp()}
              style={{ color: "#00acee" }}
            >
              Sign up
            </Link>
          </h2>
        </div>
      </div>

    </>
  );
};

export default SignIn;
