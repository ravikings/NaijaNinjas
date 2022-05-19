import React,{ useEffect, useState, useMemo} from 'react';
import {Link,useParams,useLocation} from 'react-router-dom'; 
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import PageTitle from './../Layout/PageTitle';
import Sidebar from './../Element/Sidebar';
import createRequest from "../../utils/axios";
import Pagination from "react-js-pagination";
import ClipLoader from "react-spinners/ClipLoader";
import SearchAnwser from './components/SearchAnwser';
var bnr = require('./../../images/banner/bnr1.jpg');

const blogGride = [
	{ image: require('./../../images/blog/grid/pic4.jpg'), },
	
]

function Search(){
	const [totalCount, setTotalCount] = useState(null);
	const [loading, setLoading] = useState(false);
	const [activePage, SetActivePage] = useState(1);
	const location = useLocation();
    let { query } = useParams();
     const [data,setData]= useState([])
	// geting data from api for fourm start
	const ForumData = (page=activePage) => {
		setLoading(true);
		createRequest()
		  .get(`forum/search/?page=${page}&search=${query}`)
		  .then((res) => {
			setTotalCount(res.data.count)
				setData(res.data.results)
				setLoading(false);
			
		
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
		SetActivePage(1);
		ForumData()
	},[location.key])
	// effect end
	const Paginate=(page)=>{
	
		SetActivePage(page);
		ForumData(page);
		window.scrollTo(0, 0)
	 }
	return(
		<>
			<Header />
			<div className="page-content bg-white">
			
				<div className="content-area">
					<div className="container">
						<div className="row">
							<div className="col-lg-8 col-md-7 col-sm-12">							
							{!loading ?
									 
									 <div id="masonry" className="dez-blog-grid-3 row">
								   
									 {data.map((item, index)=>(
									 
									<SearchAnwser item={item} key={index} />
									 ))} 
									 </div>
									 : 
									 <div className='loader'>
									 <ClipLoader
									   color={"#2e55fa"}
									   loading={true}
									   size={150}
									 />
								   </div>
										  }
								<div className="pagination-bx clearfix text-center">
									{/* pagination place */}
									{totalCount>=10 ?
									<Pagination
						   activePage={activePage}
						   itemsCountPerPage={10}
						   totalItemsCount={totalCount}
						   pageRangeDisplayed={5}
						   onChange={Paginate.bind(this)}
						   prevPageText="⇐ Prev"
						   nextPageText="Next ⇒"
						   firstPageText="◀"
						   lastPageText="▶"
						 />
										: null }
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