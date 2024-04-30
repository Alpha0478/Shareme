import React, { useState } from "react";
import { TfiClose, TfiInfoAlt, TfiLink, TfiTrash } from "react-icons/tfi";
import { CiEdit, CiShare2 } from "react-icons/ci";
import { MdComment } from "react-icons/md";
import axios from "axios";
import { postsFetchSuccess } from "../redux/postsSlice.js";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const ReactionButtons = ({post, handleLiking,setCallFromVideo,setToggleComment}) => {
  const [toggleInfo, setToggleInfo] = useState(false);
  const { posts } = useSelector((state) => state.posts);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handletoggleInfo = () => {
    setToggleInfo(!toggleInfo);
  };

  const handleHide = async (id) => {
    const X = document.getElementById("card");
    X.style.animationPlayState = "running";
    X.addEventListener("animationend", () => {
      handleDelete(id);
    });
  };

  const handleViewComment = () => {
    if (post.postType === "video") {
      setCallFromVideo(true);
    }
    setToggleComment(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/${post.postType + "s"}/del/${post._id}`);
    const postsList = posts.filter((post) => post._id !== id);
    dispatch(postsFetchSuccess(postsList));
    // dispatch(delPost(id))
  };

  return (
    <>
      {currentUser && (
        <>
          <div className="text-[#606060] dark:text-[#999] flex items-center relative w-full pl-6 gap-5">
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleLiking()}
            >
              {post.likes.includes(currentUser?._id) ? (
                <IoMdHeart fontSize={30} style={{ color: "#00acee" }} />
              ) : (
                <IoMdHeartEmpty fontSize={30}/>
              )}
              <text className="font-sm" >
                {post.likes.length}
              </text>
            </div>

            <div className="flex flex-col items-center  cursor-pointer">
              <MdComment
                fontSize={30}
                onClick={() => handleViewComment()}
              />
              <text className="font-sm">
                10K
              </text>
            </div>

            {toggleInfo && (
              <div className="flex flex-row items-center justify-center w-full h-[32px]">
                <div className="flex flex-row items-center justify-center w-full mb-[15px] gap-5">
                  <CiShare2 fontSize={28} className=" cursor-pointer"/>

                  {currentUser?._id === post.userId && (
                    <>
                      <CiEdit fontSize={28} className=" cursor-pointer"/>
                      <TfiTrash
                        fontSize={25}
                        id="hide"
                        onClick={() => {
                          handleHide(post?._id);
                        }}
                      />
                    </>
                  )}
                  <TfiLink fontSize={25}  className=" cursor-pointer"/>
                </div>
              </div>
            )}

            <div
              className="flex flex-col items-center color-inherit absolute right-4"
              onClick={() => {
                handletoggleInfo();
              }}
            >
              {toggleInfo ? (
                <>
                  <TfiClose
                    fontSize={12}
                    className="mb-4 mr-1  cursor-pointer"
                  />
                </>
              ) : (
                <>
                  <TfiInfoAlt fontSize={20} className=" cursor-pointer"/>
                  <text className="font-sm">
                    info
                  </text>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ReactionButtons;
