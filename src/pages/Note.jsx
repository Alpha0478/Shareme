import React from 'react';
import NoteCard from '../components/NoteCard.jsx';
import { notesFetchSuccess } from '../redux/notesSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import {fetchNotes,notesUrlEndpoint as cacheKey} from '../components/fetchers/fetch.js'
import useSWR from 'swr'
import Spinner from '../components/Spinner.jsx';
import { RestartAnimation } from '../App.js';
import { TfiInfoAlt } from 'react-icons/tfi';




const Notes = ({socket}) => {
  const dispatch = useDispatch()
  const {notes} = useSelector((state) =>state.notes)
  
  const  {
    isLoading,
    error,
  } =useSWR(cacheKey, fetchNotes, {
    onSuccess: data =>  dispatch(notesFetchSuccess(data))
  })


  return (
    <div  id="videos" className="flex flex-col absolute h-full w-full pt-0 mb-0 lg:pt-[25px] hide-scrollbar items-center">
      <div className='flex flex-col overflow-scroll pt-0 h-full hide-scrollbar w-full lg:w-3/4 snap-mandatory snap-y'>
        {isLoading ?
          <Spinner/>
        : error ?
        <div className="flex flex-col  text-lg text-[#cc1a00] h-full w-full items-center justify-center">
        <TfiInfoAlt fontSize={50}/>
        An error occured
        </div>
        :
        notes?.map((note) => (
          <NoteCard 
          key={note._id} 
          note={note} 
          socket={socket}
          />
        ))
        }
      </div>
    </div>

    
  )
}

export default  Notes