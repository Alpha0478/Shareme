import React, { Suspense, useEffect, useState } from 'react'
import { TfiClose, TfiHeart, TfiTrash } from 'react-icons/tfi';
import { format } from "timeago.js"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { likeReply, replysSucces } from '../redux/replysSlice.js';
import { FaHeart } from 'react-icons/fa';
import { handleLike } from '../fragments/helper.js';
import Spinner from './Spinner.jsx';

const Reply = ({ type, reply, socket }) => {
  const CardProfile= React.lazy(() => import('./CardProfile.jsx'))
  const [toggleInfo, setToggleInfo] = useState(false)
  const [channel, setChannel] = useState("")
  const [toggleCardProfile, setToggleCardProfile] = useState(false)

  const { currentUser } = useSelector(state => state.user)
  const { replys } = useSelector(state => state.replys)
  const ProfileStyle = "hide-scrollbar fixed z-50 h-screen w-full lg:w-[90%] right-0 lg:items-center"

  const dispatch = useDispatch()

  const handleDelete = async (id) => {
    await axios.delete(`/reply/${id}`)
    const replyList = replys.filter(reply => reply._id !== id)
    dispatch(replysSucces(replyList))
  }

  const handleNotification = (msg) => {
    socket?.emit("sendNotification", {
      senderName: currentUser?.name,
      receiverName: reply?.name,
      msg,
    })
  }
  useEffect(() => {
  const fetchUser = async () => {
    console.log("user fetch")

    try {
      const res = await axios.get(`users/find/${reply.userId}`)
      setChannel(res.data)

      return () => {
        setChannel("")
      }
    } catch (err) {
      if (err.response.status === 500) {
        console.log("No Connnections")
      }
    }
  }

    fetchUser()
  }, [reply.userId])


  const handleProfile = () => {
    setToggleCardProfile(true)
  }

  return (
    <>
      <div id='hide' className='flex flex-row items-center relative w-full m-[3px]'>
        <div className='h-full items-center absolute'>
          <img
            className='h-[36px] w-[36px] m-[8px] bg-[#999] rounded-full'
            src={channel.profileUrl} onClick={() => handleProfile()} 
            alt="profile pic"
            />
        </div>

        <div className='flex flex-col w-full p-[6px] ml-[52px] min-w-0' >
          <div className='font-bold h-[20px] text-sm flex flex-row align-center'>
            {reply?.name}
          </div>
          <div onClick={() => setToggleInfo(true)}>
            {reply.desc}
            <span className='flex-shrink-0' style={{ color: "#999" }}>
              <span className='px-1'>.</span>
              <span className='font-xs'>{format(reply.createdAt)}</span>
            </span>
          </div>

          <button className=' flex flex-col items-center cursor-pointer absolute right-4' style={{ color: "#999" }} onClick={() => handleLike({ id: reply?._id, postState: likeReply, post: "reply", userId: currentUser?._id, dispatch, handleNotification })}>
            {reply?.likes?.includes(currentUser?._id)
              ? <FaHeart style={{ color: "red" }} />
              : <TfiHeart style={{ color: "#999" }} />
            }
            <text className='font-xs' >
              {reply.likes.length}
            </text>
          </button>

          {toggleInfo && (
            <div className="flex flex-row items-center rounded-[30px] bg-[#f5f5f5] dark:bg-[#202020] h-[32px] w-[80%] mt-[20px] ">
              <div className="flex flex-row items-center justify-center  gap-[20px] w-full mr-[15px]">
                {currentUser._id === reply?.userId && (
                  <>
                    <button
                      className='flex flex-col items-center cursor-pointer'
                      onClick={() => handleDelete(reply?._id)}>
                      <TfiTrash fontSize={25} style={{ color: "#999" }} id="hide" />
                    </button>
                  </>
                )}

                <span className="ml-4" onClick={() => setToggleInfo(false)}>
                  <TfiClose fontSize={12} style={{ color: "#999" }} />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {toggleCardProfile && (
        <Suspense fallback={<Spinner />}>
          <CardProfile
            channel={channel}
            setToggleProfile={setToggleCardProfile}
          />
        </Suspense>

      )}
    </>
  )
}

export default Reply