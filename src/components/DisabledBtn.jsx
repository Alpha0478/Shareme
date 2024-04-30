import React from 'react'

const DisabledBtn = ({Name}) => {
    return (
        <button
            className="flex flex-row items-center justify-center p-[8px] w-[60%] rounded-full mt-[20px] font-xl"
            style={{ backgroundColor: "#999", color: "white" }}
            type="button"
        >
            {Name}
        </button>
    )
}

export default DisabledBtn