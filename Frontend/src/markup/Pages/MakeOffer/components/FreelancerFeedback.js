import React from "react";
import Ratings from "./Ratings";
import { Divider, Grid } from "@material-ui/core";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";

function FreelancerFeedback(props) {
  return (
    <>
      <div style={{ margin: "20px 0px" }}>
        <div style={{ fontSize: 18, color: "#333333", fontWeight: 600 }}>
          Shakeeb Anwar
        </div>
        
        <Grid container spacing={4}>
          <Grid item>
            <Ratings />
          </Grid>
          <Grid item style={{ display: "flex" }} alignItems={"center"}>
            <DateRangeOutlinedIcon />
            <div style={{ marginLeft: 10 }}>August 2019</div>
          </Grid>
        </Grid>

        <div style={{ fontSize: 16, color: "#808080", marginTop: 10 }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid
          aspernatur dolorem eaque e
        </div>
      </div>
      <Divider />
    </>
  );
}

export default FreelancerFeedback;
