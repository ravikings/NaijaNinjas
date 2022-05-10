import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Homepage from "./Pages/Other/Homepage1";
import Homepage2 from "./Pages/Other/Homepage2";

import AskQuestion from "./Pages/Other/AskQuestion";
import UpdateQuestion from "./Pages/Other/UpdateQuestion";
import AllQuestion from "./Pages/Other/AllQuestion";
import Jobprofile from "./Pages/Profile/Jobprofile";
import Jobmyresume from "./Pages/Other/Jobmyresume";
import Jobsappliedjob from "./Pages/Other/Jobsappliedjob";
import Jobsalert from "./Pages/Other/Jobsalert";
import Jobsavedjobs from "./Pages/Other/Jobsavedjobs";
import Jobcvmanager from "./Pages/Other/Jobcvmanager";
import Changepasswordpage from "./Pages/Other/Changepasswordpage";

import Companyprofile from "./Pages/Other/Companyprofile";
import Companyresume from "./Pages/Other/Companyresume";
import Componypostjobs from "./Pages/Other/Componypostjobs";
import Companymanage from "./Pages/Other/Companymanage";
import Companytransactions from "./Pages/Other/Companytransactions";
import Browsecandidates from "./Pages/Other/Browsecandidates";

import Aboutus from "./Pages/Other/Aboutus";
import Jobdetail from "./Pages/Other/Jobdetail";
import Companies from "./Pages/Other/Companies";
import Freejobalerts from "./Pages/Other/Freejobalerts";
import Browsejoblist from "./Pages/Other/Browsejoblist";
import Browsejobgrid from "./Pages/Other/Browsejobgrid";
import Browsejobfilterlist from "./Pages/Other/Browsejobfilterlist";
import Browsejobfiltergrid from "./Pages/Other/Browsejobfiltergrid";

import Categoryalljob from "./Pages/Other/Categoryalljob";
import Categorycompanyjob from "./Pages/Other/Categorycompanyjob";
import Categorydesignationsjob from "./Pages/Other/Categorydesignationsjob";
import Categoryjobs from "./Pages/Other/Categoryjobs";
import Categorylocationjobs from "./Pages/Other/Categorylocationjobs";
import Categoryskilljobs from "./Pages/Other/Categoryskilljobs";

import Portfoliogrid2 from "./Pages/Other/Portfoliogrid2";

import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";

import Error404 from "./Pages/Other/Error404";

import Contact from "./Pages/Other/Contact";

import Blogclassic from "./Pages/Other/Blogclassic";
import Blogclassicsidebar from "./Pages/Other/Blogclassicsidebar";
import Blogdetailgrid from "./Pages/Other/Blogdetailgrid";
import Blogdetailgridsidebar from "./Pages/Other/Blogdetailgridsidebar";
import Blogleftimg from "./Pages/Other/Blogleftimg";
import Blogdetail from "./Pages/Other/Blogdetail";
import ScrollToTop from "./Element/ScrollToTop";
import MakeOfferPage from "./Pages/MakeOffer/MakeOfferPage";
import MessagesPage from "./Pages/Messages/MessagesPage";
import ForgotPassword from "./Pages/Auth/Forgot-password";
import ResetPassword from "./Pages/Auth/Reset-password";
import Search from "./Pages/Search";

class Markup extends Component {
  render() {
    return (
      <BrowserRouter basename="/react/demo">
        <div className="page-wraper">
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/index-2" exact component={Homepage2} />
            <Route path="/messages" exact component={MessagesPage} />

            <Route path="/jobs-profile" exact component={Jobprofile} />
            <Route path="/ask-questions" exact component={AskQuestion} />
            <Route path="/update-questions" exact component={UpdateQuestion} />
            <Route path="/all-questions" exact component={AllQuestion} />
            <Route path="/jobs-my-resume" exact component={Jobmyresume} />
            <Route path="/jobs-applied-job" exact component={Jobsappliedjob} />
            <Route path="/jobs-alerts" exact component={Jobsalert} />
            <Route path="/jobs-saved-jobs" exact component={Jobsavedjobs} />
            <Route path="/jobs-cv-manager" exact component={Jobcvmanager} />
            <Route
              path="/jobs-change-password"
              exact
              component={Changepasswordpage}
            />

            <Route path="/company-profile" exact component={Companyprofile} />
            <Route path="/company-resume" exact component={Companyresume} />
            <Route
              path="/company-post-jobs"
              exact
              component={Componypostjobs}
            />
            <Route path="/company-manage-job" exact component={Companymanage} />
            <Route
              path="/company-transactions"
              exact
              component={Companytransactions}
            />
            <Route
              path="/browse-candidates"
              exact
              component={Browsecandidates}
            />

            <Route path="/about-us" exact component={Aboutus} />
            <Route path="/job-detail" exact component={Jobdetail} />
            <Route path="/make-offer" exact component={MakeOfferPage} />
            <Route path="/companies" exact component={Companies} />
            <Route path="/free-job-alerts" exact component={Freejobalerts} />
            <Route path="/browse-job-list" exact component={Browsejoblist} />
            <Route path="/browse-job-grid" exact component={Browsejobgrid} />
            <Route
              path="/browse-job-filter-list"
              exact
              component={Browsejobfilterlist}
            />
            <Route
              path="/browse-job-filter-grid"
              exact
              component={Browsejobfiltergrid}
            />

            <Route path="/category-all-jobs" exact component={Categoryalljob} />
            <Route
              path="/category-company-jobs"
              exact
              component={Categorycompanyjob}
            />
            <Route
              path="/category-designations-jobs"
              exact
              component={Categorydesignationsjob}
            />
            <Route path="/category-jobs" exact component={Categoryjobs} />
            <Route
              path="/category-location-jobs"
              exact
              component={Categorylocationjobs}
            />
            <Route
              path="/category-skill-jobs"
              exact
              component={Categoryskilljobs}
            />

            <Route path="/portfolio-grid-2" exact component={Portfoliogrid2} />

            <Route path="/login" exact component={LoginPage} />

            <Route path="/register" exact component={RegisterPage} />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route path="/reset-password" exact component={ResetPassword} />


            <Route path="/error-404" exact component={Error404} />

            <Route path="/contact" exact component={Contact} />

            <Route path="/blog-classic" exact component={Blogclassic} />
            <Route
              path="/blog-classic-sidebar"
              exact
              component={Blogclassicsidebar}
            />
            <Route
              path="/blog-detailed-grid"
              exact
              component={Blogdetailgrid}
            />
            <Route
              path="/blog-detailed-grid-sidebar"
              exact
              component={Blogdetailgridsidebar}
            />
            <Route path="/blog-left-img" exact component={Blogleftimg} />
            <Route path="/blog-details/:id/:title" exact component={Blogdetail} />
            <Route path="/search/:query" exact component={Search} />
          </Switch>
        </div>
        <ScrollToTop />
      </BrowserRouter>
    );
  }
}

export default Markup;
