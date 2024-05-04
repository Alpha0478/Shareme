import axios from "axios";

const Api = axios.create({
  baseURL: "http://192.168.0.105:8800"
})

export const urlEndpoint = "/api"
export const usersUrlEndpoint ="/api/users"
export const videosUrlEndpoint ="/api/videos"
export const notesUrlEndpoint ="/api/notes"



export const fetchPosts = async() =>{
  const res1 = await Api.get(`${urlEndpoint}/videos/random`)
  const res2 = await Api.get(`${urlEndpoint}/images/random`)
  const res3 = await Api.get(`${urlEndpoint}/notes/random`)
  console.log(res3)


  const res4 = await (res1.data).concat(res2.data)
  const res = await (res4).concat(res3.data)
  
  return res

}

export const fetchVideos = async() =>{
  const res = await Api.get(`${videosUrlEndpoint}/random`)
  console.log("video fetch")
  return res.data
}

export const fetchNotes = async() =>{
  const res = await Api.get(`${notesUrlEndpoint}/random`)
  console.log("notes fetch")
  return res.data
}


export const fetchUser = async(id) =>{
  const res = await Api.get(`${usersUrlEndpoint}/find/${id}`)
  return res.data
}


