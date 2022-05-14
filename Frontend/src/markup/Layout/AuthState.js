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
import { useStyles } from "./LayoutStyles";
import { useDispatch } from "react-redux";
import { logout } from "../Pages/Auth/Redux/AuthActions";
import ReactButton from "react-bootstrap/Button";

function AuthState({ userDetails }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [onlineState, setOnlineState] = React.useState("Online");
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
            <Badge badgeContent={4} color='primary'>
              <Link
                to={"/messages"}
                style={{ display: "flex", alignItems: "center" }}
              >
                <MailOutlineOutlinedIcon color='action' />
              </Link>
            </Badge>
          </div>
          <div>
            <Badge badgeContent={8} color='primary'>
              <NotificationsNoneOutlinedIcon color='action' />
            </Badge>
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
            variant='warning'
            size='lg'
          >
            <i class='fa-solid fa-hand-holding-dollar'></i>
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
            style={{
              marginTop: 12,
            }}
            className={classes.listItem}
          >
            <SettingsOutlinedIcon style={{ marginRight: 8 }} />
            Settings
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
