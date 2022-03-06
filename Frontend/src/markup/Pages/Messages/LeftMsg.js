import React from "react";
import { Avatar, Grid } from "@material-ui/core";

function LeftMsg(props) {
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
            "https://image.shutterstock.com/image-photo/young-man-studio-looking-cameraportrait-260nw-139246634.jpg"
          }
        />
      </Grid>
      <Grid item style={{ flex: 1, paddingLeft: 0 }}>
        <div className="talk-bubble-left tri-right left-in">
          <div className="talktext">
            <p>This talk-bubble usesfdsa fdsaf ds fds </p>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default LeftMsg;
