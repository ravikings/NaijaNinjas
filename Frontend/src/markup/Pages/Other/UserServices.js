import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import Header2 from '../../Layout/Header2';
import Footer from '../../Layout/Footer';

import ProfileSidebar from "../../Element/Profilesidebar";
import axios from 'axios';

const postResume = [
	{ title: 'Tammy Dixon', },
	{ title: 'John Doe', },
	{ title: 'Ali Tufan', },
	{ title: 'David kamal', },
	{ title: 'Tammy Dixon', },
	{ title: 'John Doe', },
	{ title: 'David kamal', },
	{ title: 'Ali Tufan', },
]

function UserServices (){
	const history = useHistory();
	const baseURL= `http://127.0.0.1:8000/`;
	let token = `Bearer ` + localStorage.getItem("access_token");
	let userId = parseInt(localStorage.getItem("userID"));
	const [detailsValue,setDetailsValue]= useState();
	const [attachFile,setAttachFile]= useState(null);



	return(
		<>
			<Header2 />
			<div className="page-content bg-white">
				<div className="content-block">
					<div className="section-full bg-white p-t50 p-b20">
						<div className="container">
							<div className="row">
							<ProfileSidebar active={"services"} />
								<div className="col-xl-9 col-lg-8 m-b30 browse-job">
								<div className="job-bx clearfix">
										<div className="job-bx-title clearfix">
											<h5 className="font-weight-700 pull-left text-uppercase">Resume</h5>
											<Link to={"/company-manage-job"} className="site-button right-arrow button-sm float-right">Back</Link>
										</div>
										<ul className="post-job-bx browse-job-grid post-resume row">
											{postResume.map((item,index)=>(
												<li className="col-lg-6 col-md-6" key={index}>
													<div className="post-bx">
														<div className="d-flex m-b20">
															<div className="job-post-info">
																<h5 className="m-b0"><Link to={"/jobs-profile"}>{item.title}</Link></h5>
																<p className="m-b5 font-13">
																	<Link to={"#"} className="text-primary">UX / UI Designer </Link>
																	at Atract Solutions</p>
																<ul>
																	<li><i className="fa fa-map-marker"></i>Sacramento, California</li>
																	<li><i className="fa fa-money"></i> $ 2500</li>
																</ul>
															</div>
														</div>
														<div className="service-tag m-t15 m-b10">
															<Link to={"#"} className="mr-1"><span>PHP</span></Link>
															<Link to={"#"} className="mr-1"><span>Angular</span></Link>
															<Link to={"#"} className="mr-1"><span>Bootstrap</span></Link>
														</div>
														<Link to={"/files/pdf-sample.pdf"} target="blank" className="job-links">
															<i className="fa fa-pencil"></i>
														</Link>
													</div>
												</li>
											))}
											
										</ul>
										<div className="pagination-bx float-right">
											<ul className="pagination">
												<li className="previous"><Link to={"#"}><i className="ti-arrow-left"></i> Prev</Link></li>
												<li className="active"><Link to={"#"}>1</Link></li>
												<li><Link to={"#"}>2</Link></li>
												<li><Link to={"#"}>3</Link></li>
												<li className="next"><Link to={"#"}>Next <i className="ti-arrow-right"></i></Link></li>
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
export default UserServices; 