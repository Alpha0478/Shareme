import React, { useState,useEffect } from 'react'
import Navigation from '../fragments/Navigation.jsx'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userName, userProfileName } from '../redux/userSlice.js';
import {RestartAnimation} from '../App.js'

const Name = ({ setToggleAddName,EditName }) => {
  const [name, setName] = useState("")
  const [ready,setReady] = useState(false)
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user)


  useEffect(() =>{
   if(name.length > 30 || name.length < 5){
    setReady(false)
   }else{
    setReady(true)
   }
  },[name])

  const handleSave = async () => {
    cleanup()
    try {
      if(EditName === "profile name"){
        const res = await axios.put(`/users/${currentUser._id}`, { profileName:name })
        dispatch(userProfileName(res.data.profileName))
        RestartAnimation({message:"Profile name was updated"})
      }else{
        const res = await axios.put(`/users/${currentUser._id}`, { username:name })
        dispatch(userName(res.data.username))
        RestartAnimation({message:"Username was updated"})
      }
      
      handleBackBtnCLick()

    } catch (err) {
      if (err.response.data.message){
        RestartAnimation({message:err.response.data.message})
      }else{
        RestartAnimation({message:"An error occured"})
      }
    }
  }

  const handleBackBtnCLick = () => {
    setToggleAddName(false)
  }

  const handleChange = (e) => {
    if (name.length < 30) {
      setName(e.target.value)
    }else{
      setName(name)
    }
  }
  const cleanup = () => {
    setName("")
    document.getElementById("input").value = ""

  }

  const header = EditName


  return (
    <div className='bg-white dark:bg-black flex flex-col top-0 overflow-scroll z-10 absolute h-full w-full hide-scrollbar'>
      <Navigation header={header} handleBackBtnCLick={handleBackBtnCLick} />
      <div className='flex flex-col justify-center items-center pt-[80px] '>
        <input
          id='input'
          required
          className="bg-[#f5f5f5] dark:bg-[#202020] p-[10px] outline-none rounded-[6px] hide-scrollbar justify-start h-[50px] w-[95%] lg:w-[75%]"
          name="desc"
          maxLength={30}
          placeholder={"Edit " +  EditName}
          row={8}
          onChange={(e) => handleChange(e)}
        />
        <div className='absolute right-4 mt-6'>
          {name.length < 30 ? (
            <h2 style={{ color: "#00acee" }}>{`${name.length}/30`}</h2>

          ) : (
            <h2 style={{ color: "#cc1a00" }}>{`${name.length}/30`}</h2>
          )}

        </div>
          {ready === false ? (
            <button
              className="flex flex-row items-center justify-center p-[8px] w-[40%] rounded-full mt-[40px] font-xl"
              style={{ backgroundColor: "#999", color: "white" }}
              type="button"
              onClick={cleanup}
            >
              incomplete details
            </button>
          ) : (
            <button
              className="flex flex-row items-center justify-center p-[8px] w-[40%] rounded-full mt-[40px] font-xl"
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

export default Name