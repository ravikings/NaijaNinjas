import React,{useState,useEffect} from 'react';
import {Link,useHistory,useParams} from 'react-router-dom';
import Header2 from '../../Layout/Header2';
import Footer from '../../Layout/Footer';
import {Form}  from 'react-bootstrap';  
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import ProfileSidebar from "../../Element/Profilesidebar";
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";


function UpdateServices (){
    var {id}= useParams();
	const history = useHistory();
	const baseURL= `http://127.0.0.1:8000/`;
	let token = `Bearer ` + localStorage.getItem("access_token");
	let userId = parseInt(localStorage.getItem("userID"));
	const [data,setData]= useState([]);
	const [detailsValue,setDetailsValue]= useState();
	const [attachFile,setAttachFile]= useState(null);
	const [title,setTitle]=useState('');
	const [amount,setAmount]=useState('');
	const [location,setLocation]=useState('');
	const [tag,setTag]=useState('');
	const [deliveryMethod,setDeliveryMethod]=useState('');
	const [loading, setLoading] = useState(false);
    const formData=()=>{
        setLoading(true)
		axios({
			method: 'GET',
			url: `${baseURL}api/v1/account/professional-services/${id}`,
		   
			
			})
			.then((res) => {
		  console.log(res?.data.tag)
                setData(res?.data)
            // setDetailsValue(res?.data?.description)
            // setAttachFile(res?.data?.image)
            // setTitle(res?.data?.title)
            // setAmount(res?.data?.amount)
            // setLocation(res?.data?.location)
            // setTag(res?.data?.tag)
            // setDeliveryMethod(res?.data?.delivery_method)
		  setLoading(false)
		  })
		  .catch((e) => {
			if (e.response?.status === 400) {
			console.log(e?.response?.data?.non_field_errors[0]);
			} else {
			  console.log("Unknown Error");
			}
		  });
    }
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
			  if(attachFile !=null){

				  formdata.append("image",attachFile);
			  }
			
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
				history.push('/user-services')
				
			  }
					
			 
				  }, (error) => {
					console.log(error);
				  
				  });
	  }
      useEffect(()=>{
        formData();
      },[])
	return(
		<>
			<Header2 />
			<div className="page-content bg-white">
				<div className="content-block">
					<div className="section-full bg-white p-t50 p-b20">
						<div className="container">
							<div className="row">
							<ProfileSidebar active={"services"} />
							{!loading ?
								<div className="col-xl-9 col-lg-8 m-b30 browse-job">
								<div className="job-bx-title  clearfix">
										<h5 className="font-weight-700 pull-left text-uppercase">Add Services</h5>
										<div className="float-right">
										<Link
                        to={"/user-services"}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
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
														value={title || data.title}
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
												
											
												
												<div className="col-lg-12 col-md-12">
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
                        </div>
                                                
											</div>
											<button type="submit" className="site-button m-b30 m-t20">Publish</button>
										</form>
								</div>
								: 
								<div className='loader'>
								<ClipLoader
								color={"#2e55fa"}
								loading={true}
								size={150}
								/> 
								</div>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />	
		</>
	)
}
export default UpdateServices; 