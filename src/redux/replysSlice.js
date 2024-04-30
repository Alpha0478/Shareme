import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    replys:null,
    loading:false,
    error:false
};

export const replysSlice = createSlice({
    name:'reply',
    initialState,
    reducers: {
        replysStart: (state) =>{
            state.loading=true;
        },
        replysSucces: (state, action) =>{
            state.loading=false;
            state.replys = action.payload;
        },
        replysFailure: (state) =>{
            state.loading=false;
            state.error = true;
        },
        addReply: (state,action) =>{
            if(state.replys){
                state.replys.push(action.payload)
            }else if(!state.replys){
                state.replys.push(action.payload)
            }
        },
        remReply:(state,action) =>{
            state.replys.filter(action.payload)
        },
        likeReply:(state,action)=>{
            const {id, userId} = action.payload

            const reply = state.replys.find(rep => rep._id === id)
            if(reply.likes.includes(userId)) {
                reply.likes.splice(
                reply.likes.findIndex(
                    (userId) => userId === userId
                ),1
                );
            }else{
                reply.likes.push(userId) 
            }
        },
        
    },
});

export const {replysSucces,replysStart,replysFailure,addReply,remReply,likeReply} =replysSlice.actions

export default replysSlice.reducer;

