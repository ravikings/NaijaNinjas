import React,{useEffect,useState} from 'react';
import Loader from "react-loader-spinner";
import GoogleMap from 'google-map-react';
import {Form,Modal,Tabs,Tab} from 'react-bootstrap'
import $ from 'jquery';

const CompanyResult=() =>{
    const [show, setShow] = useState(false);
   

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  const [load,setLoad]=useState(true)
  const [volume,setVolume]=useState(0);

  // slider rage start
  const handleOnChange = (value) => {
    console.log(value)
    setVolume(value)
  }
  // slider rage end
 useEffect(()=>{
         	// Common Inline CSS
             $(".single-page-header, .freelancer-header").each(function() {
                var attrImageBG = $(this).attr('data-background-image');
          
                    if(attrImageBG !== undefined) {
                      $(this).append('<div class="background-image-container"></div>');
                        $('.background-image-container').css('background-image', 'url('+attrImageBG+')');
                    }
              });
   // share and bookmart start
   $('.copy-url input').val(window.location.href);
    
    
   $(".share-buttons-icons a").each(function() {
     var buttonBG = $(this).attr("data-button-color");
         if(buttonBG !== undefined) {
           $(this).css('background-color',buttonBG);
         }
   });
  
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

    return (
        <>
          <div className="clearfix" style={{marginTop:'60px'}}/>
        {/* Header Container / End */}
        {/* Titlebar
================================================== */}
        <div className="single-page-header" data-background-image="images/single-company.jpg">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="single-page-header-inner">
                  <div className="left-side">
                    <div className="header-image"><img src="images/browse-companies-03.png" alt="" /></div>
                    <div className="header-details">
                      <h3>Acodia <span>Software House</span></h3>
                      <ul>
                        <li><div className="star-rating" data-rating="4.9" /></li>
                        <li><img className="flag" src="images/flags/de.svg" alt="" /> Germany</li>
                        <li><div className="verified-badge-with-title">Verified</div></li>
                      </ul>
                    </div>
                  </div>
                  <div className="right-side">
                    {/* Breadcrumbs */}
                    <nav id="breadcrumbs" className="white">
                      <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Browse Companies</a></li>
                        <li>Acodia</li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Page Content
================================================== */}
        <div className="container">
          <div className="row">
            {/* Content */}
            <div className="col-xl-8 col-lg-8 content-right-offset">
              <div className="single-page-section">
                <h3 className="margin-bottom-25">About Company</h3>
                <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
                <p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</p>
              </div>
              {/* Boxed List */}
              <div className="boxed-list margin-bottom-60">
                <div className="boxed-list-headline">
                  <h3><i className="icon-material-outline-business-center" /> Open Positions</h3>
                </div>
                <div className="listings-container compact-list-layout">
                  {/* Job Listing */}
                  <a href="single-job-page.html" className="job-listing">
                    {/* Job Listing Details */}
                    <div className="job-listing-details">
                      {/* Details */}
                      <div className="job-listing-description">
                        <h3 className="job-listing-title">Python Developer</h3>
                        {/* Job Listing Footer */}
                        <div className="job-listing-footer">
                          <ul>
                            <li><i className="icon-material-outline-location-on" /> Ibadan</li>
                            <li><i className="icon-material-outline-business-center" /> Duration: 2 Hrs</li>
                            <li><i className="icon-material-outline-access-time" /> 2 days ago</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* Bookmark */}
                    <span className="bookmark-icon" />
                  </a>
                  {/* Job Listing */}
                  <a href="single-job-page.html" className="job-listing">
                    {/* Job Listing Details */}
                    <div className="job-listing-details">
                      {/* Details */}
                      <div className="job-listing-description">
                        <h3 className="job-listing-title">Junior Full Stack Developer</h3>
                        {/* Job Listing Footer */}
                        <div className="job-listing-footer">
                          <ul>
                            <li><i className="icon-material-outline-location-on" /> Ibadan</li>
                            <li><i className="icon-material-outline-business-center" /> Duration: 2 Hrs</li>
                            <li><i className="icon-material-outline-access-time" /> 2 days ago</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* Bookmark */}
                    <span className="bookmark-icon" />
                  </a>	
                </div>
              </div>
              {/* Boxed List / End */}
              {/* Boxed List */}
              <div className="boxed-list margin-bottom-60">
                <div className="boxed-list-headline">
                  <h3><i className="icon-material-outline-thumb-up" /> Reviews</h3>
                </div>
                <ul className="boxed-list-ul">
                  <li>
                    <div className="boxed-list-item">
                      {/* Content */}
                      <div className="item-content">
                        <h4>Doing things the right way <span>Anonymous Employee</span></h4>
                        <div className="item-details margin-top-10">
                          <div className="star-rating" data-rating={5.0} />
                          <div className="detail-item"><i className="icon-material-outline-date-range" /> August 2019</div>
                        </div>
                        <div className="item-description">
                          <p>Great company and especially ideal for the career-minded individual. The company is large enough to offer a variety of jobs in all kinds of interesting locations. Even if you never change roles, your job changes and evolves as the company grows, keeping things fresh.</p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="boxed-list-item">
                      {/* Content */}
                      <div className="item-content">
                        <h4>Outstanding Work Environment <span>Anonymous Employee</span></h4>
                        <div className="item-details margin-top-10">
                          <div className="star-rating" data-rating={5.0} />
                          <div className="detail-item"><i className="icon-material-outline-date-range" /> May 2019</div>
                        </div>
                        <div className="item-description">
                          <p>They do business with integrity and rational thinking. Overall, it's an excellent place to work, with products that are winning in the marketplace.</p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="centered-button margin-top-35">
                  <a href="#" onClick={handleShow}  className=" button button-sliding-icon">Leave a Review <i className="icon-material-outline-arrow-right-alt" /></a>
                </div>
              </div>
              {/* Boxed List / End */}
            </div>
            {/* Sidebar */}
            <div className="col-xl-4 col-lg-4">
              <div className="sidebar-container">
                {/* Location */}
                <div className="sidebar-widget">
                  <h3>Location</h3>
                  <div id="single-job-map-container">
                  <GoogleMap
                
        // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
        center={[52.520007, 13.404954]}
        zoom={16}>
      
      </GoogleMap>
                   
                  </div>
                </div>
                {/* Widget */}
                <div className="sidebar-widget">
                  <h3>Social Profiles</h3>
                  <div className="freelancer-socials margin-top-25">
                    <ul>
                      <li><a href="#" title="Dribbble" data-tippy-placement="top"><i className="icon-brand-dribbble" /></a></li>
                      <li><a href="#" title="Twitter" data-tippy-placement="top"><i className="icon-brand-twitter" /></a></li>
                      <li><a href="#" title="Behance" data-tippy-placement="top"><i className="icon-brand-behance" /></a></li>
                      <li><a href="#" title="GitHub" data-tippy-placement="top"><i className="icon-brand-github" /></a></li>
                    </ul>
                  </div>
                </div>
                {/* Sidebar Widget */}
                <div className="sidebar-widget">
                  <h3>Bookmark or Share</h3>
                  {/* Bookmark Button */}
                  <button className="bookmark-button margin-bottom-25">
                    <span className="bookmark-icon" />
                    <span className="bookmark-text">Bookmark</span>
                    <span className="bookmarked-text">Bookmarked</span>
                  </button>
                  {/* Copy URL */}
                  <div className="copy-url">
                    <input id="copy-url" type="text" defaultValue className="with-border" />
                    <button className="copy-url-button ripple-effect" data-clipboard-target="#copy-url" title="Copy to Clipboard" data-tippy-placement="top"><i className="icon-material-outline-file-copy" /></button>
                  </div>
                  {/* Share Buttons */}
                  <div className="share-buttons margin-top-25">
                    <div className="share-buttons-trigger"><i className="icon-feather-share-2" /></div>
                    <div className="share-buttons-content">
                      <span>Interesting? <strong>Share It!</strong></span>
                      <ul className="share-buttons-icons">
                        <li><a href="#" data-button-color="#3b5998" title="Share on Facebook" data-tippy-placement="top"><i className="icon-brand-facebook-f" /></a></li>
                        <li><a href="#" data-button-color="#1da1f2" title="Share on Twitter" data-tippy-placement="top"><i className="icon-brand-twitter" /></a></li>
                        <li><a href="#" data-button-color="#dd4b39" title="Share on Google Plus" data-tippy-placement="top"><i className="icon-brand-google-plus-g" /></a></li>
                        <li><a href="#" data-button-color="#0077b5" title="Share on LinkedIn" data-tippy-placement="top"><i className="icon-brand-linkedin-in" /></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Spacer */}
        <Modal
        show={show}
        onHide={handleClose}
        
       
      >
            <div id="small-dialog" >
        {/*Tabs */}
        <div className="sign-in-form">
          <ul className="popup-tabs-nav">
            <li><a href="#tab">Leave a Review</a></li>
          </ul>
          <div className="popup-tabs-container">
            {/* Tab */}
            <div className="popup-tab-content" id="tab">
              {/* Welcome Text */}
              <div className="welcome-text">
                <h3>What is it like to work at Acodia?</h3>
                {/* Form */}
                <form method="post" id="leave-company-review-form">
                  {/* Leave Rating */}
                  <div className="clearfix" />
                  <div className="leave-rating-container">
                    <div className="leave-rating margin-bottom-5">
                      <input type="radio" name="rating" id="rating-1" defaultValue={1} required />
                      <label htmlFor="rating-1" className="icon-material-outline-star" />
                      <input type="radio" name="rating" id="rating-2" defaultValue={2} required />
                      <label htmlFor="rating-2" className="icon-material-outline-star" />
                      <input type="radio" name="rating" id="rating-3" defaultValue={3} required />
                      <label htmlFor="rating-3" className="icon-material-outline-star" />
                      <input type="radio" name="rating" id="rating-4" defaultValue={4} required />
                      <label htmlFor="rating-4" className="icon-material-outline-star" />
                      <input type="radio" name="rating" id="rating-5" defaultValue={5} required />
                      <label htmlFor="rating-5" className="icon-material-outline-star" />
                    </div>
                  </div>
                  <div className="clearfix" />
                  {/* Leave Rating / End*/}
                </form></div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="input-with-icon-left" title="Leave blank to add review anonymously" data-tippy-placement="bottom">
                    <i className="icon-material-outline-account-circle" />
                    <input type="text" className="input-text with-border" name="name" id="name" placeholder="First and Last Name" />
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="input-with-icon-left">
                    <i className="icon-material-outline-rate-review" />
                    <input type="text" className="input-text with-border" name="reviewtitle" id="reviewtitle" placeholder="Review Title" required />
                  </div>
                </div>
              </div>
              <textarea className="with-border" placeholder="Review" name="message" id="message" cols={7} required defaultValue={""} />
              {/* Button */}
              <button className="button margin-top-35 full-width button-sliding-icon ripple-effect" type="submit" form="leave-company-review-form">Leave a Review <i className="icon-material-outline-arrow-right-alt" /></button>
            </div>
          </div>
        </div>
      </div>
      </Modal>
        <div className="margin-top-15" />
        {/* Spacer / End*/}    
        
        </>
    )
}


export default CompanyResult;
