import React,{ useEffect, useState} from 'react';
import {Link,useParams,useLocation} from 'react-router-dom'; 
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import PageTitle from './../Layout/PageTitle';
import Sidebar from './../Element/Sidebar';
import createRequest from "../../utils/axios";

import SearchAnwser from './components/SearchAnwser';
var bnr = require('./../../images/banner/bnr1.jpg');

const blogGride = [
	{ image: require('./../../images/blog/grid/pic4.jpg'), },
	
]

function Search(){
	const location = useLocation();
    let { query } = useParams();
     const [data,setData]= useState([])
	// geting data from api for fourm start
	const ForumData = () => {
		createRequest()
		  .get(`forum/search/?search=${query}`)
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
	},[location.key])
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
								
								<SearchAnwser item={item} key={index} />
								 ))}
								</div>
								<div className="pagination-bx clearfix text-center">
									<ul className="pagination">
										<li className="previous"><Link to={""}><i className="ti-arrow-left"></i> Prev</Link></li>
										<li className="active"><Link to={"#"}>1</Link></li>
										<li><Link to={""}>2</Link></li>
										<li><Link to={""}>3</Link></li>
										<li className="next"><Link to={""}>Next <i className="ti-arrow-right"></i></Link></li>
									</ul>
								</div>
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
export default Search;