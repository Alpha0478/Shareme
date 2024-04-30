import React, { useState } from 'react';
import { FaHeart, FaTh } from 'react-icons/fa'
import { TfiBookmark } from 'react-icons/tfi';
import ViewPicture from '../components/ViewPicture.jsx';
import Navigation from '../fragments/Navigation.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { handleFollow, handleUnfollow } from '../fragments/helper.js';
import CardImg from '../components/CardImg.jsx';

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

const CardProfile = ({ socket,type, channel,setToggleCardProfile }) => {
  const [viewPic, setViewPic] = useState(false);
  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch()


  const handleBackBtnCLick = (e) => {
    e.preventDefault();
    setToggleCardProfile(false)
    
  }


  const handleNotification = (msg) => {
    socket?.emit("sendNotification", {
      senderName: currentUser?.name,
      receiverName: channel?.name,
      msg,
    })
  }

  const Button = ({Icon}) =>{
    return(
    <button className='flex items-center justify-center w-[40px] h-[40px] text-[#999] cursor-pointer'>
      <Icon fontSize={22} />
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

  const header = channel?.name

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white hide-scrollbar z-10 h-[100dvh] w-full lg:w-3/4 fixed flex flex-col top-0 overflow-scroll">
      <Navigation header={header} handleBackBtnCLick={handleBackBtnCLick} />
      <div className='flex flex-col h-full overflow-scroll w-full lg:w-[90%] hide-scrollbar pt-[70px]'>
        <div className='flex flex-col items-center pr-0 pl-0 lg:pr-40 lg:pl-40'>
          <CardImg imageSrc={channel?.profileUrl} Func={()=> setViewPic(true)} FromProfile={true}/>
          
          <h2 className='font-base font-normal'>{channel?.name}</h2>

          <div className='flex flex-row justify-around w-[80%] pl-[20px] align-center'>
            <Stat Func={channel?.subscribers.length} Name="posts"/>
            <Stat Func={channel?.subscribers.length} Name="followers"/>
            <Stat Func={channel?.subscribedUsers.length} Name="following"/>
          </div>
    
              {currentUser && (
                <>
                  {currentUser?._id !== type?.userId && (
                    <>
                      {currentUser?.subscribedUsers?.includes(channel?._id) ?
                        <button 
                           className='bg-[#f5f5f5] dark:bg-[#202020] items-center rounded-sm  my-[15px] py-[4px] px-[40px]' 
                           onClick={() => handleUnfollow({ userId: type?.userId, channelId: channel?._id, dispatch })}
                        >
                         <h2 className='text-lg font-bold text-white'>following</h2>
                        </button>
                        : <button 
                            className='bg-[#00acee]  items-center rounded-sm  my-[15px] py-[4px] px-[50px]' 
                            onClick={() => handleFollow({ userId: type?.userId, channelId: channel?._id, handleNotification, dispatch })}
                          >
                           <h2 className='text-lg font-bold text-white'>follow</h2>
                        </button>
                      }
                      {channel?.bio && (
                        <h2 className="font-base font-normal mt-6 mb-6" style={{ color: "#00acee" }} >{channel?.bio}</h2>
                      )}
                    </>
                  )}
                </>
              )}
        </div>

        <div className="w-full sticky top-0 border-b-[2px] border-[#f5f5f5] dark:border-[#202020]  pr-0 pl-0 lg:pr-40 lg:pl-40">
          <div className="flex flex-row justify-around w-full top-0 sticky pt-2 pb-2">
            <Button Icon={FaTh}/>
            <Button Icon={TfiBookmark}/>
            <Button Icon={FaHeart}/>
          </div>
        </div>

      </div>
      {viewPic && (
        <ViewPicture setViewPic={setViewPic} imageSrc={channel?.profileUrl} />
      )}

    </div>
  )



}

export default CardProfile











