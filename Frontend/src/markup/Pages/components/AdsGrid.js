import React from "react";
import Gallery from "react-photo-gallery";
import  ImageCaption  from './ImageCaption';

const AdsGrid = ({data}) => {


//   paganition setup start
const imageRenderer = ({ index, left, top, key, photo }) => (
    <ImageCaption
      key={key}
      margin={"2px"}
      index={index}
      photo={photo}
      left={left}
      top={top}
    />
);
//   paganition setup end
  return (
   <>
    
    <Gallery photos={data} renderImage={imageRenderer}></Gallery>
        
    
   </>
  )
}



export default AdsGrid;
