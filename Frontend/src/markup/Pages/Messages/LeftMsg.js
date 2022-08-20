import React from "react";
import { Avatar, Grid } from "@material-ui/core";

function LeftMsg({ props, item, data }) {

  return (
    <Grid
      style={{ padding: "10px 30px", display: "flex" }}
      container
      spacing={3}
    >
      <Grid item style={{ width: "70px" }}>
        <Avatar
          style={{ height: "50px", width: "50px" }}
          src={
            data.users_profile && data.users_profile[1].photo && data.users_profile[1].photo
          }
        />
      </Grid>
      <Grid item style={{ flex: 1, paddingLeft: 0 }}>
        <div className="talk-bubble-left tri-right left-in">
          <div className="talktext">
            <p>{item.text}</p>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default LeftMsg;
