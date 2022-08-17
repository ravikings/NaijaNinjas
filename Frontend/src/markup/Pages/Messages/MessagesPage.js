import React, { useState } from "react";
import Header from "../../Layout/Header";
import { useStyles } from "./messagesStyles";
import { Grid, Hidden } from "@material-ui/core";
import ChatList from "./ChatList";
import MessageWindow from "./MessageWindow";
import Header2 from "../../Layout/Header2";
import Footer from "../../Layout/Footer";

function MessagesPage(props) {
  const classes = useStyles();
  const [userDetails, setUserDetails] = useState(null);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexFlow: "column",
      }}
    >
      <Header2 />
      <div className={classes.main}>
        <div className="job-bx" style={{ padding: 0 }}>
          <Grid container style={{}}>
            <Hidden smDown>
              <Grid item style={{ borderRight: "1px solid #ccc" }}>
                <ChatList userDetails={userDetails} setUserDetails={setUserDetails} />
              </Grid>
            </Hidden>
            <Grid item xs={true}>
              <MessageWindow userDetails={userDetails} setUserDetails={setUserDetails} />
            </Grid>
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MessagesPage;
