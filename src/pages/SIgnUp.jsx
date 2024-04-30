import React, { Suspense, useState } from "react";
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




const SignUp = () => {
  const CreateAccount = React.lazy(() => import('../components/CreateAccount.jsx'))
  const [toggleCreateAccount,setToggleCreateAccount] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();


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

  const handleBackBtnCLick = (e) => {
    e.preventDefault();
    navigate("/signin");
  };

  const header = "Sign up page";
  return (
    <>
    <div className="bg-white dark:bg-black flex flex-col top-0 overflow-scroll hide-scrollbar z-10 absolute h-[100dvh] w-full items-center justify-center">
      <Navigation header={header} handleBackBtnCLick={handleBackBtnCLick} />
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 overflow-scroll absolute px-[50px] hide-scrollbar">
        <text className="text-[20px] font-base">sign up to continue</text>

        <PrimaryBtn Icon={<FcGoogle fontSize={25} className="mr-4" />} Name="Sign up with Google" Func={signInWithGoogle}/>
        <SubmitBtn Name="Create Account" Func={()=>setToggleCreateAccount(true)}/>

        <h2 className="font-base font-normal mt-6" style={{ color: "#999" }}>
          Already have an account?
          <Link
            to={"/signin"}
            style={{ color: "#00acee" }}
          >
            Sign in
          </Link>
        </h2>
      </div>
    </div>
    {toggleCreateAccount &&(
      <Suspense>
        <CreateAccount setToggleCreateAccount={setToggleCreateAccount}/>
      </Suspense>
    )}
    </>
  );
};

export default SignUp;
