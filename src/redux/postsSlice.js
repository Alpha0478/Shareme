import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: null,
    loading:false,
    error:false
};

export const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers: {
        postsFetchStart: (state) =>{
            state.loading=true;
        },
        postsFetchSuccess: (state, action) =>{
            state.loading=false;
            state.posts = action.payload;
        },
        postsFetchFailure: (state) =>{
            state.loading=false;
            state.error = true;
        },
        addPost: (state,action) =>{
            if(state.posts){
                state.posts.push(action.payload)
            }else if(!state.posts){
                state.posts.push(action.payload)
            }
        },
        delPost: (state,action)=> {
            state.filter(action.payload)
        },
        likeVideo:(state,action)=>{
            const {id, userId} = action.payload

            const post = state.posts.find(pos => pos._id === id)
            if(post.likes.includes(userId)) {
                post.likes.splice(
                post.likes.findIndex(
                    (channelId) => channelId === userId
                ),1
                );
            }else{
                post.likes.push(userId) 
            }
        },
       
        
    },
});


export const {postsFetchSuccess,postsFetchStart,postsFetchFailure,addPost,delPost,likeVideo} = postsSlice.actions

export default postsSlice.reducer;

