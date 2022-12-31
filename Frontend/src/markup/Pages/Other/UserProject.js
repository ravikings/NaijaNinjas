import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header2 from '../../Layout/Header2';
import Footer from '../../Layout/Footer';

import ProfileSidebar from "../../Element/Profilesidebar";
import axios from 'axios';
import baseURL from '../../../utils/baseUrl';
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

function UserProject() {
	const history = useHistory();

	let token = `Token ` + localStorage.getItem("access_token");
	let userId = parseInt(localStorage.getItem("userID"));
	const [detailsValue, setDetailsValue] = useState();
	const [attachFile, setAttachFile] = useState(null);



	return (
		<>
			<Header2 />
			<div className="page-content bg-white">
				<div className="content-block">
					<div className="section-full bg-white p-t50 p-b20">
						<div className="container">
							<div className="row">
								<ProfileSidebar active={"project"} />
								<div className="col-xl-9 col-lg-8 m-b30 browse-job">
									<div className="job-bx clearfix">
										<div className="job-bx-title clearfix">
											<h5 className="font-weight-700 pull-left text-uppercase">Resume</h5>
											<Link to={"/company-manage-job"} className="site-button right-arrow button-sm float-right">Back</Link>
										</div>
										<ul className="post-job-bx browse-job-grid post-resume row">
											{postResume.map((item, index) => (
												<li className="col-lg-6 col-md-6" key={index}>

													<div className="services-box cursor-pointer">
														<img src="https://images.unsplash.com/photo-1426170042593-200f250dfdaf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg" />
														<div className="services-title p-2">

															<h3>This is my new Gigxnow Here igxnow Here </h3>

															<Link to={"/files/pdf-sample.pdf"} target="blank" className="project-edit-btn ">
																<i className="fa fa-pencil"></i>
															</Link>
														</div>

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
export default UserProject; 