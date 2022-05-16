
import React, { useState } from 'react';
import {Link} from 'react-router-dom'; 
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import AdsGrid from '../components/AdsGrid';
import createRequest from "../../../utils/axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import 'swiper/css';

import Gallery from "react-photo-gallery";
var bnr = require('../../../images/banner/bnr1.jpg');


function BrowseAdsgridDetails(){
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [data,setData]= useState([
		{
		  src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
		  width: 4,
		  height: 3,
		  caption: "some trees"
		},
		{
		  src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
		  width: 1,
		  height: 1,
		  caption: "blurring pic"
		},
		{
		  src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
		  width: 3,
		  height: 4,
		  caption: "deciduous"
		},
		{
		  src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
		  width: 3,
		  height: 4,
		  caption: "foggy"
		},
		{
		  src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
		  width: 3,
		  height: 4,
		  caption: "oak leaves"
		},
		{
		  src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
		  width: 4,
		  height: 3,
		  caption: "even foggier"
		},
  ])
   return(
	   <>
		   <Header />
		   <div className="page-content bg-white">
		   
			   <div className="">
				   <div className="container">
					   
					   <div className="row">
                      
						   <div className="col-lg-9 col-md-7 col-sm-12">
							  
                <div className="ads-slider">
                <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <img className="ads-img" src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="ads-img" src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="ads-img" src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="ads-img" src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="ads-img" src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="ads-img" src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="ads-img" src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="ads-img" src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="ads-img" src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="ads-img" src="https://swiperjs.com/demos/images/nature-10.jpg" />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper swiper-thumb"
      >
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
        </SwiperSlide>
      </Swiper>
      <div className="m-t30">
        <h2 className="ads-details-title">Toyota Yaris 2008 Black</h2>
        <div className="ads-details-info">
          <span className="mr-3"><i class="fa fa-clock-o mr-1" aria-hidden="true"></i>Posted 2 days</span>
          <span className="mr-3"><i class="fa fa-map-marker  mr-1" aria-hidden="true"></i>Balochi Bazar Absor</span>
          <span className="mr-3 float-right"><i class="fa fa-eye mr-1" aria-hidden="true"></i>200</span>
         
        </div>
      </div>
      <div className="ads-info  row">
        <div className="info-box col-md-2 mx-auto">
        <i class="fa fa-user mr-1" aria-hidden="true"></i>
        <p>Nigerian Used</p>
        </div>
        <div className="info-box col-md-2 mx-auto">
        <i class="fa fa-gear mr-1" aria-hidden="true"></i>
        <p>Automatic</p>
        </div>
        <div className="info-box col-md-2 mx-auto">
        <i class="fa fa-users mr-1" aria-hidden="true"></i>
        <p>4 Seat</p>
        </div>
     
      </div>
      <div className="info-attribute mb-5 mt-5">
      <div className="info-attribute-box">
        <div className="info-attribute-value">Yaris</div> 
        <div className="info-attribute-key"> MODEL</div>
    
    </div>
     
      <div className="info-attribute-box">
        <div className="info-attribute-value">Black</div> 
        <div className="info-attribute-key"> COLOR </div>
    
    </div>
     
      <div className="info-attribute-box">
        <div className="info-attribute-value">No</div> 
        <div className="info-attribute-key"> EXCHANGE POSSIBLE</div>
    
    </div>
     
      <div className="info-attribute-box">
        <div className="info-attribute-value">Toyota</div> 
        <div className="info-attribute-key"> MAKE</div>
    
    </div>
     
      <div className="info-attribute-box">
        <div className="info-attribute-value">2022</div> 
        <div className="info-attribute-key"> YEAR OF MANUFACTURE
</div>
    
    </div>
     
      <div className="info-attribute-box">
        <div className="info-attribute-value">Yes</div> 
        <div className="info-attribute-key">REGISTERED CAR</div>
    
    </div>
     
      </div>
                
     <div className="mt-4 mb-5">
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, quod fugiat numquam quam nobis eum neque minus iusto. Consequatur dolores molestias ad blanditiis rerum molestiae aspernatur eum nisi iste praesentium?</p>
     </div>
     <div className="mt-5">
       <h3>Similar adverts</h3>
       <AdsGrid data={data}/>
     </div>
      </div>
						   {/* pagination place end */}
						   </div>
                           <div className="col-lg-3 col-md-5 col-sm-12 sticky-top">
						             <div className="price-tag m-t70 border-top-bottom bg-white p-2">
                              <h1>$700,000</h1>
                           <a class="btn btn-outline-primary btn-block" href="#">Request Call Back</a>   
                         </div>
						             <div className=" m-t10 border-top-bottom ads-owner-info">
                              <div className="owner-img float-left">
                               <img src="https://swiperjs.com/demos/images/nature-1.jpg"/>
                              </div>
                               <div className="m-l60">
                               <p className="owner-name">Rahamatullah Khan</p>
                               <p className="onwer-state"><i className="fa fa-envelope-o "></i>Take Time to Response</p>
                               </div>
                               <div className="owner-contact text-center">
                                 <a className="btn btn-primary btn-block " href="#"><i className="fa fa-phone ml-1"></i> Show Contact</a>
                                 <a className="btn btn-outline-primary btn-block" href="#"><i className="fa fa-comments ml-1"></i> Start Chat</a>
                               </div>
                               
                         </div>
                         <div className="border-top-bottom">
                           <div className="saftey-title">Saftey Tips</div>
                           <ul class="saftey-list">
                      <li> Don't pay in advance, including for delivery   </li>
                      <li>     Meet the seller at a safe public place  </li>
                      <li>     Inspect the item and ensure it's exactly what you want  </li>
                      <li>On delivery, check that the item delivered is what was inspected  </li>
                      <li>     Only pay when you're satisfied </li>
                </ul>
                <div className="text-center">
                  <button className="btn btn-outline -info btn-sm"><i className="fa fa-flag mr-2"></i>Report Abuse</button>
                </div>
                         </div>
                         <div className="border-top-bottom">
                           <a href="#" className="btn btn-outline-primary btn-block">Post Ads Like This</a>
                         </div>
						   </div>
					   </div>
				   </div>
			   </div>
		   </div> 
		   <Footer />
	   </>
   )
}
export default BrowseAdsgridDetails;