import React, { useEffect, useState } from 'react'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'

const Theme = () => {
    const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem("theme")))

    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [darkMode]);




    return (
        <button className="flex flex-row cursor-pointer text-sm gap-3 p-5" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaToggleOn fontSize={20} className='text-[#606060] dark:text-[#999]'/> : <FaToggleOff fontSize={20} className='text-[#606060]'/>}
            {darkMode ? "Light" : "Dark"} Mode
        </button>
    )
}

export default Theme
