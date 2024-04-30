import React, { useState } from 'react';
import ChangePic from './ChangePic.jsx';
import Navigation from '../fragments/Navigation.jsx';
import { FaEdit } from 'react-icons/fa';
import Bio from './Bio.jsx';
import { useSelector } from 'react-redux';
import Name from './Name.jsx';
import CardImg from './CardImg.jsx'
import {motion} from 'framer-motion'

const ProfileEdit = ({ setToggleEditProfile }) => {
  let [crop, setCrop] = useState({ x: 0, y: 0, scale: 1 })

  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [toggleAddBio, setToggleAddBio] = useState(false)
  const [toggleAddName, setToggleAddName] = useState(false)
  const [fileDataUrl, setFileDataUrl] = useState(null)
  const [file, setFile] = useState();
  const [EditName,setEditName] = useState("")

  const { currentUser } = useSelector(state => state.user)

  const handlePhotoChange = async (e) => {
    const image_file = e.target.files[0]
    setFile(image_file)
    const reader = new FileReader()
    reader.readAsDataURL(image_file)

    reader.onload = (e) => {
      setFileDataUrl(e.target.result)
    }
  }

  const handleBackBtnCLick = (e) => {
    e.preventDefault();
    setToggleEditProfile(false)
  }

  const handleClick = (e) => {
    setToggleUpdate(true)
    setFileDataUrl(null)
    handlePhotoChange(e)
  }

  const handleChange = (id) => {
    if (id === "bio") {
      setToggleAddBio(true)
    } else if(id === "name") {
      setToggleAddName(true)
      setEditName("profile name")
    }else {
      setToggleAddName(true)
      setEditName("username")
    }

  }

  const Edit = ({ Func, Title, subTitle,Name }) => {
    return (
      <div className='relative flex flex-row ' onClick={() => {Name &&(handleChange(Name))}}>
        <div className='pl-3 py-3 flex flex-col rounded-lg hover:bg-[#f5f5f5] dark:hover:bg-[#202020] w-full cursor-pointer'>
          <h2 className='font-base font-medium'>{Title}</h2>
            <div className='flex flex-row items-center text-[#999] w-[80%] '>
                {Func  ? (
                  Func
                ) : (
                  subTitle 
                )}
                {Name &&(
                  <FaEdit className='absolute right-10 text-[#999]' fontSize={15} />
                )}
            </div>
        </div>
      </div>
    )
  }

  const header = "Edit Profile"

  return (
    <>
    <div onClick={()=>setToggleEditProfile(false)} className='hidden sm:flex flex-col left-0 bg-[#000000a7] z-10 w-full h-full fixed '>
    </div>
    <motion.div
      className="bg-white dark:bg-black flex flex-col top-0 right-0 overflow-scroll hide-scrollbar z-10 fixed w-full lg:w-[90%] h-[100dvh] items-center "
      initial={{opacity: 0}}
      animate = {{opacity: 1}}
      exit= {{opacity: 0}}
    >

      <Navigation header={header} handleBackBtnCLick={handleBackBtnCLick} />

      <div className="hide-scrollbar w-full lg:w-3/4 flex flex-col pt-[60px] lg:pt-[70px]">
        <div className=" flex flex-col items-center">

          <label htmlFor='img'>
            <CardImg imageSrc={currentUser?.profileUrl}  FromProfile={true}/>
          </label>

          <label htmlFor='img'>
            <div className='flex flex-col items-center gap-2 justify-start'>
              <input
              className='hidden '
              id='img' type="file" accept="image/*" onChange={(e) => handleClick(e)} />
              <h2 className='font-base font-normal'>Change photo</h2>
            </div>
          </label>
        </div>

        <div className="w-full  pb-5 mt-5">
          <div className='relative'>
            <Edit Name="name" Func={currentUser.profileName} Title="Profile name" subTitle="Edit Profile name" />
            <Edit Name="username" Func={currentUser.username} Title="Username" subTitle="Add username" />
            <Edit Name="bio"  Func={currentUser.bio} Title="Bio" subTitle="Add bio to your profile" />
          </div>
        </div>
      </div>

      {toggleUpdate && (
        <ChangePic
          file={file}
          crop={crop}
          setCrop={setCrop}
          setToggleUpdate={setToggleUpdate}
          imageSrc={fileDataUrl}
          setFileDataUrl={setFileDataUrl}
        />
      )}
      {toggleAddBio && (
        <Bio setToggleAddBio={setToggleAddBio}/>
      )}
      {toggleAddName && (
        <Name setToggleAddName={setToggleAddName} EditName={EditName}/>
      )}

    </motion.div>
    </>
  )
}

export default ProfileEdit











