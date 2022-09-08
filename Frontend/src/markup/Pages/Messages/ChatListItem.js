import React,{useState} from "react";
import { Avatar, Grid } from "@material-ui/core";
import { useStyles } from "./messagesStyles";
import { ConvertDateTime } from "./convert-date";
import BadgeAvatars from "../../../helper/Avatar.js"
import {Link} from "react-router-dom"
import {useParams} from "react-router-dom"
import { useHistory } from "react-router-dom";
function ChatListItem({ selected, user, setUserDetails, userRefetch }) {

  const classes = useStyles();

  // id is getting from params of url /message/:id 
  const [id,setId] = useState(useParams())

  const [socketUrl, setSocketUrl] = useState(
    `ws://8.tcp.ngrok.io:19259/ws/chat/room/${id.userId}/${id.id}`
  )
  console.log(socketUrl)
  const history = useHistory()
  return (
      <Grid
        container
        spacing={1}
        className={classes.oneItem}
        style={{
          borderLeft: selected ? "7px solid blue" : "",
        }}
        alignItems={"center"}
        // onClick={() => setUserDetails(user)}
        onClick={() => history.push(`/messages/${user.initiator.id}/${user.chat_room_id}`)}
      >
          <Grid item xs={2}>
          <BadgeAvatars profile={user.receiver_profile} reciever={user.receiver}/>
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
              {user.receiver.username}
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
              {user.last_message && ConvertDateTime(user.last_message.timestamp)}
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
            {user.last_message ? user.last_message.text : 'Start the conversation'}
          </div>
        </Grid>
      </Grid>
  );

}

export default ChatListItem;
