import React,{useEffect,useState} from 'react';
import Loader from "react-loader-spinner";
import Select from 'react-select'
import $ from 'jquery';
import { Link} from 'react-router-dom';
import Slider from 'react-rangeslider'


import 'react-rangeslider/lib/index.css'
const Result=() =>{

  const [load,setLoad]=useState(true)
  const [volume,setVolume]=useState(0);

  // slider rage start
  const handleOnChange = (value) => {
    console.log(value)
    setVolume(value)
  }
  // slider rage end
 useEffect(()=>{

  
  setTimeout(() => {
     setLoad(false)
   }, 2000);
 },[]);

//  category option start
const categoriesData = [










  { value: 'Admin Support', label: 'Admin Support' },
  { value: 'Customer Service', label: 'Customer Service' },
  { value: 'Data Analytics', label: 'Data Analytics' },
  { value: 'Design &amp; Creative', label: 'Design &amp; Creative' },
  { value: 'Legal', label: 'Legal' },
  { value: 'Software Developing', label: 'Software Developing' },
  { value: 'IT &amp; Networking', label: 'IT &amp; Networking' },
  { value: 'Writing', label: 'Writing' },
  { value: 'Translation', label: 'Translation' },
  { value: 'Sales &amp; Marketing', label: 'Sales &amp; Marketing' },

 
]
//  category option end
 if(load===true){
return(
  <>
   <Loader
        type="Circles"
        color="#00BFFF"
        height={100}
        width={100}
        
        className="loader"
        
      />
  </>
) 
}
 else{
    return (
        <>
            
        {/* Wrapper */}
        <div id="wrapper">
 
        {/* Page Content
================================================== */}
        <div className="full-page-container">
          <div className="full-page-sidebar">
            <div className="full-page-sidebar-inner" data-simplebar>
              <div className="sidebar-container">
                {/* Location */}
                <div className="sidebar-widget">
                  <h3>Location</h3>
                  <div className="input-with-icon">
                    <div id="autocomplete-container">
                      <input id="autocomplete-input" type="text" placeholder="Location" />
                    </div>
                    <i className="icon-material-outline-location-on" />
                  </div>
                </div>
                {/* Category */}
                <div className="sidebar-widget">
                  <h3>Category</h3>
                <Select
                 className="selectpicker default"
                  isSearchable={false}
                   options={categoriesData} 
                   isMulti={true}
                   />

        
                </div>
                {/* Keywords */}
                <div className="sidebar-widget">
                  <h3>Keywords</h3>
                  <div className="keywords-container">
                    <div className="keyword-input-container">
                      <input type="text" className="keyword-input" placeholder="e.g. task title" />
                      <button className="keyword-input-button ripple-effect"><i className="icon-material-outline-add" /></button>
                    </div>
                    <div className="keywords-list">{/* keywords go here */}</div>
                    <div className="clearfix" />
                  </div>
                </div>
                {/* Hourly Rate */}
                <div className="sidebar-widget">
                  <h3>Hourly Rate</h3>
                  <div className="margin-top-55 col-md-12" style={{width:'100%'}} />
                  {/* Range Slider */}
                  <Slider
        value={volume}
        orientation="horizontal"
        onChange={e => handleOnChange(e)}
        max={100}
        min={0}
        className="range-slider"
      />
                  <input className="range-slider" type="text" defaultValue data-slider-currency="$" data-slider-min={10} data-slider-max={250} data-slider-step={5} data-slider-value="[10,250]" />
                </div>
                {/* Tags */}
                <div className="sidebar-widget">
                  <h3>Skills</h3>
                  <div className="tags-container">
                    <div className="tag">
                      <input type="checkbox" id="tag1" />
                      <label htmlFor="tag1">front-end dev</label>
                    </div>
                    <div className="tag">
                      <input type="checkbox" id="tag2" />
                      <label htmlFor="tag2">angular</label>
                    </div>
                    <div className="tag">
                      <input type="checkbox" id="tag3" />
                      <label htmlFor="tag3">react</label>
                    </div>
                    <div className="tag">
                      <input type="checkbox" id="tag4" />
                      <label htmlFor="tag4">vue js</label>
                    </div>
                    <div className="tag">
                      <input type="checkbox" id="tag5" />
                      <label htmlFor="tag5">web apps</label>
                    </div>
                    <div className="tag">
                      <input type="checkbox" id="tag6" />
                      <label htmlFor="tag6">design</label>
                    </div>
                    <div className="tag">
                      <input type="checkbox" id="tag7" />
                      <label htmlFor="tag7">wordpress</label>
                    </div>
                  </div>
                  <div className="clearfix" />
                  {/* More Skills */}
                  <div className="keywords-container margin-top-20">
                    <div className="keyword-input-container">
                      <input type="text" className="keyword-input" placeholder="add more skills" />
                      <button className="keyword-input-button ripple-effect"><i className="icon-material-outline-add" /></button>
                    </div>
                    <div className="keywords-list">{/* keywords go here */}</div>
                    <div className="clearfix" />
                  </div>
                </div>
                <div className="clearfix" />
                <div className="margin-bottom-40" />
              </div>
              {/* Sidebar Container / End */}
              {/* Search Button */}
              <div className="sidebar-search-button-container">
                <button className="button ripple-effect">Search</button>
              </div>
              {/* Search Button / End*/}
            </div>
          </div>
          {/* Full Page Sidebar / End */}
          {/* Full Page Content */}
          <div className="full-page-content-container" data-simplebar>
            <div className="full-page-content-inner">
              <h3 className="page-title">Search Results</h3>
              <div className="notify-box margin-top-15">
                <div className="switch-container">
                  <label className="switch"><input type="checkbox" /><span className="switch-button" /><span className="switch-text">Turn on email alerts for this search</span></label>
                </div>
                <div className="sort-by">
                  <span>Sort by:</span>
                  
                  <select className="custom-sort">
                    <option>Relevance</option>
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Random</option>
                  </select>
                </div>
              </div>
              {/* Freelancers List Container */}
              <div className="freelancers-container freelancers-grid-layout margin-top-35">
                {/*Freelancer */}
                <div className="freelancer">
                  {/* Overview */}
                  <div className="freelancer-overview">
                    <div className="freelancer-overview-inner">
                      {/* Bookmark Icon */}
                      <span className="bookmark-icon" />
                      {/* Avatar */}
                      <div className="freelancer-avatar">
                        <div className="verified-badge" />
                        <a href="single-freelancer-profile.html"><img src="images/user-avatar-big-01.jpg" alt="" /></a>
                      </div>
                      {/* Name */}
                      <div className="freelancer-name">
                        <h4><a href="single-freelancer-profile.html">Tom Smith <img className="flag" src="images/flags/gb.svg" alt="" title="United Kingdom" data-tippy-placement="top" /></a></h4>
                        <span>UI/UX Designer</span>
                      </div>
                      {/* Rating */}
                      <div className="freelancer-rating">
                        <div className="star-rating" data-rating="4.9" />
                      </div>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="freelancer-details">
                    <div className="freelancer-details-list">
                      <ul>
                        <li>Location <strong><i className="icon-material-outline-location-on" /> London</strong></li>
                        <li>Rate <strong>$60 / hr</strong></li>
                        <li>Job Success <strong>95%</strong></li>
                      </ul>
                    </div>
                    <Link to="/profile" className="button button-sliding-icon ripple-effect">View Profile <i className="icon-material-outline-arrow-right-alt" /></Link>
                  </div>
                </div>
                {/* Freelancer / End */}
                {/*Freelancer */}
                <div className="freelancer">
                  {/* Overview */}
                  <div className="freelancer-overview">
                    <div className="freelancer-overview-inner">
                      {/* Bookmark Icon */}
                      <span className="bookmark-icon" />
                      {/* Avatar */}
                      <div className="freelancer-avatar">
                        <div className="verified-badge" />
                        <a href="single-freelancer-profile.html"><img src="images/user-avatar-big-02.jpg" alt="" /></a>
                      </div>
                      {/* Name */}
                      <div className="freelancer-name">
                        <h4><a href="#">David Peterson <img className="flag" src="images/flags/de.svg" alt="" title="Germany" data-tippy-placement="top" /></a></h4>
                        <span>iOS Expert + Node Dev</span>
                      </div>
                      {/* Rating */}
                      <div className="freelancer-rating">
                        <div className="star-rating" data-rating="4.2" />
                      </div>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="freelancer-details">
                    <div className="freelancer-details-list">
                      <ul>
                        <li>Location <strong><i className="icon-material-outline-location-on" /> Berlin</strong></li>
                        <li>Rate <strong>$40 / hr</strong></li>
                        <li>Job Success <strong>88%</strong></li>
                      </ul>
                    </div>
                    <Link to="/profile" className="button button-sliding-icon ripple-effect">View Profile <i className="icon-material-outline-arrow-right-alt" /></Link>
                  </div>
                </div>
                {/* Freelancer / End */}
                {/*Freelancer */}
                <div className="freelancer">
                  {/* Overview */}
                  <div className="freelancer-overview">
                    <div className="freelancer-overview-inner">
                      {/* Bookmark Icon */}
                      <span className="bookmark-icon" />
                      {/* Avatar */}
                      <div className="freelancer-avatar">
                        <a href="single-freelancer-profile.html"><img src="images/user-avatar-placeholder.png" alt="" /></a>
                      </div>
                      {/* Name */}
                      <div className="freelancer-name">
                        <h4><a href="#">Marcin Kowalski <img className="flag" src="images/flags/pl.svg" alt="" title="Poland" data-tippy-placement="top" /></a></h4>
                        <span>Front-End Developer</span>
                      </div>
                      {/* Rating */}
                      <span className="company-not-rated margin-bottom-5">Minimum of 3 votes required</span>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="freelancer-details">
                    <div className="freelancer-details-list">
                      <ul>
                        <li>Location <strong><i className="icon-material-outline-location-on" /> Warsaw</strong></li>
                        <li>Rate <strong>$50 / hr</strong></li>
                        <li>Job Success <strong>100%</strong></li>
                      </ul>
                    </div>
                    <Link to="/profile" className="button button-sliding-icon ripple-effect">View Profile <i className="icon-material-outline-arrow-right-alt" /></Link>
                  </div>
                </div>
                {/* Freelancer / End */}
                {/*Freelancer */}
                <div className="freelancer">
                  {/* Overview */}
                  <div className="freelancer-overview">
                    <div className="freelancer-overview-inner">
                      {/* Bookmark Icon */}
                      <span className="bookmark-icon" />
                      {/* Avatar */}
                      <div className="freelancer-avatar">
                        <div className="verified-badge" />
                        <a href="single-freelancer-profile.html"><img src="images/user-avatar-big-03.jpg" alt="" /></a>
                      </div>
                      {/* Name */}
                      <div className="freelancer-name">
                        <h4><a href="#">Sindy Forest <img className="flag" src="images/flags/au.svg" alt="" title="Australia" data-tippy-placement="top" /></a></h4>
                        <span>Magento Certified Developer</span>
                      </div>
                      {/* Rating */}
                      <div className="freelancer-rating">
                        <div className="star-rating" data-rating={5.0} />
                      </div>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="freelancer-details">
                    <div className="freelancer-details-list">
                      <ul>
                        <li>Location <strong><i className="icon-material-outline-location-on" /> Brisbane</strong></li>
                        <li>Rate <strong>$70 / hr</strong></li>
                        <li>Job Success <strong>100%</strong></li>
                      </ul>
                    </div>
                    <Link to="/profile" className="button button-sliding-icon ripple-effect">View Profile <i className="icon-material-outline-arrow-right-alt" /></Link>
                  </div>
                </div>
                {/* Freelancer / End */}
                {/*Freelancer */}
                <div className="freelancer">
                  {/* Overview */}
                  <div className="freelancer-overview">
                    <div className="freelancer-overview-inner">
                      {/* Bookmark Icon */}
                      <span className="bookmark-icon" />
                      {/* Avatar */}
                      <div className="freelancer-avatar">
                        <a href="single-freelancer-profile.html"><img src="images/user-avatar-placeholder.png" alt="" /></a>
                      </div>
                      {/* Name */}
                      <div className="freelancer-name">
                        <h4><a href="#">Sebastiano Piccio <img className="flag" src="images/flags/it.svg" alt="" title="Italy" data-tippy-placement="top" /></a></h4>
                        <span>Laravel Dev</span>
                      </div>
                      {/* Rating */}
                      <div className="freelancer-rating">
                        <div className="star-rating" data-rating="4.5" />
                      </div>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="freelancer-details">
                    <div className="freelancer-details-list">
                      <ul>
                        <li>Location <strong><i className="icon-material-outline-location-on" /> Milan</strong></li>
                        <li>Rate <strong>$80 / hr</strong></li>
                        <li>Job Success <strong>89%</strong></li>
                      </ul>
                    </div>
                    <Link to="/profile" className="button button-sliding-icon ripple-effect">View Profile <i className="icon-material-outline-arrow-right-alt" /></Link>
                  </div>
                </div>
                {/* Freelancer / End */}
                {/*Freelancer */}
                <div className="freelancer">
                  {/* Overview */}
                  <div className="freelancer-overview">
                    <div className="freelancer-overview-inner">
                      {/* Bookmark Icon */}
                      <span className="bookmark-icon" />
                      {/* Avatar */}
                      <div className="freelancer-avatar">
                        <a href="single-freelancer-profile.html"><img src="images/user-avatar-placeholder.png" alt="" /></a>
                      </div>
                      {/* Name */}
                      <div className="freelancer-name">
                        <h4><a href="#">Gabriel Lagueux <img className="flag" src="images/flags/fr.svg" alt="" title="France" data-tippy-placement="top" /></a></h4>
                        <span>WordPress Expert</span>
                      </div>
                      {/* Rating */}
                      <div className="freelancer-rating">
                        <div className="star-rating" data-rating={5.0} />
                      </div>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="freelancer-details">
                    <div className="freelancer-details-list">
                      <ul>
                        <li>Location <strong><i className="icon-material-outline-location-on" /> Paris</strong></li>
                        <li>Rate <strong>$50 / hr</strong></li>
                        <li>Job Success <strong>100%</strong></li>
                      </ul>
                    </div>
                    <Link to="/profile" className="button button-sliding-icon ripple-effect">View Profile <i className="icon-material-outline-arrow-right-alt" /></Link>
                  </div>
                </div>
                {/* Freelancer / End */}
              </div>
              {/* Freelancers Container / End */}
              {/* Pagination */}
              <div className="clearfix" />
              <div className="pagination-container margin-top-20 margin-bottom-20">
                <nav className="pagination">
                  <ul>
                    <li className="pagination-arrow"><a href="#" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-left" /></a></li>
                    <li><a href="#" className="ripple-effect">1</a></li>
                    <li><a href="#" className="ripple-effect current-page">2</a></li>
                    <li><a href="#" className="ripple-effect">3</a></li>
                    <li><a href="#" className="ripple-effect">4</a></li>
                    <li className="pagination-arrow"><a href="#" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-right" /></a></li>
                  </ul>
                </nav>
              </div>
              <div className="clearfix" />
              {/* Pagination / End */}
              {/* Footer */}
              <div className="small-footer margin-top-15">
                <div className="small-footer-copyrights">
                  © 2019 <strong>Hireo</strong>. All Rights Reserved.
                </div>
                <ul className="footer-social-links">
                  <li>
                    <a href="#" title="Facebook" data-tippy-placement="top">
                      <i className="icon-brand-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title="Twitter" data-tippy-placement="top">
                      <i className="icon-brand-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title="Google Plus" data-tippy-placement="top">
                      <i className="icon-brand-google-plus-g" />
                    </a>
                  </li>
                  <li>
                    <a href="#" title="LinkedIn" data-tippy-placement="top">
                      <i className="icon-brand-linkedin-in" />
                    </a>
                  </li>
                </ul>
                <div className="clearfix" />
              </div>
              {/* Footer / End */}
            </div>
          </div>
          {/* Full Page Content / End */}
        </div>
      </div>
      {/* Wrapper / End */}
        </>
    )
}
}

export default Result
