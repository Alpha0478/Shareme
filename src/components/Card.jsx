import React, { useState, useEffect, Suspense } from "react";
import { FaRegClock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { format } from "timeago.js";
import { likeVideo } from "../redux/postsSlice.js";
import { handleLike } from "../fragments/helper.js";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import ReactionButtons from "./ReactionButtons.jsx";
import FollowButton from "./FollowButton.jsx";
import VideoFrameForCard from "./VideoFrameForCard.jsx";



const Card = ({ post, socket }) => {
  const Comments = React.lazy(() => import("./Comments.jsx"));
  const CardProfile = React.lazy(() => import("./CardProfile.jsx"));

  const [toggleCardProfile, setToggleCardProfile] = useState(false);
  const [toggleComment, setToggleComment] = useState(false);
  const [channel, setChannel] = useState("");
  const [callFromVideo, setCallFromVideo] = useState(false);
  const [likeHover, setLikeHover] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`users/find/${post.userId}`);
      setChannel(res.data);

      return () => {
        setChannel("");
      };
    } catch (err) {
      if (err.response.status === 500) {
        console.log("No Connnections");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [post.userId]);

  const handleProfile = (id) => {
    if (post.postType === "video") {
      setCallFromVideo(true);
    }
    if (currentUser?._id !== id) {
      setToggleCardProfile(true);
    }
  };

  const handleNotification = (msg) => {
    socket?.emit("sendNotification", {
      senderName: currentUser?.name,
      receiverName: channel?.name,
      msg,
    });
  };

  const handleLiking = () => {
    if (currentUser) {
      if (!likeHover) {
        setLikeHover(true);
        handleLike({
          id: post?._id,
          postState: likeVideo,
          post: post.postType + "s",
          userId: currentUser?._id,
          dispatch,
          handleNotification,
        });
        setTimeout(() => {
          setLikeHover(false);
        }, 1000);
      }
    }
  };

  const ProfileStyle =
    "hide-scrollbar fixed z-10 h-screen w-full lg:w-[90%] lg:right-0 lg:items-center";

  return (

    <>
      <div id="card" className="flex relative h-full justify-center items-center border-b-2 border-[#f5f5f5] dark:border-[#202020]">
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-row items-center w-full pr-2 h-[100px] lg:h-20">
            <div className="relative">
              {channel?.profileUrl ? (
                <img
                  type={post}
                  alt="profile photo"
                  src={channel?.profileUrl}
                  width="46px"
                  height="46px"
                  className="rounded-full m-2 items-center"
                  onClick={() => handleProfile(post.userId)}
                />
              ) : (
                ""
              )}
            </div>

            <text className="text-md font-medium ml-2 w-[20%] h-5 ">
              {channel?.name}
            </text>
            <FollowButton
              channel={channel}
              handleNotification={handleNotification}
              post={post}
            />
          </div>

          <div
            onDoubleClick={() => handleLiking()}
            className="lg:left-20 flex flex-col justify-center h-full items-center w-full lg:w-1/2 lg:ml-20 "
          >
            {likeHover && (
              <div className="flex absolute h-full w-full color-[#00acee] z-100 items-center justify-center">
                {post.likes.includes(currentUser?._id) ? (
                  <IoMdHeart fontSize={100} />
                ) : (
                  <IoMdHeartEmpty fontSize={100} style={{ color: "gray" }} />
                )}
              </div>
            )}
            {post.postType === "video" ? (
              <VideoFrameForCard post={post}/>
            ) : post.postType === "image" ? (
              <img
                src={post.Url}
                loading="eager"
                alt={`post by ${channel?.name}`}
                height="280px"
                width="280px"
              />
            ) : (
              <div className="bg-[#f5f5f5] dark:bg-[#202020] rounded-[6px] h-full w-[90%] mt-[10px] flex flex-col justify-start overflow-auto hide-scrollbar p-3 text-xl">
                {post.desc}
              </div>
            )}
          </div>

          <div className="text-[#606060] dark:text-[#999] flex flex-row align-center justify-start pl-7 lg:pl-20 pr-6 pb-4 pt-6">
            <FaRegClock fontSize={20} />
            <div className="pl-2 text-sm">
              {format(post.createdAt)}
            </div>
          </div>
          <ReactionButtons
            handleLiking={handleLiking}
            post={post}
            setCallFromVideo={setCallFromVideo}
            setToggleComment={setToggleComment}
          />
        </div>
      </div>
      {toggleCardProfile && (
        <Suspense>
          <CardProfile
            type={post}
            channel={channel}
            setToggleProfile={setToggleCardProfile}
          />
        </Suspense>
      )}
      {toggleComment && (
        <Suspense>
          <Comments
            socket={socket}
            setToggleComment={setToggleComment}
            post={post}
            handleNotification={handleNotification}
            callFromVideo={callFromVideo}
          />
        </Suspense>
      )}
    </>
  );
};

export default Card;
