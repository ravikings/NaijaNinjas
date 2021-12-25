import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import Sidebar from './../Element/Sidebar';
import * as bi from 'react-icons/bi';
import * as gr  from 'react-icons/gr';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//Images
var bnr = require('./../../images/banner/bnr1.jpg');

function Blogdetail(){
	const [showIcon,setShowIcon]=useState(true);
	const [key,setkey]=useState([1,2]);
	const [detailsValue,setDetailsValue]= useState();
	return(
		<>
			<Header />
			<div className="page-content bg-white">
				
				<div className="content-area">
					<div className="container">
						<div className="row">
							<div className="col-lg-8 col-md-7 m-b10">
								<div className="blog-post blog-single blog-style-1">
									<div className="dez-post-meta">
										<ul className="d-flex align-items-center">
											<li className="post-date"><i className="fa fa-calendar"></i>September 18, 2017</li>
											<li className="post-author"><i className="fa fa-user"></i>By <Link to={"#"}>demongo</Link> </li>
											<li className="post-comment"><i className="fa fa-comments-o"></i><Link to={"#"}>5k</Link> </li>
										</ul>
									</div>
									<div className="dez-post-title">
										<h4 className="post-title m-t0"><Link to={"/blog-details"}>Do you have a job that the average person doesnӴ even know exists?</Link></h4>
									</div>
									<div className="dez-post-media dez-img-effect zoom-slow m-t20"> 
										<Link to={"#"}><img src={require("./../../images/blog/default/thum1.jpg") }alt="" /></Link> 
									</div>
									<div className="dez-post-text">
										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy 
											text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum 
											is simply dummy text of the printing and typesetting  printer a galley Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
											Lorem Ipsum has been the industry's standard text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to 
											make a type specimen  It has urvived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
											It was popularised in 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
											publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard text 
											ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen  
											It has urvived not only five centuries, but also the leap into electronic typesetting.</p>
										<blockquote>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Has been the industry's standard text ever since 
											the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimencenturies.</blockquote>
										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard text 
											ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen  
											It has urvived not only five centuries, but also the leap into electronic typesetting.</p>
										<h5>Completely Responsive</h5>
										<img className="alignleft blog-side-img" src={require("./../../images/blog/grid/pic4.jpg")} alt="" />
										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text 
											ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only                                 
											five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
											of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
											Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
											has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
											type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
											It was popularised in the 1960s with the releasefive centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
											It was popularised in the 1960s with the release</p>
										<div className="dez-divider bg-gray-dark"></div>
										<img className="alignright blog-side-img" src={require("./../../images/blog/grid/pic1.jpg")} alt="" />
										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text 
											ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only                                 
											five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
											of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
											Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
											has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
											type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
											It was popularised in the 1960s with the release</p>
									</div>
									<div className="dez-post-tags clear">
										<div className="post-tags">
											<Link to={""}>Child </Link> 
											<Link to={""}>Eduction </Link> 
											<Link to={""}>Money </Link> 
											<Link to={""}>Resturent </Link> 
										</div>
									</div>
									<div className="dez-divider bg-gray-dark op4"><i className="icon-dot c-square"></i></div>
									<div className="share-details-btn">
										<ul>
											<li><h5 className="m-a0">Share Post</h5></li>
											<li><Link to={""} className="site-button facebook button-sm"><i className="fa fa-facebook"></i> Facebook</Link></li>
											<li><Link to={""} className="site-button google-plus button-sm"><i className="fa fa-google-plus"></i> Google Plus</Link></li>
											<li><Link to={""} className="site-button linkedin button-sm"><i className="fa fa-linkedin"></i> Linkedin</Link></li>
											<li><Link to={""} className="site-button instagram button-sm"><i className="fa fa-instagram"></i> Instagram</Link></li>
											<li><Link to={""} className="site-button twitter button-sm"><i className="fa fa-twitter"></i> Twitter</Link></li>
											<li><Link to={""} className="site-button whatsapp button-sm"><i className="fa fa-whatsapp"></i> Whatsapp</Link></li>
										</ul>
									</div>
								</div>
								<div className="clear" id="comment-list">
									<div className="comments-area" id="comments">
										<h2 className="comments-title">8 Answers</h2>
										<div className="clearfix m-b20">
											
											<ol className="comment-list">
												<li className="comment">
													<div className="comment-body">
														
														<div className="comment-author vcard"> 
														
													
																<cite className="fn">Stacy poe</cite> <span className="says">says:</span> 
														<div className="vote text-center">
														<bi.BiUpArrow className="thumb" />
														<p>5</p>
														<bi.BiDownArrow className="thumb"/>

														
														</div>
														</div>
														
														<div className="comment-meta"> <Link to={""}>October 6, 2015 at 7:15 am</Link> </div>

														<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neqnsectetur adipiscing elit. Nam viae neqnsectetur adipiscing elit.
															Nam vitae neque vitae sapien malesuada aliquet. </p>
															<div className="reply">
																	{/* share social network start */}
													<div className="social-share">
        <label className="toggle" htmlFor="toggle">
          <input type="checkbox" id="toggle" />
          <div className="sbtn" onClick={()=>setShowIcon(!showIcon)}>
			
			
			<bi.BiShareAlt />
			
          
            <div className="social">
              <a href="#"><gr.GrFacebook /></a>
              <a href="#"><gr.GrTwitter /></a>
              <a href="#"><gr.GrInstagram /></a>
              <a href="#"><gr.GrLinkedin /></a>
           
            </div>
          </div>
        </label>
      </div>

													{/* share social network end */}
															
															</div>
													</div>
												
												</li>
												<li className="comment">
													<div className="comment-body">
														
														<div className="comment-author vcard"> 
															 
													
																<cite className="fn">Stacy poe</cite> <span className="says">says:</span> 
														<div className="vote text-center">
														<bi.BiUpArrow className="thumb" />
														<p>5</p>
														<bi.BiDownArrow className="thumb"/>

														
														</div>
														</div>
														
														<div className="comment-meta"> <Link to={""}>October 6, 2015 at 7:15 am</Link> </div>

														<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neqnsectetur adipiscing elit. Nam viae neqnsectetur adipiscing elit.
															Nam vitae neque vitae sapien malesuada aliquet. </p>
															<div className="reply">
																	{/* share social network start */}
													<div className="social-share">
        <label className="toggle" htmlFor="toggle1">
          <input type="checkbox" id="toggle1" />
          <div className="sbtn" onClick={()=>setShowIcon(!showIcon)}>
			
			
			<bi.BiShareAlt />
			
          
            <div className="social">
              <a href="#"><gr.GrFacebook /></a>
              <a href="#"><gr.GrTwitter /></a>
              <a href="#"><gr.GrInstagram /></a>
              <a href="#"><gr.GrLinkedin /></a>
           
            </div>
          </div>
        </label>
      </div>

													{/* share social network end */}
															
															</div>
													</div>
												
												</li>
											
											</ol>
										
											<div className="comment-respond" id="respond">
												<h4 className="comment-reply-title" id="reply-title">Your Answer <small> <Link to={""} style={{display:"none"}} id="cancel-comment-reply-link" rel="nofollow">Cancel reply</Link> </small> </h4>
												<form className="comment-form" id="commentform" method="post" action="http://sedatelab.com/developer/donate/wp-comments-post.php">
													
													
													<p className="comment-form-comment">
														<label htmlFor="comment">Comment</label>
														<Editor
  editorState={detailsValue}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  onEditorStateChange={(e)=>setDetailsValue(e)}
/>
													</p>
													<p className="form-submit">
														<input type="submit" defaultValue="Post Comment" className="submit site-button" id="submit" name="submit" />
													</p>
												</form>
											</div>
											
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-5 sticky-top">
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
export default Blogdetail;