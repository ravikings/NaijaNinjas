import React,{useEffect} from 'react'
import { useHistory} from 'react-router-dom';


import $ from 'jquery';
const  FindCompany=()=> {
  const history = useHistory();
  const PressEnter=(e)=>{
    e.preventDefault();
    history.push('/companyresult')
  }
  useEffect(()=>{
    $(".photo-box, .photo-section, .video-container").each(function() {
      var photoBox = $(this);
      var photoBoxBG = $(this).attr('data-background-image');
  
          if(photoBox !== undefined) {
              $(this).css('background-image', 'url('+photoBoxBG+')');
          }
    });


    // background image start
    	// Common Inline CSS
		$(".single-page-header, .intro-banner").each(function() {
			var attrImageBG = $(this).attr('data-background-image');

	        if(attrImageBG !== undefined) {
	        	$(this).append('<div class="background-image-container"></div>');
	            $('.background-image-container').css('background-image', 'url('+attrImageBG+')');
	        }
		});
    // background image end

    // rapple start
    $('.ripple-effect, .ripple-effect-dark').on('click', function(e) {
      var rippleDiv = $('<span class="ripple-overlay">'),
        rippleOffset = $(this).offset(),
        rippleY = e.pageY - rippleOffset.top,
        rippleX = e.pageX - rippleOffset.left;
  
      rippleDiv.css({
        top: rippleY - (rippleDiv.height() / 2),
        left: rippleX - (rippleDiv.width() / 2),
        // background: $(this).data("ripple-color");
      }).appendTo($(this));
  
      window.setTimeout(function() {
        rippleDiv.remove();
      }, 800);
    });
  
    // rapple end
  },[])
    return (
        <>
                  {/* Wrapper */}
      <div id="wrapper">
    
        {/* Intro Banner
================================================== */}
        {/* add class "disable-gradient" to enable consistent background overlay */}
        <div className="intro-banner" data-background-image="images/home-background.jpg">
          <div className="container">
            {/* Intro Headline */}
            <div className="row">
              <div className="col-md-12">
                <div className="banner-headline">
                  <h3>
                    <strong>Hire experts or be hired for any job, any time.</strong>
                    <br />
                    <span>Thousands of small businesses use <strong className="color">Hireo</strong> to turn their ideas into reality.</span>
                  </h3>
                </div>
              </div>
            </div>
            {/* Search Bar */}
            <div className="row">
                  <form className="col-md-12" onSubmit={PressEnter}>
              <div >
                <div className="intro-banner-search-form margin-top-95">
                  {/* Search Field */}
                  <div className="intro-search-field with-autocomplete">
                    <label htmlFor="autocomplete-input" className="field-title ripple-effect">Where?</label>
                    <div className="input-with-icon">
                      <input id="autocomplete-input" type="text" placeholder="Online Job" />
                      <i className="icon-material-outline-location-on" />
                    </div>
                  </div>
                  {/* Search Field */}
                  
                  <div className="intro-search-field">
                    <label htmlFor="intro-keywords" className="field-title ripple-effect">What job you want?</label>
                    <input onEnter id="intro-keywords" type="text" placeholder="Job Title or Keywords" />
                  </div>
                  {/* Button */}
                  <div className="intro-search-button">
                    <button className="button ripple-effect" type="submit">Search</button>
                  </div>
                </div>
              </div>
                  </form>
            </div>
            {/* Stats */}
            <div className="row">
              <div className="col-md-12">
                <ul className="intro-stats margin-top-45 hide-under-992px">
                  <li>
                    <strong className="counter">1,586</strong>
                    <span>Jobs Posted</span>
                  </li>
                  <li>
                    <strong className="counter">3,543</strong>
                    <span>Tasks Posted</span>
                  </li>
                  <li>
                    <strong className="counter">1,232</strong>
                    <span>Freelancers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Content
================================================== */}
        {/* Category Boxes */}
        <div className="section margin-top-65">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="section-headline centered margin-bottom-15">
                  <h3>Popular Job Categories</h3>
                </div>
                {/* Category Boxes Container */}
                <div className="categories-container">
                  {/* Category Box */}
                  <a href="jobs-grid-layout-full-page.html" className="category-box">
                    <div className="category-box-icon">
                      <i className="icon-line-awesome-file-code-o" />
                    </div>
                    <div className="category-box-counter">612</div>
                    <div className="category-box-content">
                      <h3>Web &amp; Software Dev</h3>
                      <p>Software Engineer, Web / Mobile Developer &amp; More</p>
                    </div>
                  </a>
                  {/* Category Box */}
                  <a href="jobs-list-layout-full-page-map.html" className="category-box">
                    <div className="category-box-icon">
                      <i className="icon-line-awesome-cloud-upload" />
                    </div>
                    <div className="category-box-counter">113</div>
                    <div className="category-box-content">
                      <h3>Data Science &amp; Analitycs</h3>
                      <p>Data Specialist / Scientist, Data Analyst &amp; More</p>
                    </div>
                  </a>
                  {/* Category Box */}
                  <a href="jobs-list-layout-full-page-map.html" className="category-box">
                    <div className="category-box-icon">
                      <i className="icon-line-awesome-suitcase" />
                    </div>
                    <div className="category-box-counter">186</div>
                    <div className="category-box-content">
                      <h3>Accounting &amp; Consulting</h3>
                      <p>Auditor, Accountant, Fnancial Analyst &amp; More</p>
                    </div>
                  </a>
                  {/* Category Box */}
                  <a href="jobs-list-layout-1.html" className="category-box">
                    <div className="category-box-icon">
                      <i className="icon-line-awesome-pencil" />
                    </div>
                    <div className="category-box-counter">298</div>
                    <div className="category-box-content">
                      <h3>Writing &amp; Translations</h3>
                      <p>Copywriter, Creative Writer, Translator &amp; More</p>
                    </div>
                  </a>
                  {/* Category Box */}
                  <a href="jobs-list-layout-2.html" className="category-box">
                    <div className="category-box-icon">
                      <i className="icon-line-awesome-pie-chart" />
                    </div>
                    <div className="category-box-counter">549</div>						
                    <div className="category-box-content">
                      <h3>Sales &amp; Marketing</h3>
                      <p>Brand Manager, Marketing Coordinator &amp; More</p>
                    </div>
                  </a>
                  {/* Category Box */}
                  <a href="jobs-list-layout-1.html" className="category-box">
                    <div className="category-box-icon">
                      <i className="icon-line-awesome-image" />
                    </div>
                    <div className="category-box-counter">873</div>
                    <div className="category-box-content">
                      <h3>Graphics &amp; Design</h3>
                      <p>Creative Director, Web Designer &amp; More</p>
                    </div>
                  </a>
                  {/* Category Box */}
                  <a href="jobs-list-layout-2.html" className="category-box">
                    <div className="category-box-icon">
                      <i className="icon-line-awesome-bullhorn" />
                    </div>
                    <div className="category-box-counter">125</div>
                    <div className="category-box-content">
                      <h3>Digital Marketing</h3>
                      <p>Darketing Analyst, Social Profile Admin &amp; More</p>
                    </div>
                  </a>
                  {/* Category Box */}
                  <a href="jobs-grid-layout-full-page.html" className="category-box">
                    <div className="category-box-icon">
                      <i className="icon-line-awesome-graduation-cap" />
                    </div>
                    <div className="category-box-counter">445</div>
                    <div className="category-box-content">
                      <h3>Education &amp; Training</h3>
                      <p>Advisor, Coach, Education Coordinator &amp; More</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Category Boxes / End */}
        {/* Features Jobs */}
        <div className="section gray margin-top-45 padding-top-65 padding-bottom-75">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                {/* Section Headline */}
                <div className="section-headline margin-top-0 margin-bottom-35">
                  <h3>Featured Jobs</h3>
                  <a href="jobs-list-layout-full-page-map.html" className="headline-link">Browse All Jobs</a>
                </div>
                {/* Jobs Container */}
                <div className="listings-container compact-list-layout margin-top-35">
                  {/* Job Listing */}
                  <a href="single-job-page.html" className="job-listing with-apply-button">
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
                            <li><i className="icon-material-outline-location-on" /> San Francissco</li>
                            <li><i className="icon-material-outline-business-center" /> Full Time</li>
                            <li><i className="icon-material-outline-access-time" /> 2 days ago</li>
                          </ul>
                        </div>
                      </div>
                      {/* Apply Button */}
                      <span className="list-apply-button ripple-effect">Apply Now</span>
                    </div>
                  </a>	
                  {/* Job Listing */}
                  <a href="single-job-page.html" className="job-listing with-apply-button">
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
                            <li><i className="icon-material-outline-location-on" /> San Francissco</li>
                            <li><i className="icon-material-outline-business-center" /> Full Time</li>
                            <li><i className="icon-material-outline-access-time" /> 2 days ago</li>
                          </ul>
                        </div>
                      </div>
                      {/* Apply Button */}
                      <span className="list-apply-button ripple-effect">Apply Now</span>
                    </div>
                  </a>
                  {/* Job Listing */}
                  <a href="single-job-page.html" className="job-listing with-apply-button">
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
                            <li><i className="icon-material-outline-location-on" /> San Francissco</li>
                            <li><i className="icon-material-outline-business-center" /> Full Time</li>
                            <li><i className="icon-material-outline-access-time" /> 2 days ago</li>
                          </ul>
                        </div>
                      </div>
                      {/* Apply Button */}
                      <span className="list-apply-button ripple-effect">Apply Now</span>
                    </div>
                  </a>
                  {/* Job Listing */}
                  <a href="single-job-page.html" className="job-listing with-apply-button">
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
                            <li><i className="icon-material-outline-location-on" /> San Francissco</li>
                            <li><i className="icon-material-outline-business-center" /> Full Time</li>
                            <li><i className="icon-material-outline-access-time" /> 2 days ago</li>
                          </ul>
                        </div>
                      </div>
                      {/* Apply Button */}
                      <span className="list-apply-button ripple-effect">Apply Now</span>
                    </div>
                  </a>
                  {/* Job Listing */}
                  <a href="single-job-page.html" className="job-listing with-apply-button">
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
                            <li><i className="icon-material-outline-location-on" /> San Francissco</li>
                            <li><i className="icon-material-outline-business-center" /> Full Time</li>
                            <li><i className="icon-material-outline-access-time" /> 2 days ago</li>
                          </ul>
                        </div>
                      </div>
                      {/* Apply Button */}
                      <span className="list-apply-button ripple-effect">Apply Now</span>
                    </div>
                  </a>
                </div>
                {/* Jobs Container / End */}
              </div>
            </div>
          </div>
        </div>
        {/* Featured Jobs / End */}
        {/* Features Cities */}
        <div className="section margin-top-65 margin-bottom-65">
          <div className="container">
            <div className="row">
              {/* Section Headline */}
              <div className="col-xl-12">
                <div className="section-headline centered margin-top-0 margin-bottom-45">
                  <h3>Featured Cities</h3>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                {/* Photo Box */}
                <a href="jobs-list-layout-1.html" className="photo-box" data-background-image="images/featured-city-01.jpg">
                  <div className="photo-box-content">
                    <h3>San Francisco</h3>
                    <span>376 Jobs</span>
                  </div>
                </a>
              </div>
              <div className="col-xl-3 col-md-6">
                {/* Photo Box */}
                <a href="jobs-list-layout-full-page-map.html" className="photo-box" data-background-image="images/featured-city-02.jpg">
                  <div className="photo-box-content">
                    <h3>New York</h3>
                    <span>645 Jobs</span>
                  </div>
                </a>
              </div>
              <div className="col-xl-3 col-md-6">
                {/* Photo Box */}
                <a href="jobs-grid-layout-full-page.html" className="photo-box" data-background-image="images/featured-city-03.jpg">
                  <div className="photo-box-content">
                    <h3>Los Angeles</h3>
                    <span>832 Jobs</span>
                  </div>
                </a>
              </div>
              <div className="col-xl-3 col-md-6">
                {/* Photo Box */}
                <a href="jobs-list-layout-2.html" className="photo-box" data-background-image="images/featured-city-04.jpg">
                  <div className="photo-box-content">
                    <h3>Miami</h3>
                    <span>513 Jobs</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Features Cities / End */}
        {/* Highest Rated Freelancers */}
        <div className="section gray padding-top-65 padding-bottom-70 full-width-carousel-fix">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                {/* Section Headline */}
                <div className="section-headline margin-top-0 margin-bottom-25">
                  <h3>Highest Rated Freelancers</h3>
                  <a href="freelancers-grid-layout.html" className="headline-link">Browse All Freelancers</a>
                </div>
              </div>
              <div className="col-xl-12">
                <div className="default-slick-carousel freelancers-container freelancers-grid-layout">
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
                          <div className="star-rating" data-rating={5.0} />
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
                      <a href="single-freelancer-profile.html" className="button button-sliding-icon ripple-effect">View Profile <i className="icon-material-outline-arrow-right-alt" /></a>
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
                          <div className="star-rating" data-rating={5.0} />
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
                      <a href="single-freelancer-profile.html" className="button button-sliding-icon ripple-effect">View Profile <i className="icon-material-outline-arrow-right-alt" /></a>
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
                        <div className="freelancer-rating">
                          <div className="star-rating" data-rating="4.9" />
                        </div>
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
                      <a href="single-freelancer-profile.html" className="button button-sliding-icon ripple-effect">View Profile <i className="icon-material-outline-arrow-right-alt" /></a>
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
                      <a href="single-freelancer-profile.html" className="button button-sliding-icon ripple-effect">View Profile <i className="icon-material-outline-arrow-right-alt" /></a>
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
                      <a href="single-freelancer-profile.html" className="button button-sliding-icon ripple-effect">View Profile <i className="icon-material-outline-arrow-right-alt" /></a>
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
                      <a href="single-freelancer-profile.html" className="button button-sliding-icon ripple-effect">View Profile <i className="icon-material-outline-arrow-right-alt" /></a>
                    </div>
                  </div>
                  {/* Freelancer / End */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Highest Rated Freelancers / End*/}
        {/* Membership Plans */}
        <div className="section padding-top-60 padding-bottom-75">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                {/* Section Headline */}
                <div className="section-headline centered margin-top-0 margin-bottom-35">
                  <h3>Membership Plans</h3>
                </div>
              </div>
              <div className="col-xl-12">
                {/* Billing Cycle  */}
                <div className="billing-cycle-radios margin-bottom-70">
                  <div className="radio billed-monthly-radio">
                    <input id="radio-5" name="radio-payment-type" type="radio" defaultChecked />
                    <label htmlFor="radio-5"><span className="radio-label" /> Billed Monthly</label>
                  </div>
                  <div className="radio billed-yearly-radio">
                    <input id="radio-6" name="radio-payment-type" type="radio" />
                    <label htmlFor="radio-6"><span className="radio-label" /> Billed Yearly <span className="small-label">Save 10%</span></label>
                  </div>
                </div>
                {/* Pricing Plans Container */}
                <div className="pricing-plans-container">
                  {/* Plan */}
                  <div className="pricing-plan">
                    <h3>Basic Plan</h3>
                    <p className="margin-top-10">One time fee for one listing or task highlighted in search results.</p>
                    <div className="pricing-plan-label billed-monthly-label"><strong>$19</strong>/ monthly</div>
                    <div className="pricing-plan-label billed-yearly-label"><strong>$205</strong>/ yearly</div>
                    <div className="pricing-plan-features">
                      <strong>Features of Basic Plan</strong>
                      <ul>
                        <li>1 Listing</li>
                        <li>30 Days Visibility</li>
                        <li>Highlighted in Search Results</li>
                      </ul>
                    </div>
                    <a href="pages-checkout-page.html" className="button full-width margin-top-20">Buy Now</a>
                  </div>
                  {/* Plan */}
                  <div className="pricing-plan recommended">
                    <div className="recommended-badge">Recommended</div>
                    <h3>Standard Plan</h3>
                    <p className="margin-top-10">One time fee for one listing or task highlighted in search results.</p>
                    <div className="pricing-plan-label billed-monthly-label"><strong>$49</strong>/ monthly</div>
                    <div className="pricing-plan-label billed-yearly-label"><strong>$529</strong>/ yearly</div>
                    <div className="pricing-plan-features">
                      <strong>Features of Standard Plan</strong>
                      <ul>
                        <li>5 Listings</li>
                        <li>60 Days Visibility</li>
                        <li>Highlighted in Search Results</li>
                      </ul>
                    </div>
                    <a href="pages-checkout-page.html" className="button full-width margin-top-20">Buy Now</a>
                  </div>
                  {/* Plan */}
                  <div className="pricing-plan">
                    <h3>Extended Plan</h3>
                    <p className="margin-top-10">One time fee for one listing or task highlighted in search results.</p>
                    <div className="pricing-plan-label billed-monthly-label"><strong>$99</strong>/ monthly</div>
                    <div className="pricing-plan-label billed-yearly-label"><strong>$1069</strong>/ yearly</div>
                    <div className="pricing-plan-features">
                      <strong>Features of Extended Plan</strong>
                      <ul>
                        <li>Unlimited Listings Listing</li>
                        <li>90 Days Visibility</li>
                        <li>Highlighted in Search Results</li>
                      </ul>
                    </div>
                    <a href="pages-checkout-page.html" className="button full-width margin-top-20">Buy Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
 
      </div>
      {/* Wrapper / End */}
        </>
    )
}
export default FindCompany;
