import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { TfiClose, TfiSearch} from 'react-icons/tfi'
import { useNavigate } from 'react-router';
import Navigation from '../fragments/Navigation.jsx';


const Search = () => {
  const [search,setSearch] = useState("")
  const navigate = useNavigate()
  const handleBackBtnCLick= (e) =>{
    e.preventDefault();
    setSearch('')
    navigate("/")
  }


  const handleClear = () =>{
    document.querySelector("#search").value = ''
    setSearch('')
  }

  const searchbar =          
        <div className='flex justify-start items-center px-4 ml-6 w-4/5 rounded-full  border-none outline-none focus-within:shadow-sm' >
          <TfiSearch fontSize={16}  className="mr-1"/>
            <input 
                id="search"
                className='p-4 outline-none w-full'
                type= 'text' 
                placeholder='search'
                autoFocus={true}
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
            />
          <TfiClose fontSize={12} className="ml-2" onClick={handleClear}/>
        </div>

  return (
      <motion.div 
        initial={{opacity: 0}}
        animate = {{opacity: 1}}
        className="w-full"
        exit= {{ 
          opacity: 0,
        }}>
       <Navigation  handleBackBtnCLick={handleBackBtnCLick} searchbar={searchbar}/>
       
      </motion.div>
    
  )
}

export default Search