import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Collapse from "@material-ui/core/Collapse"
import { useDispatch, useSelector } from "react-redux"
import createRequest, { sendImage } from "../../utils/axios"
import useAxiosPrivateImage from "../../hooks/useAxiosPrivateImage"
import { BASE_URL } from "../../utils/constants"
import { toast } from "react-toastify"
import { authActionTypes } from "../Pages/Auth/Redux/AuthActions"

function ProfileSidebar({
  userProfile: profile,
  author,
  userID,
  active,
  showManageProp = false,
  showManagePropSetting = false,
}) {
  const [showManage, setShowManage] = useState(showManageProp)
  const [showQuestion, setShowQuestion] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const [showSettings, setShowSettings] = useState(showManagePropSetting)
  const [imageState, setImageState] = useState(null)
  const [userDetails, setUserDetails] = useState(null)

  const dispatch = useDispatch()
  const { userProfile, userStatus, currentUser } = useSelector(
    (state) => state.authReducer
  )
  useEffect(() => {
    if (userDetails) {
      dispatch({
        type: authActionTypes.USER_PROFILE,
        payload: userDetails,
      })
    }
  }, [userDetails])

  // Custom Hooks
  const imageSendAPI = useAxiosPrivateImage()

  const getUserDetails = () => {
    console.log("sended")
    createRequest()
      .get(`/api/v1/account/user-profile/${currentUser?.pk}/`)
      .then(({ data }) => {
        setUserDetails(data)
        dispatch({
          type: authActionTypes.USER_PROFILE,
          payload: data,
        })
        console.log("War gate")
      })
      .catch((e) => {
        toast.error(e.response?.data?.message || "Unknown Error")
        console.log(e)
        console.log("War gate")
      })
  }

  useEffect(() => {
    if (currentUser) {
      getUserDetails()
    }
  }, [currentUser])

  const sendImage = async () => {
    if (imageState) {
      try {
        const formData = new FormData()
        formData.append("photo", imageState)
        //formData.append("author", userProfile?.author);
        await imageSendAPI.patch(
          `/api/v1/account/user-profile/${currentUser?.pk}/`,
          formData
        )
        setImageState("")
        getUserDetails()
        toast.success("Image Uploaded")
        console.log("useUserProfile")
      } catch (error) {
        console.log(error, "IMAGESENT")
        toast.error(error.response?.data?.message || "Unknown Error")
      }
    }
  }

  useEffect(() => {
    if (imageState) {
      sendImage()
    }
  }, [imageState])

  return (
    <div className="col-xl-3 col-lg-4 m-b30">
      <div className="sticky-top">
        <div className="candidate-info">
          <div className="candidate-detail text-center">
            <div className="canditate-des">
              <Link to={""}>
                {console.log(userProfile)}
                <img
                  alt={userProfile?.first_name}
                  src={
                    userProfile?.photo
                      ? BASE_URL + userProfile?.photo
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  }
                />
              </Link>
              <form>
                <div
                  className="upload-link"
                  title="Update image."
                  data-toggle="tooltip"
                  data-placement="right"
                >
                  <input
                    type="file"
                    name="photo"
                    className="update-flie"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={(e) => {
                      setImageState(e.target.files[0])
                    }}
                  />
                  <i className="fa fa-camera"></i>
                </div>
              </form>
            </div>
            <div className="candidate-title">
              <div className="">
                {userProfile?.first_name && (
                  <h4 className="m-b5">
                    <Link to={""} onClick={(e) => e.preventDefault()}>
                      {userProfile?.first_name}{" "}
                      {userProfile?.last_name && userProfile?.last_name}
                    </Link>
                  </h4>
                )}
                {userProfile?.title && (
                  <p className="m-b0">
                    <Link to={""}>{userProfile?.title}</Link>
                  </p>
                )}
              </div>
            </div>
          </div>
          <ul>
            <li>
              <Link
                to={"/dashboard"}
                className={active === "dashboard" ? "active" : ""}
              >
                <i className="fas fa-chart-line"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/jobs-profile"}
                className={active === "Profile" ? "active" : ""}
              >
                <i className="fa fa-user-o" aria-hidden="true"></i>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to={"/messages"}>
                <i className="fa fa-comments-o" aria-hidden="true"></i>
                <span>Messages</span>
              </Link>
            </li>
            {/* {userStatus?.is_a_runner && (
              <li>
                <Link to={"/jobs-my-resume"}>
                  <i className="fa fa-file-text-o" aria-hidden="true"></i>
                  <span>My Resume</span>
                </Link>
              </li>
            )} */}

            <li>
              <Link to={"/jobs-my-resume"}>
                <i className="fa fa-file-text-o" aria-hidden="true"></i>
                <span>Resume</span>
              </Link>
            </li>

            {/* start ask question start */}
            <li onClick={() => setShowQuestion(!showQuestion)}>
              <Link to={"#"} className={active === "question" ? "active" : ""}>
                <i
                  className={
                    showQuestion ? "fa fa-arrow-down" : "fa fa-arrow-right"
                  }
                  aria-hidden="true"
                ></i>
                <span>Ask Question</span>
              </Link>
            </li>
            <Collapse in={showQuestion}>
              <li>
                <Link className={"ml-4"} to={"/ask-questions"}>
                  <i className="fa fa-briefcase" aria-hidden="true"></i>
                  <span>Ask a Question</span>
                </Link>
              </li>
              <li>
                <Link className={"ml-4"} to={"/all-questions"}>
                  <i className="fa fa-briefcase" aria-hidden="true"></i>
                  <span>All Question</span>
                </Link>
              </li>
            </Collapse>
            {/* start ask question end */}
            <li>
              <Link
                to={"/user-projects"}
                className={active === "My Projects" ? "active" : ""}
              >
                <i className="fa-solid fa-list-check" aria-hidden="true"></i>
                <span>My Projects</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/user-services"}
                className={active === "My Services" ? "active" : ""}
              >
                <i className="fa-solid fa-ticket-simple" aria-hidden="true"></i>
                <span>My Serivces</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/jobs-saved-jobs"}
                className={active === "Saved Jobs" ? "active" : ""}
              >
                <i className="fa fa-heart-o" aria-hidden="true"></i>
                <span>Bookmarks</span>
              </Link>
            </li>
            {/*Manage Jobs Collapse*/}
            <li onClick={() => setShowManage(!showManage)}>
              <Link to={"#"}>
                <i
                  className={
                    showManage ? "fa fa-arrow-down" : "fa fa-arrow-right"
                  }
                  aria-hidden="true"
                ></i>
                <span>Tasks</span>
              </Link>
            </li>
            <Collapse in={showManage}>
              <li>
                <Link
                  className={active === "Post a job" ? "active ml-4" : "ml-4"}
                  to={"/company-post-jobs"}
                >
                  <i className="fa fa-briefcase" aria-hidden="true"></i>
                  <span>Post a task</span>
                </Link>
              </li>
              <li>
                <Link
                  className={active === "Task" ? "active ml-4" : "ml-4"}
                  to={"/company-manage-job"}
                >
                  <i className="fa fa-briefcase" aria-hidden="true"></i>
                  <span>Manage tasks</span>
                </Link>
              </li>
              {/* <li>
                <Link
                  className={active === "Task" ? "active ml-4" : "ml-4"}
                  to={"/company-manage-bids"}
                >
                  <i className='fa fa-briefcase' aria-hidden='true'></i>
                  <span>Manage Bids</span>`
                </Link>
              </li> */}
              <li>
                <Link
                  className={active === "Favorite" ? "active ml-4" : "ml-4"}
                  to={"/company-resume"}
                >
                  <i className="fa fa-briefcase" aria-hidden="true"></i>
                  <span>Favorite tasks</span>
                </Link>
              </li>
              <li>
                <Link
                  className={active === "Applied Jobs" ? "active ml-4" : "ml-4"}
                  to={"/jobs-applied-job"}
                >
                  <i className="fa fa-briefcase" aria-hidden="true"></i>
                  <span>Upcoming tasks</span>
                </Link>
              </li>
            </Collapse>
            <li>
              <Link to={"/transactions"}>
                <i className="fa fa-handshake-o" aria-hidden="true"></i>
                <span>Transactions</span>
              </Link>
            </li>
            <li>
              <Link to={"/post-ads"}>
                <i className="fa fa-handshake-o" aria-hidden="true"></i>
                <span>Post Ad</span>
              </Link>
            </li>

            <li onClick={() => setShowSettings(!showSettings)}>
              <Link to={"#"} className={active === "question" ? "active" : ""}>
                {/* <i class="fa-solid fa-gear"></i> */}
                {/* "fa fa-arrow-down" : "fa fa-arrow-right" */}
                <i
                  className={
                    !showSettings ? "fa fa-arrow-right" : "fa fa-arrow-down"
                  }
                  aria-hidden="true"
                ></i>
                <span>Settings</span>
              </Link>
            </li>
            <Collapse in={showSettings}>
              <li>
                <Link
                  className={active === "Job Alerts" ? "active ml-4" : "ml-4"}
                  to={"/jobs-alerts"}
                >
                  <i className="fa fa-bell-o" aria-hidden="true"></i>
                  <span>Alerts</span>
                </Link>
              </li>
              <li>
                <Link
                  className={active === "Security" ? "active ml-4" : "ml-4"}
                  to={"/account-security"}
                >
                  <i className="fa fa-lock" aria-hidden="true"></i>
                  <span>Security</span>
                </Link>
              </li>
              <li>
                <Link
                  className={
                    active === "Linked Accounts" ? "active ml-4" : "ml-4"
                  }
                  to={"/linked-accounts"}
                >
                  <i
                    className="fa-solid fa-building-columns"
                    aria-hidden="true"
                  ></i>
                  <span>Linked Accounts</span>
                </Link>
              </li>

              <li>
                <Link
                  className={
                    active === "Change Password" ? "active ml-4" : "ml-4"
                  }
                  to={"/jobs-change-password"}
                >
                  <i className="fa fa-key" aria-hidden="true"></i>
                  <span>Change Password</span>
                </Link>
              </li>
            </Collapse>
            <li>
              <Link to={"./"}>
                <i className="fa fa-sign-out" aria-hidden="true"></i>
                <span>Log Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProfileSidebar
