import React, { useState}  from 'react';
import Navigation from '../fragments/Navigation.jsx';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Noty from '../components/Noty.jsx'
import useSWR from 'swr'
import Spinner from '../components/Spinner.jsx'
import { RestartAnimation } from '../App.js';
import { TfiInfoAlt } from 'react-icons/tfi';

const Notification = ({setCount,socket}) => {
    const [notifications,setNotifications] = useState([])
    const {currentUser} = useSelector(state=>state.user)

    const Api = axios.create({
      baseURL: "http://192.168.0.107:8800"
    })
    
     const notificationsUrlEndpoint ="/api/notification"
  
    
     const fetchNotifications = async() =>{
      const res = await Api.get(`${notificationsUrlEndpoint}/${currentUser?._id}`)
      return res.data
    }
  
    const  {
      isLoading,
      error,
    } =useSWR(notificationsUrlEndpoint, fetchNotifications, {
      onSuccess: data =>  setNotifications(data)
    })
    

  const handleBackBtnCLick= (e) =>{
    e.preventDefault();
    setCount(0)
    localStorage.setItem("count", JSON.stringify(0));

  }
const header = "Notifications"

  return (
    <div className="flex flex-col top-0 overflow-scroll z-10 w-full absolute h-full hide-scrollbar lg:items-center"
     onMouseLeave={handleBackBtnCLick}
    >
    <Navigation header={header}/>
      <div className='hide-scrollbar flex flex-col h-screen pt-[70px] lg:w-3/4 overflow-scroll items-center'>
        {isLoading ?
         <Spinner/>
         : error ?
         <div className="flex flex-col  text-lg text-[#cc1a00] h-full w-full items-center justify-center">
         <TfiInfoAlt fontSize={50}/>
         An error occured
         </div>
         :notifications.length > 1 ?
        notifications.map(notification =>(
          <Noty
            notification={notification}
            key={notification?._id}
            socket={socket}
          />
         ))
         :
         <h2 className="font-base font-normal mt-6 mb-6" style={{color:"#00acee"}} >No Notifications</h2>
        }
       </div>
    </div>
  )
}

export default  Notification
