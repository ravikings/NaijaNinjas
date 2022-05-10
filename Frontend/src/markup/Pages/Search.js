import React,{ useEffect, useState, useMemo} from 'react';
import {Link,useParams,useLocation} from 'react-router-dom'; 
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import PageTitle from './../Layout/PageTitle';
import Sidebar from './../Element/Sidebar';
import createRequest from "../../utils/axios";
import Pagination from './components/Pagination';
import SearchAnwser from './components/SearchAnwser';
var bnr = require('./../../images/banner/bnr1.jpg');

const blogGride = [
	{ image: require('./../../images/blog/grid/pic4.jpg'), },
	
]

function Search(){
	let PageSize = 8;
	const [currentPage, setCurrentPage] = useState(1);
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
		setCurrentPage(1);
		ForumData()
	},[location.key])
	// effect end
	//   paganition setup start
const currentData = useMemo(() => {
	
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage , data.length]);
//   paganition setup end
	return(
		<>
			<Header />
			<div className="page-content bg-white">
			
				<div className="content-area">
					<div className="container">
						<div className="row">
							<div className="col-lg-8 col-md-7 col-sm-12">							
								<div id="masonry" className="dez-blog-grid-3 row">
								{currentData.map((item, index)=>(
								
								<SearchAnwser item={item} key={index} />
								 ))}
								</div>
								<div className="pagination-bx clearfix text-center">
									{/* pagination place */}
									<Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
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