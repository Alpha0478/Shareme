import React from 'react';
import Navigation from '../../fragments/Navigation.jsx'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addPost } from '../../redux/postsSlice.js';
import CardImg from "../CardImg.jsx";

const AddNote = ({ setToggleAddNote, setToggleAddpost }) => {
  const [postBody, setPostBody] = useState('')
  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleBackBtnCLick = (e) => {
    e.preventDefault();
    setToggleAddNote(false)
    setToggleAddpost(false)

  }

  const handlePost = async () => {
    const res = await axios.post("/notes", { desc: postBody, userId: currentUser?._id, postType: "note" })
    dispatch(addPost(res.data))

    res.status === 200 &&
      setToggleAddpost(false)
  }

  const savebtn = 
  <button 
    className='absolute right-5 rounded-sm text-[#00acee]' 
    onClick={() => handlePost()}
    id="submit" 
    type="submit"
  >
    Post
  </button>

  const header = "Upload a script"

  return (
    <div className="bg-white dark:bg-black flex flex-col h-[100vh] top-0 z-10 absolute w-full">
      <Navigation header={header} handleBackBtnCLick={handleBackBtnCLick} savebtn={savebtn} />

      <div className="flex flex-row w-full mt-[50px] items-center z-1 pr-2 h-12 lg:h-40">
        <CardImg imageSrc={currentUser?.profileUrl}/>
        <text className='ml-[6px] text-md font-medium'>{currentUser?.name}</text>
      </div>

      <form>
        <textarea
          required
          className="bg-[#f5f5f5] dark:bg-[#202020] rounded-[6px] p-[10px] outline-none hide-scrollbar text-xl absolute h-full w-full"
          name="desc"
          placeholder="What`s going on?"
          row={8}
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />

      </form>
    </div>

  )
}

export default AddNote