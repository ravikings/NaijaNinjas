import React, { useState } from "react";
import { Link } from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";

function ProfileSidebar({ active }) {
  const [showManage, setShowManage] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  return (
    <div className="col-xl-3 col-lg-4 m-b30">
      <div className="sticky-top">
        <div className="candidate-info">
          <div className="candidate-detail text-center">
            <div className="canditate-des">
              <Link to={""}>
                <img alt="" src={require("./../../images/team/pic1.jpg")} />
              </Link>
              <div
                className="upload-link"
                title="update"
                data-toggle="tooltip"
                data-placement="right"
              >
                <input type="file" className="update-flie" />
                <i className="fa fa-camera"></i>
              </div>
            </div>
            <div className="candidate-title">
              <div className="">
                <h4 className="m-b5">
                  <Link to={""}>David Matin</Link>
                </h4>
                <p className="m-b0">
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
            <li>
              <Link to={"/jobs-my-resume"}>
                <i className="fa fa-file-text-o" aria-hidden="true"></i>
                <span>My Resume</span>
              </Link>
            </li>
            <li>
              <Link to={"/jobs-saved-jobs"}  className={active === "jobssave" ? "active" : ""}>
                <i className="fa fa-heart-o" aria-hidden="true"></i>
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
                  aria-hidden="true"
                ></i>
                <span>Manage jobs</span>
              </Link>
            </li>
            <Collapse in={showManage}>
              <li>
                <Link className={"ml-4"} to={"#"}>
                  <i className="fa fa-briefcase" aria-hidden="true"></i>
                  <span>Post a job</span>
                </Link>
              </li>
              <li>
                <Link className={"ml-4"} to={"#"}>
                  <i className="fa fa-briefcase" aria-hidden="true"></i>
                  <span>Transaction</span>
                </Link>
              </li>
              <li>
                <Link className={"ml-4"} to={"#"}>
                  <i className="fa fa-briefcase" aria-hidden="true"></i>
                  <span>Manage jobs</span>
                </Link>
              </li>
              <li>
                <Link className={"ml-4"} to={"#"}>
                  <i className="fa fa-briefcase" aria-hidden="true"></i>
                  <span>Favorite</span>
                </Link>
              </li>
            </Collapse>

            <li>
              <Link to={"/jobs-applied-job"}  className={active === "jobsapplied" ? "active" : ""}>
                <i className="fa fa-briefcase" aria-hidden="true"></i>
                <span>Applied Jobs</span>
              </Link>
            </li>
            <li>
              <Link
                className={active === "Job Alerts" ? "active" : ""}
                to={"/jobs-alerts"}
              >
                <i className="fa fa-bell-o" aria-hidden="true"></i>
                <span>Job Alerts</span>
              </Link>
            </li>
            <li>
              <Link
                className={active === "CV Manager" ? "active" : ""}
                to={"/jobs-cv-manager"}
              >
                <i className="fa fa-id-card-o" aria-hidden="true"></i>
                <span>CV Manager</span>
              </Link>
            </li>
            {/* start ask question start */}
            <li onClick={() => setShowQuestion(!showQuestion)}>
              <Link to={"#"}  className={active === "question" ? "active" : ""}>
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
                <Link className={"ml-4"} to={'/ask-questions'}>
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
              <Link to={"/jobs-change-password"}  className={active === "password" ? "active" : ""}>
                <i className="fa fa-key" aria-hidden="true"></i>
                <span>Change Password</span>
              </Link>
            </li>
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
  );
}
export default ProfileSidebar;
