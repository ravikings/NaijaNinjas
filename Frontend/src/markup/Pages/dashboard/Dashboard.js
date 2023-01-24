import React, { useState, useEffect } from "react"
import Header2 from "../../Layout/Header2"
import Footer from "../../Layout/Footer"
import ProfileSidebar from "../../Element/Profilesidebar"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../Element/Loader"
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { authActionTypes, setProfileData } from "../Auth/Redux/AuthActions"
import createRequest from "../../../utils/axios"
import Hero from "./Hero"
import BarChart from "./BarChart"
import styles from "./dashboard.module.css"
import ScheduleIcon from "@mui/icons-material/Schedule"
import LineChart from "./LineChart"
import LineChart2 from "./LineChart2"
import TableNOverview from "./TableNOverview"
import { useHistory } from "react-router-dom"
const Dashboard = () => {
  const { currentUser, userProfile, loading } = useSelector(
    (state) => state.authReducer
  )

  const history = useHistory()
  const dispatch = useDispatch()
  const [userDetails, setUserDetails] = useState(null)

  if (userProfile && !userProfile.is_a_runner) {
    history.push("/jobs-profile")
  }
  useEffect(() => {
    if (currentUser && !userProfile) {
      getUserDetails()
    }
  }, [currentUser])

  useEffect(() => {
    if (userDetails && !userProfile) {
      dispatch({
        type: authActionTypes.USER_PROFILE,
        payload: userDetails,
      })
    }
  }, [userDetails])
  const getUserDetails = () => {
    const pk = localStorage.getItem("userID");
    createRequest()
      .get(`/api/v1/account/user-profile/${pk}/`)
      .then(({ data }) => {
        console.log("user data api", data)
        setUserDetails(data)
      })
      .catch((e) => {
        // toast.error(e.response?.data?.message || "Unknown Error");
      })
  }
  return (
    <>
      <Header2 />
      {userProfile ? (
        <div className="page-content bg-white">
          <div className="content-block">
            <div className="section-full bg-white browse-job p-t50 p-b20">
              <div className="container">
                <div className="row">
                  {userProfile && (
                    <ProfileSidebar
                      userProfile={userProfile}
                      author={userProfile?.author}
                      // userID={userDetails?.id}
                      active={"dashboard"}
                    />
                  )}
                  <div className="col-xl-9 col-lg-8 m-b30">
                    <Hero />
                    <div className={styles.graphs}>
                      <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 mb-lg-5 mb-md-5 mb-sm-5">
                          <div className={styles.graphsCard}>
                            <div className={styles.graphsCardInner}>
                              <div className={styles.graphWrapper}>
                                <BarChart />
                              </div>
                              <div className={styles.graphContent}>
                                <h5>Website View</h5>
                                <h6>Last Campaign Performance</h6>
                                <hr />
                                <div className={styles.lastWrapper}>
                                  <span className={styles.lastIcon}>
                                    <ScheduleIcon />
                                  </span>
                                  <span className={styles.lastContent}>
                                    campaign sent 2 days ago
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 mb-lg-5 mb-md-5 mb-sm-5">
                          <div className={styles.graphsCard}>
                            <div className={styles.graphsCardInner}>
                              <div className={styles.graphWrapper2}>
                                <LineChart />
                              </div>
                              <div className={styles.graphContent}>
                                <h5>Daily Sales</h5>
                                <h6>
                                  (
                                  <span style={{ fontWeight: "bold" }}>
                                    +15%
                                  </span>
                                  ) increase in today sales.
                                </h6>
                                <hr />
                                <div className={styles.lastWrapper}>
                                  <span className={styles.lastIcon}>
                                    <ScheduleIcon />
                                  </span>
                                  <span className={styles.lastContent}>
                                    campaign sent 2 days ago
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 mb-lg-5 mb-md-5 mb-sm-5">
                          <div className={styles.graphsCard}>
                            <div className={styles.graphsCardInner}>
                              <div className={styles.graphWrapper3}>
                                <LineChart2 />
                              </div>
                              <div className={styles.graphContent}>
                                <h5>Completed Tasks</h5>
                                <h6>Last Campaign Performance</h6>
                                <hr />
                                <div className={styles.lastWrapper}>
                                  <span className={styles.lastIcon}>
                                    <ScheduleIcon />
                                  </span>
                                  <span className={styles.lastContent}>
                                    just updated
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <TableNOverview />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <Footer />
    </>
  )
}

export default Dashboard
