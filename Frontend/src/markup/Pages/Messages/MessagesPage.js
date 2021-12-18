import React from "react";
import Header from "../../Layout/Header";
import { useStyles } from "./messagesStyles";
import { Grid, Hidden } from "@material-ui/core";
import ChatList from "./ChatList";
import MessageWindow from "./MessageWindow";

function MessagesPage(props) {
  const classes = useStyles();
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexFlow: "column",
      }}
    >
      <Header />
      <div className={classes.main}>
        <Grid container style={{ height: "100%" }}>
          <Hidden smDown>
            <Grid item style={{ borderRight: "1px solid #ccc" }}>
              <ChatList />
            </Grid>
          </Hidden>
          <Grid item xs={true}>
            <MessageWindow />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default MessagesPage;
