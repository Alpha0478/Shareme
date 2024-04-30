import React, { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import app from "../../firebase.js"
import axios from 'axios';
import Navigation from '../../fragments/Navigation.jsx';
import { getDataURLFromFile } from '../../fragments/helper';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { addPost } from '../../redux/postsSlice.js';
import { useDispatch } from 'react-redux';



const AddVideo = ({ postType, setToggleAddpost, toggleAddpost, setToggleAddVideo }) => {
  const [video, setVideo] = useState(undefined)
  const [videoSrc, setVideoSrc] = useState(null)
  const [videoPerc, setVideoPerc] = useState(0)
  const [inputs, setInputs] = useState({})

  const dispatch = useDispatch()


  const handleChange = (e) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }


  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        urlType === "Url" && setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
          default:
            break;
        }
      },
      (error) => { },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: getDownloadURL }
          });
        });
      }
    );
  };

  useEffect(() => { video && uploadFile(video, "Url"); }, [video]);



  const handleUpload = async (e) => {
    e.preventDefault();
    console.log(video)
    const res = await axios.post("/videos", { ...inputs, postType })
    dispatch(addPost(res.data))

    res.status === 200 && setToggleAddpost(false)
    if (!toggleAddpost) {
      setToggleAddVideo(false)
    }

  }

  const handleBackBtnCLick = (e) => {
    e.preventDefault();
    setToggleAddpost(false)
    if (!toggleAddpost) {
      setToggleAddVideo(false)
    }
  }

  const handleVideoChange = async (e) => {
    const video_file = e.target.files[0]
    setVideo(video_file)
    let dataUrl = await getDataURLFromFile(video_file)
    setVideoSrc(dataUrl)

  }

  const header = "Upload Video"
  const savebtn =
    <>
      {videoPerc === 100 ? (
        <button
          style={{ color: "#00acee" }}
          onClick={handleUpload}
          className="flex flex-col items-center absolute right-4"
        >
          {videoPerc > 1 ? "" : "Post"}
        </button>
      ) : (
        ""
      )}
    </>




  return (
    <div className="bg-white dark:bg-black flex flex-col top-0 overflow-scroll z-10 absolute w-full">
      <Navigation header={header} handleBackBtnCLick={handleBackBtnCLick} savebtn={savebtn} />
      <div className="pt-[50px] h-[100dvh] hide-scrollbar">
        <div className='flex flex-col gap-[20px] w-full h-full p-[20px]'>
          {!videoSrc && (
            <>
              <label htmlFor='vid'>
                <div className='flex flex-row items-center justify-start w-full gap-[2px]'>
                  <input
                    className='hidden p-[10px]'
                    id='vid' type="file" accept="video/*" onChange={(e) => handleVideoChange(e)} />
                  <h2 className='flex flex-row color-gray-500 gap-4 font-normal text-xl m-6'>
                    <AiOutlineVideoCameraAdd fontSize={50} />
                    Select videos from your gallery
                  </h2>
                </div>
              </label>
            </>
          )}

          <textarea
            id='textarea'
            className="rounded-[6px] p-[10px] outline-none border-2 border-[#999] resize-none bg-[#f5f5f5] dark:bg-[#202020] hide-scrollbar"
            name="desc"
            placeholder="Add caption..."
            row={8}
            onChange={handleChange}
            maxLength={200}
          />
        </div>
      </div>
    </div>
  )
}
export default AddVideo