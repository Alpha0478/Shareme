import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    loading:false,
    error:false
};

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        loginStart: (state) =>{
            state.loading=true;
        },
        loginSuccess: (state, action) =>{
            state.loading=false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) =>{
            state.loading=false;
            state.error = true;
        },
        logoutSucces: (state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=false;
        },
        subscription:(state,action)=>{
            if(state.currentUser.subscribedUsers.includes(action.payload)) {
                state.currentUser.subscribedUsers.splice(
                state.currentUser.subscribedUsers.findIndex(
                    (channelId) => channelId === action.payload
                ),1
             );
            }else{
              state.currentUser.subscribedUsers.push(action.payload) 
            }
        
        },
        userBio:(state,action)=>{
          state.currentUser.bio = action.payload
        },
        userName:(state,action)=>{
            state.currentUser.username = action.payload
        },
        userProfileName:(state,action)=>{
            if(state.currentUser.profileName){
                state.currentUser.profileName = action.payload
            }
        },
        userProfile:(state,action)=>{
            state.currentUser.profileUrl = action.payload
        },
    },
});

export const {loginStart,loginSuccess,loginFailure,logoutSucces, subscription, userBio,userProfileName,userProfile,userName} = userSlice.actions

export default userSlice.reducer;

