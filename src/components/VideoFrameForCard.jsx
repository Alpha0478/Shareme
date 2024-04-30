import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { FaPlay } from "react-icons/fa";

const VideoFrameForCard = ({post}) => {

    const [playing, setPlaying] = useState(false);
    const [isHover, setIsHover] = useState(true);
    const videoRef = useRef(null);


    const handlePlay = () => {
        if (playing) {
          handlePause();
        } else {
          setPlaying(true);
          videoRef.current.play();
          setIsHover(false);
        }
      };

      const handlePause = () => {
        setPlaying(false);
        videoRef.current.pause();
        setIsHover(true);
      };

      let callback = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (videoRef.current !== null) {
              // videoRef?.current.play()
            }
            setPlaying(true);
            setIsHover(false);
          } else if (videoRef.current !== null && !entry.isIntersecting) {
            videoRef?.current.pause();
            videoRef?.current.load();
            setPlaying(false);
            setIsHover(true);
          }
        });
      };
    
      useEffect(() => {
        let observer = new IntersectionObserver(callback, { threshold: 0.75 });
        if (videoRef?.current) {
          observer.observe(videoRef?.current);
        }
    
        return () => {
          observer.disconnect();
        };
      }, [videoRef]);
    
  return (
    <>
    {isHover && (
      <div className="flex flex-col absolute justify-center items-center text-white z-0">
        <FaPlay fontSize={50} />
      </div>
    )}
    <video
      className="bg-black w-auto h-full"
      id="post"
      src={post.Url}
      loop
      ref={videoRef}
      onClick={() => handlePlay()}
      onMouseLeave={() => handlePause()}
      onMouseEnter={() => handlePlay()}
    />
  </>
  )
}

export default VideoFrameForCard