import React from "react";
import { Avatar, Grid } from "@material-ui/core";

function RightMsg(props) {
  return (
    <div>
      <Grid
        justifyContent={"flex-end"}
        style={{ padding: "10px 30px", display: "flex" }}
        container
        spacing={3}
      >
        <Grid item style={{ flex: 1, paddingRight: 0 }}>
          <div className="talk-bubble-right tri-right right-in">
            <div className="talktext">
              <p>
                This talk-bubble uses .left-in class to show a triangle on the
                left slightly indented. Still a blocky square.
              </p>
            </div>
          </div>
        </Grid>
        <Grid item style={{ width: "70px" }}>
          <Avatar
            style={{ height: "50px", width: "50px" }}
            src={
              "https://image.shutterstock.com/image-photo/young-man-studio-looking-cameraportrait-260nw-139246634.jpg"
            }
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default RightMsg;
