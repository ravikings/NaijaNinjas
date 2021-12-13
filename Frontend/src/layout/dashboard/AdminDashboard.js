import React,{useEffect} from 'react';
import {  NavLink } from 'react-router-dom';
import $ from 'jquery';

export default function AdminDashboard() {
    useEffect(()=>{
        
	// Wrapper Height (window height - header height)
	function wrapperHeight() {
		var headerHeight = $("#header-container").outerHeight();
		var windowHeight = $(window).outerHeight() - headerHeight;
		$('.full-page-content-container, .dashboard-content-container, .dashboard-sidebar-inner, .dashboard-container, .full-page-container').css({ height: windowHeight });
		$('.dashboard-content-inner').css({ 'min-height': windowHeight });
	}

	// Enabling Scrollbar
	function fullPageScrollbar() {
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
	}

	// Init
	$(window).on('load resize', function() {
		wrapperHeight();
		// fullPageScrollbar();
	});
	wrapperHeight();
	// fullPageScrollbar();


	// Dashboard Nav Submenus
    $('.dashboard-nav ul li a').on('click', function(e){
		if($(this).closest("li").children("ul").length) {
			if ( $(this).closest("li").is(".active-submenu") ) {
	           $('.dashboard-nav ul li').removeClass('active-submenu');
	        } else {
	            $('.dashboard-nav ul li').removeClass('active-submenu');
	            $(this).parent('li').addClass('active-submenu');
	        }
	        e.preventDefault();
		}
	});


	// Responsive Dashbaord Nav Trigger
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
    
	// Notes & Messages Scrollbar
	$(window).on('load resize', function() {
		var winwidth = $(window).width();
		if ( winwidth > 1199) {

			// Notes
			$('.row').each(function() {
				var mbh = $(this).find('.main-box-in-row').outerHeight();
				var cbh = $(this).find('.child-box-in-row').outerHeight();
				if ( mbh < cbh ) {
					var headerBoxHeight = $(this).find('.child-box-in-row .headline').outerHeight();
					var mainBoxHeight = $(this).find('.main-box-in-row').outerHeight() - headerBoxHeight + 39;

					$(this).find('.child-box-in-row .content')
							.wrap('<div class="dashboard-box-scrollbar" style="max-height: '+mainBoxHeight+'px" data-simplebar></div>');
				}
			});

			// Messages Sidebar
			// var messagesList = $(".messages-inbox").outerHeight();
			// var messageWrap = $(".message-content").outerHeight();
			// if ( messagesList > messagesWrap) {
			// 	$(messagesList).css({
			// 		'max-height': messageWrap,
			// 	});
			// }
		}
	});

      },[])
    return (
        <>
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
                      <li className="active"><NavLink to="/message"><i className="icon-material-outline-question-answer" /> Messages <span className="nav-tag">2</span></NavLink></li>
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
                          <li><NavLink to="/managetask">Manage Tasks <span className="nav-tag">2</span></NavLink></li>
                          <li><NavLink to="/managebidders">Manage Bidders</NavLink></li>
                          <li><a href="dashboard-my-active-bids.html">My Active Bids <span className="nav-tag">4</span></a></li>
                          <li><NavLink to="/posttask">Post a Task</NavLink></li>
                        </ul>	
                      </li>
                    </ul>
                    <ul data-submenu-title="Account">
                      <li><NavLink to="/setting"><i className="icon-material-outline-settings" /> Settings</NavLink></li>
                      <li><a href="index-logged-out.html"><i className="icon-material-outline-power-settings-new" /> Logout</a></li>
                    </ul>
                  </div>
                </div>
                {/* Navigation / End */}
              </div>
            </div>
          </div>
        </>
    )
}
