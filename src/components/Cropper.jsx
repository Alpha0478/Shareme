import React, { useRef, useState} from 'react'
import { useGesture } from 'react-use-gesture'
import { animate,motion,useMotionValue } from 'framer-motion';



const Cropper = ({src,crop,onCropChange,showGrid}) => {
    let x = useMotionValue(crop.x)
    let y = useMotionValue(crop.y)
    let scale = useMotionValue(crop.scale)

    let [isDragging, setIsDragging] = useState(false);
    let [isPinching, setIsPinching] = useState(false);
    let imageRef = useRef()

    let imageWrapperRef = useRef()

    const MaybeAdjustImage = () =>{
      let newCrop = {x: x.get(), y: y.get(), scale: scale.get()}
      let imageBounds = imageRef.current.getBoundingClientRect()
      let wrapperBounds = imageWrapperRef.current.getBoundingClientRect()
      let originalWidth = imageRef.current.clientWidth;
      let widthOverhang = (imageBounds.width - originalWidth) / 2;

      let originalHeight = imageRef.current.clientHeight;
      let heightOverhang = (imageBounds.height - originalHeight) / 2;

      if (imageBounds.left > wrapperBounds.left) {
        newCrop.x = widthOverhang

      } else if (imageBounds.right < wrapperBounds.right) {
        newCrop.x = -(imageBounds.width - wrapperBounds.width) + widthOverhang
      }

      if (imageBounds.top > wrapperBounds.top) {
        newCrop.y = heightOverhang

      } else if (imageBounds.bottom < wrapperBounds.bottom) {
        newCrop.y = -(imageBounds.height - wrapperBounds.height) + heightOverhang 
      }
      animate(x, newCrop.x, {
        type: 'tween',
        duration: 0.4,
        ease: [0.25,1,0.5,1]
      })
      animate(y, newCrop.y, {
        type: 'tween',
        duration: 0.4,
        ease: [0.25,1,0.5,1]
      })
      
      onCropChange(newCrop)
    }

    useGesture(
      {
        onDrag: ({ dragging, movement: [dx, dy] }) => {
          x.stop()
          y.stop()

          setIsDragging(dragging);
          x.set(dx)
          y.set(dy)
        },
        onPinch: ({
          pinching,
          memo,
          offset: [d],
          origin: [pinchOriginX, pinchOriginY],
        }) => {
          x.stop()
          y.stop()

          setIsPinching(pinching);

          memo ??= {
            bounds: imageRef.current.getBoundingClientRect(),
            crop: {x: x.get(), y: y.get(), scale: scale.get()}
          };

          let transformOriginX = memo.bounds.x + memo.bounds.width / 2;
          let transformOriginY = memo.bounds.y + memo.bounds.height / 2;

          let displacementX = (transformOriginX - pinchOriginX) / memo.crop.scale;
          let displacementY = (transformOriginY - pinchOriginY) / memo.crop.scale;

          let initialOffsetDistance = (memo.crop.scale - 1) * 50;
          let movementDistance = d - initialOffsetDistance;

        
            scale.set(1 + d / 50)
            x.set(memo.crop.x + (displacementX * movementDistance) / 50)
            y.set(memo.crop.y + (displacementY * movementDistance) / 50)

            return memo

        },
        onDragEnd: MaybeAdjustImage,
        onPinchEnd: MaybeAdjustImage
      },
      {
        drag: {
          initial: () => [x.get(), y.get()]
        },
        pinch: {
          distanceBounds: { min: 0 }
        },
        domTarget: imageRef,
        eventOptions: { passive: false },
      })
 
    

    return (
      <>
        <div className='w-full relative overflow-y-hidden'>
          <div  ref={imageWrapperRef} className=' w-full absolute overflow-hidden hide-scrollbar aspect-square'>
            <motion.img
              src={src}
              ref={imageRef}
              style={{
                x: x,
                y: y,
                scale: scale,
                touchAction: 'none',
              }}
              className="relative w-full h-auto max-w-none max-h-none hide-scrollbar"
            />
            {showGrid &&(
              <div className={`border border-gray-50 w-full pointer-events-none absolute inset-0 trabsition duration-300 ${isDragging || isPinching ? "opacity-100" : "opacity-0"
                }`}>
                <div className="absolute inset-0 flex flex-col">
                  <div className="self-stretch flex-1 border-b border-gray-50"></div>
                  <div className="self-stretch flex-1 border-b border-gray-50"></div>
                  <div className="self-stretch flex-1"></div>
                </div>
                <div className="absolute inset-0 flex">
                  <div className="self-stretch flex-1 border-r border-gray-50"></div>
                  <div className="self-stretch flex-1 border-r border-gray-50"></div>
                  <div className="self-stretch flex-1"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        
      </>

    )
  }

  export default Cropper