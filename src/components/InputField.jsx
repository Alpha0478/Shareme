import React from 'react'

const InputField = ({id,Func,placeholder,text}) => {

  return (
    <input
        id={id}
        className="p-[10px] bg-inherit rounded-[6px] w-full my-[5px] border-2 border-[#999] outline-none"
        placeholder= {text ? (text + " " + placeholder): placeholder}
        type={placeholder}
        autoComplete="true"
        onChange={Func}
    />
  )
}

export default InputField