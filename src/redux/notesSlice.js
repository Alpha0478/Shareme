import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: null,
    loading:false,
    error:false
};

export const notesSlice = createSlice({
    name:'notes',
    initialState,
    reducers: {
        notesFetchStart: (state) =>{
            state.loading=true;
        },
        notesFetchSuccess: (state, action) =>{
            state.loading=false;
            state.notes = action.payload;
        },
        notesFetchFailure: (state) =>{
            state.loading=false;
            state.error = true;
        },
        likeNote:(state,action)=>{
            const {id, userId} = action.payload

            const note = state.notes.find(note => note._id === id)
            if(note.likes.includes(userId)) {
                note.likes.splice(
                note.likes.findIndex(
                    (channelId) => channelId === userId
                ),1
                );
            }else{
                note.likes.push(userId) 
            }
        },
       
        
    },
});


export const {notesFetchSuccess,notesFetchStart,notesFetchFailure,likeNote} = notesSlice.actions

export default notesSlice.reducer;

