import axios from 'axios';
import React, { useEffect, useState, Suspense } from 'react'
import { format } from 'timeago.js';
import CardImg from "./CardImg.jsx";


const Noty = ({notification,socket}) => {
  const CardProfile = React.lazy(() => import('./CardProfile.jsx'))
  const [toggleCardProfile,setToggleCardProfile] = useState(false)
  const [channel,setChannel] = useState("")

  useEffect(()=>{
  const fetchUser = async() =>{
    try{
      const res = await axios.get(`users/find/${notification.userId}`)
      setChannel(res.data)

      return ()=>{
        setChannel("")
      }
    }catch(err){
      if(err.response.status === 500){
        console.log("No Connnections")
      }
    }
  }
    fetchUser()
},[notification.userId])

const handleProfile = () =>{
  setToggleCardProfile(true)
}

  return (
    <>
    <div className='flex flex-row justify-center items-center ml-[6px] my-[6px] relative w-full hide-scrollbar'>
   
        <CardImg imageSrc={channel?.profileUrl} Func={()=>handleProfile(channel?.name)}/>

        <div className='flex flex-col w-full p-[6px] '>
            <div>
              {notification.desc}
              <span className='flex-shrink-0' style={{color: "#999"}}>
                <span className='px-1'>.</span>
                <span className='font-xs'>{format(notification.createdAt)}</span>
              </span>
            </div>
        </div>
      </div>
           {toggleCardProfile &&(
            <Suspense>
              <CardProfile
                channel={channel} 
                setToggleCardProfile={setToggleCardProfile} 
              />
            </Suspense>
      
          )}
      </>
  )
}

export default Noty