import React from "react";
import { Avatar, Grid } from "@material-ui/core";

function RightMsg({ props, item, data }) {
  return (
    <div>
      <Grid
        justifyContent={"flex-end"}
        style={{ padding: "10px 30px", display: "flex" }}
        container
        spacing={3}
      >
        <Grid item style={{  paddingRight: 0 }}>
          <div className="talk-bubble-right tri-right right-in">
            <div className="talktext">
              <p>
                {item.text}
              </p>
            </div>
          </div>
        </Grid>
        <Grid item style={{ width: "70px" }}>
          <Avatar
            style={{ height: "50px", width: "50px" }}
            src={
              data.users_profile && data.users_profile[0].photo && data.users_profile[0].photo
            }
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default RightMsg;
