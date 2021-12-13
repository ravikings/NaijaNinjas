import React,{useEffect} from 'react'
import {  Route } from 'react-router-dom';


import $ from 'jquery';
import AdminDashboard from '../layout/dashboard/AdminDashboard';
const Admin=(props)=> {
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
      fullPageScrollbar();
    });
    wrapperHeight();
    fullPageScrollbar();
  
  
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
  <div>

     
        {/* Header Container / End */}
        {/* Dashboard Container  */}
        <div className="dashboard-container" style={{marginTop:'100px'}}>
          {/* Dashboard Sidebar
	================================================== */}
        <AdminDashboard />
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
    
      </div>
      
        </>
    )
}
export default Admin;