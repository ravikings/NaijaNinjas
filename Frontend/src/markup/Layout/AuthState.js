import React,{useState , useEffect , useRef} from "react";
import Avatar from "@material-ui/core/Avatar";
import { Link, useHistory } from "react-router-dom";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import { Divider, Hidden } from "@material-ui/core";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";
import FolderSpecialOutlinedIcon from '@material-ui/icons//FolderSpecialOutlined';
import { useStyles } from "./LayoutStyles";
import { useDispatch } from "react-redux";
import { logout } from "../Pages/Auth/Redux/AuthActions";
import ReactButton from "react-bootstrap/Button";
import {Dropdown} from 'react-bootstrap'

function AuthState({ userDetails }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const notificatoinRef = useRef();
  const msgRef = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notification, setNotification] = useState(false);
  const [msg, setMsg] = useState(false);


  const [onlineState, setOnlineState] = useState("Online");
  


  
  
  // Notification end
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const signOut = () => {
    dispatch(logout(handleClose));
    history.push("/");
  };

  useEffect(() => {
    function handler(event) {
      if (!notificatoinRef.current?.contains(event.target)) {
       
        setNotification(false) 
       
      }
      if (!msgRef.current?.contains(event.target)) {
       
        setMsg(false) 
      }
    }
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
}, [])
  return (
    <div>
      {userDetails ? (
        <div
          className='extra-nav d-flex align-items-center justify-content-between'
          style={{ padding: "10px 0px", width: '480' }}
        >
          <Divider orientation='vertical' flexItem />
           {/*  User Notifications */}
      <div className="header-widget hide-on-mobile">
        {/* Notifications */}
        <div ref={notificatoinRef} className={notification ? "header-notifications active" : "header-notifications"}>
          {/* Trigger */}
          <div className="header-notifications-trigger">
           <a href="#" onClick={()=>setNotification(!notification)}><i className="fa fa-bell-o " /><span className="bg-website">4</span></a>
          </div>
          {/* Dropdown */}
          <div className="header-notifications-dropdown">
            <div className="header-notifications-headline">
              <h4>Notifications</h4>
              <Link className="site-button  float-right" title="Mark all as read" data-tippy-placement="left">
                <i className="fa fa-external-link" />
              </Link>
            </div>
            <div className="header-notifications-content">
              <div className="header-notifications-scroll" data-simplebar>
                <ul>
                  {/* Notification */}
                  <li className="notifications-not-read">
                    <a href="dashboard-manage-candidates.html">
                      <span className="notification-icon"><i className="icon-material-outline-group" /></span>
                      <span className="notification-text">
                        <strong>Michael Shannah</strong> applied for a job <span className="color">Full Stack Software Engineer</span>
                      </span>
                    </a>
                  </li>
                  {/* Notification */}
                  <li>
                    <a href="dashboard-manage-bidders.html">
                      <span className="notification-icon"><i className=" icon-material-outline-gavel" /></span>
                      <span className="notification-text">
                        <strong>Gilbert Allanis</strong> placed a bid on your <span className="color">iOS App Development</span> project
                      </span>
                    </a>
                  </li>
                  {/* Notification */}
                  <li>
                    <a href="dashboard-manage-jobs.html">
                      <span className="notification-icon"><i className="icon-material-outline-autorenew" /></span>
                      <span className="notification-text">
                        Your job listing <span className="color">Full Stack PHP Developer</span> is expiring.
                      </span>
                    </a>
                  </li>
                  {/* Notification */}
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
        {/* Messages */}
        <div ref={msgRef} className={msg ? "header-notifications active" : "header-notifications"}>
          <div className="header-notifications-trigger">
          <a href="#"  onClick={()=>setMsg(!msg)}><i className="fa fa-envelope-open-o" /><span className="bg-website">4</span></a>
          </div>
          {/* Dropdown */}
          <div className="header-notifications-dropdown">
            <div className="header-notifications-headline">
              <h4>Messages</h4>
              <Link to="#" className="mark-as-read btn btn-primary float-right" title="Mark all as read" data-tippy-placement="left">
                <i className="fa fa-external-link" />
              </Link>
            </div>
            <div className="header-notifications-content">
              <div className="header-notifications-scroll" data-simplebar>
                <ul>
                  {/* Notification */}
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
                  {/* Notification */}
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
                  {/* Notification */}
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
            <a href="#" className="header-notifications-button ripple-effect button-sliding-icon ">View All Messages<i className="icon-material-outline-arrow-right-alt" /></a>
          </div>
        </div>
      </div>
      {/*  User Notifications / End */}
      {/* old notification start */}
     
          {/* old notificaton end */}
          <Divider orientation='vertical' flexItem />
          <div>
            <Avatar
              aria-describedby={id}
              onClick={handleClick}
              style={{ height: "55px", width: "55px" }}
              sizes={"20"}
              src={
                "https://image.shutterstock.com/image-photo/young-man-studio-looking-cameraportrait-260nw-139246634.jpg"
              }
            >
              K
            </Avatar>
          </div>
          <Divider orientation='vertical' flexItem />

          <ReactButton
            style={{
              borderRadius: "2px",
              marginLeft: 10,
              padding: "17px 50px",
              fontSize: "22px",
              fontWeight: "bold",
            }}
           
            onClick={()=>history.push('/post-ads')}
            variant='warning'
            size='lg'
          >
            <i className='fa-solid fa-hand-holding-dollar'></i>
            Sell On Here!
          </ReactButton>
        </div>
      ) : (
        <Hidden xsDown>
          <div
            className='extra-nav d-flex align-items-center justify-content-end'
            style={{ padding: "20px 0px", width: 500 }}
          >
            <Link to={"/register"} className='site-button'>
              <i className='fa fa-user'></i> SIGNUP
            </Link>
            <Link to={"/login"} title='READ MORE' className='site-button'>
              <i className='fa fa-lock'></i> LOGIN{" "}
            </Link>
            <ReactButton
              style={{
                borderRadius: "2px",
                marginLeft: 10,
                padding: "17px 50px",
                fontSize: "22px",
                fontWeight: "bold",
                color: "white",
              }}
              variant='warning'
              size='lg'
              onClick={()=>history.push('/post-ads')}
              to="/post-ads"
            >
              <i class='fa-solid fa-hand-holding-dollar'></i>
              Sell On Here!
            </ReactButton>
          </div>
        </Hidden>
      )}
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        style={{ left: 40, top: 10 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <div style={{ margin: "20px 20px 0px 20px" }}>
          <Button
            style={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              width: 100,
              textTransform: "none",
            }}
            className={
              onlineState === "Online"
                ? classes.onlineSelected
                : classes.onlineInvisButtonNotSelected
            }
            color='primary'
            onClick={() => setOnlineState("Online")}
          >
            Online
          </Button>
          <Button
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              width: 100,
              textTransform: "none",
            }}
            className={
              onlineState === "Invisible"
                ? classes.invisibleSelected
                : classes.onlineInvisButtonNotSelected
            }
            color='primary'
            onClick={() => setOnlineState("Invisible")}
          >
            Invisible
          </Button>
        </div>
        <Divider style={{ margin: "20px 0px" }} />
        <div style={{ paddingBottom: 20, paddingLeft: 20 }}>
          <div
            onClick={() => history.push("/jobs-profile")}
            className={classes.listItem}
          >
            <DashboardOutlinedIcon style={{ marginRight: 8 }} />
            <div>Dashboard</div>
          </div>
          <div
            onClick={signOut}
            className={classes.listItem}
            style={{
              marginTop: 12,
            }}
          >
            <PowerSettingsNewOutlinedIcon style={{ marginRight: 8 }} />
            Explore
          </div>
          <div
            style={{
              marginTop: 12,
            }}
            className={classes.listItem}
          >
            <SettingsOutlinedIcon style={{ marginRight: 8 }} />
            Settings
          </div>
          <div
            style={{
              marginTop: 12,
            }}
            className={classes.listItem}
            onClick={()=>history.push('/contract-proposal')}
          >
            <FolderSpecialOutlinedIcon style={{ marginRight: 8 }} />
            Contract/Order
          </div>
          <div
            onClick={signOut}
            className={classes.listItem}
            style={{
              marginTop: 12,
            }}
          >
            <PowerSettingsNewOutlinedIcon style={{ marginRight: 8 }} />
            Logout
          </div>
        </div>
      </Popover>
    </div>
  );
}

export default AuthState;
