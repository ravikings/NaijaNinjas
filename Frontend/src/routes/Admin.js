import React,{useEffect} from 'react'
import {  Route } from 'react-router-dom';


import $ from 'jquery';
const Admin=(props)=> {
  useEffect(()=>{
    $(".full-page-sidebar-inner, .dashboard-sidebar-inner").each(function() {

			var headerHeight = $("#header-container").outerHeight();
			var windowHeight = $(window).outerHeight() - headerHeight;
			var sidebarContainerHeight = $(this).find(".sidebar-container, .dashboard-nav-container").outerHeight();

			// Enables scrollbar if sidebar is higher than wrapper
			if (sidebarContainerHeight > windowHeight) {
				$(this).css({ height: windowHeight });
		
			} else {
				$(this).find('.simplebar-track').hide();
			}
		});

    $('.dashboard-responsive-nav-trigger').on('click', function(e){
    	e.preventDefault();
		$(this).toggleClass('active');

		var dashboardNavContainer = $('body').find(".dashboard-nav");

		if( $(this).hasClass('active') ){
			$(dashboardNavContainer).addClass('active');
		} else {
			$(dashboardNavContainer).removeClass('active');
		}

		$('.dashboard-responsive-nav-trigger .hamburger').toggleClass('is-active');

	});

  },[])
    return (
        <>
  <div>

        <div className="clearfix" />
        {/* Header Container / End */}
        {/* Dashboard Container */}
        <div className="dashboard-container" style={{marginTop:'100px'}}>
          {/* Dashboard Sidebar
	================================================== */}
          <div className="dashboard-sidebar">
            <div className="dashboard-sidebar-inner" data-simplebar>
              <div className="dashboard-nav-container">
                {/* Responsive Navigation Trigger */}
                <a href="#" className="dashboard-responsive-nav-trigger">
                  <span className="hamburger hamburger--collapse">
                    <span className="hamburger-box">
                      <span className="hamburger-inner" />
                    </span>
                  </span>
                  <span className="trigger-title">Dashboard Navigation</span>
                </a>
                {/* Navigation */}
                <div className="dashboard-nav">
                  <div className="dashboard-nav-inner">
                    <ul data-submenu-title="Start">
                      <li><a href="dashboard.html"><i className="icon-material-outline-dashboard" /> Dashboard</a></li>
                      <li className="active"><a href="dashboard-messages.html"><i className="icon-material-outline-question-answer" /> Messages <span className="nav-tag">2</span></a></li>
                      <li><a href="dashboard-bookmarks.html"><i className="icon-material-outline-star-border" /> Bookmarks</a></li>
                      <li><a href="dashboard-reviews.html"><i className="icon-material-outline-rate-review" /> Reviews</a></li>
                    </ul>
                    <ul data-submenu-title="Organize and Manage">
                      <li><a href="#"><i className="icon-material-outline-business-center" /> Jobs</a>
                        <ul>
                          <li><a href="dashboard-manage-jobs.html">Manage Jobs <span className="nav-tag">3</span></a></li>
                          <li><a href="dashboard-manage-candidates.html">Manage Candidates</a></li>
                          <li><a href="dashboard-post-a-job.html">Post a Job</a></li>
                        </ul>	
                      </li>
                      <li><a href="#"><i className="icon-material-outline-assignment" /> Tasks</a>
                        <ul>
                          <li><a href="dashboard-manage-tasks.html">Manage Tasks <span className="nav-tag">2</span></a></li>
                          <li><a href="dashboard-manage-bidders.html">Manage Bidders</a></li>
                          <li><a href="dashboard-my-active-bids.html">My Active Bids <span className="nav-tag">4</span></a></li>
                          <li><a href="dashboard-post-a-task.html">Post a Task</a></li>
                        </ul>	
                      </li>
                    </ul>
                    <ul data-submenu-title="Account">
                      <li><a href="dashboard-settings.html"><i className="icon-material-outline-settings" /> Settings</a></li>
                      <li><a href="index-logged-out.html"><i className="icon-material-outline-power-settings-new" /> Logout</a></li>
                    </ul>
                  </div>
                </div>
                {/* Navigation / End */}
              </div>
            </div>
          </div>
          {/* Dashboard Sidebar / End */}
          {/* Dashboard Content
	================================================== */}
             <Route exact  path={props.path} component={props.component} />   

          {/* Dashboard Content / End */}
        </div>
        {/* Dashboard Container / End */}
        {/* Wrapper / End */}
        {/* Apply for a job popup
================================================== */}
        <div id="small-dialog" className="zoom-anim-dialog mfp-hide dialog-with-tabs">
          {/*Tabs */}
          <div className="sign-in-form">
            <ul className="popup-tabs-nav">
              <li><a href="#tab">Add Note</a></li>
            </ul>
            <div className="popup-tabs-container">
              {/* Tab */}
              <div className="popup-tab-content" id="tab">
                {/* Welcome Text */}
                <div className="welcome-text">
                  <h3>Do Not Forget 😎</h3>
                </div>
                {/* Form */}
                <form method="post" id="add-note">
                  <select className="selectpicker with-border default margin-bottom-20" data-size={7} title="Priority">
                    <option>Low Priority</option>
                    <option>Medium Priority</option>
                    <option>High Priority</option>
                  </select>
                  <textarea name="textarea" cols={10} placeholder="Note" className="with-border" defaultValue={""} />
                </form>
                {/* Button */}
                <button className="button full-width button-sliding-icon ripple-effect" type="submit" form="add-note">Add Note <i className="icon-material-outline-arrow-right-alt" /></button>
              </div>
            </div>
          </div>
        </div>
        {/* Apply for a job popup / End */}
      </div>
      
        </>
    )
}
export default Admin;