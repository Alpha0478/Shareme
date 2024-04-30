import React, { useRef, useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlay } from "react-icons/fa";
import { RiShareForwardFill } from "react-icons/ri";
import { MdComment } from "react-icons/md";
import axios from "axios";
import { IoMdAdd, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { handleFollow, handleLike } from "../fragments/helper.js";
import { likeVideo } from "../redux/videosSlice.js";
import Spinner from "./Spinner.jsx";
import CardImg from "./CardImg.jsx";


const VideoCard = ({ video, socket }) => {
  const Comments = React.lazy(() => import("./Comments.jsx"));
  const CardProfile = React.lazy(() => import("./CardProfile.jsx"));

  const [toggleCardProfile, setToggleCardProfile] = useState(false);
  const [toggleComment, setToggleComment] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(true);
  const [channel, setChannel] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [callFromVideo, setCallFromVideo] = useState(false);

  const dispatch = useDispatch();
  const postRef = useRef(null);
  const videoRef = useRef();

  let callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // videoRef?.current.play()
        setPlaying(true);
        setIsHover(false);
      } else if (videoRef.current !== null && !entry.isIntersecting) {
        videoRef?.current.pause();
        setPlaying(false);
        setIsHover(true);
      }
    });
  };

  useEffect(() => {
    let observer = new IntersectionObserver(callback, { threshold: 0.5 });
    if (videoRef?.current) {
      observer.observe(videoRef?.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [videoRef]);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(`users/find/${video.userId}`);
      setChannel(res.data);
    } catch (err) {
      if (err.response.status === 500) {
        console.log("No Connnections");
      }
    }
  };
    fetchUser();
  }, [video.userId]);

  const handlePlay = () => {
    if (playing) {
      handlePause();
    } else {
      setPlaying(true);
      videoRef.current.play();
      setIsHover(false);
    }
  };

  const handlePause = () => {
    setPlaying(false);
    videoRef?.current.pause();
    setIsHover(true);
  };

  const handleProfile = (id) => {
    setCallFromVideo(true);
    handlePause();
   
  };

  const handleNotification = (msg) => {
    socket?.emit("sendNotification", {
      senderName: currentUser?.name,
      receiverName: channel?.name,
      msg,
    });
  };

  const handleViewComment = () => {
    setCallFromVideo(true);
    setToggleComment(true);
    handlePause();
  };



  const ProfileStyle = "hide-scrollbar z-100 h-screen w-full lg:w-3/4 fixed";

  return (
    <>

      <div
        className="bg-black h-full relative w-full z-0 snap-end snap-always"
      // onMouseLeave={handlePause}
      // onDoubleClick={handleLike(video?._id)}
      >
        <div className="flex flex-col h-screen w-full items-center justify-center">

          <div ref={postRef} className="flex flex-col top-0 absolute overflow-hidden z-60 h-full  w-full lg:w-1/2">
            <text className="absolute text-white bottom-[30px] left-[5px] z-50 font-medium ml-2 w-[20%] h-5 ">
              {channel?.name}
            </text>

            <div className="flex flex-col absolute right-0 bottom-[80px] p-[4px] gap-[20px] rounded-[6px] w-auto items-center bg-none lg:bg-sky-300">
              <div className="flex flex-col z-50 relative items-center cursor-pointer">
           
                <CardImg imageSrc={channel?.profileUrl} Func={()=> setToggleCardProfile(true)}/>
                {currentUser?._id !== video.userId && (
                  <>
                    {currentUser?.subscribedUsers?.includes(channel?._id) ? (
                      " "
                    ) : (
                      <>
                        {currentUser && (
                          <div className="absolute w-[20px] h-[20px] bottom-[-6px] rounded-full text-[50px] text-white bg-[#00acee]">
                            <IoMdAdd
                              fontSize={20}
                              onClick={() =>
                                handleFollow({
                                  userId: video.userId,
                                  channelId: channel?._id,
                                  handleNotification,
                                  dispatch,
                                })
                              }
                            />
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
              {currentUser && (
                <>
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      handleLike({
                        id: video?._id,
                        postState: likeVideo,
                        post: video.postType + "s",
                        userId: currentUser?._id,
                        dispatch,
                        handleNotification,
                      })
                    }
                  >
                    {video?.likes?.includes(currentUser?._id) ? (
                      <IoMdHeart fontSize={35} style={{ color: "red" }} />
                    ) : (
                      <IoMdHeartEmpty fontSize={35} style={{ color: "white" }} />
                    )}
                    <text className="text-white font-sm">{video?.likes?.length}</text>
                  </button>

                  <button style={{ color: "white" }}>
                    <MdComment
                      fontSize={35}
                      onClick={() => handleViewComment()}
                    />
                    <text className="font-sm">10K</text>
                  </button>

                  <button style={{ color: "white" }}>
                    <RiShareForwardFill fontSize={35} />
                    <text className="font-sm">10K</text>
                  </button>
                </>
              )}
            </div>
            <>
              {isHover && (
                <div className="flex w-full h-full text-white z-0 items-center justify-center absolute ">
                  <FaPlay fontSize={50} />
                </div>
              )}

              <video
                className="z-5  w-auto h-full  object-cover lg:w-[280px] rounded-none lg:rounded-lg "
                id="post"
                src={video.Url}
                loop
                ref={videoRef}
                onClick={() => handlePlay()}
              />
            </>
          </div>
        </div>
      </div>
      {toggleComment && (
        <Suspense fallback={<Spinner />}>
          <Comments
            setToggleComment={setToggleComment}
            post={video}
            handleNotification={handleNotification}
            handlePlay={handlePlay}
            callFromVideo={callFromVideo}
          />
        </Suspense>
      )}
      {toggleCardProfile && (
        <Suspense>
          <CardProfile
            type={video}
            channel={channel}
            setToggleCardProfile={setToggleCardProfile}
          />
        </Suspense>
      )}
    </>
  );
};

export default VideoCard;
