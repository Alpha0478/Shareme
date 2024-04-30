import React from 'react'

const SubmitBtn = ({Name,Func}) => {
    return (
        <button
            className="flex flex-row items-center justify-center p-[8px] w-[60%] rounded-full mt-[20px] font-xl"
            style={{ backgroundColor: "#00acee", color: "white" }}
            type="button"
            onClick={Func}
        >
            {Name}
        </button>
    )
}

export default SubmitBtn