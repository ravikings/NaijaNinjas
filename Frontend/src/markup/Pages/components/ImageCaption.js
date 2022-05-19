import React from "react";
import {Link} from 'react-router-dom'; 
const cont = {
  backgroundColor: "#eee",
  overflow: "hidden",
  position: "relative"
};

const ImageCaption = ({ index, photo, margin, direction, top, left }) => {
  return (
    <div className="custom-grid" style={{ margin, height: photo.height, width: photo.width, ...cont }}>
        <div className="product_sale">
        <p>Badge</p>
      </div>
      <Link to="/ads-details" className="dez-img-effect zoom-slow">
      <img ca src={photo.src} alt="" />
      <div class="title-caption">
        <div className="title">{photo.caption}</div>
        <div className="price-caption">33$</div>
        </div>
        </Link>
    </div>
  );
};

export default ImageCaption;
