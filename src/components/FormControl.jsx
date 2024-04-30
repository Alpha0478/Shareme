import React from 'react'
import { TfiInfoAlt } from "react-icons/tfi";
import { FaRegThumbsUp } from "react-icons/fa";

const FormControl = ({Error,Name}) =>{
    return(
      <div className="w-full text-sm h-[20px] flex flex-row">
      {Error === true ? (
        <div
          className="flex flex-row items-center gap-2"
          style={{ color: "#cc1a00" }}
        >
          <TfiInfoAlt />
          {Name}
        </div>
      ) : (
        <div
          className="flex flex-row items-center gap-2"
          style={{ color: "darkgreen" }}
        >
          <FaRegThumbsUp />
          {Name}
        </div>
      )}
    </div>
    )
  }

export default FormControl

