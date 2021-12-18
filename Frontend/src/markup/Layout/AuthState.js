import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import createRequest from "../../utils/axios";
import Badge from "@material-ui/core/Badge";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import { Divider } from "@material-ui/core";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";
import { useStyles } from "./LayoutStyles";

function AuthState({ userDetails, handleShow }) {
  const classes = useStyles();
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
    createRequest()
      .post("/dj-rest-auth/logout/")
      .then((res) => {
        handleClose();
        userDetails.signOut();
      });
  };

  return (
    <div>
      {userDetails.isAuthenticated ? (
        <div
          className="extra-nav d-flex align-items-center justify-content-between"
          style={{ padding: "10px 0px", width: 200 }}
        >
          <Divider orientation="vertical" flexItem />
          <div>
            <Badge badgeContent={4} color="primary">
              <Link
                to={"/messages"}
                style={{ display: "flex", alignItems: "center" }}
              >
                <MailOutlineOutlinedIcon color="action" />
              </Link>
            </Badge>
          </div>
          <div>
            <Badge badgeContent={8} color="primary">
              <NotificationsNoneOutlinedIcon color="action" />
            </Badge>
          </div>
          <Divider orientation="vertical" flexItem />
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
        </div>
      ) : (
        <div className="extra-nav">
          <div className="extra-cell">
            <Link to={"/register"} className="site-button">
              <i className="fa fa-user"></i> Sign Up
            </Link>
            <Link to={"/login"} title="READ MORE" className="site-button">
              <i className="fa fa-lock"></i> login{" "}
            </Link>
          </div>
        </div>
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
            color="primary"
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
            color="primary"
            onClick={() => setOnlineState("Invisible")}
          >
            Invisible
          </Button>
        </div>
        <Divider style={{ margin: "20px 0px" }} />
        <div style={{ paddingBottom: 20, paddingLeft: 20 }}>
          <div className={classes.listItem}>
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
