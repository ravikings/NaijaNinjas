import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Header2 from "../../Layout/Header2";
import Footer from "../../Layout/Footer";
import { Form } from "react-bootstrap";
import ProfileSidebar from "../../Element/Profilesidebar";
import axios from 'axios';
function Componypostjobs() {
  const [title,setTitle]=useState('');
  const [sector,setSector]=useState('');
  const [minimumSalary,setMinimumSalary]=useState('');
  const [maximumSalary,setMaximumSalary]=useState('');
  const [region,setRegion]=useState('');
  const [location,setLocation]=useState('');
  const [department,setDepartment]=useState('');
  const [description,setDescription]=useState('');
  const [tags,setTags]=useState('');
  const [category,setCategory]=useState('');
  const [postStatus,setPostStatus]=useState('');
  const [author,setAuthor]=useState('');
const addData=(e)=>{
  e.preventDefault();
  alert("done")
}
  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <ProfileSidebar showManageProp={true} active={"Post a job"} />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Post A Job
                      </h5>
                      <Link
                        to={"/company-profile"}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>
                    <form onSubmit={addData}>
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Job Title</label>
                            
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Job Title"
                              onChange={(e)=>setTitle(e.target.value)}
                              value={title}
                            />
                          </div>
                        </div>
                      
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Job Tags</label>
                            <input
                              type="text"
                              className="form-control tags_input"
                              onChange={(e)=>setTags(e.target.value)}
                              value={tags}
                              />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Job Type</label>
                            <Form.Control
                              as="select"
                              custom
                              className="custom-select"
                              onChange={(e)=>setCategory(e.target.value)}
                              value={category}
                            >
                              <option value="FUll Time">Full Time</option>
                              <option value="Part Time">Part Time</option>
                              <option value="Internship">Internship</option>
                              <option value="Freelance">Freelance</option>
                            </Form.Control>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Experience</label>
                            <Form.Control
                              as="select"
                              custom
                              className="custom-select"
                              onChange={(e)=>setCategory(e.target.value)}
                              value={category}
                            >
                              <option>1 Years</option>
                              <option>2 Years</option>
                              <option>3 Years</option>
                              <option>4 Years</option>
                              <option>5 Years</option>
                            </Form.Control>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Minimum Salary ($):</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="e.g. 10000"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Maximum Salary ($):</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g. 20000"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Region</label>
                            <Form.Control
                              as="select"
                              custom
                              className="custom-select"
                            >
                              <option>New York</option>
                              <option>London</option>
                              <option>Los Angeles</option>
                            </Form.Control>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Location</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="London"
                            />
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
                              <input
                                type="file"
                                className="site-button form-control"
                                id="customFile"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <button type="button" className="site-button m-b30">
                        Upload
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Componypostjobs;
