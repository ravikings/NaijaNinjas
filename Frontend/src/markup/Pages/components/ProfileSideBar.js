import React from 'react';
import {NavLink} from 'react-router-dom';
const ProfileSideBar=()=>{
    return(
        <div className="col-xl-3 col-lg-4 m-b30">
									<div className="sticky-top">
										<div className="candidate-info">
											<div className="candidate-detail text-center">
												<div className="canditate-des">
													<NavLink to={'#'}>
														<img alt="" src={require("./../../../images/team/pic1.jpg")} />
													</NavLink>
													<div className="upload-NavLink" title="update" data-toggle="tooltip" data-placement="right">
														<input type="file" className="update-flie" />
														<i className="fa fa-camera"></i>
													</div>
												</div>
												<div className="candidate-title">
													<div className="">
														<h4 className="m-b5"><NavLink to={''}>David Matin</NavLink></h4>
														<p className="m-b0"><NavLink to={''}>Web developer</NavLink></p>
													</div>
												</div>
											</div>
											<ul>
												<li><NavLink to={"/jobs-profile"} activeClassName="active">
													<i className="fa fa-user-o" aria-hidden="true"></i> 
													<span>Profile</span></NavLink></li>
												<li><NavLink to={"/jobs-my-resume"} activeClassName="active">
													<i className="fa fa-file-text-o" aria-hidden="true"></i> 
													<span>My Resume</span></NavLink></li>
												<li><NavLink to={"/jobs-saved-jobs"} activeClassName="active">
													<i className="fa fa-heart-o" aria-hidden="true"></i> 
													<span>Saved Jobs</span></NavLink></li>
												<li><NavLink to={"/jobs-applied-job"} activeClassName="active">
													<i className="fa fa-briefcase" aria-hidden="true"></i> 
													<span>Applied Jobs</span></NavLink></li>
												<li><NavLink to={"/jobs-alerts"} activeClassName="active">
													<i className="fa fa-bell-o" aria-hidden="true"></i> 
													<span>Job Alerts</span></NavLink></li>
												<li><NavLink to= {"/jobs-cv-manager"} activeClassName="active">
													<i className="fa fa-id-card-o" aria-hidden="true"></i> 
													<span>CV Manager</span></NavLink></li>
												<li><NavLink to= {"/ask-questions"} activeClassName="active">
													<i className="fa fa-user" aria-hidden="true"></i> 
													<span>Ask  Question</span></NavLink></li>
												<li><NavLink to={"/jobs-change-password"} activeClassName="active">
													<i className="fa fa-key" aria-hidden="true"></i> 
													<span>Change Password</span></NavLink></li>
												<li><NavLink to={"/logout"} activeClassName="active">
													<i className="fa fa-sign-out" aria-hidden="true"></i> 
													<span>Log Out</span></NavLink></li>
											</ul>
										</div>
									</div>
									
								</div>
    )
}

export default ProfileSideBar;