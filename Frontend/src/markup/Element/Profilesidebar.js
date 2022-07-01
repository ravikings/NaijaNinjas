import React, { useState } from "react";
import { Link } from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";

// function ProfileSidebar({ active }) {
//   const [showManage, setShowManage] = useState(false);
//   const [showQuestion, setShowQuestion] = useState(false);
function ProfileSidebar({ active, showManageProp = false }) {
  const [showManage, setShowManage] = useState(showManageProp);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showProject, setShowProject] = useState(false);
  return (
    <div className='col-xl-3 col-lg-4 m-b30'>
      <div className='sticky-top'>
        <div className='candidate-info'>
          <div className='candidate-detail text-center'>
            <div className='canditate-des'>
              <Link to={""}>
                <img
                  alt={profile.first_name}
                  src={
                    profile.photo
                      ? BASE_URL + profile.photo
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  }
                />
              </Link>
              <form>
                <div
                  className='upload-link'
                  title='Update image.'
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
                <h4 className='m-b5'>
                  <Link to={""}>David Matin</Link>
                </h4>
                <p className='m-b0'>
                  <Link to={""}>Web developer</Link>
                </p>
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
            <li>
              <Link to={"/jobs-my-resume"}>
                <i className='fa fa-file-text-o' aria-hidden='true'></i>
                <span>My Resume</span>
              </Link>
            </li>
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
               {/* start ask question start */}
            <li onClick={() => setShowServices(!showServices)}>
              <Link to={"#"} className={active === "services" ? "active" : ""}>
                <i
                  className={
                    showServices ? "fa fa-arrow-down" : "fa fa-arrow-right"
                  }
                  aria-hidden='true'
                ></i>
                <span>Services</span>
              </Link>
            </li>
            <Collapse in={showServices}>
              <li>
                <Link className={"ml-4"} to={"/add-services"}>
                  <i className='fa fa-briefcase' aria-hidden='true'></i>
                  <span>Add Services</span>
                </Link>
              </li>
              <li>
                <Link className={"ml-4"} to={"/user-services"}>
                  <i className='fa fa-briefcase' aria-hidden='true'></i>
                  <span>All Services</span>
                </Link>
              </li>
            </Collapse>
            {/* start ask question end */}
               {/* start project end */}
               <li onClick={() => setShowProject(!showProject)}>
              <Link to={"#"} className={active === "project" ? "active" : ""}>
                <i
                  className={
                    showProject ? "fa fa-arrow-down" : "fa fa-arrow-right"
                  }
                  aria-hidden='true'
                ></i>
                <span>Projects</span>
              </Link>
            </li>
            <Collapse in={showProject}>
              <li>
                <Link className={"ml-4"} to={"/add-projects"}>
                  <i className='fa fa-briefcase' aria-hidden='true'></i>
                  <span>Add Projects</span>
                </Link>
              </li>
              <li>
                <Link className={"ml-4"} to={"/user-projects"}>
                  <i className='fa fa-briefcase' aria-hidden='true'></i>
                  <span>All Projects</span>
                </Link>
              </li>
            </Collapse>
            {/* start project end */}
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
              <Link
              
                to={"/post-ads"}
              >
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
