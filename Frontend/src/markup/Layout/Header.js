import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../Context/AuthContext";
import logo2 from "./../../images/logo.png";
import AuthState from "./AuthState";
import LoginDialog from "./LoginDialog";

var bnr3 = require("./../../images/background/bg3.jpg");

function Header() {
  const userDetails = useUser();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleClose = () => {
    setShowLoginDialog(false);
  };
  const handleShow = () => {
    setShowLoginDialog(true);
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
            <div className="container clearfix">
              <div className="logo-header mostion">
                <Link to={"/"}>
                  <img src={logo2} className="logo" alt="img" />
                </Link>
              </div>

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
                    <Link to={"/browse-job-filter-list"}>marketplace</Link>
                  </li>
                  <li>
                    <Link to={"/browse-candidates"}>Explore</Link>
                  </li>
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
    </>
  );
}

export default Header;
