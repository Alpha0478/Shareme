import React, { Suspense, useEffect, useState } from "react";
import { TfiClose, TfiHeart, TfiTrash } from "react-icons/tfi";
import { format } from "timeago.js";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaReply } from "react-icons/fa";
import axios from "axios";
import { commentSuccess, likeComment } from "../redux/commentSlice.js";
import Reply from "./Reply.jsx";
import { replysSucces } from "../redux/replysSlice.js";
import { handleLike } from "../fragments/helper.js";
import CardImg from "./CardImg.jsx";




const Comment = ({
  socket,
  comment,
  setPlaceholder,
  setCommentId,
  setInputType,
  InputRef,
}) => {
  const CardProfile = React.lazy(() => import("./CardProfile.jsx"));
  const [toggleInfo, setToggleInfo] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { currentComment } = useSelector((state) => state.comment);
  const [toggleReply, setToggleReply] = useState(false);
  const [channel, setChannel] = useState("");
  const { replys } = useSelector((state) => state.replys);
  const [toggleCardProfile, setToggleCardProfile] = useState(false);

  const dispatch = useDispatch();

  const fetchUser = async () => {
    console.log("user fetch");

    try {
      const res = await axios.get(`users/find/${comment.userId}`);
      setChannel(res.data);
    } catch (err) {
      if (err.response.status === 500) {
        console.log("No Connnections");
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, [comment.userId]);

  const handleDelete = async (id) => {
    await axios.delete(`/comments/${id}`);
    const commentList = currentComment.filter((comment) => comment._id !== id);
    dispatch(commentSuccess(commentList));
  };

  const handleReply = (id) => {
    setPlaceholder(`reply to ${comment.name}`);
    setInputType("reply");
    InputRef.current.focus();
    handlegetReply(id);
  };

  const handlegetReply = async (id) => {
    const res = await axios.get(`/reply/${id}`);
    dispatch(replysSucces(res.data));
    setCommentId(id);
  };

  const handleToggleInfo = () => {
    setToggleInfo(false);
    setToggleReply(false);
    setPlaceholder("Add a comment...");
  };

  const setToggleInfoTrue = (id) => {
    setToggleInfo(true);
    setToggleReply(!toggleReply);
    handlegetReply(id);
  };

  const handleNotification = (msg) => {
    socket?.emit("sendNotification", {
      senderName: currentUser?.name,
      receiverName: comment?.name,
      msg,
    });
  };

  const handleProfile = () => {
    if (currentUser?._id !== comment.userId) {
      setToggleCardProfile(true);
    }
  };


  return (
    <>
      <div
        id="hide"
        className="flex flex-row ml-[6px] my-[3px] w-full relative items-center justify-center "
        onMouseLeave={() => setToggleInfo(false)}
      >
        <CardImg imageSrc={channel?.profileUrl} Func={()=>handleProfile(channel?.name)}/>
        <div className="flex flex-col w-full p-[6px] min-w-0">
          <span className="text-md flex flex-row align-center h-[20px] font-medium">
            {comment?.name}
          </span>

          <div
            className="w-[80%] text-base"
            onClick={() => setToggleInfoTrue(comment._id)}
          >
            {comment.desc}
            <span className="flex-shrink-0" style={{ color: "#999" }}>
              <span className="px-1">.</span>
              <span className="font-xs">{format(comment.createdAt)}</span>
            </span>
          </div>

          <button
            className="absolute right-4 flex flex-col justify-center h-full items-center cursor-pointer"
            style={{ color: "#999" }}
            onClick={() =>
              handleLike({
                id: comment?._id,
                postState: likeComment,
                post: "comments",
                userId: currentUser?._id,
                dispatch,
                handleNotification,
              })
            }
          >
            {comment?.likes?.includes(currentUser?._id) ? (
              <FaHeart style={{ color: "red" }} />
            ) : (
              <TfiHeart style={{ color: "#999" }} />
            )}
            <text className="font-xs">{comment.likes.length}</text>
          </button>

          {toggleInfo && (
            <div className="flex flex-row items-center rounded-[30px] bg-[#f5f5f5] dark:bg-[#202020] h-[32px] w-[80%] mt-[20px] ">
              <div className="flex flex-row items-center justify-center  gap-[20px] w-full mr-[15px]">
                {currentUser._id === comment?.userId && (
                  <>
                    <button
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => handleDelete(comment?._id)}>
                      <TfiTrash
                        fontSize={25}
                        style={{ color: "#999" }}
                        id="hide"
                      />
                    </button>

                    <button className="flex flex-col items-center cursor-pointer">
                      <CiEdit fontSize={28} style={{ color: "#999" }} />
                    </button>
                  </>
                )}

                <button
                 className="flex flex-col items-center cursor-pointer"
                >
                  <FaReply
                    fontSize={20}
                    style={{ color: "#00acee" }}
                    onClick={() => handleReply(comment._id)}
                  />
                </button>

                <span className="ml-4" onClick={() => handleToggleInfo()}>
                  <TfiClose fontSize={12} style={{ color: "#999" }} />
                </span>

                <div
                  className="flex flex-row align-center font-base font-normal"
                  style={{ color: "#999" }}
                  onClick={() => setToggleReply(!toggleReply)}
                >
                  {replys?.length}
                  <h2 className=" ml-1" style={{ color: "#00acee" }}>
                    replies
                  </h2>
                </div>
              </div>
            </div>
          )}
          {toggleReply && (
            <div className="flex flex-col absolute w-full p-[6px]"> 
            {/* absolute */}
              {replys?.map((reply) => (
                <Reply key={reply.id} reply={reply} socket={socket} />
              ))}
            </div>
          )}
        </div>
      </div>
      {toggleCardProfile && (
        <Suspense>
          <CardProfile
            channel={channel}
            setToggleCardProfile={setToggleCardProfile}
          />
        </Suspense>
      )}
    </>
  );
};

export default Comment;
