import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Footer from "./components/Footer.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Spinner from "./components/Spinner.jsx";
import Home from "./pages/Home.jsx";
import "./index.css";

const Videos = React.lazy(() => import("./pages/Videos.jsx"));
const SignUp = React.lazy(() => import("./pages/SIgnUp.jsx"));
const Forgot = React.lazy(() => import("./pages/Forget.jsx"));
const Reset = React.lazy(() => import("./pages/Reset.jsx"));
const SignIn = React.lazy(() => import("./pages/SignIn.jsx"));
const Search = React.lazy(() => import("./pages/Search.jsx"));
const Message = React.lazy(() => import("./pages/Message.jsx"));
const Note = React.lazy(() => import("./pages/Note.jsx"));
const Notification = React.lazy(() => import("./pages/Notification.jsx"));
const Profile = React.lazy(() => import("./pages/Profile.jsx"));

const ProfileStyle =
  "hide-scrollbar z-10 h-full w-full items-center overflow-scroll absolute";

 export const RestartAnimation = ({message}) => {
    const popup = document.querySelector("#popup");
    popup.style.animationName = "none";
    popup.innerHTML = message

    requestAnimationFrame(() => {
        setTimeout(() => {
            popup.style.animationName = "";
        }, 0);
    });
  };


const App = ({ socket }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [count, setCount] = useState(() =>
    JSON.parse(localStorage.getItem("count"))
  );
  const [data, setData] = useState();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  useEffect(() => {
    socket?.emit("newUser", currentUser?.name);
  }, [socket, currentUser?.name]);

  useEffect(() => {
    const saveNotifications = () => {
      socket?.on("getNotification", (data) => {
        setData(data.senderName + " " + data.msg);
        setCount(count + 1);
      });
    };
    saveNotifications();
  }, [socket, count, setCount]);

  useEffect(() => {
    if (data) {
      axios.post("/notification", { desc: data, userId: currentUser?._id });
    }
  }, [data, currentUser?._id]);

 
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white flex flex-col top-0 overflow-scroll hide-scrollbar">
      <div className="flex w-full items-center h-[50px] absolute mt-[10px] justify-center">
        <div
          id="popup"
          className="flex z-20 absolute text-lg h-[50px] justify-around  bg-[#cc1a00]  text-white border-none rounded-[4px] w-[95%] lg:w-[50%]  m-[10px] items-center "
        >
          You are Online
        </div>
      </div>
      <div className="hide-scrollbar h-[100dvh] relative">
        <div className="flex flex-col absolute right-0 overflow-scroll h-full items-center hide-scrollbar w-full lg:w-[90%]">
          <div className="flex flex-col relative h-[100%] mb-[48px] lg:mb-0 hide-scrollbar w-full">
            <div className="App">
              <meta
                name="viewport"
                content="width=device-width, user-scalable=no"
              />

              <Routes location={location} key={location.pathname}>
                <Route path="/">
                  <Route index element={<Home socket={socket} />} />
                  <Route
                    path="Search"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <Search type="search" />
                      </Suspense>
                    }
                  />
                  <Route
                    path="Signin"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <SignIn />
                      </Suspense>
                    }
                  />
                  <Route
                    path="Signup"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <SignUp />
                      </Suspense>
                    }
                  />
                  <Route
                    path="forgot-password"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <Forgot />
                      </Suspense>
                    }
                  />
                  <Route
                    path="auth/reset-password/:id/:token"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <Reset />
                      </Suspense>
                    }
                  />
                  <Route
                    path="Notification"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <Notification
                          setCount={setCount}
                          data={data}
                          socket={socket}
                        />{" "}
                      </Suspense>
                    }
                  />
                  <Route
                    path="Message"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <Message />
                      </Suspense>
                    }
                  />
                  <Route
                    path="Videos"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <Videos socket={socket} />
                      </Suspense>
                    }
                  />
                  <Route
                    path="notes"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <Note socket={socket} />
                      </Suspense>
                    }
                  />
                  <Route
                    path="Profile"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <Profile ProfileStyle={ProfileStyle} />
                      </Suspense>
                    }
                  />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>

      <Footer count={count} />
    </div>
  );
};

export default App;
