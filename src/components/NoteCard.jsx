import React, { useRef, useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiShareForwardFill } from "react-icons/ri";
import { MdComment } from "react-icons/md";
import axios from "axios";
import { IoMdAdd, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { handleFollow, handleLike } from "../fragments/helper.js";
import { likeNote } from "../redux/notesSlice.js";
import Spinner from "./Spinner.jsx";
import { TfiBookmark } from "react-icons/tfi";
import CardImg from "./CardImg.jsx";


const NoteCard = ({ note, socket }) => {
  const Comments = React.lazy(() => import("./Comments.jsx"));
  const CardProfile = React.lazy(() => import("./CardProfile.jsx"));

  const [toggleCardProfile, setToggleCardProfile] = useState(false);
  const [toggleComment, setToggleComment] = useState(false);
  const [channel, setChannel] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [isHover, setIsHover] = useState(false);

  const dispatch = useDispatch();
  const postRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`users/find/${note.userId}`);
        setChannel(res.data);
      } catch (err) {
        if (err.response.status === 500) {
          console.log("No Connnections");
        }
      }
    };
    fetchUser();
  }, [note.userId]);

  const handleProfile = (id) => {
    setToggleCardProfile(true);
  };

  const handleNotification = (msg) => {
    socket?.emit("sendNotification", {
      senderName: currentUser?.name,
      receiverName: channel?.name,
      msg,
    });
  };

  const handleViewComment = () => {
    setToggleComment(true);
  };

  const handleLiking = () => {
    if (currentUser) {
      if (!isHover) {
        setIsHover(true);
        handleLike({
          id: note?._id,
          postState: likeNote,
          post: note.postType + "s",
          userId: currentUser?._id,
          dispatch,
          handleNotification,
        });

        setTimeout(() => {
          setIsHover(false);
        }, 1000);
      }
    }
  };


  return (
    <>
      <div className="bg-inherit w-full h-full relative z-0 snap-end snap-always">
        <div className="flex flex-col h-screen w-full items-center justify-center">
          {isHover && (
            <div className="flex absolute h-full w-full text-[#00acee] z-100 items-center justify-center">
              {note?.likes?.includes(currentUser?._id) ? (
                <IoMdHeart fontSize={100} />
              ) : (
                <IoMdHeartEmpty fontSize={100} style={{ color: "gray" }} />
              )}
            </div>
          )}

          <div
            ref={postRef}
            className="flex flex-col absolute overflow-hidden top-0 z-60 h-full w-full lg:w-1/2 items-center"
            onDoubleClick={() => handleLiking()}
          >
            <div className=" w-full h-[60px] relative flex flex-row align-center items-center">
              <div className="items-center m-4 flex flex-col z-50 relative">
        
                <CardImg imageSrc={channel?.profileUrl} Func={()=>handleProfile(channel?.name)}/>

                {currentUser?._id !== note.userId && (
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
                                  userId: note.userId,
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
              <div className="flex flex-row z-50 font-medium ml-2 w-[20%] h-5 ">
                {/* {channel?.name} */}
                channelname
              </div>
            </div>

            <div className="rounded-[30px] border border-[#999] flex flex-row absolute items-center gap-[30px] bottom-[30px] w-[70%] p-2 w-auto items-center ">

              <>
                <button style={{ color: "gray" }} className="items-center cursor-pointer flex flex-row" onClick={() => handleLiking()}>
                  {note?.likes?.includes(currentUser?._id) ? (
                    <IoMdHeart fontSize={35} style={{ color: "#00acee" }} />
                  ) : (
                    <IoMdHeartEmpty fontSize={35} />
                  )}
                  <text className="font-sm">{note?.likes?.length}</text>
                </button>

                <button style={{ color: "gray" }}>
                  <MdComment
                    fontSize={35}
                    onClick={() => handleViewComment()}
                  />
                </button>

                <button style={{ color: "gray" }}>
                  <RiShareForwardFill fontSize={35} />
                </button>

                <button style={{ color: "gray" }}>
                  <TfiBookmark fontSize={30} />
                </button>
              </>
            </div>
            <>
              <div className="p-6 h-full w-full  flex flex-col justify-start overflow-auto hide-scrollbar text-xl">
                {note.desc}
              </div>
            </>
          </div>
        </div>
      </div>
      {toggleComment && (
        <Suspense fallback={<Spinner />}>
          <Comments
            setToggleComment={setToggleComment}
            post={note}
            handleNotification={handleNotification}
          />
        </Suspense>
      )}
      {toggleCardProfile && (
        <Suspense>
          <CardProfile
            type={note}
            channel={channel}
            setToggleCardProfile={setToggleCardProfile}
          />
        </Suspense>
      )}
    </>
  );
};

export default NoteCard;
