import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import Sidebar from '../../Element/Sidebar';
import ForumAnwser from '../components/ForumAnwser';
import createRequest from "../../../utils/axios";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "react-js-pagination";
import { toast } from 'react-toastify';



function Blogdetailgridsidebar() {

	const [totalCount, setTotalCount] = useState(null);
	const [activePage, SetActivePage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([])
	// geting data from api for fourm start
	const ForumData = (page = 1) => {
		setLoading(true);
		createRequest()
			.get(`/forum/home/?page=${page}`)
			.then((res) => {
				setTotalCount(res?.data?.count)
				setData(res.data.results)
				setLoading(false);
			})
			.catch((e) => {
				if (e.response?.status === 400) {
					console.log(e?.response?.data?.non_field_errors[0]);
				} else {
					console.log("Unknown Error");
				}
				toast.error("Error occur while loading page")
				setLoading(false);
			});
	};

	// geting data from api for fourm end
	// effect start
	useEffect(() => {
		ForumData()

	}, [])
	// effect end
	const Paginate = (page) => {

		SetActivePage(page);
		ForumData(page);
		window.scrollTo(0, 0)
	}

	return (
		<>
			<Header />
			<div className="page-content bg-white">

				<div className="">
					<div className="container">

						<div className="row">
							<div className="col-lg-8 col-md-7 col-sm-12">
								<h1>All Questions</h1>
								<div className="row">
									<div className="col-6 text-left">
										<h2>{totalCount} Questions</h2>
									</div>

									<div className="col-6 text-right">

										<Link to="/ask-questions" className="site-button"> <i className="fa fa-question" aria-hidden="true"></i> Ask Question</Link>
									</div>
								</div>
								{!loading ?

									<div id="masonry" className="dez-blog-grid-3 row">

										{data?.map((item, index) => (

											<ForumAnwser item={item} key={index} />
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
								{/* pagination place start */}
								<div className="mx-auto text-center m-t30">
									{totalCount >= 10 ?
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
										: null}



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