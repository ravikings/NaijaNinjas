import React,{useState} from "react";
import { Avatar, Grid } from "@material-ui/core";
import { useStyles } from "./messagesStyles";
import { ConvertDateTime } from "./convert-date";
import BadgeAvatars from "../../../helper/Avatar.js"
import {Link} from "react-router-dom"
import {useParams} from "react-router-dom"
import { useHistory } from "react-router-dom";
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
import Search from "@material-ui/icons/Search";
// import Link from "react-router-dom"

function SearchChat({ user }) {

    const classes = useStyles();
    const history = useHistory()
    return (
        <Link to={`/messages/new/chat/${user.author}`}>
        
            <Grid
                container
                spacing={1}
                className={classes.oneItem}
                style={{
                borderLeft: true? "7px solid blue" : "",
                }}
                alignItems={"center"}
                // onClick={() => setUserDetails(user)}
                // onClick={() => history.push(`/messages/${user.author}/`)}
            >
                <Grid item xs={2}>
                <BadgeAvatars name={user.first_name} image={user.photo} status={user.status}/>
                </Grid>
                <Grid item style={{ fontSize: 14 }} xs={10}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div
                    style={{
                        color: "#333333",
                        marginBottom: 3,
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                    >
                    {user.first_name } {user.last_name}
                    </div>
                    <div
                    style={{
                        flex: 1,
                        fontSize: 13,
                        color: "#888",
                        whiteSpace: "nowrap",
                        textAlign: "right",
                    }}
                    >
                    {/* {user.last_message && timeAgo.format(new Date(user.last_message.timestamp),'round-minute')} */}
                    </div>
                </div>
                <div
                    style={{
                    color: "#888888",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
                >
                    {/* {user.last_message ? user.last_message.text : 'Start the conversation'} */}
                    New User
                </div>
                </Grid>
            </Grid>
        </Link>
    );

}


export default SearchChat;
