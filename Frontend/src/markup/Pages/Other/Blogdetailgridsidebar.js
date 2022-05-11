import React,{useState,useEffect, useMemo} from 'react';
import {Link} from 'react-router-dom'; 
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import PageTitle from '../../Layout/PageTitle';
import Sidebar from '../../Element/Sidebar';
import ForumAnwser from '../components/ForumAnwser';
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

function Blogdetailgridsidebar(){
	let PageSize = 8;
	const [currentPage, setCurrentPage] = useState(1);

	const [data,setData]= useState([])
   // geting data from api for fourm start
   const ForumData = () => {
	   createRequest()
		 .get("forum/home/")
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
	   
   },[])
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
							   <h1>All Questions</h1>							
						   <div className="row">
							   <div className="col-6 text-left">
								   <h2>{data.length} Questions</h2>
							   </div>
							   
<div className="col-6 text-right">

<Link to="/ask-questions" className="site-button"> <i className="fa fa-question" aria-hidden="true"></i> Ask Question</Link>
</div>
		 </div>
							   <div id="masonry" className="dez-blog-grid-3 row">
							   {currentData.map((item, index)=>(
							   
							  <ForumAnwser item={item} key={index} />
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