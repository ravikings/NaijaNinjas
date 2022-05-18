import React,{useState,useEffect, useMemo} from 'react';
import {Link} from 'react-router-dom'; 
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import PageTitle from '../../Layout/PageTitle';
import AdsSidebar from '../../Element/AdsSidebar';
import  CardItem  from '../components/CardItem';
import createRequest from "../../../utils/axios";
import Pagination from '../components/Pagination';

var bnr = require('../../../images/banner/bnr1.jpg');

const blogGride = [
	{ image: require('../../../images/blog/grid/pic4.jpg'), },
	{ image: require('../../../images/blog/grid/pic3.jpg'), },
	{ image: require('../../../images/blog/grid/pic2.jpg'), },
	{ image: require('../../../images/blog/grid/pic1.jpg'), },
	{ image: require('../../../images/blog/grid/pic4.jpg'), },
	{ image: require('../../../images/blog/grid/pic3.jpg'), },
	{ image: require('../../../images/blog/grid/pic2.jpg'), },
	{ image: require('../../../images/blog/grid/pic1.jpg'), },
	{ image: require('../../../images/blog/grid/pic4.jpg'), },
	{ image: require('../../../images/blog/grid/pic3.jpg'), },
	{ image: require('../../../images/blog/grid/pic2.jpg'), },
	{ image: require('../../../images/blog/grid/pic1.jpg'), },
]

function BrowseAdsgrid(){
	let PageSize = 8;
	const [currentPage, setCurrentPage] = useState(1);

	const [data,setData]= useState([{
		type:'Large'
	},
{
	type:'medium',
},
{
	type:'small',
},
{
	type:'small',
},
{
	type:'medium',
},
{
	type:'Large',
},
{
	type:'small',
},
])

   // effect start
   useEffect(()=>{
	 
	   
   },[])
   // effect end

//   paganition setup start

//   paganition setup end
   return(
	   <>
		   <Header />
		   <div className="page-content bg-white">
		   
			   <div className="content-area">
				   <div className="container">
					   
					   <div className="row">
                       <div className="col-lg-3 col-md-5 col-sm-12 sticky-top">
							   <AdsSidebar />
						   </div>
						   <div className="col-lg-9 col-md-7 col-sm-12">
							   <h1>Fresh recommendations</h1>
						   	
							   <div id="masonry" className="row">
                       
								{data.map((e)=>(
										
							  <CardItem type={e.type} image={blogGride[0].image}/> 
								))}
                           
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