import React from 'react';
import Rating from "@material-ui/lab/Rating";
const Proposals=({name,position,rating})=>{
    return(
        <div className="row">
          <div className="col-md-2 col-xs-3 text-left text-md-center">
            <img src="https://themebing.com/wp/prolancer/wp-content/uploads/2021/04/pexels-pixabay-220453-100x100.jpg" className="attachment-90x90 size-90x90" alt="" /> </div>
          <div className="col-md-10 col-xs-9 my-auto">
            <div className="commenter">
              <a href="#">{name} </a>
              <span className="float-right text-right">
                12 months ago 
                <div className="star-rating">
                <Rating
        style={{ color: "#febe42" }}
        name="read-only"
        value={rating}
        readOnly
      />
                </div>
              </span>
            </div>
            <h6 className="clearfix">{position}</h6>
          </div>
        </div>
    )
}
export default Proposals