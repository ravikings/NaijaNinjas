import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";
import { useSelector } from "react-redux";
import { sendImage } from "../../utils/axios";
import useAxiosPrivateImage from "../../hooks/useAxiosPrivateImage";

// function ProfileSidebar({ active }) {
//   const [showManage, setShowManage] = useState(false);
//   const [showQuestion, setShowQuestion] = useState(false);
function ProfileSidebar({ author, userID, active, showManageProp = false }) {
  const [showManage, setShowManage] = useState(showManageProp);
  const [showQuestion, setShowQuestion] = useState(false);
  const [imageState, setImageState] = useState(null);
  const [dataToSend, setDataToSend] = useState("");
  const imageSendAPI = useAxiosPrivateImage();

  const sendImage = async () => {
    const controller = new AbortController();

    try {
      const formData = new FormData();

      // const getFormData = (object) =>
      //   Object.keys(object).reduce((formData, key) => {
      //     formData.append(key, object[key], "ABC.jpg");
      //     return formData;
      //   }, new FormData());
      // const data = getFormData(imageState);
      formData.append("photo", imageState, "ABC.jpg");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1], "IMAGESENT");
      }
      console.log(author, "IMAGESENT");
      console.log(userID, "IMAGESENT");
      console.log(formData, "IMAGESENT");
      const res = await imageSendAPI.patch(
        `/api/v1/account/user-profile/${userID}/`,
        {
          photo: formData,
          author,
        }
      );
      setImageState("");
      console.log(res, "IMAGESENT");
    } catch (error) {
      console.log(error, "IMAGESENT");
    }
  };

  useEffect(() => {
    console.log(dataToSend);
  }, [dataToSend]);

  useEffect(() => {
    console.log(imageState, "IMAGESENT");
    sendImage();
    // sendImage(imageState, userID, author);
  }, [imageState]);

  const { userProfile, userStatus } = useSelector((state) => state.authReducer);

  const makingDataToFormData = () => {
    const formData = new FormData();
    if (imageState) {
      for (let key in imageState) {
        formData.append(key, imageState[key]);
      }
    }
    console.log(formData);
    return formData;
  };

  useEffect(() => {
    const formData = makingDataToFormData(imageState);
    setDataToSend(formData);
  }, [imageState]);

  return (
    <div className='col-xl-3 col-lg-4 m-b30'>
      <div className='sticky-top'>
        <div className='candidate-info'>
          <div className='candidate-detail text-center'>
            <div className='canditate-des'>
              <Link to={""}>
                <img alt='' src={require("./../../images/team/pic1.jpg")} />
              </Link>
              <form>
                <div
                  className='upload-link'
                  title='update'
                  data-toggle='tooltip'
                  data-placement='right'
                >
                  <input
                    type='file'
                    name='photo'
                    className='update-flie'
                    accept='image/jpeg,image/png,image/gif'
                    onChange={(e) => {
                      setImageState(e.target.files[0]);
                    }}
                  />
                  <i className='fa fa-camera'></i>
                </div>
              </form>
            </div>
            <div className='candidate-title'>
              <div className=''>
                {userProfile.first_name && (
                  <h4 className='m-b5'>
                    <Link to={""} onClick={(e) => e.preventDefault()}>
                      {userProfile.first_name}{" "}
                      {userProfile.last_name && userProfile.last_name}
                    </Link>
                  </h4>
                )}
                {userProfile.title && (
                  <p className='m-b0'>
                    <Link to={""}>{userProfile.title}</Link>
                  </p>
                )}
              </div>
            </div>
          </div>
          <ul>
            <li>
              <Link
                to={"/jobs-profile"}
                className={active === "Profile" ? "active" : ""}
              >
                <i className='fa fa-user-o' aria-hidden='true'></i>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to={"/messages"}>
                <i className='fa fa-comments-o' aria-hidden='true'></i>
                <span>Messages</span>
              </Link>
            </li>
            {userStatus.is_a_runner && (
              <li>
                <Link to={"/jobs-my-resume"}>
                  <i className='fa fa-file-text-o' aria-hidden='true'></i>
                  <span>My Resume</span>
                </Link>
              </li>
            )}
            <li>
              <Link
                to={"/jobs-saved-jobs"}
                className={active === "Saved Jobs" ? "active" : ""}
              >
                <i className='fa fa-heart-o' aria-hidden='true'></i>
                <span>Saved Jobs</span>
              </Link>
            </li>
            {/*Manage Jobs Collapse*/}
            <li onClick={() => setShowManage(!showManage)}>
              <Link to={"#"}>
                <i
                  className={
                    showManage ? "fa fa-arrow-down" : "fa fa-arrow-right"
                  }
                  aria-hidden='true'
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
                  <i className='fa fa-briefcase' aria-hidden='true'></i>
                  <span>Post a task</span>
                </Link>
              </li>
              <li>
                <Link
                  className={active === "Task" ? "active ml-4" : "ml-4"}
                  to={"/company-manage-job"}
                >
                  <i className='fa fa-briefcase' aria-hidden='true'></i>
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
                  <i className='fa fa-briefcase' aria-hidden='true'></i>
                  <span>Favorite tasks</span>
                </Link>
              </li>
            </Collapse>

            <li>
              <Link
                className={active === "Applied Jobs" ? "active" : ""}
                to={"/jobs-applied-job"}
              >
                <i className='fa fa-briefcase' aria-hidden='true'></i>
                <span>Upcoming tasks</span>
              </Link>
            </li>
            <li>
              <Link to={"/post-ads"}>
                <i className='fa fa-handshake-o' aria-hidden='true'></i>
                <span>Post Ad</span>
              </Link>
            </li>
            <li>
              <Link
                className={active === "Job Alerts" ? "active" : ""}
                to={"/jobs-alerts"}
              >
                <i className='fa fa-bell-o' aria-hidden='true'></i>
                <span>Alerts</span>
              </Link>
            </li>

            {/* start ask question start */}
            <li onClick={() => setShowQuestion(!showQuestion)}>
              <Link to={"#"} className={active === "question" ? "active" : ""}>
                <i
                  className={
                    showQuestion ? "fa fa-arrow-down" : "fa fa-arrow-right"
                  }
                  aria-hidden='true'
                ></i>
                <span>Ask Question</span>
              </Link>
            </li>
            <Collapse in={showQuestion}>
              <li>
                <Link className={"ml-4"} to={"/ask-questions"}>
                  <i className='fa fa-briefcase' aria-hidden='true'></i>
                  <span>Ask a Question</span>
                </Link>
              </li>
              <li>
                <Link className={"ml-4"} to={"/all-questions"}>
                  <i className='fa fa-briefcase' aria-hidden='true'></i>
                  <span>All Question</span>
                </Link>
              </li>
            </Collapse>
            {/* start ask question end */}
            <li>
              <Link
                className={active === "Change Password" ? "active" : ""}
                to={"/jobs-change-password"}
              >
                <i className='fa fa-key' aria-hidden='true'></i>
                <span>Change Password</span>
              </Link>
            </li>
            <li>
              <Link to={"./"}>
                <i className='fa fa-sign-out' aria-hidden='true'></i>
                <span>Log Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfileSidebar;
