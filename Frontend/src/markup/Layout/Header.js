import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useUser} from '../Context/AuthContext';
import logo2 from './../../images/logo.png';
import AuthState from "./AuthState";
import LoginDialog from "./LoginDialog";

var bnr3 = require('./../../images/background/bg3.jpg');


function Header() {

    const userDetails = useUser();
    const [showLoginDialog, setShowLoginDialog] = useState(false)

    const handleClose = () => {
        setShowLoginDialog(false)
    };
    const handleShow = () => {
        setShowLoginDialog(true)
    };

    useEffect(() => {
        // sidebar open/close

        var Navicon = document.querySelector('.navicon');
        var sidebarmenu = document.querySelector('.myNavbar ');

        function toggleFunc() {
            sidebarmenu.classList.toggle('show');
            //   Navicon.classList.toggle('open');
        }

        Navicon.addEventListener('click', toggleFunc);

        // Sidenav li open close
        var navUl = [].slice.call(document.querySelectorAll('.navbar-nav > li > a, .sub-menu > li > a'));
        for (var y = 0; y < navUl.length; y++) {
            navUl[y].addEventListener('click', function () {
                checkLi(this)
            });
        }

        function checkLi(current) {
            current.parentElement.parentElement.querySelectorAll("li").forEach(el =>
                (current.parentElement !== el) ? el.classList.remove('open') : ''
            );
            setTimeout(() => {
                current.parentElement.classList.toggle('open');
            }, 100);
        }
    }, [])


    return (
        <>
            <header className="site-header mo-left header fullwidth" style={{position:"sticky", top:0}}>
                <div className="sticky-header main-bar-wraper navbar-expand-lg">
                    <div className="main-bar clearfix">
                        <div className="container clearfix">

                            <div className="logo-header mostion">
                                <Link to={"/"}><img src={logo2} className="logo" alt="img"/></Link>
                            </div>

                            <button className="navbar-toggler collapsed navicon  justify-content-end" type="button"
                                    data-toggle="collapse" data-target="#navbarNavDropdown"
                                    aria-controls="navbarNavDropdown" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                            <AuthState userDetails={userDetails} handleShow={handleShow}/>
                            <div className="header-nav navbar-collapse collapse myNavbar justify-content-start"
                                 id="navbarNavDropdown">
                                <div className="logo-header mostion d-md-block d-lg-none">
                                    <Link to={'/'} className="dez-page"><img src={logo2} alt=""/></Link>
                                </div>
                                <ul className="nav navbar-nav">
                                    <li className="">

                                        <Link to={'#'}>Home <i className="fa fa-chevron-down"></i></Link>
                                        <ul className="sub-menu">
                                            <li><Link to={"./"} className="dez-page">Home 1</Link></li>
                                            <li><Link to={"/index-2"} className="dez-page">Home 2</Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to={'#'}>For Candidates <i className="fa fa-chevron-down"></i></Link>
                                        <ul className="sub-menu">
                                            <li><Link to={"/jobs-profile"} className="dez-page">My Profile<span
                                                className="new-page">New</span></Link></li>
                                            <li><Link to={"/jobs-my-resume"} className="dez-page">My Resume <span
                                                className="new-page">New</span></Link></li>
                                            <li><Link to={"/jobs-applied-job"} className="dez-page">Applied Job <span
                                                className="new-page">New</span></Link></li>
                                            <li><Link to={"/jobs-alerts"} className="dez-page">Jobs Alerts <span
                                                className="new-page">New</span></Link></li>
                                            <li><Link to={"/jobs-saved-jobs"} className="dez-page">Saved Job <span
                                                className="new-page">New</span></Link></li>
                                            <li><Link to={"/jobs-cv-manager"} className="dez-page">CV Manager <span
                                                className="new-page">New</span></Link></li>
                                            <li><Link to={"/jobs-change-password"} className="dez-page">Change
                                                Password <span className="new-page">New</span></Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to={'#'}>For Employers <i className="fa fa-chevron-down"></i></Link>
                                        <ul className="sub-menu">
                                            <li><Link to={"/company-profile"} className="dez-page">Company Profile <span
                                                className="new-page">New</span></Link></li>
                                            <li><Link to={"/company-resume"} className="dez-page">Employer Resume <span
                                                className="new-page">New</span></Link></li>
                                            <li><Link to={"/company-post-jobs"} className="dez-page">Post A Jobs <span
                                                className="new-page">New</span></Link></li>
                                            <li><Link to={"/company-manage-job"} className="dez-page">Manage jobs <span
                                                className="new-page">New</span></Link></li>
                                            <li><Link to={"/company-transactions"}
                                                      className="dez-page">Transactions <span
                                                className="new-page">New</span></Link></li>
                                            <li><Link to={"/browse-candidates"} className="dez-page">Browse
                                                Candidates</Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to={'#'}>Pages <i className="fa fa-chevron-down"></i></Link>
                                        <ul className="sub-menu">
                                            <li><Link to={"/about-us"} className="dez-page">About Us</Link></li>
                                            <li><Link to={"/job-detail"} className="dez-page">Job Detail</Link></li>
                                            <li><Link to={"/companies"} className="dez-page">companies</Link></li>
                                            <li><Link to={"/free-job-alerts"} className="dez-page">free job alerts <span
                                                className="new-page">New</span></Link></li>
                                            <li><Link to={""} className="dez-page">Browse Job <i
                                                className="fa fa-angle-right"></i></Link>
                                                <ul className="sub-menu">
                                                    <li><Link to={"/browse-job-list"} className="dez-page">browse job
                                                        list</Link></li>
                                                    <li><Link to={"/browse-job-grid"} className="dez-page">browse job
                                                        grid <span className="new-page">New</span></Link></li>
                                                    <li><Link to={"/browse-job-filter-list"} className="dez-page">browse
                                                        filter list <span className="new-page">New</span></Link></li>
                                                    <li><Link to={"/browse-job-filter-grid"} className="dez-page">browse
                                                        filter grid <span className="new-page">New</span></Link></li>
                                                </ul>
                                            </li>
                                            <li><Link to={'#'} className="dez-page">Jobs<i
                                                className="fa fa-angle-right"></i></Link>
                                                <ul className="sub-menu">
                                                    <li><Link to={"/category-all-jobs"} className="dez-page">all
                                                        jobs <span className="new-page">New</span></Link></li>
                                                    <li><Link to={"/category-company-jobs"} className="dez-page">company
                                                        jobs <span className="new-page">New</span></Link></li>
                                                    <li><Link to={"/category-designations-jobs"} className="dez-page">designations
                                                        jobs <span className="new-page">New</span></Link></li>
                                                    <li><Link to={"/category-jobs"} className="dez-page">category
                                                        jobs <span className="new-page">New</span></Link></li>
                                                    <li><Link to={"/category-location-jobs"} className="dez-page">location
                                                        jobs <span className="new-page">New</span></Link></li>
                                                    <li><Link to={"/category-skill-jobs"} className="dez-page">skill
                                                        jobs <span className="new-page">New</span></Link></li>
                                                </ul>
                                            </li>
                                            <li><Link to={'#'} className="dez-page">Portfolio <i
                                                className="fa fa-angle-right"></i></Link>
                                                <ul className="sub-menu">
                                                    <li><Link to={"/portfolio-grid-2"} className="dez-page">Portfolio
                                                        Grid 2 </Link></li>

                                                </ul>
                                            </li>
                                            <li><Link to={'#'} className="dez-page">Login <i
                                                className="fa fa-angle-right"></i></Link>
                                                <ul className="sub-menu">
                                                    <li><Link to={"/login"} className="dez-page">login 1</Link></li>
                                                    <li><Link to={"/login-2"} className="dez-page">login 2 <span
                                                        className="new-page">New</span></Link></li>
                                                    <li><Link to={"/login-3"} className="dez-page">login 3 <span
                                                        className="new-page">New</span></Link></li>
                                                </ul>
                                            </li>
                                            <li><Link to={'#'} className="dez-page">register <i
                                                className="fa fa-angle-right"></i></Link>
                                                <ul className="sub-menu">
                                                    <li><Link to={"/register"} className="dez-page">register 1</Link>
                                                    </li>
                                                    <li><Link to={"/register-2"} className="dez-page">register 2 <span
                                                        className="new-page">New</span></Link></li>
                                                </ul>
                                            </li>
                                            <li><Link to={"/error-404"} className="dez-page">Error 404</Link></li>

                                            <li><Link to={"/contact"} className="dez-page">Contact Us</Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to={'#'}>Blog <i className="fa fa-chevron-down"></i></Link>
                                        <ul className="sub-menu">
                                            <li><Link to={"/blog-classic"} className="dez-page">Classic</Link></li>
                                            <li><Link to={"/blog-classic-sidebar"} className="dez-page">Classic
                                                Sidebar</Link></li>
                                            <li><Link to={"/blog-detailed-grid"} className="dez-page">Detailed
                                                Grid</Link></li>
                                            <li><Link to={"/blog-detailed-grid-sidebar"} className="dez-page">Detailed
                                                Grid Sidebar</Link></li>
                                            <li><Link to={"/blog-left-img"} className="dez-page">Left Image
                                                Sidebar</Link></li>
                                            <li><Link to={"/blog-details"} className="dez-page">Blog Details</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/*  Model Start */}
            <LoginDialog showLoginDialog={showLoginDialog} handleClose={handleClose}/>
        </>
    )

}

export default Header;

