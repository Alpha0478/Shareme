import React, { useState } from 'react'
import Navigation from '../fragments/Navigation.jsx'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userBio } from '../redux/userSlice.js';
import { RestartAnimation } from '../App.js';
import { TfiTrash } from 'react-icons/tfi';

const Bio = ({ setToggleAddBio }) => {
  const [bio, setBio] = useState("")
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user)

  const removeBio = async () =>{
    try {
      const res = await axios.put(`/users/${currentUser._id}`, { bio:"" })
      dispatch(userBio(res.data.bio))
      RestartAnimation({ message: "Bio was removed"})
      handleBackBtnCLick()
    } catch (err) {
      RestartAnimation({ message: "An error occured"})
    }
  }

  const handleSave = async () => {
    try {
      const res = await axios.put(`/users/${currentUser._id}`, { bio })
      dispatch(userBio(res.data.bio))
      RestartAnimation({ message: "Bio was updated" })
      handleBackBtnCLick()
    } catch (err) {
      RestartAnimation({ message: "An error occured"})
    }
  }

  const handleBackBtnCLick = () => {
    setToggleAddBio(false)
  }

  const handleChange = (e) => {
    if (bio.length < 100) {
      setBio(e.target.value)
    }
  }

  return (
    <div className='bg-white dark:bg-black flex flex-col top-0 overflow-scroll z-10 absolute h-full w-full hide-scrollbar'>
      <Navigation header={currentUser.bio?("Edit bio"):"Add bio"} handleBackBtnCLick={handleBackBtnCLick} />

      <div className='flex flex-col justify-center items-center pt-[80px] '>
        <textarea
          id='input'
          required
          className="text-black bg-[#f5f5f5] dark:bg-[#202020] p-[10px] h-[120px] outline-none resize-none rounded-[6px] pr-[2px]  mx-[10px] text-[15px] hide-scrollbar justify-start w-[95%] lg:w-[70%]"
          name="desc"
          maxLength={100}
          placeholder={currentUser.bio ? (currentUser.bio) : "Tell followers about you"}
          row={8}
          value={bio}
          onChange={(e) => handleChange(e)}
        />
        <div className='absolute right-4 lg:right-[16%] mt-6'>
          {bio.length < 100 ? (
            <h2 style={{ color: "#00acee" }}>{`${bio.length}/100`}</h2>

          ) : (
            <h2 style={{ color: "#cc1a00" }}>{`${bio.length}/100`}</h2>
          )}

        </div>
        {currentUser.bio && (
          <button className='flex flex text-[#cc1a00] absolute mt-6 left-4 lg:left-[16%] row items-center gap-3' onClick={()=>removeBio()}>
            <TfiTrash fontSize={25} />
            Remove bio
          </button>
        )}

        {!bio ? (
          <button
            className="flex flex-row items-center justify-center p-[8px] w-[40%] rounded-full mt-[20px] font-xl"
            style={{ backgroundColor: "#999", color: "white" }}
            type="button"
          >
            incomplete details
          </button>
        ) : (
          <button
            className="flex flex-row items-center justify-center p-[8px] w-[40%] rounded-full mt-[20px] font-xl"
            style={{ backgroundColor: "#00acee", color: "white" }}
            type="button"
            onClick={() => handleSave()}
          >
            Save
          </button>
        )}
      </div>

    </div>
  )
}

export default Bio