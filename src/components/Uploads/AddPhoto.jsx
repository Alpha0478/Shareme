import Cropper from '../Cropper.jsx'
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Navigation from '../../fragments/Navigation.jsx';
import { getCroppedImage } from '../../fragments/helper.js';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import app from "../../firebase.js"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addPost } from '../../redux/postsSlice.js';
import { MdAddPhotoAlternate } from 'react-icons/md'



const AddPhoto = ({ setToggleAddpost, toggleAddpost, postType, showGrid, setToggleAddPhoto }) => {
  let [crop, setCrop] = useState({ x: 0, y: 0, scale: 1 })
  const [imageSrc, setImageSrc] = useState(null)
  const [file, setFile] = useState();
  const [img, setImg] = useState(undefined)
  const [inputs, setInputs] = useState({})
  const [imgPerc, setImgPerc] = useState(0)
  const dispatch = useDispatch()

  const handleBackBtnCLick = (e) => {
    e.preventDefault();
    setToggleAddpost(false)
    if (!toggleAddpost) {
      setToggleAddPhoto(false)
    }
  }

  const handlePhotoChange = async (e) => {
    const image_file = e.target.files[0]
    setFile(image_file)
    const reader = new FileReader()
    reader.readAsDataURL(image_file)

    reader.onload = (e) => {
      setImageSrc(e.target.result)

    }
  }


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
        urlType === "Url" && setImgPerc(Math.round(progress));
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



  useEffect(() => { img && uploadFile(img, "Url"); }, [img]);

  const handlePost = async (e) => {
    if (imgPerc < 100) {
      console.log("")
    } else {
      console.log("")
    }
    e.preventDefault();
    const croppedPic = await getCroppedImage({ dataURL: imageSrc, crop, fileName: file.name, aspectRatio: 1 })
    setImg(croppedPic)
    if (imgPerc === 100) {
      handleUpload()
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post("/images", { ...inputs, postType })
    dispatch(addPost(res.data))

    res.status === 200 &&
      setToggleAddpost(false)
    if (!toggleAddpost && imgPerc === 100) {
      // setToggleUpload(false)
    }
  }



  const header = "Add Photo"

  const nextbtn =
    <>



    </>

  return (
    <>
      <div as={motion.div} className="bg-white dark:bg-black flex flex-col top-0 overflow-scroll z-10 absolute w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
        }}>

        <div className="flex w-full h-full pt-[50px] hide-scrollbar ">
          <Navigation handleBackBtnCLick={handleBackBtnCLick} nextbtn={nextbtn} header={header} />

          <div className='flex flex-row relative w-full m-px align-center justify-content: center mb-[50px]'>
            {!imageSrc ? (
              <>
                <label htmlFor='img'>
                  <div className='flex flex-row p-[10px] items-center gap-[2px] justify-start w-full'>
                    <input
                    className="hidden p-[10px]"
                    id='img' type="file" accept="image/*" onChange={(e) => handlePhotoChange(e)} />
                    <h2 className='flex flex-row color-gray-500 gap-4 font-normal text-xl m-6'>
                      <MdAddPhotoAlternate fontSize={50} />
                      Select pictures from your gallery
                    </h2>
                  </div>
                </label>
              </>

            ) : (
              <Cropper
                file={file}
                src={imageSrc}
                crop={crop}
                onCropChange={setCrop}
                showGrid={showGrid}
              />

            )}


          </div>

          <div className='flex flex-col w-full absolute gap-[20px] items-center bottom-0 p-[20px] pt-[50px]'>
            {imageSrc && (
              <textarea
                id='textarea'
                className=" p-[10px] rounded-[6px]  border-2 border-[#999] outline-none resize-none w-full bg-[#f5f5f5] dark:bg-[#202020] hide-scrollbar"
                name="desc" placeholder="Add caption..."
                row={8}
                onChange={handleChange}
                maxLength={200}
              />
            )}
            {imageSrc && (
              <>
                {imgPerc === 0 ? (
                  <button
                    className="flex flex-row items-center justify-center p-[8px] w-[60%] rounded-full my-2 mt-[20px] font-xl"

                    style={{ backgroundColor: "#00acee", color: "white" }}
                    type="button"
                    onClick={handlePost}
                  >
                    Upload
                  </button>
                ) : (
                  ""
                )}
                {imgPerc === 100 && (
                  <button
                    className="flex flex-row items-center justify-center p-[8px] w-[60%] rounded-full my-2 mt-[20px] font-xl"
                    style={{ backgroundColor: "#00acee", color: "white" }}
                    type="button"
                    onClick={handleUpload}
                  >
                    Post
                  </button>
                )}
              </>
            )}
          </div>

        </div>
      </div>

    </>
  )
}


export default AddPhoto