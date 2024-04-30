import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentComment:null,
    loading:false,
    error:false
};

export const commentSlice = createSlice({
    name:'comment',
    initialState,
    reducers: {
        commentStart: (state) =>{
            state.loading=true;
        },
        commentSuccess: (state, action) =>{
            state.loading=false;
            state.currentComment = action.payload;
        },
        commentFailure: (state) =>{
            state.loading=false;
            state.error = true;
        },
        addComment: (state,action) =>{
            if(state.currentComment){
                state.currentComment.push(action.payload)
            }else if(!state.currentComment){
                state.currentComment.push(action.payload)
            }
        },
        remComment:(state,action) =>{
            state.currentComment.filter(action.payload)
        },
        likeComment:(state,action)=>{
            const {id, userId} = action.payload

            const comment = state.currentComment.find(com => com._id === id)
            if(comment.likes.includes(userId)) {
                comment.likes.splice(
                comment.likes.findIndex(
                    (channelId) => channelId === userId
                ),1
                );
            }else{
                comment.likes.push(userId) 
            }
        },

        
    },
});

export const {commentSuccess,commentStart,commentFailure,addComment,remComment,likeComment} =commentSlice.actions

export default commentSlice.reducer;

