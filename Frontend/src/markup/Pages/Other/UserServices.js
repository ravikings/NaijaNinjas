import React,{useState, useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import Header2 from '../../Layout/Header2';
import Footer from '../../Layout/Footer';
import axios from 'axios';
import ProfileSidebar from "../../Element/Profilesidebar";
import { Modal } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";

function UserServices (){
	const [data,setData]=useState([])
	const [viewData,setViewData]=useState([])
	const [company, setCompany] = useState(false);
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const baseURL= `http://127.0.0.1:8000/`;
	let token = `Bearer ` + localStorage.getItem("access_token");
	let userId = parseInt(localStorage.getItem("userID"));

	const allData=()=>{
		setLoading(true)
		axios({
			method: 'GET',
			url: `${baseURL}api/v1/account/professional-services/`,
		   
			
			})
			.then((res) => {
		//   console.log(res)
		  setData(res.data.results);
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
	// delete item start
	const deleteData = (e)=>{
		
		axios({
			method: 'DELETE',
			url: `${baseURL}api/v1/account/professional-services/${e}`,
		   
			headers: {
		  
			  Authorization: token,
		  
			},
			})
			.then((response) => {
			 
				allData();
			  
			}, (error) => {
			  console.log(error);
			
			});
	}
	// delete item end
useEffect(()=>{
allData();
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
								<div className="col-xl-9 col-lg-8 m-b30 browse-job">
								<div className="job-bx clearfix">
										<div className="job-bx-title clearfix">
											<h5 className="font-weight-700 pull-left text-uppercase">Services</h5>
											<Link to={"/company-manage-job"} className="site-button right-arrow button-sm float-right">Back</Link>
										</div>
										{!loading ?
										
										<ul className="post-job-bx browse-job-grid post-resume row">
											{data?.map((item,index)=>(
												<li className="col-lg-6 col-md-6" key={index}>
													<div className="post-bx">
														<div className="d-flex m-b20">
															<div className="job-post-info">
																<h5 className="m-b0"><Link to={"/jobs-profile"}>{item.title}</Link></h5>
																<p className="m-b5 font-13">
																	<Link to={"#"} className="text-primary">UX / UI Designer </Link>
																	at Atract Solutions</p>
																<ul>
																	<li><i className="fa fa-map-marker"></i>{item?.location}</li>
																	<li><i className="fa fa-money"></i> $ {item?.amount}</li>
																</ul>

															</div>
															
														</div>
														<div className="service-tag m-t15 m-b10">
															{item?.tag?.split(',')?.map((e)=>(

															<Link to={"#"} className="mr-1"><span>{e}</span></Link>
															))}
														
														</div>
														{/* <Link to={"/files/pdf-sample.pdf"} target="blank" className="job-links">
															<i className="fa fa-pencil"></i>
														</Link> */}
														<button   onClick={()=>deleteData(item.id)}  className="btn rounded btn-danger float-right mr-2">
															<i className="fa fa-trash"></i>
														</button>
														<Link    to={`/update-services/${item.id}`}  className="btn rounded btn-primary float-right mr-2">
															<i className="fa fa-pencil"></i>
														</Link>
														<button   onClick={()=>{setViewData(item); setCompany(true);}}  className="btn rounded btn-info float-right mr-2">
															<i className="fa fa-eye"></i>
														</button>
													</div>
												</li>
											))}
											
										</ul>
										: 
										<div className='loader'>
										<ClipLoader
										color={"#2e55fa"}
										loading={true}
										size={150}
										/> 
										</div>
									}
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
			<Modal
                      show={company}
                      onHide={setCompany}
                      className='modal fade modal-bx-info'
                    >
                      <div className='' role='document'>
                        <div className='modal-content'>
                          <div className='modal-header'>
                            <div className='logo-img'>
                              <img
                                alt=''
                                src={require("../../../images/logo/icon2.png")}
                              />
                            </div>
                            <h5 className='modal-title'>Services  Details</h5>

                            <button
                              type='button'
                              className='close'
                              onClick={() => setCompany(false)}
                            >
                              <span aria-hidden='true'>&times;</span>
                            </button>
                          </div>
                          <div className='modal-body'>
                           <img src={viewData.image} />
						    <ul>
                           
   
                              <li>
                                <strong>Job Title :</strong>
                                <p> {viewData?.title} </p>
                              </li>
                              <li>
                                <strong>Date :</strong>
                                <p> {viewData?.created || viewData?.updated} </p>
                              </li>
                              <li>
                                <strong>Amount :</strong>
                                <p> ${viewData?.amount} </p>
                              </li>
                              <li>
                                <strong>Location :</strong>
                                <p>{viewData?.location}</p>
                              </li>
                              <li >
                                <strong style={{width:'30%'}}>Delivery Method :</strong>
                                <p>{viewData?.delivery_method}</p>
                              </li>
                            
                             
                              <li>
                                <strong>Deseription :</strong>
                                <p dangerouslySetInnerHTML={{__html:viewData?.description}} />
                                  
                              </li>
                              <li>
                                <strong>Tags :</strong>
                                <p>
                                  {viewData?.tag}
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div className='modal-footer'>
                            <button
                              type='button'
                              className='btn btn-secondary'
                              onClick={() => setCompany(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
			<Footer />	
		</>
	)
}
export default UserServices; 