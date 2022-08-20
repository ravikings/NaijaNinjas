import React,{useState,useEffect} from 'react';
import {Link,useHistory,useLocation} from 'react-router-dom';
import Header2 from '../../Layout/Header2';
import Footer from '../../Layout/Footer';
import {Form}  from 'react-bootstrap';  
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import ProfileSidebar from "../../Element/Profilesidebar";
import axios from 'axios';

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const postBlog = [
	{ title: 'PHP Web Developer', },
	{ title: 'Software Developer', },
	{ title: 'Branch Credit Manager', },
]

function UpdateQuestion (){
	const stateData = useLocation();
	const data = stateData.state;
	const [title,setTitle]= useState(data.title);
	const [id,setId]= useState(data.id);
	const [tags,setTags]= useState(data.tags);
	const [category,setCategory]= useState(data.category);
	const [detailsValue,setDetailsValue]= useState(data.body);
	const [attachment,setAttachment]= useState(data.attachment);
	const history = useHistory();
	const baseURL= `https://zjoxobi1x6.execute-api.us-east-1.amazonaws.com/dev/`;
	let token = `Bearer ` + localStorage.getItem("access_token");
	let userId = parseInt(localStorage.getItem("userID"));
	const [attachFile,setAttachFile]= useState(null);

	// upload image start
	const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  
	// called every time a file's `status` changes
	const handleChangeStatus = ({ meta, file }, status) => { console.log(file) }
	

	// upload image end
	const UpdateQuestion = (e)=>{
		e.preventDefault();
		
	
		console.log("image "+attachFile);
		
		var formdata = new FormData();
		formdata.append("title", title);
		formdata.append("body", detailsValue);
		formdata.append("tags", tags);
		formdata.append("category",category);
		//formdata.append("attachment", attachFile);
		formdata.append("author", userId);
		axios({
			method: 'PUT',
			url: `${baseURL}forum/list/${id}/`,
			data: formdata,
			headers: {
	  
			  Authorization: token,
	  
			},
		  })
			.then((response) => {
			  console.log("the response is ", response)
			  
			  if(response.statusText =="Created" || response.statusText=="OK"){
				history.push(`/blog-details/${response.data.id}/${response.data.title}`) 
				
				
			  }
			  //console.log(response.data);
			}, (error) => {
			  console.log(error);
			
			});

	}
	useEffect(()=>{
		console.log(data);
	},[])
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
										<h5 className="font-weight-700 pull-left text-uppercase">Update a Question</h5>
										<div className="float-right">
													<Link to="all-questions" className="btn btn-primary">Previous Question</Link>
													</div>
									</div>
								<form onSubmit={UpdateQuestion} enctype="multipart/form-data">
								
											<div className="row">
												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Question Title</label>
														<input type="text" 
														name="QuestionTitle"
														className="form-control" placeholder="Enter Job Title" onChange={(e)=>setTitle(e.target.value)} value={title} />
													</div>
													
												</div>
												
												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Question Tags</label>
														<input type="text" 
														name="tag"
														className="form-control tags_input"
														onChange={(e)=>setTags(e.target.value)} value={tags}
														/>
														
													</div>
												</div>
												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Question Category</label>
														<select 
														name="category" onChange={(e)=>setCategory(e.target.value)} value={category}
														className="custom-select">
														
															<option value="Communcation">Communcation</option>
															<option value="Company">Company</option>
															<option value="Language">Language</option>
															<option value="Freelance">Freelance</option>
														</select>
													</div>
												</div>
										
												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Details:</label>
														<ReactQuill value={detailsValue}
                  onChange={(e)=>{setDetailsValue(e)}} style={{height:'200px', paddingBottom:'70px'}} />
									
 
													</div>
												</div>
												
											
												
												<div className="col-lg-12 col-md-12">
												<Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
     
      accept="image/*"
    />
													<div className="form-group">
														<label>Upload File</label>
														<div className="custom-file">
															<p className="m-a0">
																<i className="fa fa-upload"></i>
																Upload File
															</p>
															<input type="file" 
															name="attachment"
															
        						  onChange={(e)=>setAttachFile(e.target.files[0])}
															className="site-button form-control" id="customFile" />
														</div>
													</div>
												</div>
											</div>
											<button type="submit" className="site-button m-b30">Update</button>
										</form>
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
export default UpdateQuestion; 