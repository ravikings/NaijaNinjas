import React, { useEffect } from "react";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import Avatar from "@material-ui/core/Avatar";
import { Box, Divider, Grid, Hidden, Modal } from "@material-ui/core";
import { useStyles } from "./MakeOfferStyles";
import Ratings from "./components/Ratings";
import HourlyRate from "./components/HourlyRate";
import MakeOfferForm from "./components/MakeOfferFormTask";
import SocialMedia from "./components/SocialMedia";
import Skills from "./components/Skills";
import Attachments from "./components/Attachments";
import TabsGroup from "./components/TabsGroup";
import { useLocation } from "react-router-dom";
import createRequest from "../../../utils/axios";
import ClipLoader from "react-spinners/ClipLoader";
import { BsBuilding } from "react-icons/bs";
import { Alert, Button, Form } from "react-bootstrap";
import { AboutMe } from "./components";
import RelatedJobs from "./components/RelatedJobs";
import { Badge } from "react-bootstrap";
import Carousel from "carousel-react-rcdev";
import ShortImages from "./components/ShortImageGallery";
import RegisterPageModal from "../Auth/RegisterPageModal";

var bnr = require("../../../images/banner/bnr5.png");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "auto",
  height: "80%",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

function MakeOfferPage() {
  const [show, setShow] = React.useState(false);

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        style={{
          overflow: "scroll",
        }}
      >
        <Box sx={style}>
          <RegisterPageModal />
        </Box>
      </Modal>
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
                <div className='mt-4'>
                  <div>
                    <p>{user.description}</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Delectus iure nesciunt possimus? Alias blanditiis
                      consequatur doloribus, enim esse libero nam officiis omnis
                      reiciendis. Distinctio ea esse eum itaque, nesciunt sequi!
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Deleniti enim exercitationem non tempore. Amet
                      consectetur, eius exercitationem facilis harum hic in
                      labore laborum laudantium natus numquam odio omnis quae
                      quo quod reiciendis similique sit, totam ullam unde. Ab,
                      natus velit?
                    </p>

                    <h6>Attachments</h6>
                    <ShortImages />
                    <h6>Skills Required</h6>
                    <div className='d-flex badge-div '>
                      <Badge>iOS</Badge>
                      <Badge>Android</Badge>
                      <Badge>Mobile apps</Badge>
                      <Badge>Python</Badge>
                    </div>
                  </div>
                  {/* <div className='actions'>
        <button className='site-button'>
          {" "}
          <i className='fa fa-comments-o  mr-2'></i> Message
        </button>
        <button className='site-button btn-outlined ml-4'>
          <i className='fa fa-phone mr-2'></i> Request a Call
        </button>
      </div> */}
                </div>
                {/* <TabsGroup data={user.description} /> */}
                <RelatedJobs />
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={4}>
                {/* <HourlyRate /> */}
                {/* <Divider style={{ margin: "30px 0px" }} /> */}
                <Alert variant={"success"} className='text-center mt-5'>
                  6 days, 23 hours left
                </Alert>
                <MakeOfferForm modal={handleShow} />
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
    </div>
  );
}
export default MakeOfferPage;
