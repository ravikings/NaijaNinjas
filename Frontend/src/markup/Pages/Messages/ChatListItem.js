import React from "react";
import { Avatar, Grid } from "@material-ui/core";
import { useStyles } from "./messagesStyles";
import { ConvertDateTime } from "./convert-date";

function ChatListItem({ selected, user, setUserDetails }) {

  const classes = useStyles();
  return (
    <Grid
      container
      spacing={1}
      className={classes.oneItem}
      style={{
        borderLeft: selected ? "7px solid blue" : "",
      }}
      alignItems={"center"}
      onClick={() => setUserDetails(user)}
    >
      <Grid item xs={2}>
        <Avatar
          style={{ height: "40px", width: "40px" }}
          src={
            user && user.receiver && user.receiver.photo && process.env.REACT_APP_API_URL + user.receiver.photo
          }
        />
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
