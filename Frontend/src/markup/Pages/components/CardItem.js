import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const CardItem = ({type,image}) => {
  return (
   <>
    

         <div className="col-md-4 col-6 p-2">
          <div className="product_item ">
            <div className="product_sale">
              <p>{type}</p>
            </div>
            <div className="product_image">
            <img src='http://localhost:3000/react/demo/static/media/pic4.5849fee8d174089a2612.jpg' alt="" />
           
            </div>
            <div className="product_values">
              <div className="product_title">
                <a href="#">

                <h5>Lexus RX 330 4WD 2005 Gold</h5>
                </a>
              </div>
              <div className="product_price">
                 <span className="price_new">$69.99</span>
               
              </div>
              
             
            </div>
          </div>
      
          </div>
    
   </>
  )
}



export default CardItem;
