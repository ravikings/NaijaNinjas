import React,{useState,useEffect, useMemo} from 'react';
import {Link} from 'react-router-dom'; 
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import PageTitle from '../../Layout/PageTitle';
import AdsSidebar from '../../Element/AdsSidebar';
import createRequest from "../../../utils/axios";
import Pagination from '../components/Pagination';
import AdsGrid from '../components/AdsGrid';

var bnr = require('../../../images/banner/bnr1.jpg');


function BrowseAdsgrid(){
	let PageSize = 8;
	const [currentPage, setCurrentPage] = useState(1);

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
		{
		  src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
		  width: 3,
		  height: 4,
		  caption: "is this a hemlock?"
		},
		{
		  src: "https://source.unsplash.com/PpOHJezOalU/800x599",
		  width: 4,
		  height: 3,
		  caption: "wat"
		},
		{
		  src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
		  width: 4,
		  height: 3,
		  caption: "autumn"
		}
	  
	  
])


   return(
	   <>
		   <Header />
		   <div className="page-content bg-white">
		   
			   <div className="">
				   <div className="container-fluid">
					   
					   <div className="row">
                       <div className="col-lg-2 col-md-5 col-sm-12 sticky-top">
							   <AdsSidebar />
						   </div>
						   <div className="col-lg-10 col-md-7 col-sm-12">
							   <h1>Fresh recommendations</h1>
						   	
							   <div id="masonry" >
							     <AdsGrid data={data}/>
   
								{/* {data.map((e)=>(
										
							  <CardItem type={e.type} image={blogGride[0].image}/> 
								))} */}
                           
							   </div>
						   {/* pagination place start */}
						   <div className="mx-auto text-center m-t30">
						   <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
                  </div>
						  
						   {/* pagination place end */}
						   </div>
						   
					   </div>
				   </div>
			   </div>
		   </div>
		   <Footer />
	   </>
   )
}
export default BrowseAdsgrid;