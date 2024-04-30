import React from 'react'
import {Rings} from 'react-loader-spinner';


const Spinner = ({message}) => {
  return (
      <div className='flex flex-col bg-[#000000a7] h-[100dvh] justify-center items-center fixed left-0 right-0 top-0 bottom-0 z-50 w-full'>
        <Rings            
          color="#00acee"
          className="m-5"
        />
        <p className='text-lg text-center px-2'>{message}</p>

    </div>

  )
}

export default Spinner