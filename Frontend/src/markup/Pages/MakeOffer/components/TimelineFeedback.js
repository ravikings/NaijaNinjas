import React from "react";
import Ratings from "./Ratings";
import { Divider, Grid } from "@material-ui/core";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import Moment from 'react-moment';

function TimelineFeedback(props) {
  return (
    <>
      <div style={{ margin: "20px 0px" }}>
        {/* <div style={{ fontSize: 18, color: "#333333", fontWeight: 600 }}>
          Web, Database and API Developer {props.text}
        </div> */}
        <div style={{ fontSize: 16, color: "#808080", marginBottom: 7 }}>
          Rated by {props.review}
        </div>
        <Grid container spacing={4}>
          <Grid item>
            <Ratings rating={props.data?.rating}/>
          </Grid>
          <Grid item style={{ display: "flex" }} alignItems={"center"}>
            <DateRangeOutlinedIcon />
            <div style={{ marginLeft: 10 }}>
              <Moment format="D MMM YYYY" withTitle>
                {props.data?.created}
              </Moment>
            </div>
          </Grid>
        </Grid>

        <div style={{ fontSize: 16, color: "#808080", marginTop: 10 }}>
        {props.data?.body ? props.data?.body : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid aspernatur dolorem eaque exercitationem laboriosam nobis pariatur provident rem temporibus!"}
        </div>
      </div>
      <Divider />
    </>
  );
}

export default TimelineFeedback;
