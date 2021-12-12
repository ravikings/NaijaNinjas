import React,{useEffect} from 'react';
import GoogleMap from 'google-map-react';

import $ from 'jquery';

const Result=() =>{
  
  useEffect(()=>{

$('.enable-filters-button').on('click', function(){
  $('.full-page-sidebar').toggleClass("enabled-sidebar");
  $(this).toggleClass("active");
  $('.filter-button-tooltip').removeClass('tooltip-visible');
});
  },[])
    return (
        <>
        <script src="%PUBLIC_URL%/js/custom.js"></script>
         <div className="full-page-container with-map">
        <div className="full-page-sidebar hidden-sidebar">
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
              {/* Keywords */}
              <div className="sidebar-widget">
                <h3>Keywords</h3>
                <div className="keywords-container">
                  <div className="keyword-input-container">
                    <input type="text" className="keyword-input" placeholder="e.g. job title" />
                    <button className="keyword-input-button ripple-effect"><i className="icon-material-outline-add" /></button>
                  </div>
                  <div className="keywords-list">{/* keywords go here */}</div>
                  <div className="clearfix" />
                </div>
              </div>
              {/* Category */}
              <div className="sidebar-widget">
                <h3>Category</h3>
                <select className="selectpicker default" multiple data-selected-text-format="count" data-size={7} title="All Categories">
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
              {/* Job Types */}
              <div className="sidebar-widget">
                <h3>Job Type</h3>
                <div className="switches-list">
                  <div className="switch-container">
                    <label className="switch"><input type="checkbox" /><span className="switch-button" /> Freelance</label>
                  </div>
                  <div className="switch-container">
                    <label className="switch"><input type="checkbox" /><span className="switch-button" /> Full Time</label>
                  </div>
                  <div className="switch-container">
                    <label className="switch"><input type="checkbox" /><span className="switch-button" /> Part Time</label>
                  </div>
                  <div className="switch-container">
                    <label className="switch"><input type="checkbox" /><span className="switch-button" /> Internship</label>
                  </div>
                  <div className="switch-container">
                    <label className="switch"><input type="checkbox" /><span className="switch-button" /> Temporary</label>
                  </div>
                </div>
              </div>
              {/* Salary */}
              <div className="sidebar-widget">
                <h3>Salary</h3>
                <div className="margin-top-55" />
                {/* Range Slider */}
                <input className="range-slider" type="text" defaultValue data-slider-currency="$" data-slider-min={1500} data-slider-max={15000} data-slider-step={100} data-slider-value="[1500,15000]" />
              </div>
              {/* Tags */}
              <div className="sidebar-widget">
                <h3>Tags</h3>
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
              </div>
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
                <select className="selectpicker hide-tick">
                  <option>Relevance</option>
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Random</option>
                </select>
              </div>
            </div>
            <div className="listings-container compact-list-layout margin-top-35 margin-bottom-25">
              {/* Job Listing */}
              <a href="single-job-page.html" className="job-listing">
                {/* Job Listing Details */}
                <div className="job-listing-details">
                  {/* Logo */}
                  <div className="job-listing-company-logo">
                    <img src="images/company-logo-01.png" alt="" />
                  </div>
                  {/* Details */}
                  <div className="job-listing-description">
                    <h3 className="job-listing-title">Bilingual Event Support Specialist</h3>
                    {/* Job Listing Footer */}
                    <div className="job-listing-footer">
                      <ul>
                        <li><i className="icon-material-outline-business" /> Hexagon <div className="verified-badge" title="Verified Employer" data-tippy-placement="top" /></li>
                        <li><i className="icon-material-outline-location-on" /> San Francisco</li>
                        <li><i className="icon-material-outline-business-center" /> Full Time</li>
                        <li><i className="icon-material-outline-access-time" /> 2 days ago</li>
                      </ul>
                    </div>
                  </div>
                  {/* Bookmark */}
                  <span className="bookmark-icon" />
                </div>
              </a>	
              {/* Job Listing */}
              <a href="single-job-page.html" className="job-listing">
                {/* Job Listing Details */}
                <div className="job-listing-details">
                  {/* Logo */}
                  <div className="job-listing-company-logo">
                    <img src="images/company-logo-05.png" alt="" />
                  </div>
                  {/* Details */}
                  <div className="job-listing-description">
                    <h3 className="job-listing-title">Competition Law Officer</h3>
                    {/* Job Listing Footer */}
                    <div className="job-listing-footer">
                      <ul>
                        <li><i className="icon-material-outline-business" /> Laxo</li>
                        <li><i className="icon-material-outline-location-on" /> San Francisco</li>
                        <li><i className="icon-material-outline-business-center" /> Full Time</li>
                        <li><i className="icon-material-outline-access-time" /> 2 days ago</li>
                      </ul>
                    </div>
                  </div>
                  {/* Bookmark */}
                  <span className="bookmark-icon" />
                </div>
              </a>
              {/* Job Listing */}
              <a href="single-job-page.html" className="job-listing">
                {/* Job Listing Details */}
                <div className="job-listing-details">
                  {/* Logo */}
                  <div className="job-listing-company-logo">
                    <img src="images/company-logo-02.png" alt="" />
                  </div>
                  {/* Details */}
                  <div className="job-listing-description">
                    <h3 className="job-listing-title">Barista and Cashier</h3>
                    {/* Job Listing Footer */}
                    <div className="job-listing-footer">
                      <ul>
                        <li><i className="icon-material-outline-business" /> Coffee</li>
                        <li><i className="icon-material-outline-location-on" /> San Francisco</li>
                        <li><i className="icon-material-outline-business-center" /> Full Time</li>
                        <li><i className="icon-material-outline-access-time" /> 2 days ago</li>
                      </ul>
                    </div>
                  </div>
                  {/* Bookmark */}
                  <span className="bookmark-icon" />
                </div>
              </a>
              {/* Job Listing */}
              <a href="single-job-page.html" className="job-listing">
                {/* Job Listing Details */}
                <div className="job-listing-details">
                  {/* Logo */}
                  <div className="job-listing-company-logo">
                    <img src="images/company-logo-03.png" alt="" />
                  </div>
                  {/* Details */}
                  <div className="job-listing-description">
                    <h3 className="job-listing-title">Restaurant General Manager</h3>
                    {/* Job Listing Footer */}
                    <div className="job-listing-footer">
                      <ul>
                        <li><i className="icon-material-outline-business" /> King <div className="verified-badge" title="Verified Employer" data-tippy-placement="top" /></li>
                        <li><i className="icon-material-outline-location-on" /> San Francisco</li>
                        <li><i className="icon-material-outline-business-center" /> Full Time</li>
                        <li><i className="icon-material-outline-access-time" /> 2 days ago</li>
                      </ul>
                    </div>
                  </div>
                  {/* Bookmark */}
                  <span className="bookmark-icon" />
                </div>
              </a>
              {/* Job Listing */}
              <a href="single-job-page.html" className="job-listing">
                {/* Job Listing Details */}
                <div className="job-listing-details">
                  {/* Logo */}
                  <div className="job-listing-company-logo">
                    <img src="images/company-logo-05.png" alt="" />
                  </div>
                  {/* Details */}
                  <div className="job-listing-description">
                    <h3 className="job-listing-title">International Marketing Coordinator</h3>
                    {/* Job Listing Footer */}
                    <div className="job-listing-footer">
                      <ul>
                        <li><i className="icon-material-outline-business" /> Skyist</li>
                        <li><i className="icon-material-outline-location-on" /> San Francisco</li>
                        <li><i className="icon-material-outline-business-center" /> Full Time</li>
                        <li><i className="icon-material-outline-access-time" /> 2 days ago</li>
                      </ul>
                    </div>
                  </div>
                  {/* Bookmark */}
                  <span className="bookmark-icon" />
                </div>
              </a>
              {/* Job Listing */}
              <a href="single-job-page.html" className="job-listing">
                {/* Job Listing Details */}
                <div className="job-listing-details">
                  {/* Logo */}
                  <div className="job-listing-company-logo">
                    <img src="images/company-logo-04.png" alt="" />
                  </div>
                  {/* Details */}
                  <div className="job-listing-description">
                    <h3 className="job-listing-title">Administrative Assistant</h3>
                    {/* Job Listing Footer */}
                    <div className="job-listing-footer">
                      <ul>
                        <li><i className="icon-material-outline-business" /> Mates</li>
                        <li><i className="icon-material-outline-location-on" /> San Francisco</li>
                        <li><i className="icon-material-outline-business-center" /> Full Time</li>
                        <li><i className="icon-material-outline-access-time" /> 2 days ago</li>
                      </ul>
                    </div>
                  </div>
                  {/* Bookmark */}
                  <span className="bookmark-icon" />
                </div>
              </a>
              {/* Job Listing */}
              <a href="single-job-page.html" className="job-listing">
                {/* Job Listing Details */}
                <div className="job-listing-details">
                  {/* Logo */}
                  <div className="job-listing-company-logo">
                    <img src="images/company-logo-05.png" alt="" />
                  </div>
                  {/* Details */}
                  <div className="job-listing-description">
                    <h3 className="job-listing-title">Construction Labourers</h3>
                    {/* Job Listing Footer */}
                    <div className="job-listing-footer">
                      <ul>
                        <li><i className="icon-material-outline-business" /> Podous</li>
                        <li><i className="icon-material-outline-location-on" /> San Francisco</li>
                        <li><i className="icon-material-outline-business-center" /> Full Time</li>
                        <li><i className="icon-material-outline-access-time" /> 2 days ago</li>
                      </ul>
                    </div>
                  </div>
                  {/* Bookmark */}
                  <span className="bookmark-icon" />
                </div>
              </a>
              {/* Job Listing */}
              <a href="single-job-page.html" className="job-listing">
                {/* Job Listing Details */}
                <div className="job-listing-details">
                  {/* Logo */}
                  <div className="job-listing-company-logo">
                    <img src="images/company-logo-06.png" alt="" />
                  </div>
                  {/* Details */}
                  <div className="job-listing-description">
                    <h3 className="job-listing-title">Human Resources Consultant</h3>
                    {/* Job Listing Footer */}
                    <div className="job-listing-footer">
                      <ul>
                        <li><i className="icon-material-outline-business" /> Trideo</li>
                        <li><i className="icon-material-outline-location-on" /> San Francisco</li>
                        <li><i className="icon-material-outline-business-center" /> Full Time</li>
                        <li><i className="icon-material-outline-access-time" /> 2 days ago</li>
                      </ul>
                    </div>
                  </div>
                  {/* Bookmark */}
                  <span className="bookmark-icon" />
                </div>
              </a>
            </div>
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
        {/* Full Page Map */}
        <div className="full-page-map-container">
          {/* Enable Filters Button */}
          <div className="filter-button-container">
            <button className="enable-filters-button">
              <i className="enable-filters-button-icon" />
              <span className="show-text">Show Filters</span>
              <span className="hide-text">Hide Filters</span>
            </button>
            <div className="filter-button-tooltip">Click to expand sidebar with filters!</div>
          </div>
          {/* Map */}
          <div id="map" >
          <GoogleMap
        // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
        center={[59.938043, 30.337157]}
        zoom={12}>
      
      </GoogleMap>
          </div>
        </div>
        {/* Full Page Map / End */}
      </div>
        </>
    )
}

export default Result
