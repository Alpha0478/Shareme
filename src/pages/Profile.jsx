import React, { useState } from 'react';
import { FaCog, FaTh } from 'react-icons/fa'
import { TfiBookmark } from 'react-icons/tfi';
import ViewPicture from '../components/ViewPicture.jsx';
import ProfileEdit from '../components/ProfileEdit.jsx';
import Navigation from '../fragments/Navigation.jsx';
import { useSelector } from 'react-redux';
import Bio from '../components/Bio.jsx';
import CardImg from '../components/CardImg.jsx';
import { IoMdHeartEmpty } from 'react-icons/io';
import AccountSettings from '../components/AccountSettings.jsx'
import { motion } from 'framer-motion';

// const Content = styled.div`
// display: flex;
// flex-direction: column;
// justify-content: center;
// align-items: center;
// width: 100%;
// height: 100dvh;
// display: grid;
// grid-template-columns: repeat(3, 1fr);
// grid-auto-rows: minmax(150px, 50px);
// grid-gap: 0.1em;
// `;

const Profile = () => {
  const [viewPic, setViewPic] = useState(false);
  const [toggleEditProfile, setToggleEditProfile] = useState(false)
  const [toggleAccountSettings, setToggleAccountSettings] = useState(false)
  const [toggleAddBio, setToggleAddBio] = useState(false)
  const { currentUser } = useSelector(state => state.user)

 
  const Button = ({Func,Icon,Size,Styles}) =>{
    return(
    <button className={`${Styles} flex items-center justify-center text-[#606060] hover:text-[#00acee] cursor-pointer w-[42px] h-[42px] hover:border-2 border-[#00acee] rounded-full`}
     onClick={Func}
    >
      <Icon fontSize={Size} />
    </button>
    )
  }

  const Stat = ({Func,Name}) =>{
    return(
      <div className='flex flex-col items-center'>
      <text className='font-bold text-lg'>{Func}</text>
      <h2 className='font-base font-normal' style={{ color: "#999" }}>{Name}</h2>
    </div>
    )
  }

  const header = currentUser?.profileName
  const nextbtn = <Button Icon={FaCog} Size={22} Func={() => setToggleAccountSettings(true)} Styles="absolute right-1"/>

  return (

    <motion.div
      className="hide-scrollbar z-10 h-full w-full items-center overflow-scroll absolute bg-white dark:bg-black hide-scrollbar flex flex-col top-0 overflow-scroll"
      initial={{opacity: 0}}
      animate = {{opacity: 1}}
      exit= {{opacity: 0}}
    >
      <Navigation header={header} nextbtn={nextbtn}/>
      <div className='flex flex-col h-full overflow-scroll w-full lg:w-[90%] hide-scrollbar pt-[60px] lg:pt-[70px]'>
        <div className='flex flex-col items-center  pr-0 pl-0 lg:pr-40 lg:pl-40'>
          <CardImg imageSrc={currentUser?.profileUrl} Func={()=>setViewPic(true)} FromProfile={true}/>
          
          <h2 className='font-base font-normal'>{currentUser?.username}</h2>

          <div className='flex flex-row justify-around pl-[20px] w-[80%] align-center'>
            <Stat Func={currentUser?.subscribers.length} Name="posts"/>
            <Stat Func={currentUser?.subscribers.length} Name="followers"/>
            <Stat Func={currentUser?.subscribedUsers.length} Name="following"/>
          </div>
          <button className='bg-[#e5e5e5] dark:bg-[#202020] hover:font-bold hover:bg-[#00acee] dark:hover:bg-[#00acee] hover:text-white items-center rounded-[6px] mt-[15px] py-[8px] px-[50px]' onClick={() => setToggleEditProfile(true)}>
            <h2 className='text-md '>Edit profile</h2>
          </button>
              {currentUser?.bio ? (
                <div className='font-base font-normal mt-6 mb-6 w-[70%] items-center flex flex-col justify-center' style={{ color: "#00acee" }}>
                  {currentUser?.bio}
                </div>
              ) : (
                <h2 className="text-[#999] hover:text-[#00acee] hover:font-bold font-base mt-6 mb-6" onClick={() => setToggleAddBio(true)}>Tap to add bio</h2>
              )}
          </div>

        <div className="w-full sticky top-0 border-b-[2px] border-[#f5f5f5] dark:border-[#202020]  pr-0 pl-0 lg:pr-40 lg:pl-40">
          <div className="flex flex-row justify-around w-full top-0 sticky pt-2 pb-2">
            <Button Icon={FaTh} Size={22}/>
            <Button Icon={TfiBookmark} Size={22}/>
            <Button Icon={IoMdHeartEmpty} Size={26}/>
          </div>
        </div>

     
      </div>
      {viewPic && (
        <ViewPicture setViewPic={setViewPic} imageSrc={currentUser?.profileUrl} />
      )}

      {toggleEditProfile && (
        <ProfileEdit
          setToggleEditProfile={setToggleEditProfile}
          setViewPic={setViewPic}
          setToggleAddBio={setToggleAddBio}
        />
      )}
      {toggleAddBio && (
        <Bio setToggleAddBio={setToggleAddBio} />
      )}
      {toggleAccountSettings &&(
        <AccountSettings setToggleAccountSettings={setToggleAccountSettings}/>
      )}
    </motion.div>
  )



}

export default Profile











