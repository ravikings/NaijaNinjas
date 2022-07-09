import React from 'react';
import Rating from "@material-ui/lab/Rating";
const Hired=({name,comment,rating})=>{
    return(
        <div className="row">
          <div className="col-md-2 col-xs-3 text-left text-md-center">
            <img src="https://themebing.com/wp/prolancer/wp-content/uploads/2021/04/pexels-andrea-piacquadio-3777566-100x100.jpg" className="attachment-90x90 size-90x90" alt="" /> </div>
          <div className="col-md-10 col-xs-9 my-auto">
            <div className="commenter">
              <a href="#">{name} </a>
              <span class="float-right">12 months ago</span>
              <div className="stars">
                <div className="star-received">
                <Rating
        style={{ color: "#febe42" }}
        name="read-only"
        value={rating}
        readOnly
      />
                 
                </div>
               
              </div>
            </div>
            <p className="mb-0">{comment}</p>
          </div>
        </div>
    )
}
export default Hired