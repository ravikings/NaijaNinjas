import React,{ useEffect, useState} from 'react';
import {Link} from 'react-router-dom'; 
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import PageTitle from './../Layout/PageTitle';
import Sidebar from './../Element/Sidebar';
import createRequest from "../../utils/axios";
import LazyLoad from 'react-lazyload';
import ForumAnwser from './components/ForumAnwser';

var bnr = require('./../../images/banner/bnr1.jpg');

const blogGride = [
	{ image: require('./../../images/blog/grid/pic4.jpg'), },
	{ image: require('./../../images/blog/grid/pic3.jpg'), },
	{ image: require('./../../images/blog/grid/pic2.jpg'), },
	{ image: require('./../../images/blog/grid/pic1.jpg'), },
	{ image: require('./../../images/blog/grid/pic4.jpg'), },
	{ image: require('./../../images/blog/grid/pic3.jpg'), },
	{ image: require('./../../images/blog/grid/pic2.jpg'), },
	{ image: require('./../../images/blog/grid/pic1.jpg'), },
	{ image: require('./../../images/blog/grid/pic4.jpg'), },
	{ image: require('./../../images/blog/grid/pic3.jpg'), },
	{ image: require('./../../images/blog/grid/pic2.jpg'), },
	{ image: require('./../../images/blog/grid/pic1.jpg'), },
]

function Blogdetailgridsidebar(){
     const [data,setData]= useState([])
	// geting data from api for fourm start
	const ForumData = () => {
		createRequest()
		  .get("forum/list/")
		  .then((res) => {
				
				setData(res.data.results)
				console.log("beta done",res)
			
		
		  })
		  .catch((e) => {
			if (e.response?.status === 400) {
			console.log(e?.response?.data?.non_field_errors[0]);
			} else {
			  console.log("Unknown Error");
			}
		  });
	  };
	
	// geting data from api for fourm end
	// effect start
	useEffect(()=>{
		ForumData()
	},[data.length])
	// effect end
	return(
		<>
			<Header />
			<div className="page-content bg-white">
			
				<div className="content-area">
					<div className="container">
						<div className="row">
							<div className="col-lg-8 col-md-7 col-sm-12">							
								<div id="masonry" className="dez-blog-grid-3 row">
								{data.map((item, index)=>(
								
						       <ForumAnwser item={item} key={index} />
								))}
								</div>
							{/* pagination place start */}
							{/* pagination place end */}
							</div>
							<div className="col-lg-4 col-md-5 col-sm-12 sticky-top">
								<Sidebar />
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}
export default Blogdetailgridsidebar;