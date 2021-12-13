import React,{useState,useEffect} from 'react'
import DashboardFooter from '../../layout/dashboard/DashboardFooter'
import {  NavLink } from 'react-router-dom';
export default function PostTask() {
    
    return (
        <>
         <div className="dashboard-content-container" data-simplebar>
        <div className="dashboard-content-inner">
          {/* Market Place Headline */}
          <div className="dashboard-headline">
            <h3>Post a Task</h3>
            {/* Breadcrumbs */}
            <nav id="breadcrumbs" className="dark">
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Market Place</a></li>
                <li>Post a Task</li>
              </ul>
            </nav>
          </div>
          {/* Row */}
          <div className="row">
            {/* Market Place Box */}
            <div className="col-xl-12">
              <div className="dashboard-box margin-top-0">
                {/* Headline */}
                <div className="headline">
                  <h3><i className="icon-feather-folder-plus" /> Task Submission Form</h3>
                </div>
                <div className="content with-padding padding-bottom-10">
                  <div className="row">
                    <div className="col-xl-4">
                      <div className="submit-field">
                        <h5>Project Name</h5>
                        <input type="text" className="with-border" placeholder="e.g. build me a website" />
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="submit-field">
                        <h5>Category</h5>
                        <select className="my-cat with-border" data-size={7} title="Select Category">
                          <option>Admin Support</option>
                          <option>Customer Service</option>
                          <option>Data Analytics</option>
                          <option>Design &amp; Creative</option>
                          <option>Legal</option>
                          <option>Software Developing</option>
                          <option>IT &amp; Networking</option>
                          <option>Writing</option>
                          <option>Translation</option>
                          <option>Sales &amp; Marketing</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="submit-field">
                        <h5>Location  <i className="help-icon" data-tippy-placement="right" title="Leave blank if it's an online job" /></h5>
                        <div className="input-with-icon">
                          <div id="autocomplete-container">
                            <input id="autocomplete-input" className="with-border" type="text" placeholder="Anywhere" />
                          </div>
                          <i className="icon-material-outline-location-on" />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="submit-field">
                        <h5>What is your estimated budget?</h5>
                        <div className="row">
                          <div className="col-xl-6">
                            <div className="input-with-icon">
                              <input className="with-border" type="text" placeholder="Minimum" />
                              <i className="currency">USD</i>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="input-with-icon">
                              <input className="with-border" type="text" placeholder="Maximum" />
                              <i className="currency">USD</i>
                            </div>
                          </div>
                        </div>
                        <div className="feedback-yes-no margin-top-0">
                          <div className="radio">
                            <input id="radio-1" name="radio" type="radio" defaultChecked />
                            <label htmlFor="radio-1"><span className="radio-label" /> Fixed Price Project</label>
                          </div>
                          <div className="radio">
                            <input id="radio-2" name="radio" type="radio" />
                            <label htmlFor="radio-2"><span className="radio-label" /> Hourly Project</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="submit-field">
                        <h5>What skills are required? <i className="help-icon" data-tippy-placement="right" title="Up to 5 skills that best describe your project" /></h5>
                        <div className="keywords-container">
                          <div className="keyword-input-container">
                            <input type="text" className="keyword-input with-border" placeholder="Add Skills" />
                            <button className="keyword-input-button ripple-effect"><i className="icon-material-outline-add" /></button>
                          </div>
                          <div className="keywords-list">{/* keywords go here */}</div>
                          <div className="clearfix" />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="submit-field">
                        <h5>Describe Your Project</h5>
                        <textarea cols={30} rows={5} className="with-border" defaultValue={""} />
                        <div className="uploadButton margin-top-30">
                          <input className="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload" multiple />
                          <label className="uploadButton-button ripple-effect" htmlFor="upload">Upload Files</label>
                          <span className="uploadButton-file-name">Images or documents that might be helpful in describing your project</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <a href="#" className="button ripple-effect big margin-top-30"><i className="icon-feather-plus" /> Post a Task</a>
            </div>
          </div>
          {/* Row / End */}
          {/* Footer */}
        <DashboardFooter />
          {/* Footer / End */}
        </div>
      </div>
        </>
    )
}
