import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { Helmet } from "react-helmet-async";
import { Suspense } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { postsFetchSuccess } from '../redux/postsSlice.js';
import useSWR from 'swr'
import { fetchPosts, urlEndpoint as cacheKey } from '../components/fetchers/fetch.js'
import Spinner from '../components/Spinner.jsx';
import Card from '../components/Card.jsx'
import { RestartAnimation } from "../App.js";
import { FaInfoCircle } from "react-icons/fa";
import { TfiInfoAlt } from "react-icons/tfi";

const Home = ({ socket}) => {
  const Sidebar = React.lazy(() => import("../components/Sidebar.jsx"));
  const AddPost = React.lazy(() => import("../components/AddPost.jsx"));

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [toggleAddpost, setToggleAddpost] = useState(false);
  const [toggleAddNote, setToggleAddNote] = useState(false);
  const dispatch = useDispatch()
  const { posts } = useSelector((state) => state.posts)
  console.log("Home render")

  const {
    isLoading,
    error,
  } = useSWR(cacheKey, fetchPosts, {
    onSuccess: data => dispatch(postsFetchSuccess(data))
  })

  return (
    <>
      <Helmet>
        <title>this is the homepage </title>
        <meta
          name="description"
          content="latest and approved feeds to keep you upto date"
        />
        <link rel="canonical" href="/" />
      </Helmet>
      <div className="flex flex-col top-0 overflow-scroll hide-scrollbar bottom-0 h-full w-full items-center absolute right-0 ">
        <Navbar
          toggleSidebar={toggleSidebar}
          setToggleAddpost={setToggleAddpost}
          setToggleSidebar={setToggleSidebar}
        />
        <>
          <div className="pt-[50px] absolute h-full hide-scrollbar w-full lg:w-3/4">
            {isLoading ?
              // <Spinner />
              ""
              : error ?

                <div className="flex flex-col  text-lg text-[#cc1a00] h-full w-full items-center justify-center">
                <TfiInfoAlt fontSize={50}/>
                An error occured
                </div>
                :
                posts?.map((post) => (
                  <Card socket={socket} key={post._id} post={post} />
                ))
            }

          </div>
        </>
      </div>
      {toggleAddpost && (
        <Suspense>
          <AddPost
            setToggleAddpost={setToggleAddpost}
            setToggleAddNote={setToggleAddNote}
            toggleAddNote={toggleAddNote}
            toggleAddpost={toggleAddpost}
          />
        </Suspense>
      )}

      {toggleSidebar && (
        <>
          <Suspense>
            <Sidebar
              setToggleSidebar={setToggleSidebar}
            />
          </Suspense>
        </>
      )}
    </>
  );
};

export default Home;
