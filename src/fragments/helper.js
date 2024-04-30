import axios from "axios";
import { subscription } from "../redux/userSlice.js";

// REGEX

export const containsUppercase = (str) => {
  return /[A-Z]/.test(str);
};
export const containsLowercase = (str) => {
  return /[a-z]/.test(str);
};

export const containsNumbers = (str) => {
  return /[0-9]/.test(str);
};

export const containsSymbols = (str) => {
  return /[^a-zA-Z]+/.test(str);
};
/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {String} dataURL -
 * @param {Object} crop - crop Object
 * @param {String} fileName - Name of the returned file in Promise
 * @param {Number} aspectRatio -
 */
export const getCroppedImage = async ({
  image,
  dataURL,
  crop,
  fileName,
  aspectRatio,
}) => {
  let _image;
  if (image) {
    _image = image;
  } else if (dataURL) {
    let image = new window.Image();
    image.src = dataURL;
    _image = image;
  } else {
    throw new Error("Pass an image or a dataURL");
  }

  let { naturalWidth, naturalHeight } = _image;
  let imageAspectRatio = naturalWidth / naturalHeight;
  let imageIsWiderThanContainer = imageAspectRatio > aspectRatio;

  let width = imageIsWiderThanContainer
    ? aspectRatio * naturalHeight
    : naturalWidth;

  let height = imageIsWiderThanContainer
    ? naturalHeight
    : (1 / aspectRatio) * naturalWidth;

  const canvas = document.createElement("canvas");
  const scaleX = crop.scale;
  const scaleY = crop.scale;
  canvas.width = width / scaleX;
  canvas.height = height / scaleY;
  const ctx = canvas.getContext("2d");
  let y = crop.y * -1.93135;

  ctx.drawImage(_image, crop.x, y, width, height, 0, 0, width, height);
  // return canvas.toDataURL('image/jpeg');

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        blob.name = fileName;
        resolve(blob);
      },
      "image/jpeg",
      1
    );
  });
};

export const getDataURLFromFile = async (file) => {
  let reader = new FileReader();

  return await new Promise((resolve) => {
    reader.addEventListener(
      "load",
      () => {
        resolve(reader.result);
      },
      false
    );
    reader.readAsDataURL(file);
  });
};

export const handleFollow = async ({
  userId,
  channelId,
  handleNotification,
  dispatch,
}) => {
  await axios.put(`/users/sub/${userId}`);
  dispatch(subscription(channelId));
  const msg = "started following you";
  handleNotification(msg);
};

export const handleUnfollow = async ({ userId, channelId, dispatch }) => {
  await axios.put(`/users/unsub/${userId}`);
  dispatch(subscription(channelId));
};

export const handleLike = async ({
  id,
  postState,
  post,
  userId,
  dispatch,
  handleNotification,
}) => {
  const msg = "liked your post";
  if (post?.likes?.includes(userId)) {
    await axios.put(`/${post}/dislike/${id}`);
  } else {
    await axios.put(`/${post}/like/${id}`);
    if (userId !== post?.userId) {
      handleNotification(msg);
    }
  }

  dispatch(postState({ id, userId: userId }));
};

//   const handlePhotoChange = (e) => {
//     setFile(e.target.files[0].name)
//     const image_file = e.target.files[0]
//     const reader = new FileReader()
//     const WIDTH = 800
//     reader.readAsDataURL(image_file)

//     reader.onload = (e) =>{

//       const image_url = e.target.result
//       const image = document.createElement("img")
//       image.src = image_url

//       image.onload = (e) =>{
//       const canvas = document.createElement("canvas")
//       const ratio = WIDTH / e.target.width
//       canvas.width = WIDTH
//       canvas.height = e.target.height * ratio

//       const context = canvas.getContext("2d")
//       context.drawImage(image, 0, 0, canvas.width, canvas.height)

//       const new_image_url = context.canvas.toDataURL("image/jpeg", 100)
//       setImageSrc(new_image_url)

//     }

//   }

// }
