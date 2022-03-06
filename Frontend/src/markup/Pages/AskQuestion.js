import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Header2 from './../Layout/Header2';
import Footer from './../Layout/Footer';
import {Form}  from 'react-bootstrap';  
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ProfileSidebar from "./../Element/Profilesidebar";
const postBlog = [
	{ title: 'PHP Web Developer', },
	{ title: 'Software Developer', },
	{ title: 'Branch Credit Manager', },
]

function AskQuestion (){
	const [detailsValue,setDetailsValue]= useState();
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
										<h5 className="font-weight-700 pull-left text-uppercase">Ask a Question</h5>
										<div className="float-right">
													<Link to="all-questions" className="btn btn-primary">Previous Question</Link>
													</div>
									</div>
								<form>
											<div className="row">
												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Question Title</label>
														<input type="text" className="form-control" placeholder="Enter Job Title" />
													</div>
													
												</div>
												
												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Question Tags</label>
														<input type="text" className="form-control tags_input" />
														
													</div>
												</div>
												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Question Category</label>
														<Form.Control as="select" custom className="custom-select">
															<option>Communcation</option>
															<option>Company</option>
															<option>Language</option>
															<option>Freelance</option>
														</Form.Control>
													</div>
												</div>
											{/* shoaibghulam */}
												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Details:</label>
                                                        <Editor
  editorState={detailsValue}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  onEditorStateChange={(e)=>setDetailsValue(e)}
/>;
													</div>
												</div>
												
											
												
												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Upload File</label>
														<div className="custom-file">
															<p className="m-a0">
																<i className="fa fa-upload"></i>
																Upload File
															</p>
															<input type="file" className="site-button form-control" id="customFile" />
														</div>
													</div>
												</div>
											</div>
											<button type="button" className="site-button m-b30">Publish</button>
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
export default AskQuestion; 