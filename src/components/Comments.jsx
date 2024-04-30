import React, { useRef, useState } from 'react'
import Comment from './Comment.jsx';
import Navigation from '../fragments/Navigation.jsx'
import ProfileImg from '../fragments/ProfileImg.jsx';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, commentSuccess } from '../redux/commentSlice.js';
import Spinner from './Spinner.jsx';
import { addReply } from '../redux/replysSlice.js';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr'

const Comments = ({ socket, setToggleComment, post, handleNotification, callFromVideo }) => {
  const [comment, setComment] = useState("")
  const [placeholder, setPlaceholder] = useState("Add a comment....")
  const [inputType, setInputType] = useState("comment")
  const [commentId, setCommentId] = useState()
  const { currentComment } = useSelector(state => state.comment)
  const { currentUser } = useSelector(state => state.user)

  const videoId = post._id
  const name = currentUser?.name
  const desc = comment

  const InputRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const Api = axios.create({
    baseURL: "http://192.168.0.107:8800"
  })

  const commentsUrlEndpoint = "/api/comments"


  const fetchComments = async () => {
    const res = await Api.get(`${commentsUrlEndpoint}/${post._id}`)
    return res.data
  }

  const {
    isLoading,
    error
  } = useSWR(commentsUrlEndpoint, fetchComments, {
    onSuccess: data => dispatch(commentSuccess(data))
  })


  const handleBackBtnCLick = (e) => {
    setToggleComment(false)
    dispatch(commentSuccess(""))
  }

  const handleChange = (e) => {
    if (currentUser) {
      if (comment.length <= 150) {
        setComment(e.target.value)
      }
    } else {
      navigate('/signin')
    }

  }



  const handleSave = async (e) => {
    if (inputType === "comment") {
      const msg = "commented on your post"
      document.querySelector("#input").value = ""
      cleanUp()

      try {
        const res = await axios.post("/comments", { name, desc, videoId })
        dispatch(addComment(res.data))

        if (currentUser?._id !== post?.userId) {
          handleNotification(msg)
        }
      } catch (err) {

      }
    } else {
      const msg = "replied on your post"
      document.querySelector("#input").value = ""

      try {
        const res = await axios.post("/reply", { name, desc, commentId })
        dispatch(addReply(res.data))
        if (currentUser?._id !== post?.userId) {
          handleNotification(msg)
        }
        cleanUp()
      } catch (err) {

      }
    }
  }

  const cleanUp = () => {
    setInputType("comment")
    setPlaceholder("Add a comment...")
    setComment("")
  }

  const header = "Comments"

  return (
    <div className='bg-white dark:bg-black flex flex-col top-0 overflow-scroll hide-scrollbar h-[100dvh] z-50 lg:right-0 fixed w-full lg:w-[90%] lg:items-center'>
      <Navigation header={header} handleBackBtnCLick={handleBackBtnCLick} />
      <div className="flex overflow-scroll hide-scrollbar flex-col pt-[60px] w-full lg:w-[90%]">
        <div className='flex flex-col h-full pb-[70px] overflow-scroll w-full items-center hide-scrollbar'>
          {isLoading ?
            <Spinner />
            : error ?
            <Spinner />
            : currentComment.length > 1 ?
              currentComment.map(comment => (
                <Comment
                  key={comment._id}
                  socket={socket}
                  comment={comment}
                  setPlaceholder={setPlaceholder}
                  setInputType={setInputType}
                  setCommentId={setCommentId}
                  InputRef={InputRef}

                />
              ))
              :
              <h2 className="font-base font-normal mt-6 mb-6" style={{ color: "#00acee" }} >No Comments</h2>
          }
        </div>


        <div className="flex flex-row bottom-0 fixed pl-[8px] items-center z-0 mb-[4px] w-full lg:w-[81%]">
          <ProfileImg />
          <textarea
            ref={InputRef}
            id="input"
            className='bg-[#f5f5f5] dark:bg-[#202020] px-[8px] py-[2px] outline-none items-center w-[75%] border-2 border-[#f5f5f5] dark:border-[#202020] resize-none height-[15px] rounded-[6px] text-[15px]  hide-scrollbar ml-4 '
            placeholder={placeholder}
            row={1}
            maxLength={150}
            required
            name="comment"
            onChange={(e) => handleChange(e)}
          />

          {!comment || comment.length === 150 ? (
            <text className='absolute right-2 mx-[9px] text-[#999]'>
              {inputType === "comment" ? (
                "save"
              ) : (
                "reply"
              )}
            </text>
          ) : (
            <text
              className='absolute right-2 mx-[9px] text-[#00acee]'
              onClick={() => handleSave()}>
              {inputType === "comment" ? (
                "save"
              ) : (
                "reply"
              )}
            </text>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comments


