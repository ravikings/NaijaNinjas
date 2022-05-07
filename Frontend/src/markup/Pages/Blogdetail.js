import React,{useState,useEffect} from 'react';
import {Link,useParams,useLocation} from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import Sidebar from './../Element/Sidebar';
import * as bi from 'react-icons/bi';
import * as gr  from 'react-icons/gr';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import createRequest from "../../utils/axios";
import * as share from "react-share";
import axios from 'axios'
//Images
var bnr = require('./../../images/banner/bnr1.jpg');

function Blogdetail(){
	const location = useLocation();
	let { id,title } = useParams();
	const baseURL= `http://127.0.0.1:8000/`;
	let token = `Bearer ` + localStorage.getItem("access_token");
	let userId = parseInt(localStorage.getItem("userID"));
	const [showIcon,setShowIcon]=useState(true);
	const [key,setkey]=useState([1,2]);
	const [detailsValue,setDetailsValue]= useState("");
	const [author,setAuthor]=useState()

	// single data fatch start
	const [data,setData]= useState([])
	const [tags,setTags]= useState([])
	
	// vote function start here
	const voteAnswer=(id)=>{
	
		createRequest()
		  .get(`forum/vote/${parseInt(id)}/`)
		  .then((res) => {
			console.log("my vot is ",res)
				
			ForumData()
		  })
		  .catch((e) => {
			if (e.response?.status === 400) {
			console.log(e?.response?.data?.non_field_errors[0]);
			} else {
			  console.log("Unknown Error");
			}
		  });
	}
	// vote function end here

	// geting data from api for fourm start

	const ForumData = () => {
		createRequest()
		  .get("forum/list/")
		  .then((res) => {
			  
			 const filterData= res.data.results.filter((e)=>{
				 return e.id == id
			 })
			 console.log(filterData);
				setData(filterData)
			    var mytags=[]
				if(filterData[0].tags.includes(',')){
					{filterData[0].tags.split(',').map((e)=>(
						mytags.push(e)
					))}
					setTags(mytags)
				}
				else{
					mytags.push(filterData[0].tags)
					setTags(mytags)
				}
		
		  })
		  .catch((e) => {
			if (e.response?.status === 400) {
			console.log(e?.response?.data?.non_field_errors[0]);
			} else {
			  console.log("Unknown Error");
			}
		  });
	  }

	const SubmitAnwser = (e)=>{
		
		e.preventDefault();
	
		
		var formdata = new FormData();
	
		formdata.append("body", detailsValue);
		formdata.append("forum", id);
		formdata.append("author", userId);
		axios({
			method: 'POST',
			url: `${baseURL}forum/comment/`,
			data: formdata,
			headers: {
	  
			  Authorization: token,
	  
			},
		  })
			.then((response) => {
			  console.log("the response is ", response)
			  
			  if(response.statusText =="Created"){
				ForumData();
				e.target.reset();
				
			  }
			  //console.log(response.data);
			}, (error) => {
			  console.log(error);
			
			});

	}
		// effect start
		useEffect(()=>{
			
		
			ForumData()
		},[data.length , location.key])
		
		// effect end
	// single data fatch end
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
											<li className="post-date"><i className="fa fa-calendar"></i>{data[0]?.time_created?.Created}</li>
											<li className="post-author"><i className="fa fa-user"></i>By <Link to={"#"}>
												{data[0]?.author_name[0]?.first_name +" "+data[0]?.author_name[0]?.last_name} 
												
											
											</Link> </li>
											<li className="post-comment"><i className="fa fa-comments-o"></i><Link to={"#"}>{data[0]?.forum_comment?.length}</Link> </li>
										</ul>
									</div>
									<div className="dez-post-title">
										<h4 className="post-title m-t0"><Link to={"/blog-details"}>{data[0]?.title}</Link></h4>
									</div>
								
									<div className="dez-post-text"  dangerouslySetInnerHTML={{__html:data[0]?.body}}/>
									<div className="dez-post-media dez-img-effect zoom-slow m-t20"> 
										{data[0]?.attachment ? <a href={data[0]?.attachment}>Download Attachment</a> : null}
									</div>	
									
									<div className="dez-post-tags clear">
										<div className="post-tags">
											{tags.map((e)=>(

											<Link to={""}>{e} </Link> 
											))}
											
										</div>
									</div>
									<div className="dez-divider bg-gray-dark op4"><i className="icon-dot c-square"></i></div>
									<div className="share-details-btn">
										<ul>
											<li><h5 className="m-a0">Share Post</h5></li>
											<li><Link component={share.FacebookShareButton}  url={window.location.href} to={"#"} className="site-button facebook button-sm">
											
												<i className="fa fa-facebook"></i> Facebook
										
												
												</Link></li>
											
											<li><Link component={share.LinkedinShareButton} url={window.location.href} to={"#"} className="site-button linkedin button-sm"><i className="fa fa-linkedin"></i> Linkedin</Link></li>
											
											<li><Link component={share.TwitterShareButton} url={window.location.href} to={"#"} className="site-button twitter button-sm"><i className="fa fa-twitter"></i> Twitter</Link></li>
											<li><Link component={share.WhatsappShareButton} url={window.location.href} to={"#"} className="site-button whatsapp button-sm"><i className="fa fa-whatsapp"></i> Whatsapp</Link></li>
										</ul>
									</div>
								</div>
								<div className="clear" id="comment-list">
									<div className="comments-area" id="comments">
										<h2 className="comments-title">{data[0]?.forum_comment?.length} Answers</h2>
										<div className="clearfix m-b20">
											
											<ol className="comment-list">
												{data[0]?.forum_comment?.map((e)=>(
													<li className="comment">
													<div className="comment-body">
														
														<div className="comment-author vcard"> 
														
													
																{/* <cite className="fn">{e?.author_name} </cite> */}
																 <span className="says">says: </span> 
														<div className="vote text-center">
														{!e.votes.includes(parseInt(localStorage.getItem('userID'))) ? <bi.BiUpArrow className="thumb"  onClick={()=>voteAnswer(e.id)}/> : null }
														<p>{e.total_votes}</p>
														<bi.BiDownArrow className="thumb" onClick={()=>voteAnswer(e.id)}/>

														
														</div>
														</div>
														
														<div className="comment-meta"> <span className="mr-3"></span>  <Link to={"#"}>{e.time_created?.Updated ||e.time_created.Created}</Link> </div>

														<p dangerouslySetInnerHTML={{__html:e.body}}/>
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
												))}
												
											
											
											</ol>
										
											<div className="comment-respond" id="respond">
												<h4 className="comment-reply-title" id="reply-title">Your Answer <small> <Link to={""} style={{display:"none"}} id="cancel-comment-reply-link" rel="nofollow">Cancel reply</Link> </small> </h4>
												<form className="comment-form" id="commentform" onSubmit={SubmitAnwser}>
													
													
													<p className="comment-form-comment">
														<label htmlFor="comment">Comment</label>
														<ReactQuill value={detailsValue}
                  onChange={(e)=>{setDetailsValue(e); setAuthor(data.author)}} />
								
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