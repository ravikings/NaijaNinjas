import React, { Component } from "react"
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom"

import Homepage from "./Pages/Other/Homepage1"
import Homepage2 from "./Pages/Other/Homepage2"
import Landingpage from "./Pages/Other/landingpage"

import AskQuestion from "./Pages/Other/AskQuestion"
import UpdateQuestion from "./Pages/Other/UpdateQuestion"
import AllQuestion from "./Pages/Other/AllQuestion"
import Jobprofile from "./Pages/Profile/Jobprofile"
import Dashboard from "./Pages/dashboard/Dashboard"
import Jobmyresume from "./Pages/Other/Jobmyresume"
import Jobsappliedjob from "./Pages/Other/Jobsappliedjob"
import Jobsalert from "./Pages/Other/Jobsalert"
import Jobsavedjobs from "./Pages/Other/Jobsavedjobs"
import Jobcvmanager from "./Pages/Other/Jobcvmanager"
import Changepasswordpage from "./Pages/Other/Changepasswordpage"

import Companyprofile from "./Pages/Other/Companyprofile"
import Companyresume from "./Pages/Other/Companyresume"
import Componypostjobs from "./Pages/Other/Componypostjobs"
import Companymanage from "./Pages/Other/Companymanage"
import Companytransactions from "./Pages/Other/Companytransactions"
import Browsecandidates from "./Pages/Other/Browsecandidates"

import Aboutus from "./Pages/Other/Aboutus"
import Jobdetail from "./Pages/Other/Jobdetail"
import Companies from "./Pages/Other/Companies"
import Freejobalerts from "./Pages/Other/Freejobalerts"
import Browsejoblist from "./Pages/Other/Browsejoblist"
import Browsejobgrid from "./Pages/Other/Browsejobgrid"
import Browsejobfilterlist from "./Pages/Other/Browsejobfilterlist"
import Browsejobfiltergrid from "./Pages/Other/Browsejobfiltergrid"

import Categoryalljob from "./Pages/Other/Categoryalljob"
import Categorycompanyjob from "./Pages/Other/Categorycompanyjob"
import Categorydesignationsjob from "./Pages/Other/Categorydesignationsjob"
import Categoryjobs from "./Pages/Other/Categoryjobs"
import Categorylocationjobs from "./Pages/Other/Categorylocationjobs"
import Categoryskilljobs from "./Pages/Other/Categoryskilljobs"

import Portfoliogrid2 from "./Pages/Other/Portfoliogrid2"

import LoginPage from "./Pages/Auth/LoginPage"
import RegisterPage from "./Pages/Auth/RegisterPage"

import Error404 from "./Pages/Other/Error404"

import Contact from "./Pages/Other/Contact"

import Blogclassic from "./Pages/Other/Blogclassic"
import Blogclassicsidebar from "./Pages/Other/Blogclassicsidebar"
import Blogdetailgrid from "./Pages/Other/Blogdetailgrid"
import Blogdetailgridsidebar from "./Pages/Other/Blogdetailgridsidebar"
import Blogleftimg from "./Pages/Other/Blogleftimg"
import Blogdetail from "./Pages/Other/Blogdetail"
import ScrollToTop from "./Element/ScrollToTop"
import MakeOfferPage from "./Pages/MakeOffer/MakeOfferPage"
import MessagesPage from "./Pages/Messages/MessagesPage"
import ForgotPassword from "./Pages/Auth/Forgot-password"
import MfaLogin from "./Pages/Auth/MFA-login"
import ResetPassword from "./Pages/Auth/Reset-password"
import CompanyManageBids from "./Pages/Other/CompanyManageBids"
import CompanyManageOrders from "./Pages/Other/CompanyManageOrders"
import MakeOfferTaskPage from "./Pages/MakeOffer/MakeOfferTask"
import Header from "./Layout/Header"
import Search from "./Pages/Search"
import BrowseAdsgrid from "./Pages/Other/BrowseAdsgrid"
import BrowseAdsgridDetails from "./Pages/Other/BrowseAdsgridDetails"
import ContractProposal from "./Pages/Other/ContractProposal"
import PostAds from "./Pages/Other/PostAds"
import PrivateRoute from "./PrivateRoutes"
import ProtectedRoute from "./ProtectedRoute"
import AddServices from "./Pages/Other/AddServices"
import UserServices from "./Pages/Other/UserServices"
import AddProject from "./Pages/Other/AddProject"
import UserProject from "./Pages/Other/UserProject"
import SendOfferPage from "./Pages/MakeOffer/SendOfferPage"
import SendContract from "./Pages/Other/SendContract"
import UpdateServices from "./Pages/Other/UpdateServices"
import LinkedAccount from "./Pages/Other/LinkedAccounts"
import AccountSecurity from "./Pages/Other/AccountSecurity"
import UploadID from "./Pages/Other/UploadID"
import Transactions from "./Pages/Other/Transactions"
import ProjectsPage from "./Pages/Other/ProjectsPage"
import UserProjects from "./Pages/Other/UserProjects"
import UpdateProject from "./Pages/Other/UpdateProject"
import ConfirmBid from "./Pages/Other/ConfirmBid"
import TaskContract from "./Pages/Other/TaskContract"
import TimeLine from "./Pages/Other/TimeLine"
import { CometChatUI } from "../cometchat-pro-react-ui-kit/CometChatWorkspace/src";
import Conversationlist from "../chat-app/Conversationlist"

class Markup extends Component {
  render() {
    return (
      <HashRouter basename="/">
        <div className="page-wraper">
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/landingpage" exact component={Landingpage} />
            <Route path="/home" exact component={Homepage} />
            <Route path="/index-2" exact component={Homepage2} />
            <Route path="/messages" exact component={MessagesPage} />
            <PrivateRoute path="/jobs-profile" component={Jobprofile} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route path="/comet-chat" exact component={Conversationlist} />
            <PrivateRoute
              path="/jobs-my-resume"
              exact
              component={Jobmyresume}
            />

            <PrivateRoute path="/ask-questions" exact component={AskQuestion} />
            <PrivateRoute path="/all-questions" exact component={AllQuestion} />
            <PrivateRoute
              path="/jobs-applied-job"
              exact
              component={Jobsappliedjob}
            />
            <PrivateRoute path="/jobs-alerts" exact component={Jobsalert} />
            <Route path="/jobs-saved-jobs" exact component={Jobsavedjobs} />
            <Route path="/jobs-cv-manager" exact component={Jobcvmanager} />
            <Route path="/" exact component={Homepage} />
            <Route path="/index-2" exact component={Homepage2} />
            <PrivateRoute path="/messages" exact component={MessagesPage} />

            <Route path="/ask-questions" exact component={AskQuestion} />
            <Route path="/update-questions" exact component={UpdateQuestion} />

            <PrivateRoute
              path="/jobs-my-resume"
              exact
              component={Jobmyresume}
            />
            <Route path="/jobs-alerts" exact component={Jobsalert} />
            <PrivateRoute
              path="/jobs-saved-jobs"
              exact
              component={Jobsavedjobs}
            />
            <Route path="/jobs-cv-manager" exact component={Jobcvmanager} />
            <PrivateRoute
              path="/jobs-change-password"
              exact
              component={Changepasswordpage}
            />
            <PrivateRoute
              path="/linked-accounts"
              exact
              component={LinkedAccount}
            />
            <PrivateRoute
              path="/account-security"
              exact
              component={AccountSecurity}
            />
            <PrivateRoute
              path="/account-security/new-id"
              exact
              component={UploadID}
            />
            <PrivateRoute path="/transactions" exact component={Transactions} />

            <Route path="/company-profile" exact component={Companyprofile} />
            <PrivateRoute
              path="/company-resume"
              exact
              component={Companyresume}
            />
            <PrivateRoute
              path="/company-post-jobs"
              exact
              component={Componypostjobs}
            />
            <PrivateRoute
              path="/company-manage-job"
              exact
              component={Companymanage}
            />
            <Route
              path="/company-manage-bids"
              exact
              component={CompanyManageBids}
            />
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
            <Route
              path="/make-offer-task/:id/:title"
              exact
              component={MakeOfferTaskPage}
            />
            <PrivateRoute
              path="/manage-bids/:id/:title"
              exact
              component={CompanyManageBids}
            />
            <PrivateRoute
              path="/order-page"
              exact
              component={CompanyManageOrders}
            />
            <PrivateRoute
              path="/manage-bids/:id/:title/confirm/:bidId"
              exact
              component={ConfirmBid}
            />
            <Route path="/make-offer/:id" exact component={MakeOfferPage} />
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
            <Route
              path="/mfa-login"
              exact
              component={MfaLogin}
            />
            <Route path="/portfolio-grid-2" exact component={Portfoliogrid2} />
            <ProtectedRoute path="/login" component={LoginPage} />

            <ProtectedRoute path="/register" exact component={RegisterPage} />
            <ProtectedRoute
              path="/forgot-password"
              exact
              component={ForgotPassword}
            />
            <ProtectedRoute
              path="/reset-password"
              exact
              component={ResetPassword}
            />

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
            <Route
              path="/blog-details/:id/:title"
              exact
              component={Blogdetail}
            />
            <Route path="/projects/:id" exact component={ProjectsPage} />
            <Route path="/search/:query" exact component={Search} />

            <Route path="/browse-ads-grid" exact component={BrowseAdsgrid} />
            <Route path="/ads-details" exact component={BrowseAdsgridDetails} />
            <Route
              path="/contract-proposal"
              exact
              component={ContractProposal}
            />
            <Route path="/task-contract" exact component={TaskContract} />
            <Route
              path="/timeline/:taskID/:taskOwner"
              exact
              component={TimeLine}
            />

            <PrivateRoute path="/add-services" exact component={AddServices} />
            <PrivateRoute
              path="/update-projects/:id"
              exact
              component={UpdateProject}
            />
            <PrivateRoute
              path="/update-services/:id"
              exact
              component={UpdateServices}
            />
            <PrivateRoute
              path="/user-services"
              exact
              component={UserServices}
            />
            <PrivateRoute
              path="/user-projects"
              exact
              component={UserProjects}
            />
            <PrivateRoute path="/add-projects" exact component={AddProject} />
            <Route path="/user-projects" exact component={UserProject} />

            <Route path="/send-offer" exact component={SendOfferPage} />
            <Route path="/send-contract/:id" exact component={SendContract} />
            <PrivateRoute path="/post-ads" exact component={PostAds} />
          </Switch>
        </div>
        <ScrollToTop />
      </HashRouter>
    )
  }
}

export default Markup
