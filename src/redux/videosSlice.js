import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    videos: null,
    loading:false,
    error:false
};

export const videosSlice = createSlice({
    name:'videos',
    initialState,
    reducers: {
        videosFetchStart: (state) =>{
            state.loading=true;
        },
        videosFetchSuccess: (state, action) =>{
            state.loading=false;
            state.videos = action.payload;
        },
        videosFetchFailure: (state) =>{
            state.loading=false;
            state.error = true;
        },
        likeVideo:(state,action)=>{
            const {id, userId} = action.payload

            const video = state.videos.find(vid => vid._id === id)
            if(video.likes.includes(userId)) {
                video.likes.splice(
                video.likes.findIndex(
                    (channelId) => channelId === userId
                ),1
                );
            }else{
                video.likes.push(userId) 
            }
        },
       
        
    },
});


export const {videosFetchSuccess,videosFetchStart,videosFetchFailure,likeVideo} = videosSlice.actions

export default videosSlice.reducer;

