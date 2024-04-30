import React from 'react';
import VideoCard from '../components/VideoCard.jsx';
import { videosFetchSuccess } from '../redux/videosSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import {fetchVideos,videosUrlEndpoint as cacheKey} from '../components/fetchers/fetch.js'
import useSWR from 'swr'
import Spinner from '../components/Spinner.jsx';
import { TfiInfoAlt } from 'react-icons/tfi';


const Videos = ({socket}) => {
  const dispatch = useDispatch()
  const {videos} = useSelector((state) =>state.videos)
  
  const  {
    isLoading,
    error,
  } =useSWR(cacheKey, fetchVideos, {
    onSuccess: data =>  dispatch(videosFetchSuccess(data))
  })


  return (
    <div  id="videos" className="flex flex-col h-full absolute bg-black w-full pt-0 mb-0 lg:pt-[25px] hide-scrollbar items-center">
      <div className='flex flex-col overflow-scroll pt-0 h-full hide-scrollbar w-full lg:w-3/4 snap-mandatory snap-y'>
        {isLoading ?
          <Spinner/>
        : error ?
        <div className="flex flex-col  text-lg text-[#cc1a00] h-full w-full items-center justify-center">
        <TfiInfoAlt fontSize={50}/>
        An error occured
        </div>
        :
        videos?.map((video) => (
          <VideoCard 
          key={video._id} 
          video={video} 
          socket={socket}
          />
        ))
        }
      </div>
    </div>

    
  )
}

export default  Videos