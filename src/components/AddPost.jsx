import React, { Suspense, useState } from 'react';
import { MdAddPhotoAlternate} from 'react-icons/md'
import {  AiOutlineVideoCameraAdd} from 'react-icons/ai'
import { CiStickyNote } from 'react-icons/ci';
import Spinner from './Spinner.jsx';

const AddPost = ({setToggleAddNote,toggleAddNote,toggleAddpost,setToggleAddpost }) => {
  const AddNote = React.lazy(() => import('./Uploads/AddNote.jsx'))
  const AddPhoto = React.lazy(() => import('./Uploads/AddPhoto.jsx'))
  const AddVideo = React.lazy(() => import('./Uploads/AddVideo.jsx'))

  const [toggleAddVideo, setToggleAddVideo] = useState(false);
  const [toggleAddPhoto, setToggleAddPhoto] = useState(false);
  const [postType,setPostType] = useState("")
  const [showGrid,setShowGrid] = useState(false)

  const handleNote = () =>{
    setToggleAddNote(true)
  }
  
  const handleVideo =() =>{
    setToggleAddVideo(true)
    setPostType("video")
  }

  const handleImg = () =>{
    setToggleAddPhoto(true)
    setPostType("image")
    setShowGrid(true)
  }

  const Button = ({Func,Icon,Name}) =>{
    return(
      <>
       <button
           className='flex flex-row items-center gap-[2px] justify-start p-[10px] w-full'
           onClick={Func}>
            <Icon fontSize={25}/>
            <h2 className='font-base font-medium'>{Name}</h2>
          </button>
      </>
    )
  }


  return (
    <>
    <div className="flex flex-col z-20 w-full fixed left-0 h-full items-center justify-center">
      <div onClick={()=>setToggleAddpost(false)} className='flex flex-col bg-[#000000a7] z-10 w-full h-full absolute '>
      </div>

      <div className="bg-[#f5f5f5] dark:bg-[#202020] w-[120px] flex flex-col rounded-[8px] z-10">
          <Button Func={handleImg} Icon={MdAddPhotoAlternate} Name="Photo"/>
          <Button Func={handleVideo} Icon={AiOutlineVideoCameraAdd} Name="Video"/>
          <Button Func={handleNote} Icon={CiStickyNote} Name="Note"/>
      </div>
      
      {toggleAddNote && (
        <Suspense fallback={<Spinner/>}>
          <AddNote
            setToggleAddNote={setToggleAddNote}
            setToggleAddpost={setToggleAddpost}
          />
        </Suspense>
      )}
      
      {toggleAddVideo && (
        <Suspense fallback={<Spinner/>}>
          <AddVideo
          setToggleAddVideo={setToggleAddVideo} 
          setToggleAddpost={setToggleAddpost} 
          toggleAddpost={toggleAddpost}  
          postType={postType}/>
        </Suspense>

      )}
      {toggleAddPhoto && (  
       <Suspense fallback={<Spinner/>}>
        <AddPhoto  
           showGrid={showGrid}
           setToggleAddPhoto={setToggleAddPhoto} 
           setToggleAddpost={setToggleAddpost} 
           toggleAddpost={toggleAddpost}   
           postType={postType} 
          />
      </Suspense>

      )}
    </div>
    </>
  )
}

export default AddPost