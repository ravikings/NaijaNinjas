import React,{useState,useEffect} from 'react';
import {Link,useParams,useLocation} from 'react-router-dom';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import Sidebar from '../../Element/Sidebar';
import ClipLoader from "react-spinners/ClipLoader";
import * as bi from 'react-icons/bi';
// import * as gr  from 'react-icons/gr';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import createRequest from "../../../utils/axios";
import * as share from "react-share";
import axios from 'axios'

import Swiper from 'react-id-swiper';
import 'swiper/css';

import baseURL from '../../../utils/baseUrl';
//Images
var bnr = require('../../../images/banner/bnr1.jpg');

function Blogdetail(){
	const location = useLocation();
	const [loading, setLoading] = useState(false);
	let { id,title } = useParams();
	
	let token = `Bearer ` + localStorage.getItem("access_token");
	let userId = parseInt(localStorage.getItem("userID"));
	const [showIcon,setShowIcon]=useState(true);
	const [key,setkey]=useState([1,2]);
	const [detailsValue,setDetailsValue]= useState("");
	const [author,setAuthor]=useState()

	// single data fatch start
	const [data,setData]= useState([])
	const [tags,setTags]= useState([])
	const [commentId,setCommentId]= useState(null)
	
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

	const ForumData = async () => {
		setLoading(true);
		await createRequest()
		  .get(`/forum/list/${id}/`)
		  .then((res) => {
			  
			//  const filterData= res.data.results.filter((e)=>{
			// 	 return e.id == id
			//  })
			 console.log("yo "+res.data.tags);
				setData(res.data)
			    var mytags=[]
				if(res.data.tags.includes(',')){
					{res.data.tags.split(',').map((e)=>(
						mytags.push(e)
					))}
					setTags(mytags)
				}
				else{
					mytags.push(res?.data?.tags)
					setTags(mytags)
				}
				setLoading(false);
		  })
		  .catch((e) => {
			if (e.response?.status === 400) {
			console.log(e?.response?.data?.non_field_errors[0]);
			} else {
			  console.log("Unknown Error");
			}
		  });
	  }
   // Add Anwser Start
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
				setDetailsValue("");
				
			  }
			  //console.log(response.data);
			}, (error) => {
			  console.log(error);
			
			});

	}

	// Add Anwser End
   // Edit Anwser Start
	const updateComment = (e)=>{
		
		e.preventDefault();
	
		
		var formdata = new FormData();
	
		formdata.append("body", detailsValue);
		formdata.append("forum", id);
		formdata.append("author", userId);
		axios({
			method: 'PUT',
			url: `${baseURL}forum/comment/${commentId}/`,
			data: formdata,
			headers: {
	  
			  Authorization: token,
	  
			},
		  })
			.then((response) => {
				console.log(response.data.author)
				if(response.data.author){
					
					ForumData();
					setDetailsValue("");
					setCommentId(null);
				}
			
			  //console.log(response.data);
			}, (error) => {
			  console.log(error);
			
			});

	}

	// Add Anwser End

	// Attachment slider start
	const params = {
		slidesPerView: 3,
		spaceBetween: 30,
		freeMode: true,
		pagination: {
		  el: '.swiper-pagination',
		  clickable: true,
		}
	  }
	// Attachment slider end
		// effect start
		useEffect(()=>{
			
		  
			ForumData()
		},[location.key])
		
		// effect end
	// single data fatch end
	return(
		<>
			<Header />
			<div className="page-content bg-white">
				
				<div className="content-area">
					<div className="container">
						<div className="row">
							{!loading ?
							<div className="col-lg-8 col-md-7 m-b10">
								<div className="col-12 text-right">

					   <Link to="/ask-questions" className="site-button"> <i className="fa fa-question" aria-hidden="true"></i> Ask Question</Link>
								</div>
								<div className="blog-post blog-single blog-style-1">
								<div className="dez-post-title">
										<h4 className="post-title m-t0 mb-3"><Link to={"/blog-details"}>{data?.title}</Link></h4>
									</div>
									<div className="dez-post-meta">
										<ul className="d-flex align-items-center">
											<li className="post-date"><i className="fa fa-calendar"></i>Asked {data?.time_created?.Created || data?.time_created?.Updated}</li>
										
											<li className="post-author"><i className="fa fa-user"></i>Ask By <Link to={"#"}>
												{/* {data?.author_name[0]?.first_name +" "+data?.author_name[0]?.last_name}  */}
												{data?.author_name?.map((e)=>(
													e.first_name +" "+ e.last_name
												))}
												
											
											</Link> </li>
											<li className="post-comment"><i className="fa fa-comments-o"></i> <Link to={"#"}>{data?.forum_comment?.length} Anwsers </Link> </li>
											<li className="post-comment"><i className="fa fa-eye"></i><Link to={"#"}>{data?.total_views} Views </Link> </li>
										</ul>
									</div>
									
								
									<div className="dez-post-text"  dangerouslySetInnerHTML={{__html:data?.body}}/>
									<div className="dez-post-media dez-img-effect  m-t20 m-b20">
									<h2>Attachments</h2> 
									<Swiper {...params}>
        <div><img src={data?.attachment}/></div>
        <div><img src={data?.attachment}/></div>
        <div><img src={data?.attachment}/></div>
        <div><img src={data?.attachment}/></div>
        <div><img src={data?.attachment}/></div>
        
      </Swiper>
										{/* {data?.attachment ? <a href={data?.attachment}>Download Attachment</a> : null} */}
									</div>	
									{/* attachment slider start */}
				
									{/* attachment slider end */}
									<div className="col-12 text-right">
{data.author === userId ?
<Link to={{ pathname: '/update-questions', state:data }} className="site-button"> <i className="fa fa-pencil" aria-hidden="true"></i> Edit Question</Link>
: null }
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
										<h2 className="comments-title">{data?.forum_comment?.length} Answers</h2>
										<div className="clearfix m-b20">
											
											<ol className="comment-list">
												{data?.forum_comment?.map((e)=>(
													<li className="comment">
													<div className="comment-body">
														
														<div className="comment-author vcard"> 
														
													
																{/* <cite className="fn">{e?.author_name} </cite> */}
																 <span className="says">says: </span> 
														<div className="vote text-center">
														{!e?.votes?.includes(userId) ? <bi.BiUpArrow className="thumb"  onClick={()=>voteAnswer(e.id)}/> : null }
														<p>{e.total_votes}</p>
														<bi.BiDownArrow className="thumb" onClick={()=>voteAnswer(e.id)}/>

														
														</div>
														</div>
														
														<div className="comment-meta">
															 <span className="mr-3"></span>  <Link to={"#"}>{e.time_created?.Updated ||e.time_created.Created}</Link>
															{e?.author === userId ?
															<span> <span className="mr-3"></span> <i className="fa fa-pencil"></i>  <a href="#anwser" className="text-primary" onClick={()=>{setCommentId(e.id); setDetailsValue(e.body);}}>Edit Anwser</a>
															
																		</span> : null }
															
															  </div>

														<p dangerouslySetInnerHTML={{__html:e.body}}/>
															<div className="reply">
																	{/* share social network start */}
													{/* <div className="social-share">
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
      </div> */}

													{/* share social network end */}
															
															</div>
													</div>
												
												</li>
												))}
												
											
											
											</ol>
										
	  												<div id="anwser"></div>
											<div className="comment-respond" id="respond">
												<h4 className="comment-reply-title" id="reply-title">Your Answer <small> <Link to={""} style={{display:"none"}} id="cancel-comment-reply-link" rel="nofollow">Cancel reply</Link> </small> </h4>
												<form className="comment-form" id="commentform" onSubmit={commentId != null ? updateComment : SubmitAnwser}>
													
													
													<p className="comment-form-comment">
														<label htmlFor="comment">Comment</label>
														<ReactQuill value={detailsValue}
                  onChange={(e)=>{setDetailsValue(e); setAuthor(data.author)}} />
								
													</p>
													<p className="form-submit">
														<button type="submit" className="submit site-button">
														{commentId != null ? "Update" : "Submit"}
														</button>
														{/* <input type="submit" defaultValue={commentId != null ? "Submit" : "Update"} className="submit site-button" id="submit" name="submit" /> */}
													</p>
												</form>
											</div>
											
										</div>
									</div>
								</div>
							</div>
							: 
							<div className="col-lg-8 col-md-7 m-b10">
							  <div className='loader'>
							<ClipLoader
							  color={"#2e55fa"}
							  loading={true}
							  size={150}
							/>
						  </div> 
						  </div>
	}
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