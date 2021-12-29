import React from 'react';
import {Link} from 'react-router-dom';
import Header2 from '../Layout/Header2';
import Footer from '../Layout/Footer';
import ProfileSidebar from "./../Element/Profilesidebar";
const postBlog = [
	{ title: 'How to Delete Facebook Account?', },
	{ title: 'What is Facebook?', },
	{ title: 'Branch Credit Manager how to work ?', },
]

function AllQuestion (){
	return(
		<>
			<Header2 />
			<div className="page-content bg-white">
				<div className="content-block">
					<div className="section-full bg-white p-t50 p-b20">
						<div className="container">
							<div className="row">
							<ProfileSidebar active={"question"} />
								<div className="col-xl-9 col-lg-8 m-b30 browse-job">
									<div className="job-bx-title  clearfix">
										<h5 className="font-weight-700 pull-left text-uppercase">22 All Questions </h5>
										<div className="float-right">
								
										
										
										</div>
										
									</div>
									<ul className="post-job-bx browse-job">
										{postBlog.map((item,index)=>(
											<li key={index}>
												<div className="post-bx">
													<div className="job-post-info m-a0">
														<h4><Link to={"/job-detail"}>{item.title}</Link></h4>
														<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex reprehenderit sequi possimus ab aliquid itaque nam facere quas culpa doloremque in nihil unde earum perspiciatis assumenda, provident pariatur fugiat. Maiores?</p>
														<div className="job-time m-t15 m-b10">
															<Link to={''} className="mr-1"><span>PHP</span></Link>
															<Link to={''} className="mr-1"><span>Angular</span></Link>
															<Link to={''} className="mr-1"><span>Bootstrap</span></Link>
															<Link to={''} className="mr-1"><span>Wordpress</span></Link>
														</div>
														<div className="posted-info clearfix">
															<p className="m-tb0 text-primary float-left m-r30">
																<span className="text-black m-r10">Posted:</span> 2 day ago</p>
															<p className="m-tb0 text-primary float-left m-r30">
																<span className="text-black m-r10 ">Anwsers:</span> 21</p>
															<p className="m-tb0 text-primary float-left m-r30">
																<span className="text-black m-r10 ">Vote:</span> 211</p>
															<Link to={"/jobs-my-resume"} className="site-button button-sm float-right">Edit Question</Link>
														</div>
													</div>
												</div>
											</li>
										))}	
										
									</ul>
									<div className="pagination-bx m-t30">
										<ul className="pagination">
											<li className="previous"><Link to={' '}><i className="ti-arrow-left"></i> Prev</Link></li>
											<li className="active"><Link to={' '}>1</Link></li>
											<li><Link to={' '}>2</Link></li>
											<li><Link to={' '}>3</Link></li>
											<li className="next"><Link to={' '}>Next <i className="ti-arrow-right"></i></Link></li>
										</ul>
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
export default AllQuestion; 