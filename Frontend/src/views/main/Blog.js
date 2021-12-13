import React,{useEffect,useState} from 'react';

import { Link} from 'react-router-dom';
import Slider from "react-slick";

const Blog=() =>{
    var sliderData = {
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		responsive: [
			{
			  breakpoint: 1365,
			  settings: {
				slidesToShow: 3,
				dots: true,
				arrows: false
			  }
			},
			{
			  breakpoint: 992,
			  settings: {
				slidesToShow: 2,
				dots: true,
				arrows: false
			  }
			},
			{
			  breakpoint: 768,
			  settings: {
				slidesToShow: 1,
				dots: true,
				arrows: false
			  }
			}
		]
	}
useEffect(()=>{
	
},[])
return(
  <>
   <div className="clearfix" style={{marginTop:'100px'}} />
        {/* Header Container / End */}
        {/* Content
================================================== */}
        <div id="titlebar" className="white margin-bottom-30">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>Blog</h2>
                <span>Featured Posts</span>
                {/* Breadcrumbs */}
                <nav id="breadcrumbs" className="dark">
                  <ul>
                    <li><a href="#">Home</a></li>
                    <li>Blog</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* Recent Blog Posts */}
        <div className="">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                
              <Slider className='container' {...sliderData}>
                  <div className="col-md-12">
                  <Link to="/blogpost" className="blog-compact-item-container">
                    <div className="blog-compact-item">
                      <img src="images/blog-04a.jpg" alt="" />
                      <span className="blog-item-tag">Tips</span>
                      <div className="blog-compact-item-content">
                        <ul className="blog-post-tags">
                          <li>20 May 2019</li>
                        </ul>
                        <h3>5 Myths That Prevent Job Seekers from Overcoming Failure</h3>
                        <p>Distinctively reengineer revolutionary meta-services and premium architectures intuitive opportunities.</p>
                      </div>
                    </div>
                  </Link>
                  </div>
                  <div className="col-md-12">
                  <Link to="/blogpost" className="blog-compact-item-container">
                    <div className="blog-compact-item">
                      <img src="images/blog-05a.jpg" alt="" />
                      <span className="blog-item-tag">Recruiting</span>
                      <div className="blog-compact-item-content">
                        <ul className="blog-post-tags">
                          <li>28 April 2019</li>
                        </ul>
                        <h3>12 Dog-Friendly Companies Hiring Now</h3>
                        <p>Compellingly embrace empowered e-business after user friendly intellectual capital. Interactively front-end.</p>
                      </div>
                    </div>
                  </Link>
                  </div>
                  <div className="col-md-12">
                  <Link to="/blogpost" className="blog-compact-item-container">
                    <div className="blog-compact-item">
                      <img src="images/blog-03a.jpg" alt="" />
                      <span className="blog-item-tag">Marketing</span>
                      <div className="blog-compact-item-content">
                        <ul className="blog-post-tags">
                          <li>10 June 2019</li>
                        </ul>
                        <h3>11 Tips to Help You Get New Clients Through Cold Calling</h3>
                        <p>Compellingly embrace empowered e-business after user friendly intellectual capital. Interactively front-end.</p>
                      </div>
                    </div>
                  </Link>   
                  </div>
                  <div className="col-md-12">
                  <Link to="/blogpost" className="blog-compact-item-container">
                    <div className="blog-compact-item">
                      <img src="images/blog-06a.jpg" alt="" />
                      <span className="blog-item-tag">Recruiting</span>
                      <div className="blog-compact-item-content">
                        <ul className="blog-post-tags">
                          <li>9 June 2019</li>
                        </ul>
                        <h3>Follow Up On Job Application With This Template</h3>
                        <p>Appropriately empower dynamic leadership skills after business portals. Globally myocardinate interactive.</p>
                      </div>
                    </div>
                  </Link>   
                  </div>
                  <div className="col-md-12">
                      
                  </div>
                  <div className="col-md-12">
                  <Link to="/blogpost" className="blog-compact-item-container">
                    <div className="blog-compact-item">
                      <img src="images/blog-07a.jpg" alt="" />
                      <span className="blog-item-tag">Recruiting</span>
                      <div className="blog-compact-item-content">
                        <ul className="blog-post-tags">
                          <li>3 June 2019</li>
                        </ul>
                        <h3>What It Really Takes to Make $100k Before You Turn 30</h3>
                        <p>Appropriately empower dynamic leadership skills after business portals. Globally myocardinate interactive.</p>
                      </div>
                    </div>
                  </Link>
                  </div>
                 
              
               
              
               
                </Slider>
             
              </div>
            </div>
          </div>
        </div>
        {/* Recent Blog Posts / End */}
        {/* Section */}
        <div className="section gray">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-8">
                {/* Section Headline */}
                <div className="section-headline margin-top-60 margin-bottom-35">
                  <h4>Recent Posts</h4>
                </div>
                {/* Blog Post */}
                <Link to="/blogpost" className="blog-post">
                  {/* Blog Post Thumbnail */}
                  <div className="blog-post-thumbnail">
                    <div className="blog-post-thumbnail-inner">
                      <span className="blog-item-tag">Tips</span>
                      <img src="images/blog-01a.jpg" alt="" />
                    </div>
                  </div>
                  {/* Blog Post Content */}
                  <div className="blog-post-content">
                    <span className="blog-post-date">22 July 2019</span>
                    <h3>16 Ridiculously Easy Ways to Find &amp; Keep a Remote Job</h3>
                    <p>Efficiently myocardinate market-driven innovation via open-source alignments. Dramatically engage high-payoff infomediaries rather than. </p>
                  </div>
                  {/* Icon */}
                  <div className="entry-icon" />
                </Link>
                {/* Blog Post */}
                <Link to="/blogpost" className="blog-post">
                  {/* Blog Post Thumbnail */}
                  <div className="blog-post-thumbnail">
                    <div className="blog-post-thumbnail-inner">
                      <span className="blog-item-tag">Recruiting</span>
                      <img src="images/blog-02a.jpg" alt="" />
                    </div>
                  </div>
                  {/* Blog Post Content */}
                  <div className="blog-post-content">
                    <span className="blog-post-date">29 June 2019</span>
                    <h3>How to "Woo" a Recruiter and Land Your Dream Job</h3>
                    <p>Efficiently myocardinate market-driven innovation via open-source alignments. Dramatically engage high-payoff infomediaries rather than. </p>
                  </div>
                </Link>
                {/* Blog Post */}
                <Link to="/blogpost" className="blog-post">
                  {/* Blog Post Thumbnail */}
                  <div className="blog-post-thumbnail">
                    <div className="blog-post-thumbnail-inner">
                      <span className="blog-item-tag">Marketing</span>
                      <img src="images/blog-03a.jpg" alt="" />
                    </div>
                  </div>
                  {/* Blog Post Content */}
                  <div className="blog-post-content">
                    <span className="blog-post-date">10 June 2019</span>
                    <h3>11 Tips to Help You Get New Clients Through Cold Calling</h3>
                    <p>Efficiently myocardinate market-driven innovation via open-source alignments. Dramatically engage high-payoff infomediaries rather than. </p>
                  </div>
                </Link>
                {/* Blog Post */}
                <Link to="/blogpost" className="blog-post">
                  {/* Blog Post Thumbnail */}
                  <div className="blog-post-thumbnail">
                    <div className="blog-post-thumbnail-inner">
                      <span className="blog-item-tag">Tips</span>
                      <img src="images/blog-04a.jpg" alt="" />
                    </div>
                  </div>
                  {/* Blog Post Content */}
                  <div className="blog-post-content">
                    <span className="blog-post-date">5 June 2019</span>
                    <h3>5 Myths That Prevent Job Seekers from Overcoming Failure</h3>
                    <p>Efficiently myocardinate market-driven innovation via open-source alignments. Dramatically engage high-payoff infomediaries rather than. </p>
                  </div>
                </Link>
                {/* Pagination */}
                <div className="clearfix" />
                <div className="row">
                  <div className="col-md-12">
                    {/* Pagination */}
                    <div className="pagination-container margin-top-10 margin-bottom-20">
                      <nav className="pagination">
                        <ul>
                          <li><a href="#" className="current-page ripple-effect">1</a></li>
                          <li><a href="#" className="ripple-effect">2</a></li>
                          <li><a href="#" className="ripple-effect">3</a></li>
                          <li className="pagination-arrow"><a href="#" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-right" /></a></li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
                {/* Pagination / End */}
              </div>
              <div className="col-xl-4 col-lg-4 content-left-offset">
                <div className="sidebar-container margin-top-65">
                  {/* Location */}
                  <div className="sidebar-widget margin-bottom-40">
                    <div className="input-with-icon">
                      <input id="autocomplete-input" type="text" placeholder="Search" />
                      <i className="icon-material-outline-search" />
                    </div>
                  </div>
                  {/* Widget */}
                  <div className="sidebar-widget">
                    <h3>Trending Posts</h3>
                    <ul className="widget-tabs">
                      {/* Post #1 */}
                      <li>
                        <Link to="/blogpost" className="widget-content active">
                          <img src="images/blog-02a.jpg" alt="" />
                          <div className="widget-text">
                            <h5>How to "Woo" a Recruiter and Land Your Dream Job</h5>
                            <span>29 June 2019</span>
                          </div>
                        </Link>
                      </li>
                      {/* Post #2 */}
                      <li>
                        <Link to="/blogpost" className="widget-content">
                          <img src="images/blog-07a.jpg" alt="" />
                          <div className="widget-text">
                            <h5>What It Really Takes to Make $100k Before You Turn 30</h5>
                            <span>3 June 2019</span>
                          </div>
                        </Link>
                      </li>
                      {/* Post #3 */}
                      <li>
                        <Link to="/blogpost" className="widget-content">
                          <img src="images/blog-04a.jpg" alt="" />
                          <div className="widget-text">
                            <h5>5 Myths That Prevent Job Seekers from Overcoming Failure</h5>
                            <span>5 June 2019</span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* Widget / End*/}
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
                  {/* Widget */}
                  <div className="sidebar-widget">
                    <h3>Tags</h3>
                    <div className="task-tags">
                      <a href="#"><span>employer</span></a>
                      <a href="#"><span>recruiting</span></a>
                      <a href="#"><span>work</span></a>
                      <a href="#"><span>salary</span></a>
                      <a href="#"><span>tips</span></a>
                      <a href="#"><span>income</span></a>
                      <a href="#"><span>application</span></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Spacer */}
          <div className="padding-top-40" />
          {/* Spacer */}
        </div>
        {/* Section / End */}
        </>
    )

}

export default Blog
