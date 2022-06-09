import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
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

function AddServices (){
	const history = useHistory();
	const baseURL= `http://127.0.0.1:8000/`;
	let token = `Bearer ` + localStorage.getItem("access_token");
	let userId = parseInt(localStorage.getItem("userID"));
	const [detailsValue,setDetailsValue]= useState();
	const [attachFile,setAttachFile]= useState(null);
	const [title,setTitle]=useState('');
	const [amount,setAmount]=useState('');
	const [location,setLocation]=useState('');
	const [tag,setTag]=useState('');
	const [deliveryMethod,setDeliveryMethod]=useState('');
	const [loading, setLoading] = useState(false);
	const addData=(e)=>{
		e.preventDefault();
	 	  setLoading(true);
		  var formdata = new FormData();
			  formdata.append("title",title);
			  formdata.append("description",detailsValue);
			  formdata.append("amount",amount);
			  formdata.append("location",location);
			  formdata.append("tag",tag);
			  formdata.append("delivery_method",deliveryMethod);
			  formdata.append("display",attachFile);
			
			  formdata.append("author", userId);
			  axios({
				  method: 'POST',
				  url: `${baseURL}api/v1/account/professional-services/`,
				  data: formdata,
				  headers: {
			
					Authorization: token,
			
				  },
				})
				  .then((response) => {
				   
			  if(response.statusText=="Created"){
				setLoading(false);
				alert("done")
				
			  }
					
			  history.push('/company-manage-job')
				  }, (error) => {
					console.log(error);
				  
				  });
	  }
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
								<div className="job-bx-title  clearfix">
										<h5 className="font-weight-700 pull-left text-uppercase">Add Services</h5>
										<div className="float-right">
													<Link to="all-questions" className="btn btn-primary">Services</Link>
													</div>
									</div>
								<form onSubmit={addData} enctype="multipart/form-data">
								
											<div className="row">
												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Service Title</label>
														<input type="text" 
														name="serviceTitle"
														className="form-control" 
														placeholder="Enter  Title" 
														value={title}
														onChange={(e)=>setTitle(e.target.value)}
														required
														/>
													</div>
													
												</div>
												
												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Services Tags</label>
														<input type="text" 
														name="tag"
														className="form-control tags_input" 
														value={tag}
														onChange={(e)=>setTag(e.target.value)}
														required
														/>
														
													</div>
												</div>
                                                <div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Service Price</label>
														<input type="text" 
														name="servicePrice"
														className="form-control tags_input"
														value={amount}
														onChange={(e)=>setAmount(e.target.value)}
														required
														 />
														
													</div>
												</div>
                                                <div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Service Location</label>
														<input type="text" 
														name="serviceLocation"
														className="form-control tags_input"
														value={location}
														onChange={(e)=>setLocation(e.target.value)}
														required
														/>
														
													</div>
												</div>
												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Delivery Method</label>
														<Form.Control as="select" custom 
														name="method"
														className="custom-select"
														value={deliveryMethod}
														onChange={(e)=>setDeliveryMethod(e.target.value)}
														required
														>
															<option value="method 1">Method 1</option>
															<option value="method 2">Method 2</option>
															
														</Form.Control>
													</div>
												</div>
										
												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Description:</label>
														<ReactQuill value={detailsValue || ''}
                  onChange={(e)=>{setDetailsValue(e)}} style={{height:'200px', paddingBottom:'70px'}} />
									
 
													</div>
												</div>
												
											
												
												{/* <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Upload Picture</label>
                            <div className="custom-file  p-5">
                              <p className="m-a0">
                                <i className="fa fa-upload"></i>
                                Upload File
                              </p> 
                              <input
                                type="file"
                                className="site-button form-control"
                                id="customFile"
                                onChange={(e)=>setAttachFile(e.target.files[0])}
                              />
                            </div>
                          </div>
                        </div> */}
                                                
											</div>
											<button type="submit" className="site-button m-b30 m-t20">Publish</button>
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
export default AddServices; 