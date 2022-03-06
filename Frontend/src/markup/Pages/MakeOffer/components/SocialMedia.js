import React from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

function SocialMedia(props) {
  return (
    <div>
      <div style={{ fontSize: 20, color: "#333", marginBottom: 15 }}>
        Social Profiles
      </div>
      <Grid container spacing={2}>
        <Grid item>
          <Link to={"#"} className="m-r10 text-gray-dark font-22">
            <i className="fa fa-facebook"></i>
          </Link>
        </Grid>
        <Grid item>
          <Link to={"#"} className="m-r10 text-gray-dark font-22">
            <i className="fa fa-google-plus"></i>
          </Link>
        </Grid>
        <Grid item>
          <Link to={"#"} className="m-r10 text-gray-dark font-22">
            <i className="fa fa-linkedin"></i>
          </Link>
        </Grid>
        <Grid item>
          <Link to={"#"} className="m-r10 text-gray-dark font-22">
            <i className="fa fa-instagram"></i>
          </Link>
        </Grid>
        <Grid item>
          <Link to={"#"} className="m-r10 text-gray-dark font-20">
            <i className="fa fa-twitter"></i>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default SocialMedia;
