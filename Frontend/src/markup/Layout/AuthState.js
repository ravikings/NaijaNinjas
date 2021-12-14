import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import {Link} from "react-router-dom";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import createRequest from "../../utils/axios";
import Badge from "@material-ui/core/Badge";
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import {Divider} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

function AuthState({userDetails,handleShow}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const signOut = () => {
        createRequest().post('/dj-rest-auth/logout/').then(res=>{
            handleClose();
            userDetails.signOut()
        })
    }

    return (
        <div>
            {userDetails.isAuthenticated ?
                <div className="extra-nav d-flex align-items-center justify-content-between" style={{padding:'10px 0px', width:200}}>
                    <Divider orientation="vertical" flexItem />
                    <div>
                        <Badge badgeContent={4} color="primary">
                            <MailOutlineOutlinedIcon color="action" />
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
                            style={{ height: '55px', width: '55px' }}
                            sizes={'20'}
                            src={"https://image.shutterstock.com/image-photo/young-man-studio-looking-cameraportrait-260nw-139246634.jpg"}>K</Avatar>
                    </div>
                </div> :
                <div className="extra-nav">
                    <div className="extra-cell">
                        <Link to={"/register"} className="site-button"><i
                            className="fa fa-user"></i> Sign Up</Link>
                        <Link to={'/login'} title="READ MORE" className="site-button"><i
                            className="fa fa-lock"></i> login </Link>
                    </div>
                </div>
            }
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>The content of the Popover.</Typography>
                <div style={{textAlign:'center', paddingBottom:20}}>
                    <Button
                        aria-describedby={id}
                        variant="contained"
                        color="primary"
                        onClick={signOut}
                    >
                        Logout
                    </Button>
                </div>

            </Popover>
        </div>
    );
}

export default AuthState;