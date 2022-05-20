import React from "react";
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const [msgAnchorEl, setMsgAnchorEl] = React.useState(null);

  const [onlineState, setOnlineState] = React.useState("Online");

  // Notification start
  
  const NotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const NotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const notificationOpen = Boolean(notificationAnchorEl);
  const notificationId = notificationOpen ? 'simple-popover' : undefined;

  // Notification end
 
  // msg start
  
  const MsgClick = (event) => {
    setMsgAnchorEl(event.currentTarget);
  };

  const MsgClose = () => {
    setMsgAnchorEl(null);
  };

  const MsgOpen = Boolean(msgAnchorEl);
  const MsgId = MsgOpen ? 'simple-popover' : undefined;

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

  return (
    <div>
      {userDetails ? (
        <div
          className='extra-nav d-flex align-items-center justify-content-between'
          style={{ padding: "10px 0px", width: 480 }}
        >
          <Divider orientation='vertical' flexItem />
          <div>
            <Badge badgeContent={4} color='primary' onClick={MsgClick}>
           
                <MailOutlineOutlinedIcon color='action' />
             
            </Badge>
            <Popover
        id={MsgId}
        open={MsgOpen}
        anchorEl={msgAnchorEl}
        onClose={MsgClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
            <div className="cent">{/* Fold this div and try deleting evrything inbetween */}
        <div className="sec new">
          <a href="https://codepen.io/Golez/">
            <div className="profCont">
              <img className="profile" src="https://c1.staticflickr.com/5/4007/4626436851_5629a97f30_b.jpg" />
            </div>
            <div className="txt">James liked your post: "Pure css notification box"</div>
            <div className="txt sub">11/7 - 2:30 pm</div>
          </a>
        </div>
        <div className="sec new">
          <a href="https://codepen.io/Golez/">
            <div className="profCont">
              <img className="profile" src="https://obamawhitehouse.archives.gov/sites/obamawhitehouse.archives.gov/files/styles/person_medium_photo/public/person-photo/amanda_lucidon22.jpg?itok=JFPi8OFJ" />
            </div>
            <div className="txt">Annita liked your post: "Pure css notification box"</div>
            <div className="txt sub">11/7 - 2:13 pm</div>
          </a>
        </div>
        <div className="sec">
          <a href="https://codepen.io/Golez/">
            <div className="profCont">
              <img className="profile" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3O45RK9qyCrZJivYsY6PmeVEJH07l7bkoolJmscBsNjzump27" />
            </div>
            <div className="txt">Brie liked your post: "Pure css notification box"</div>
            <div className="txt sub">11/6 - 9:35 pm</div>
          </a>
        </div>
        <div className="sec">
          <a href="https://codepen.io/Golez/">
            <div className="profCont">
              <img className="profile" src="https://c1.staticflickr.com/4/3725/10214643804_75c0b6eeab_b.jpg" />
            </div>
            <div className="txt">Madison liked your post: "Pure css notification box"</div>
            <div className="txt sub">11/6 - 4:04 pm</div>
          </a>
        </div>
        <div className="sec">
          <a href="https://codepen.io/Golez/">
            <div className="profCont">
              <img className="profile" src="https://upload.wikimedia.org/wikipedia/commons/5/52/NG_headshot_white_shirt_square_Jan18.jpg" />
            </div>
            <div className="txt">Ted liked your post: "Pure css notification box"</div>
            <div className="txt sub">11/6 - 10:37 am</div>
          </a>
        </div>
        <div className="sec">
          <a href="https://codepen.io/Golez/">
            <div className="profCont">
              <img className="profile" src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Pat-headshot-square.jpg" />
            </div>
            <div className="txt">Tommas liked your post: "Pure css notification box"</div>
            <div className="txt sub">11/5 - 7:30 pm</div>
          </a>
        </div>
        <div className="sec">
          <a href="https://codepen.io/Golez/">
            <div className="profCont">
              <img className="profile" src="https://c1.staticflickr.com/8/7407/13785133614_6254abb8c4.jpg" />
            </div>
            <div className="txt">Claire liked your post: "Pure css notification box"</div>
            <div className="txt sub">11/5 - 2:30 pm</div>
          </a>
        </div>
        <div className="sec">
          <a href="https://codepen.io/Golez/">
            <div className="profCont">
              <img className="profile" src="//c1.staticflickr.com/1/185/440890151_54c5b920b0_b.jpg" />
            </div>
            <div className="txt">Jerimaiah liked your post: "Pure css notification box"</div>
            <div className="txt sub">11/5 - 1:34 pm</div>
          </a>
        </div>
        <div className="sec">
          <a href="https://codepen.io/Golez/">
            <div className="profCont">
              <img className="profile" src="//c2.staticflickr.com/4/3397/3585544855_28442029a5_z.jpg?zz=1" />
            </div>
            <div className="txt">Debra liked your post: "Pure css notification box"</div>
            <div className="txt sub">11/5 - 10:20 am</div>
          </a>
        </div>
      </div>

        </Popover>
          </div>
          <div>
          <Badge badgeContent={4} color='primary' onClick={NotificationClick}>
             
                <NotificationsNoneOutlinedIcon color='action' />
        
            </Badge>
            <Popover
        id={notificationId}
        open={notificationOpen}
        anchorEl={notificationAnchorEl}
        onClose={NotificationClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
       <div className="notication-box">
           <div className="notication-title">Notification</div>
         
         <div className="sec new">
      
          <div className="txt">Annita liked your post: "Pure css notification box"</div>
          <div className="txt sub">11/7 - 2:13 pm</div>
       
      </div>
         <div className="sec ">
      
          <div className="txt">Annita liked your post: "Pure css notification box"</div>
          <div className="txt sub">11/7 - 2:13 pm</div>
        
      </div>
         <div className="sec">
       
          <div className="txt">Annita liked your post: "Pure css notification box"</div>
          <div className="txt sub">11/7 - 2:13 pm</div>
        
      </div>
       </div>
      </Popover>
          </div>
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
