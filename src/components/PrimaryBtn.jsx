import React from 'react'

const PrimaryBtn = ({Name,Icon,Func}) => {
    return (
        <button
            className="bg-[#f5f5f5] dark:bg-[#202020] text-black dark:text-white flex flex-row items-center justify-center p-[8px] w-[94%] rounded-full mt-[20px] font-xl"
            type="button"
            onClick={Func}
        >
            {Icon}
            {Name}
        </button>
    )
}  

export default PrimaryBtn