import React,{useEffect,useState} from 'react'
import { NavLink,Link,useHistory} from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import axios from 'axios'

import * as AiIcons from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Modal} from 'react-bootstrap'

import './Navbar.css';
import { IconContext } from 'react-icons';
import swal from 'sweetalert';
import url from '../../baseUrl'
const Navbar=() =>{
   
  const [sidebar, setSidebar] = useState(false);
  const [login, setLogin] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const showSidebar = () => setSidebar(!sidebar);
// login auth start
const loginAuth=(e)=>{
  e.preventDefault();

  // setLoader(true)
  // axios post data
  var form = new FormData();
  form.append("email", email);
  form.append("password", password);
axios({
method: 'POST',
url: `${url.url}api/login`,
data:form
})
.then((response) => {
 
  var data=response.data;

if(data.status==true){
  localStorage.setItem('token',data.token);
  localStorage.setItem('id',data.id)
  localStorage.setItem('fname',data.Fname)

  // swal("successfully!", "You are successfully logged in!", "success");
  handleClose(false)
  history.push("/message")
}
else  if(data.status!=="true"){
  // setLoader(false)
  swal("Incorrect!", "user name or password incorrect!", "warning");


}
console.log(response.data);
}, (error) => {
console.log(error);
});
}
// login auth end
    return (
        <>
              {/* Header Container
================================================== */}
        <header id="header-container" className="fullwidth">
          {/* Header */}
          <div id="header">
            <div className="container">
              {/* Left Side Content */}
              <div className="left-side">
                {/* Logo */}
                <div id="logo">
                  <NavLink to="/"><img src="images/logo.png" alt="" /></NavLink>
                </div>
                {/* Main Navigation */}
                <nav id="navigation">
                  <ul id="responsive">
                    <li><NavLink to="/" activeClassName="current">Home</NavLink></li>
                    <li><NavLink to="/profile" activeClassName="current">Find Company</NavLink></li>
                    <li><NavLink to="/message" activeClassName="current"> Find Freelancer</NavLink></li>
                    {/*<li><a href="#">Find Work</a>
                      <ul className="dropdown-nav">
                        <li><a href="#">Browse Jobs</a>
                          <ul className="dropdown-nav">
                            <li><a href="jobs-list-layout-full-page-map.html">Full Page List + Map</a></li>
                            <li><a href="jobs-grid-layout-full-page-map.html">Full Page Grid + Map</a></li>
                            <li><a href="jobs-grid-layout-full-page.html">Full Page Grid</a></li>
                            <li><a href="jobs-list-layout-1.html">List Layout 1</a></li>
                            <li><a href="jobs-list-layout-2.html">List Layout 2</a></li>
                            <li><a href="jobs-grid-layout.html">Grid Layout</a></li>
                          </ul>
                        </li>
                        <li><a href="#">Browse Tasks</a>
                          <ul className="dropdown-nav">
                            <li><a href="tasks-list-layout-1.html">List Layout 1</a></li>
                            <li><a href="tasks-list-layout-2.html">List Layout 2</a></li>
                            <li><a href="tasks-grid-layout.html">Grid Layout</a></li>
                            <li><a href="tasks-grid-layout-full-page.html">Full Page Grid</a></li>
                          </ul>
                        </li>
                        <li><a href="browse-companies.html">Browse Companies</a></li>
                        <li><a href="single-job-page.html">Job Page</a></li>
                        <li><a href="single-task-page.html">Task Page</a></li>
                        <li><a href="single-company-profile.html">Company Profile</a></li>
                      </ul>
                    </li>
                    <li><a href="#">For Employers</a>
                      <ul className="dropdown-nav">
                        <li><a href="#">Find a Freelancer</a>
                          <ul className="dropdown-nav">
                            <li><a href="freelancers-grid-layout-full-page.html">Full Page Grid</a></li>
                            <li><a href="freelancers-grid-layout.html">Grid Layout</a></li>
                            <li><a href="freelancers-list-layout-1.html">List Layout 1</a></li>
                            <li><a href="freelancers-list-layout-2.html">List Layout 2</a></li>
                          </ul>
                        </li>
                        <li><a href="single-freelancer-profile.html">Freelancer Profile</a></li>
                        <li><a href="dashboard-post-a-job.html">Post a Job</a></li>
                        <li><a href="dashboard-post-a-task.html">Post a Task</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Dashboard</a>
                      <ul className="dropdown-nav">
                        <li><a href="dashboard.html">Dashboard</a></li>
                        <li><a href="dashboard-messages.html">Messages</a></li>
                        <li><a href="dashboard-bookmarks.html">Bookmarks</a></li>
                        <li><a href="dashboard-reviews.html">Reviews</a></li>
                        <li><a href="dashboard-manage-jobs.html">Jobs</a>
                          <ul className="dropdown-nav">
                            <li><a href="dashboard-manage-jobs.html">Manage Jobs</a></li>
                            <li><a href="dashboard-manage-candidates.html">Manage Candidates</a></li>
                            <li><a href="dashboard-post-a-job.html">Post a Job</a></li>
                          </ul>
                        </li>
                        <li><a href="dashboard-manage-tasks.html">Tasks</a>
                          <ul className="dropdown-nav">
                            <li><a href="dashboard-manage-tasks.html">Manage Tasks</a></li>
                            <li><a href="dashboard-manage-bidders.html">Manage Bidders</a></li>
                            <li><a href="dashboard-my-active-bids.html">My Active Bids</a></li>
                            <li><a href="dashboard-post-a-task.html">Post a Task</a></li>
                          </ul>
                        </li>
                        <li><a href="dashboard-settings.html">Settings</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Pages</a>
                      <ul className="dropdown-nav">
                        <li>
                          <a href="#">Open Street Map</a>
                          <ul className="dropdown-nav">
                            <li><a href="jobs-list-layout-full-page-map-OpenStreetMap.html">Full Page List + Map</a></li>
                            <li><a href="jobs-grid-layout-full-page-map-OpenStreetMap.html">Full Page Grid + Map</a></li>
                            <li><a href="single-job-page-OpenStreetMap.html">Job Page</a></li>
                            <li><a href="single-company-profile-OpenStreetMap.html">Company Profile</a></li>
                            <li><a href="pages-contact-OpenStreetMap.html">Contact</a></li>
                            <li><a href="jobs-list-layout-1-OpenStreetMap.html">Location Autocomplete</a></li>
                          </ul>
                        </li>
                        <li><a href="pages-blog.html">Blog</a></li>
                        <li><a href="pages-pricing-plans.html">Pricing Plans</a></li>
                        <li><a href="pages-checkout-page.html">Checkout Page</a></li>
                        <li><a href="pages-invoice-template.html">Invoice Template</a></li>
                        <li><a href="pages-user-interface-elements.html">User Interface Elements</a></li>
                        <li><a href="pages-icons-cheatsheet.html">Icons Cheatsheet</a></li>
                        <li><a href="pages-login.html">Login &amp; Register</a></li>
                        <li><a href="pages-404.html">404 Page</a></li>
                        <li><a href="pages-contact.html">Contact</a></li>
                      </ul>
                    </li>
*/}
                  </ul>
                </nav>
                <div className="clearfix" />
                {/* Main Navigation / End */}
              </div>
              {/* Left Side Content / End */}
              {/* Right Side Content / End */}
              <div className="right-side">
                {/*  User Notifications */}
              {login ?
              <span>
                <div className="header-widget hide-on-mobile">
                 
                  <div className="header-notifications">
                  
                    <div className="header-notifications-trigger">
                      <a href="#"><i className="icon-feather-bell" /><span>4</span></a>
                    </div>
                   
                    <div className="header-notifications-dropdown">
                      <div className="header-notifications-headline">
                        <h4>Notifications</h4>
                        <button className="mark-as-read ripple-effect-dark" title="Mark all as read" data-tippy-placement="left">
                          <i className="icon-feather-check-square" />
                        </button>
                      </div>
                      <div className="header-notifications-content">
                        <div className="header-notifications-scroll" data-simplebar>
                          <ul>
                          
                            <li className="notifications-not-read">
                              <a href="dashboard-manage-candidates.html">
                                <span className="notification-icon"><i className="icon-material-outline-group" /></span>
                                <span className="notification-text">
                                  <strong>Michael Shannah</strong> applied for a job <span className="color">Full Stack Software Engineer</span>
                                </span>
                              </a>
                            </li>
                            
                            <li>
                              <a href="dashboard-manage-bidders.html">
                                <span className="notification-icon"><i className=" icon-material-outline-gavel" /></span>
                                <span className="notification-text">
                                  <strong>Gilbert Allanis</strong> placed a bid on your <span className="color">iOS App Development</span> project
                                </span>
                              </a>
                            </li>
                         
                            <li>
                              <a href="dashboard-manage-jobs.html">
                                <span className="notification-icon"><i className="icon-material-outline-autorenew" /></span>
                                <span className="notification-text">
                                  Your job listing <span className="color">Full Stack PHP Developer</span> is expiring.
                                </span>
                              </a>
                            </li>
                           
                            <li>
                              <a href="dashboard-manage-candidates.html">
                                <span className="notification-icon"><i className="icon-material-outline-group" /></span>
                                <span className="notification-text">
                                  <strong>Sindy Forrest</strong> applied for a job <span className="color">Full Stack Software Engineer</span>
                                </span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                  <div className="header-notifications">
                    <div className="header-notifications-trigger">
                      <a href="#"><i className="icon-feather-mail" /><span>3</span></a>
                    </div>
                   
                    <div className="header-notifications-dropdown">
                      <div className="header-notifications-headline">
                        <h4>Messages</h4>
                        <button className="mark-as-read ripple-effect-dark" title="Mark all as read" data-tippy-placement="left">
                          <i className="icon-feather-check-square" />
                        </button>
                      </div>
                      <div className="header-notifications-content">
                        <div className="header-notifications-scroll" data-simplebar>
                          <ul>
                            
                            <li className="notifications-not-read">
                              <a href="dashboard-messages.html">
                                <span className="notification-avatar status-online"><img src="images/user-avatar-small-03.jpg" alt="" /></span>
                                <div className="notification-text">
                                  <strong>David Peterson</strong>
                                  <p className="notification-msg-text">Thanks for reaching out. I'm quite busy right now on many...</p>
                                  <span className="color">4 hours ago</span>
                                </div>
                              </a>
                            </li>
                            
                            <li className="notifications-not-read">
                              <a href="dashboard-messages.html">
                                <span className="notification-avatar status-offline"><img src="images/user-avatar-small-02.jpg" alt="" /></span>
                                <div className="notification-text">
                                  <strong>Sindy Forest</strong>
                                  <p className="notification-msg-text">Hi Tom! Hate to break it to you, but I'm actually on vacation until...</p>
                                  <span className="color">Yesterday</span>
                                </div>
                              </a>
                            </li>
                          
                            <li className="notifications-not-read">
                              <a href="dashboard-messages.html">
                                <span className="notification-avatar status-online"><img src="images/user-avatar-placeholder.png" alt="" /></span>
                                <div className="notification-text">
                                  <strong>Marcin Kowalski</strong>
                                  <p className="notification-msg-text">I received payment. Thanks for cooperation!</p>
                                  <span className="color">Yesterday</span>
                                </div>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <a href="dashboard-messages.html" className="header-notifications-button ripple-effect button-sliding-icon">View All Messages<i className="icon-material-outline-arrow-right-alt" /></a>
                    </div>
                  </div>
                </div>
           
                <div className="header-widget">
                
                  <div className="header-notifications user-menu">
                    <div className="header-notifications-trigger">
                      <a href="#"><div className="user-avatar status-online"><img src="images/user-avatar-small-01.jpg" alt="" /></div></a>
                    </div>
                   
                    <div className="header-notifications-dropdown">
                    
                      <div className="user-status">
                      
                        <div className="user-details">
                          <div className="user-avatar status-online"><img src="images/user-avatar-small-01.jpg" alt="" /></div>
                          <div className="user-name">
                            Tom Smith <span>Freelancer</span>
                          </div>
                        </div>
                   
                        <div className="status-switch" id="snackbar-user-status">
                          <label className="user-online current-status">Online</label>
                          <label className="user-invisible">Invisible</label>
                         
                          <span className="status-indicator" aria-hidden="true" />
                        </div>	
                      </div>
                      <ul className="user-menu-small-nav">
                        <li><a href="dashboard.html"><i className="icon-material-outline-dashboard" /> Dashboard</a></li>
                        <li><a href="dashboard-settings.html"><i className="icon-material-outline-settings" /> Settings</a></li>
                        <li><a href="index-logged-out.html"><i className="icon-material-outline-power-settings-new" /> Logout</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
               </span>
             :
                
             
                <div className="header-widget">
        <a href="javascript:void()" className=" log-in-button" onClick={handleShow}><i className="icon-feather-log-in" /> <span>Log In / Register</span></a>
      </div> 
  
      }
                {/* login end */}
                {/* Mobile Navigation Button */}


                <span className="my-menu" onClick={showSidebar}>
                  <FiMenu className="menu-icon" />
                </span>
              </div>
              {/* Right Side Content / End */}
            </div>
          </div>
          {/* Header / End */}
        </header>
        <div className="clearfix" />
        {/* Header Container / End */}  


        {/* mobile menu start */}
        <IconContext.Provider value={{ color: '#fff' }}>
       
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items text-center' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
           <li className="nav-text">
           <NavLink to="/" activeClassName="current">Home</NavLink>
           </li>
           <li className="nav-text">
           <NavLink to="/profile" activeClassName="current">Find Company</NavLink>
           </li>
           <li className="nav-text">
           <NavLink to="/message" activeClassName="current">Find Freelancer</NavLink>
           </li>
          </ul>
        </nav>
      </IconContext.Provider>
        {/* mobile menu end */}
        {/* {showBox ?
        <Loginpop position={showBox} />
        : null } */}

              {/* Sign In Popup
================================================== */}
<Modal
        show={show}
        onHide={handleClose}
        
        
      >
       

      {/* <div id="sign-in-dialog" > */}
        {/*Tabs */}
       
        <div className="sign-in-form">
          <ul className="popup-tabs-nav">
            <li><a href="#login">Log In</a></li>
            <li><a href="#register">Register</a></li>
          </ul>
          <div className="popup-tabs-container">
            {/* Login */}
            <div className="popup-tab-content" id="login">
              {/* Welcome Text */}
              <div className="welcome-text">
                <h3>We're glad to see you again!</h3>
                <span>Don't have an account? <a href="#" className="register-tab">Sign Up!</a></span>
              </div>
              {/* Form */}
              <form  onSubmit={loginAuth} >
                <div className="input-with-icon-left">
                  <i className="icon-material-baseline-mail-outline" />
                  <input type="text"  className="input-text with-border" onChange={(e) => setEmail(e.target.value)} value={email}  id="emailaddress" placeholder="Email Address" required />
                </div>
                <div className="input-with-icon-left">
                  <i className="icon-material-outline-lock" />
                  <input type="password" className="input-text with-border" onChange={(e) => setPassword(e.target.value)} value={password}  id="password" placeholder="Password" required />
                </div>
                <a href="#" className="forgot-password">Forgot Password?</a>
              <button className="button full-width button-sliding-icon ripple-effect" type="submit" >Log In <i className="icon-material-outline-arrow-right-alt" /></button>
              </form>
              {/* Button */}
              {/* Social Login */}
              <div className="social-login-separator"><span>or</span></div>
              <div className="social-login-buttons">
                <button className="facebook-login ripple-effect"><i className="icon-brand-facebook-f" /> Log In via Facebook</button>
                <button className="google-login ripple-effect"><i className="icon-brand-google-plus-g" /> Log In via Google+</button>
              </div>
            </div>
            {/* Register */}
            <div className="popup-tab-content" id="register">
              {/* Welcome Text */}
              <div className="welcome-text">
                <h3>Let's create your account!</h3>
              </div>
              {/* Account Type */}
              <div className="account-type">
                <div>
                  <input type="radio" name="account-type-radio" id="freelancer-radio" className="account-type-radio" defaultChecked />
                  <label htmlFor="freelancer-radio" className="ripple-effect-dark"><i className="icon-material-outline-account-circle" /> Task-Runner</label>
                </div>
                <div>
                  <input type="radio" name="account-type-radio" id="employer-radio" className="account-type-radio" />
                  <label htmlFor="employer-radio" className="ripple-effect-dark"><i className="icon-material-outline-business-center" /> Employer</label>
                </div>
              </div>
              {/* Form */}
              <form method="post" id="register-account-form">
                <div className="input-with-icon-left">
                  <i className="icon-material-baseline-mail-outline" />
                  <input type="text" className="input-text with-border" name="emailaddress-register" id="phoneno-register" placeholder="Phone number" required />
                </div>
                <div className="input-with-icon-left">
                  <i className="icon-material-baseline-mail-outline" />
                  <input type="text" className="input-text with-border" name="emailaddress-register" id="emailaddress-register" placeholder="Email Address" required />
                </div>
                <div className="input-with-icon-left" title="Should be at least 8 characters long" data-tippy-placement="bottom">
                  <i className="icon-material-outline-lock" />
                  <input type="password" className="input-text with-border" name="password-register" id="password-register" placeholder="Password" required />
                </div>
                <div className="input-with-icon-left">
                  <i className="icon-material-outline-lock" />
                  <input type="password" className="input-text with-border" name="password-repeat-register" id="password-repeat-register" placeholder="Repeat Password" required />
                </div>
              </form>
              {/* Button */}
              <button className="margin-top-10 button full-width button-sliding-icon ripple-effect" type="submit" form="register-account-form">Register <i className="icon-material-outline-arrow-right-alt" /></button>
              {/* Social Login */}
              <div className="social-login-separator"><span>or</span></div>
              <div className="social-login-buttons">
                <button className="facebook-login ripple-effect"><i className="icon-brand-facebook-f" /> Register via Facebook</button>
                <button className="google-login ripple-effect"><i className="icon-brand-google-plus-g" /> Register via Google+</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
        </>
    )
}
export default Navbar;
