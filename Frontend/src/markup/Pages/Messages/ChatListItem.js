import React from "react";
import { Avatar, Grid } from "@material-ui/core";
import { useStyles } from "./messagesStyles";

function ChatListItem({ selected }) {
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
    >
      <Grid item xs={2}>
        <Avatar
          style={{ height: "40px", width: "40px" }}
          src={
            "https://image.shutterstock.com/image-photo/young-man-studio-looking-cameraportrait-260nw-139246634.jpg"
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
            Kasun Chandika
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
            4 hours ago
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
          Thanks for reaching out fdsafdsafdsafdsafds
        </div>
      </Grid>
    </Grid>
  );
}

export default ChatListItem;
