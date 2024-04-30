import React from 'react'

const CardImg = ({imageSrc,Func,FromProfile}) => {
    let WIDTH
    let HEIGHT
    if(FromProfile){
        WIDTH = "100px"
        HEIGHT = "100px"
    }else{
        WIDTH = "46px"
        HEIGHT = "46px"
    }
    return (
        <img
            src={imageSrc}
            alt="profile pic"
            width={WIDTH}
            height={HEIGHT}
            className="bg-[#999] rounded-full border-2 object-fit border-[#606060] dark:border-white text-transparent"
            onClick={Func}
        />
    )
}

export default CardImg