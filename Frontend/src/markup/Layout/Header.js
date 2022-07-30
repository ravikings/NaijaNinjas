import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo2 from "./../../images/logo.png";
import AuthState from "./AuthState";
import LoginDialog from "./LoginDialog";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { logout } from "../Pages/Auth/Redux/AuthActions";
import { Hidden } from "@material-ui/core";
function Header() {
  const userDetails = useSelector((state) => state.authReducer.currentUser);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [msg, setMsg] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClose = () => {
    setShowLoginDialog(false);
  };
  const handleShow = () => {
    setShowLoginDialog(true);
  };

  const signOut = () => {
    dispatch(logout(handleClose));
    history.push("/");
  };

  useEffect(() => {
    // sidebar open/close

    var Navicon = document.querySelector(".navicon");
    var sidebarmenu = document.querySelector(".myNavbar ");

    function toggleFunc() {
      sidebarmenu.classList.toggle("show");
      //   Navicon.classList.toggle('open');
    }

    Navicon.addEventListener("click", toggleFunc);

    // Sidenav li open close
    var navUl = [].slice.call(
      document.querySelectorAll(".navbar-nav > li > a, .sub-menu > li > a")
    );
    for (var y = 0; y < navUl.length; y++) {
      navUl[y].addEventListener("click", function () {
        checkLi(this);
      });
    }

    function checkLi(current) {
      current.parentElement.parentElement
        .querySelectorAll("li")
        .forEach((el) =>
          current.parentElement !== el ? el.classList.remove("open") : ""
        );
      setTimeout(() => {
        current.parentElement.classList.toggle("open");
      }, 100);
    }
  }, []);

  return (
    <>
      <header
        className="site-header mo-left header fullwidth"
        style={{ position: "sticky", top: 0 }}
      >
        <div className="sticky-header main-bar-wraper navbar-expand-lg">
          <div className="main-bar clearfix">
            <div className="px-3 clearfix">
              <div className="logo-header mostion">
                <Link to={"/"}>
                  <img src={logo2} className="logo" alt="img" />
                </Link>
              </div>

              {userDetails ? (
                <div className="mobile-notification">
                  <a href="#" onClick={() => setLgShow(true)}>
                    <i className="fa fa-bell-o " />
                    <sup className="bg-website">4</sup>
                  </a>
                  <a href="#" onClick={() => setMsg(true)}>
                    <i className="fa fa-envelope-open-o " />
                    <sup className="bg-website">4</sup>
                  </a>
                </div>
              ) : null}

              <button
                className="navbar-toggler collapsed navicon  justify-content-end"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <Hidden smUp>
                {!userDetails && (
                  <div className=" extra-nav d-flex justify-content-end">
                    <Link to={"/register"} className="site-button p-1">
                      <i className="fa fa-user"></i> SIGNUP
                    </Link>
                    <Link
                      to={"/login"}
                      title="READ MORE"
                      className="site-button p-1 "
                    >
                      <i className="fa fa-lock"></i> LOGIN{" "}
                    </Link>
                  </div>
                )}
              </Hidden>
              <AuthState userDetails={userDetails} handleShow={handleShow} />
              <div
                className="header-nav navbar-collapse collapse myNavbar justify-content-start"
                id="navbarNavDropdown"
              >
                <div className="logo-header mostion d-md-block d-lg-none">
                  <Link to={"/"} className="dez-page">
                    <img src={logo2} alt="" />
                  </Link>
                </div>
                <ul className="nav navbar-nav">
                  <li className="">
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li>
                    <Link to={"/browse-job-filter-list"}>tasks</Link>
                  </li>
                  <li>
                    <Link to={"/browse-ads-grid"}>marketplace</Link>
                  </li>
                  {/* <li>
                    <Link to={"/browse-candidates"}>Explore</Link>
                  </li> */}
                  <li>
                    <Link to={"/blog-detailed-grid-sidebar"}>Forum</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/*  Model Start */}
      <LoginDialog
        showLoginDialog={showLoginDialog}
        handleClose={handleClose}
      />

      <Modal
        size="sm"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        backdropClassName="project-modal"
      >
        <Modal.Header
          className="header-notifications-headline bg-white"
          closeButton
        >
          <h4>Notifications</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="header-notifications-content">
            <div className="header-notifications-scroll" data-simplebar>
              <ul>
                {/* Notification */}
                <li className="notifications-not-read">
                  <a href="dashboard-manage-candidates.html">
                    <span className="notification-icon">
                      <i className="icon-material-outline-group" />
                    </span>
                    <span className="notification-text">
                      <strong>Michael Shannah</strong> applied for a job{" "}
                      <span className="color">
                        Full Stack Software Engineer
                      </span>
                    </span>
                  </a>
                </li>
                {/* Notification */}
                <li>
                  <a href="dashboard-manage-bidders.html">
                    <span className="notification-icon">
                      <i className=" icon-material-outline-gavel" />
                    </span>
                    <span className="notification-text">
                      <strong>Gilbert Allanis</strong> placed a bid on your{" "}
                      <span className="color">iOS App Development</span> project
                    </span>
                  </a>
                </li>
                {/* Notification */}
                <li>
                  <a href="dashboard-manage-jobs.html">
                    <span className="notification-icon">
                      <i className="icon-material-outline-autorenew" />
                    </span>
                    <span className="notification-text">
                      Your job listing{" "}
                      <span className="color">Full Stack PHP Developer</span> is
                      expiring.
                    </span>
                  </a>
                </li>
                {/* Notification */}
                <li>
                  <a href="dashboard-manage-candidates.html">
                    <span className="notification-icon">
                      <i className="icon-material-outline-group" />
                    </span>
                    <span className="notification-text">
                      <strong>Sindy Forrest</strong> applied for a job{" "}
                      <span className="color">
                        Full Stack Software Engineer
                      </span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* message start */}

      <Modal
        size="sm"
        show={msg}
        onHide={() => setMsg(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        backdropClassName="project-modal"
      >
        <Modal.Header
          className="header-notifications-headline bg-white"
          closeButton
        >
          <h4>Messages</h4>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="header-notifications-content">
            <div className="header-notifications-scroll" data-simplebar>
              <ul>
                {/* Notification */}
                <li className="notifications-not-read">
                  <a href="dashboard-messages.html">
                    <span className="notification-avatar status-online">
                      <img src="images/user-avatar-small-03.jpg" alt="" />
                    </span>
                    <div className="notification-text">
                      <strong>David Peterson</strong>
                      <p className="notification-msg-text">
                        Thanks for reaching out. I'm quite busy right now on
                        many...
                      </p>
                      <span className="color">4 hours ago</span>
                    </div>
                  </a>
                </li>
                {/* Notification */}
                <li className="notifications-not-read">
                  <a href="dashboard-messages.html">
                    <span className="notification-avatar status-offline">
                      <img src="images/user-avatar-small-02.jpg" alt="" />
                    </span>
                    <div className="notification-text">
                      <strong>Sindy Forest</strong>
                      <p className="notification-msg-text">
                        Hi Tom! Hate to break it to you, but I'm actually on
                        vacation until...
                      </p>
                      <span className="color">Yesterday</span>
                    </div>
                  </a>
                </li>
                {/* Notification */}
                <li className="notifications-not-read">
                  <a href="dashboard-messages.html">
                    <span className="notification-avatar status-online">
                      <img src="images/user-avatar-placeholder.png" alt="" />
                    </span>
                    <div className="notification-text">
                      <strong>Marcin Kowalski</strong>
                      <p className="notification-msg-text">
                        I received payment. Thanks for cooperation!
                      </p>
                      <span className="color">Yesterday</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <a
            href="#"
            className="header-notifications-button ripple-effect button-sliding-icon "
          >
            View All Messages
            <i className="icon-material-outline-arrow-right-alt" />
          </a>
        </Modal.Body>
      </Modal>
      {/* message end */}
    </>
  );
}

export default Header;
