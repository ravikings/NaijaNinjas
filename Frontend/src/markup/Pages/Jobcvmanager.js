import React from 'react';
import {Link} from 'react-router-dom';
import Header2 from './../Layout/Header2';
import Footer from './../Layout/Footer';
import ProfileSideBar from './components/ProfileSideBar';

const managerBlog = [
	{ image: require('./../../images/testimonials/pic1.jpg'), title:'Alexander Weir', },
	{ image: require('./../../images/testimonials/pic2.jpg'), title:'Jennifer Wood', },
	{ image: require('./../../images/testimonials/pic3.jpg'), title:'Melissa Hassib', },
	{ image: require('./../../images/testimonials/pic1.jpg'), title:'Joseph Macfarlan', },
	{ image: require('./../../images/testimonials/pic2.jpg'), title:'Henry Crooks', },
	{ image: require('./../../images/testimonials/pic3.jpg'), title:'James Rogers', },
]

function Jobcvmanager(){
	return(
		<>
			<Header2 />
			<div className="page-content bg-white">
				<div className="content-block">
					<div className="section-full bg-white p-t50 p-b20">
						<div className="container">
							<div className="row">
							<ProfileSideBar />
								<div className="col-xl-9 col-lg-8 m-b30">
									<div className="job-bx browse-job clearfix">
										<div className="job-bx-title clearfix">
											<h5 className="font-weight-700 pull-left text-uppercase">CV Manager</h5>
											<div className="float-right">
												<span className="select-title">Sort by freshness</span>
												<select className="custom-btn">
													<option>Last 2 Months</option>
													<option>Last Months</option>
													<option>Last Weeks</option>
													<option>Last 3 Days</option>
												</select>
											</div>
										</div>
										<ul className="cv-manager">
											{managerBlog.map((item,index)=>(
												<li key={index}>
													<div className="d-flex float-left">
														<div className="job-post-company">
															<Link to={""}><span>
																<img alt="" src={item.image} />
															</span></Link>
														</div>
														<div className="job-post-info">
															<h6><Link to={""}>{item.title}</Link></h6>
															<ul>
																<li><i className="fa fa-map-marker"></i> Sacramento, California</li>
																<li><i className="fa fa-bookmark-o"></i> Full Time</li>
																<li><i className="fa fa-clock-o"></i> 11 days ago</li>
															</ul>
														</div>
													</div>
													<div className="job-links action-bx">
														<Link to={"/files/pdf-sample.pdf"} target="blank"><i className="fa fa-download"></i></Link>
														<Link to={""}><i className="ti-trash"></i></Link>
													</div>
												</li>
											))}	
											
										</ul>
										<div className="pagination-bx float-right">
											<ul className="pagination">
												<li className="previous"><Link to={""}><i className="ti-arrow-left"></i> Prev</Link></li>
												<li className="active"><Link to={""}>1</Link></li>
												<li><Link to={""}>2</Link></li>
												<li><Link to={""}>3</Link></li>
												<li className="next"><Link to={""}>Next <i className="ti-arrow-right"></i></Link></li>
											</ul>
										</div>
									</div>
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
export default Jobcvmanager;