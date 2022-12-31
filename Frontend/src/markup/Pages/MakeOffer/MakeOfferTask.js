import React, { useEffect, useState } from "react"
import Header from "../../Layout/Header"
import Footer from "../../Layout/Footer"
import Avatar from "@material-ui/core/Avatar"
import { Box, Divider, Grid, Hidden, Modal } from "@material-ui/core"
import { toast } from "react-toastify"
import { useStyles } from "./MakeOfferStyles"
import Ratings from "./components/Ratings"
import HourlyRate from "./components/HourlyRate"
import MakeOfferForm from "./components/MakeOfferFormTask"
import SocialMedia from "./components/SocialMedia"
import Skills from "./components/Skills"
import Attachments from "./components/Attachments"
import TabsGroup from "./components/TabsGroup"
import { useParams, Link } from "react-router-dom"
import createRequest from "../../../utils/axios"
import ClipLoader from "react-spinners/ClipLoader"
import { BsBuilding } from "react-icons/bs"
import { Alert, Button, Form } from "react-bootstrap"
import { AboutMe } from "./components"
import RelatedJobs from "./components/RelatedJobs"
import { Badge } from "react-bootstrap"
import Carousel from "carousel-react-rcdev"
import ShortImages from "./components/ShortImageGallery"
import RegisterPageModal from "../Auth/RegisterPageModal"
import Proposals from "../components/Proposals"
import Hired from "../components/Hired"
import { useSelector } from "react-redux"

var bnr = require("../../../images/banner/bnr5.png")

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
}

function MakeOfferPage() {
  const [show, setShow] = React.useState(false)
  const classes = useStyles()
  // const id = location.state && location.state.id ? location.state.id : "10";
  let { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const allData = async () => {
    setLoading(true)
    await createRequest()
      .get(`api/v1/task/task/${id}/`)
      .then((res) => {
        console.log(res)
        setData(res.data)

        setLoading(false)
      })
      .catch((e) => {
        if (e.response?.status === 400) {
          console.log(e?.response?.data?.non_field_errors[0])
        } else {
          console.log("Unknown Error")
        }
      })
  }
  const getRelatedTasks = async () => {
    try {
      const { sector, department, location, id, tags } = data
      // separate tags by comma
      const tagsArray = tags.split(",")
      // get all tags
      const tagsString = tagsArray.join("&tags=")

      const res = await createRequest().get(
        `/api/v1/task/related-tasks/?sector=${sector}&department=${department}&location=${location}&id=${id}
        &tags=${tagsString}`
      )
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    allData()
  }, [])

  useEffect(() => {
    getRelatedTasks()
  }, [data])

  const { checkRunner } = useSelector((state) => state.authReducer)
  const showbanner = () => {
    console.log(checkRunner);
    console.log(checkRunner);
    toast.warning('Only professional are allow to bid, singup to be a pro and have unlimited access to bid on millions of task available.')

  };

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          overflow: "scroll",
        }}
      >
        <Box sx={style}>
          <RegisterPageModal />
        </Box>
      </Modal>
      <Header />
      {!loading ? (
        <div className="page-content bg-white">
          <div
            className="dez-bnr-inr d-flex align-items-center flex-wrap "
            style={{
              backgroundImage: "url(" + bnr + ")",
            }}
          >
            <div className="left-side">
              <Grid container spacing={2} className={classes.headerGrid}>
                <Grid item>
                  <Avatar
                    variant={"square"}
                    className={classes.avatar + " ml-5"}
                    src={data.photo}
                  >
                    {data?.sector}
                  </Avatar>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    style={{ height: "100%", padding: "5px 0px" }}
                  >
                    <Grid item>
                      <h4 style={{ marginTop: "42px" }}>{data?.title}</h4>
                    </Grid>
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
                <div className="mt-4">
                  <div>
                    <p>{data?.description}</p>

                    <h6>Attachments</h6>
                    <ShortImages />
                    <h6>Skills Required</h6>
                    <div className="d-flex badge-div ">
                      {data?.tags?.split(",")?.map((e) => (
                        <Badge>{e}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                {/* we heir start */}
                <div className="review">
                  <h2 className="mb-5">Proposals</h2>
                  <Hired
                    name="Baloch Khan"
                    rating={4}
                    comment="Amazing artist, I contacted him with examples and told him what I wanted to be done and he got what I envisioned on the first try! Highly recommend"
                  />
                  <Hired
                    name="Shakeeb Khan"
                    rating={4}
                    comment="Amazing artist, I contacted him with examples and told him what I wanted to be done and he got what I envisioned on the first try! Highly recommend"
                  />
                  <Hired
                    name="Sami Bhai"
                    rating={4}
                    comment="Amazing artist, I contacted him with examples and told him what I wanted to be done and he got what I envisioned on the first try! Highly recommend"
                  />
                </div>
                {/* we heir end */}
                {/* clients reives start */}
                <div className="review">
                  <h2 className="mb-5">Related Jobs</h2>
                  <div className="row">
                    <div className="col-lg-12">
                      <ul className="post-job-bx browse-job">
                        {[
                          {
                            attachment:
                              "https://zappa-wnf4dp8g2.s3.amazonaws.com/task/documents/2022/09/05/Cars-Laptop-Wallpaper_JHnlJDA.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA525LDBK2M3KUXK3R%2F20220908%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220908T150438Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=194e22bfd035b489ba401a3e569a7da21b9c56964447385eb1c13716f87b4297",
                            author: 72,
                            bidders: [],
                            bookmarks: [],
                            category: "",
                            created: "2022-09-05T12:33:49.129843+01:00",
                            department: "Pets",
                            description: "gigx",
                            experience: null,
                            fixed_salary: null,
                            id: 37,
                            location: "gigx",
                            maximum_salary: "20000",
                            minimum_salary: "10000",
                            post_status: "OPEN",
                            region: "",
                            sector: "Pets",
                            tags: "gigx",
                            title: "gigxtest",
                            updated: "2022-09-05T12:33:49.129875+01:00",
                          },
                          {
                            attachment:
                              "https://zappa-wnf4dp8g2.s3.amazonaws.com/task/documents/2022/09/05/Cars-Laptop-Wallpaper_JHnlJDA.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA525LDBK2M3KUXK3R%2F20220908%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220908T150438Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=194e22bfd035b489ba401a3e569a7da21b9c56964447385eb1c13716f87b4297",
                            author: 72,
                            bidders: [],
                            bookmarks: [],
                            category: "",
                            created: "2022-09-05T12:33:49.129843+01:00",
                            department: "Pets",
                            description: "gigx",
                            experience: null,
                            fixed_salary: null,
                            id: 37,
                            location: "gigx",
                            maximum_salary: "20000",
                            minimum_salary: "10000",
                            post_status: "OPEN",
                            region: "",
                            sector: "Pets",
                            tags: "gigx",
                            title: "gigxtest",
                            updated: "2022-09-05T12:33:49.129875+01:00",
                          },
                        ]?.map((data, index) => (
                          <li key={index}>
                            <div className="post-bx">
                              <div className="d-flex m-b30">
                                <div className="job-post-company">
                                  <Link to={""}>
                                    <span>
                                      <img alt="" src={data.attachment} />
                                    </span>
                                  </Link>
                                </div>
                                <div className="job-post-info">
                                  <h4>
                                    <Link
                                      to={`/make-offer-task/${data?.id}/${data?.title}`}
                                      onClick={(e) => e.stopPropagation()}
                                      target="_blank"
                                    >
                                      {data?.title}
                                    </Link>
                                  </h4>
                                  <ul>
                                    <li>
                                      <i className="fa fa-map-marker"></i>{" "}
                                      {data?.location}
                                    </li>
                                    <li>
                                      <i className="fa fa-bookmark-o"></i>{" "}
                                      {data?.category}
                                    </li>
                                    <li>
                                      <i className="fa fa-clock-o"></i>{" "}
                                      Published {data?.created || data?.updated}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="d-flex">
                                <div className="job-time mr-auto align-self-center">
                                  <p className="h-100">
                                    {data?.description?.substring(0, 150)} ...
                                    {"  "}
                                    <Link
                                      to={`/make-offer-task/${data?.id}/${data?.title}`}
                                      className="text-primary"
                                      onClick={(e) => e.stopPropagation()}
                                      target="_blank"
                                    >
                                      See more
                                    </Link>
                                  </p>
                                  <div className="d-flex badge-div ">
                                    {data?.tags?.split(",")?.map((e) => (
                                      <Badge>{e}</Badge>
                                    ))}
                                  </div>
                                  {/* <Link to={""}>
                                <span>Full Time</span>
                              </Link> */}
                                </div>

                                <div className="salary-bx d-flex flex-column text-center">
                                  <span>
                                    $ {data?.minimum_salary} - ${" "}
                                    {data?.maximum_salary}
                                  </span>
                                  {/* <small class='text-muted'>Per hour</small> */}

                                  <p className="text-muted text-capitalize">
                                    per assignment
                                  </p>
                                  <Link
                                    to={`/make-offer-task/${data?.id}/${data?.title}`}
                                    onClick={(e) => e.stopPropagation()}
                                    target="_blank"
                                  >
                                    <button className="site-button btn-block ">
                                      Show Interest
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={5}
                lg={4}
                className="project-widget sticky-top"
              >
                <aside className="sticky-top">
                  {/* Price Box Start */}
                  <div className="text-center mx-auto  mt-5">
                    <h3>Budget</h3>
                    <h3>
                      ${data?.minimum_salary} To ${data?.maximum_salary}{" "}
                    </h3>
                    {/* <span>Project type: {data?.category}</span> */}
                    <div>

                      {checkRunner ? (
                        <Link
                          to={`/send-contract/${data?.id}`}
                          className="site-button"
                        >
                          Submit a Proposal
                        </Link>) : (
                        <button className="site-button btn-block" onClick={() => showbanner()}>
                          Show Interest
                        </button>)}
                      {/* <a href="#" className="site-button" >Submit a Proposal</a> */}
                    </div>
                  </div>
                  {/* Price Box end */}
                  {/* project type start */}
                  <ul className="list-unstyled mt-5 mb-3 meta">
                    <li className="text-left">
                      Seller Type:<b className="float-right">Company</b>
                    </li>
                    <li className="text-left">
                      Project type:<b className="float-right">Hourly</b>
                    </li>
                    <li className="text-left">
                      Project Duration:<b className="float-right">Other</b>
                    </li>
                    <li className="text-left">
                      Project Level:<b className="float-right">Expensive</b>
                    </li>
                    <li className="text-left">
                      Languages:<b className="float-right">Arabic</b>
                    </li>
                    <li className="text-left">
                      English Level:<b className="float-right">Professional</b>
                    </li>
                  </ul>
                  {/* project type end */}

                  {/* Buyer Start */}
                  <div className="text-center">
                    <h3 className="project-widget-title">About Buyer</h3>
                    <a href="#">
                      <img
                        src="https://themebing.com/wp/prolancer/wp-content/uploads/2021/04/pexels-mentatdgt-1138903-150x150.jpg"
                        className="mb-3 rounded-circle img-thumbnail"
                        alt=""
                      />{" "}
                    </a>
                    <a href="#" target="_blank">
                      <h4>Bayley Robertson</h4>
                    </a>
                    <ul className="list-inline mt-2 mb-2 badges">
                      <li className="list-inline-item">
                        <img
                          src="https://themebing.com/wp/prolancer/wp-content/uploads/2022/01/buyerfirstorder.png"
                          title="Spent money for hiring"
                          alt="badge"
                          style={{ cursor: "default" }}
                        />
                      </li>
                      <li className="list-inline-item">
                        <img
                          src="https://themebing.com/wp/prolancer/wp-content/uploads/2022/01/level2.png"
                          title="Seller Level 2: Has sold $100+ On ProLancer"
                          alt="badge"
                        />
                      </li>
                    </ul>
                    <ul class="list-unstyled mt-4 meta">
                      <li class="text-left">
                        Location:<b class="float-right">Germany</b>
                      </li>
                      <li class="text-left">
                        Departments:
                        <b class="float-right">Graphich Designing</b>
                      </li>
                      <li class="text-left">
                        No. of Employees:<b class="float-right">11-20</b>
                      </li>
                    </ul>
                  </div>
                  {/* Buyer end */}
                </aside>
              </Grid>
            </Grid>
          </div>
        </div>
      ) : (
        <div className="loader mx-auto">
          <ClipLoader color={"#2e55fa"} loading={true} size={150} />
        </div>
      )}

      <Footer />
    </div>
  )
}
export default MakeOfferPage
