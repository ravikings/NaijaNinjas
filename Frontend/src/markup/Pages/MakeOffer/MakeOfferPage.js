import React, { useEffect } from "react";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import Avatar from "@material-ui/core/Avatar";
import { Divider, Grid, Hidden } from "@material-ui/core";
import { useStyles } from "./MakeOfferStyles";
import Ratings from "./components/Ratings";
import HourlyRate from "./components/HourlyRate";
import MakeOfferForm from "./components/MakeOfferForm";
import SocialMedia from "./components/SocialMedia";
import Skills from "./components/Skills";
import Attachments from "./components/Attachments";
import TabsGroup from "./components/TabsGroup";
import { useLocation } from "react-router-dom";
import createRequest from "../../../utils/axios";
import ClipLoader from "react-spinners/ClipLoader";
import { BsBuilding } from "react-icons/bs";
import { Alert } from "react-bootstrap";
import { AboutMe } from "./components";
import RelatedJobs from "./components/RelatedJobs";

var bnr = require("../../../images/banner/bnr5.png");

// const blogGrid = [
//   {
//     image: require("../../../images/blog/grid/pic1.jpg"),
//   },
//   {
//     image: require("../../../images/blog/grid/pic2.jpg"),
//   },
//   {
//     image: require("../../../images/blog/grid/pic3.jpg"),
//   },
//   {
//     image: require("../../../images/blog/grid/pic4.jpg"),
//   },
// ];

function MakeOfferPage() {
  const classes = useStyles();
  const location = useLocation();
  const [user, setUser] = React.useState(null);
  const id = location.state && location.state.id ? location.state.id : "10";

  useEffect(() => {
    handleRequest();
  }, [location]);

  const handleRequest = async () => {
    const res = await createRequest().get(
      `/api/v1/account/user-search-detials/${id}/`
    );
    setUser(res.data);
    console.log(res.data, "DATA");
  };

  console.log(location);
  return (
    <>
      <Header />
      {user ? (
        <div className='page-content bg-white'>
          <div
            className='dez-bnr-inr d-flex align-items-center flex-wrap '
            style={{
              backgroundImage: "url(" + bnr + ")",
            }}
          >
            <div className='left-side'>
              <Grid container spacing={2} className={classes.headerGrid}>
                <Grid item>
                  <Avatar
                    variant={"square"}
                    className={classes.avatar}
                    src={user.photo}
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
                      <h4 style={{ marginBottom: 5 }}>
                        {user.first_name} {user.last_name}
                      </h4>
                      <h5 style={{ color: "gray" }}>iOS Expert + Node Dev</h5>
                    </Grid>
                    <Hidden xsDown>
                      <div className='d-flex'>
                        {user.location && (
                          <span>
                            <BsBuilding size={26} />
                            <span className='align-top mx-2'>
                              {user.location}
                            </span>
                          </span>
                        )}
                        <Ratings />
                      </div>
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
            <div className='right-side'>
              <div className='salary-box'>
                <div className='salary-type'>Project Budget</div>
                <div className='salary-amount'>$2,500 - $4,500</div>
              </div>
            </div>
          </div>

          <div className={classes.main}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={12} md={7} lg={8}>
                <AboutMe data={user.description} />
                {/* <TabsGroup data={user.description} /> */}
                <RelatedJobs />
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={4}>
                {/* <HourlyRate /> */}
                {/* <Divider style={{ margin: "30px 0px" }} /> */}
                <Alert variant={"success"} className='text-center mt-5'>
                  6 days, 23 hours left
                </Alert>
                <MakeOfferForm />
                {/* <Divider style={{ margin: "30px 0px" }} /> */}
                {/* <SocialMedia /> */}
                {/* <Divider style={{ margin: "30px 0px" }} /> */}
                {/* <Skills /> */}
                {/* <Divider style={{ margin: "30px 0px" }} /> */}
                {/* <Attachments /> */}
              </Grid>
            </Grid>
          </div>
        </div>
      ) : (
        <div className='loader'>
          <ClipLoader color={"#2e55fa"} loading={true} size={150} />
        </div>
      )}
      <Footer />
    </>
  );
}
export default MakeOfferPage;
