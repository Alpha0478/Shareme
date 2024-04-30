import React, { useState } from "react";
import Cropper from "./Cropper.jsx";
import Navigation from "../fragments/Navigation.jsx";
import { getCroppedImage } from "../fragments/helper.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase.js";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../redux/userSlice.js";




const ChangePic = ({
  setToggleUpdate,
  imageSrc,
  file,
  crop,
  setCrop,
  setFileDataUrl,
}) => {
  const [img, setImg] = useState(undefined);
  const [inputs, setInputs] = useState({});
  const [imgPerc, setImgPerc] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [profileUrl, setProfileUrl] = useState("");

  const dispatch = useDispatch();

  const handleBackBtnCLick = () => {
    setToggleUpdate(false);
    setFileDataUrl(null);
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL) => {
          setInputs({ [urlType]: getDownloadURL });
        });
      }
    );
  };

  useEffect(() => {
    img && uploadFile(img, "Url");
  }, [img]);

  useEffect(() => {
    setProfileUrl(inputs.Url);
  }, [inputs, img]);

  const handleUpload = async () => {
    const croppedPic = await getCroppedImage({
      dataURL: imageSrc,
      crop,
      fileName: file.name,
      aspectRatio: 1,
    });
    setImg(croppedPic);
  };

  const handlePost = async () => {
    const res = await axios.put(`/users/${currentUser._id}`, { profileUrl });
    dispatch(userProfile(res.data.profileUrl));
    res.status === 200 && setToggleUpdate(false);
  };

      
  const cancelbtn = <button  className="fex flex-col items-center absolute left-2" style={{ color: "#00acee" }}>Cancel</button>;

  const savebtn2 = (
    <button
      style={{ color: "#00acee" }}
      onClick={handleUpload}
      className="flex flex-col items-center absolute right-4"
    >
      {imgPerc > 1 ? "" : "post"}
    </button>
  );

  const header = "Profile Update";
  return (
    <div
      className="flex flex-col top-0 hide-scrollbar z-10 w-full h-full"
  
    >
      <Navigation
        header={header}
        handleBackBtnCLick={handleBackBtnCLick}
        cancelbtn={cancelbtn}
        savebtn2={savebtn2}
      />

      <div className="flex overflow-scroll bg-white dark:bg-black hide-scrollbar absolute top-0 h-full pt-[50px] w-full lg:w-3/4">
        <div className="flex flex-row absolute w-full m-px rounded-full overflow-hidden aspect-square">
          <Cropper
            src={imageSrc}
            file={file}
            crop={crop}
            onCropChange={setCrop}
          />
        </div>

        <div className="flex flex-col w-full h-[180px] absolute p-[20px] bottom-[0px] gap-[20px]">
          {imgPerc === 100 && <button onClick={handlePost}>Save</button>}
        </div>
      </div>
    </div>
  );
};

export default ChangePic;
