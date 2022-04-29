import React from "react";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import Avatar from "@material-ui/core/Avatar";
import { Divider, Grid, Hidden } from "@material-ui/core";
import { useStyles } from "./MakeOfferStyles";
import Ratings from "./components/Ratings";
import Feedback from "./components/Feedback";
import HourlyRate from "./components/HourlyRate";
import MakeOfferForm from "./components/MakeOfferForm";
import SocialMedia from "./components/SocialMedia";
import Skills from "./components/Skills";
import Attachments from "./components/Attachments";
import TabsGroup from "./components/TabsGroup";
import { useLocation } from "react-router-dom";

var bnr = require("../../../images/banner/bnr5.png");

const blogGrid = [
  {
    image: require("../../../images/blog/grid/pic1.jpg"),
  },
  {
    image: require("../../../images/blog/grid/pic2.jpg"),
  },
  {
    image: require("../../../images/blog/grid/pic3.jpg"),
  },
  {
    image: require("../../../images/blog/grid/pic4.jpg"),
  },
];

function MakeOfferPage() {
  const classes = useStyles();
  const location = useLocation();
  console.log(location);
  return (
    <>
      <Header />
      <div className='page-content bg-white'>
        <div
          className='dez-bnr-inr d-flex align-items-center'
          style={{ backgroundImage: "url(" + bnr + ")" }}
        >
          <div className=''>
            <Grid container spacing={2} className={classes.headerGrid}>
              <Grid item>
                <Avatar
                  variant={"square"}
                  className={classes.avatar}
                  src={
                    "https://image.shutterstock.com/image-photo/young-man-studio-looking-cameraportrait-260nw-139246634.jpg"
                  }
                >
                  K
                </Avatar>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction='column'
                  justifyContent='space-between'
                  style={{ height: "100%", padding: "5px 0px" }}
                >
                  <Grid item>
                    <h4 style={{ marginBottom: 5 }}>Kasun Chandika</h4>
                    <h5 style={{ color: "gray" }}>iOS Expert + Node Dev</h5>
                  </Grid>
                  <Hidden xsDown>
                    <Grid item>
                      <Ratings />
                    </Grid>
                  </Hidden>
                </Grid>
              </Grid>
              <Hidden smUp>
                <Grid item xs={12}>
                  <Ratings />
                </Grid>
              </Hidden>
            </Grid>
          </div>
        </div>

        <div className={classes.main}>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={12} md={7} lg={8}>
              <TabsGroup />
              <Feedback />
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={4}>
              <HourlyRate />
              <Divider style={{ margin: "30px 0px" }} />
              <MakeOfferForm />
              <Divider style={{ margin: "30px 0px" }} />
              <SocialMedia />
              <Divider style={{ margin: "30px 0px" }} />
              <Skills />
              <Divider style={{ margin: "30px 0px" }} />
              <Attachments />
            </Grid>
          </Grid>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default MakeOfferPage;
