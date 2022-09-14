import React, { useEffect } from "react"
import Header from "../../Layout/Header"
import Footer from "../../Layout/Footer"
import Avatar from "@material-ui/core/Avatar"
import { Divider, Grid, Hidden } from "@material-ui/core"
import { useStyles } from "./MakeOfferStyles"
import Ratings from "./components/Ratings"
import Feedback from "./components/Feedback"
import HourlyRate from "./components/HourlyRate"
import MakeOfferForm from "./components/MakeOfferForm"
import SocialMedia from "./components/SocialMedia"
import Skills from "./components/Skills"
import Attachments from "./components/Attachments"
import TabsGroup from "./components/TabsGroup"
import { useHistory, useLocation, useParams } from "react-router-dom"
import createRequest from "../../../utils/axios"
import ClipLoader from "react-spinners/ClipLoader"
import { toast } from "react-toastify"
import RelatedProfile from "./components/RelatedProfile"

var bnr = require("../../../images/banner/bnr5.png")

function MakeOfferPage() {
  const classes = useStyles()
  const { id } = useParams()
  const history = useHistory()
  const [user, setUser] = React.useState(null)
  const [resume, setResume] = React.useState(null)
  const [relatedProfles, setRelatedProfles] = React.useState([])
  const getResume = async () => {
    try {
      const { data } = await createRequest().get(
        `/api/v1/account/user-resume/${id}/`
      )
      setResume(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getRelatedProfile = async () => {
    const { department, city, id, sector } = user
    try {
      const { data } = await createRequest().get(
        `/api/v1/account/related-profiles/?department=${department}&city=${city}&id=${id}&sector=${sector}
        `
      )
      console.log(data)
      setRelatedProfles(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleRequest()
    getResume()
  }, [])

  useEffect(() => {
    getRelatedProfile()
  }, [user])

  const handleRequest = async () => {
    try {
      const res = await createRequest().get(
        `/api/v1/account/user-search-detials/${id}/`
      )
      setUser(res.data)
    } catch (error) {
      toast.error("Something went wrong")

      history.push("/")
    }
  }

  return (
    <>
      <Header />
      {user ? (
        <div className="page-content bg-white">
          <div
            className="dez-bnr-inr d-flex align-items-center"
            style={{ backgroundImage: "url(" + bnr + ")" }}
          >
            <div className="ml-5">
              <Grid container spacing={2} className={classes.headerGrid}>
                <Grid item>
                  <Avatar
                    variant={"circular"}
                    className={classes.avatar}
                    src={user.photo}
                  >
                    <img
                      src="https://themebing.com/wp/prolancer/wp-content/uploads/2021/04/pexels-mentatdgt-1138903-150x150.jpg"
                      alt="Avatar image"
                    />
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
                      <div style={{ marginBottom: 5 }}>
                        {user.first_name} {user.last_name}
                      </div>
                      <div style={{ color: "gray" }}>iOS Expert + Node Dev</div>
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
                <TabsGroup data={user.description} resume={resume} id={id} />
                <Feedback />
                <RelatedProfile data={relatedProfles} />
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={4}>
                <div className="sticky-top browse-candidates">
                  <HourlyRate />
                  <Divider style={{ margin: "30px 0px" }} />
                  <aside className="sticky-top">
                    <MakeOfferForm />
                  </aside>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      ) : (
        <div className="loader">
          <ClipLoader color={"#2e55fa"} loading={true} size={150} />
        </div>
      )}
      <Footer />
    </>
  )
}
export default MakeOfferPage
