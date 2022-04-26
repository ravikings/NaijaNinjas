import React, { useState } from "react";
import { Link } from "react-router-dom";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const photos = [
  {
    url: require("./../../../../images/blog/grid/pic1.jpg"),
  },
  {
    url: require("./../../../../images/blog/grid/pic2.jpg"),
  },
  {
    url: require("./../../../../images/blog/grid/pic3.jpg"),
  },
  {
    url: require("./../../../../images/blog/grid/pic4.jpg"),
  },
  {
    url: require("./../../../../images/blog/grid/pic5.jpg"),
  },
  {
    url: require("./../../../../images/blog/grid/pic3.jpg"),
  },
  {
    url: require("./../../../../images/blog/grid/pic5.jpg"),
  },
  {
    url: require("./../../../../images/blog/grid/pic4.jpg"),
  },
];

function Gallery(props) {

  const [open,setOpen]=useState(false);
  const [photoIndex,setPhotoIndex]=useState(0);


  const handleSetOpen=(index)=>{
    setOpen(true);
    setPhotoIndex(index)
  }


  return (
    <div className="container">
      <ul className="sp10 grid portfolio-box">
        {photos.map((item, index) => (
          <li
            className="card-container grid-items"
            key={index}
          >
            <div className="dez-box ">
              <div className="dez-media dez-img-overlay1 dez-img-effect ">
                <Link to={"#"}>
                  {" "}
                  <img src={item.url} alt="" />{" "}
                </Link>
                <div className="overlay-bx">
                  <div className="overlay-icon">
                    <a
                      className="mfp-link"
                      title="Image Title Come Here"
                      onClick={()=>handleSetOpen(index)} 
                    >
                      {" "}
                      <i className="ti-fullscreen"></i>{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>


      {open && (
          <Lightbox
            mainSrc={photos[photoIndex].url}
            nextSrc={photos[(photoIndex + 1) % photos.length].url}
            prevSrc={photos[(photoIndex + photos.length - 1) % photos.length].url}
            onCloseRequest={() => setOpen(false)}
            onMovePrevRequest={()=>setPhotoIndex(photoIndex - 1)}
            onMoveNextRequest={()=>setPhotoIndex(photoIndex + 1)}
          />
        )}
    
    </div>
  );
}

export default Gallery;
