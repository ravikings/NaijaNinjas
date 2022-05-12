import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const CardItem = ({type}) => {
  return (
   <>
    

       
          <li className="product_item ">
            <div className="product_sale">
              <p>{type}</p>
            </div>
            <div className="product_image">
            <img src="https://pictures-nigeria.jijistatic.com/93365908_ODEwLTEwODAtYzI2ZDA4OWIxNg.webp" alt="" />
           
            </div>
            <div className="product_values">
              <div className="product_title">
                <a href="#">

                <h5>Lexus RX 330 4WD 2005 Gold</h5>
                </a>
              </div>
              <div className="product_price">
                <a href="#"> <span className="price_new">$69.99</span></a>
               
              </div>
              <div className="product_desc">
                <p className="truncate">Sed sodales odio non metus tincidunt consectetur. Integer non lobortis orci. In hac habitasse platea dictumst. Suspendisse sit amet condimentum arcu. Curabitur venenatis interdum lectus, vitae egestas sem facilisis sit amet. Praesent tortor purus, vulputate at ultricies quis, aliquet sed ante.</p>
              </div>
             
            </div>
          </li>
      
       
    
   </>
  )
}



export default CardItem;
