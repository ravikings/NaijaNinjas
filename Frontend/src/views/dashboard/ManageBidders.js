import React,{useState,useEffect} from 'react'
import DashboardFooter from '../../layout/dashboard/DashboardFooter'
import {Form,Modal,Tabs,Tab} from 'react-bootstrap'
export default function ManageBidders() {
    const [show, setShow] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseMessage = () => setShowMessage(false);
    const handleShowMessage = () => setShowMessage(true);
    return (
        <>
          {/* Market Place Content
	================================================== */}
      <div className="dashboard-content-container" data-simplebar>
        <div className="dashboard-content-inner">
          {/* Market Place Headline */}
          <div className="dashboard-headline">
            <h3>Manage Bidders</h3>
            <span className="margin-top-7">Bids for <a href="#">Food Delivery Mobile Application</a></span>
            {/* Breadcrumbs */}
            <nav id="breadcrumbs" className="dark">
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Market Place</a></li>
                <li>Manage Bidders</li>
              </ul>
            </nav>
          </div>
          {/* Row */}
          <div className="row">
            {/* Market Place Box */}
            <div className="col-xl-12">
              <div className="dashboard-box margin-top-0">
                {/* Headline */}
                <div className="headline">
                  <h3><i className="icon-material-outline-supervisor-account" /> 3 Bidders</h3>
                  <div className="sort-by">
                    <select className="selectpicker hide-tick">
                      <option>Highest First</option>
                      <option>Lowest First</option>
                      <option>Fastest First</option>
                    </select>
                  </div>
                </div>
                <div className="content">
                  <ul className="dashboard-box-list">
                    <li>
                      {/* Overview */}
                      <div className="freelancer-overview manage-candidates">
                        <div className="freelancer-overview-inner">
                          {/* Avatar */}
                          <div className="freelancer-avatar">
                            <div className="verified-badge" />
                            <a href="#"><img src="images/user-avatar-big-02.jpg" alt="" /></a>
                          </div>
                          {/* Name */}
                          <div className="freelancer-name">
                            <h4><a href="#">David Peterson <img className="flag" src="images/flags/de.svg" alt="" title="Germany" data-tippy-placement="top" /></a></h4>
                            {/* Details */}
                            <span className="freelancer-detail-item"><a href="#"><i className="icon-feather-mail" /> david@example.com</a></span>
                            {/* Rating */}
                            <div className="freelancer-rating">
                              <div className="star-rating" data-rating={5.0} />
                            </div>
                            {/* Bid Details */}
                            <ul className="dashboard-task-info bid-info">
                              <li><strong>$3,200</strong><span>Fixed Price</span></li>
                              <li><strong>14 Days</strong><span>Delivery Time</span></li>
                            </ul>
                            {/* Buttons */}
                            <div className="buttons-to-right always-visible margin-top-25 margin-bottom-0">
                              <a href="#" onClick={handleShow} className=" button ripple-effect"><i className="icon-material-outline-check" /> Accept Offer</a>
                              <a href="#" onClick={handleShowMessage} className=" button dark ripple-effect"><i className="icon-feather-mail" /> Send Message</a>
                              <a href="#" className="button gray ripple-effect ico" title="Remove Bid" data-tippy-placement="top"><i className="icon-feather-trash-2" /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      {/* Overview */}
                      <div className="freelancer-overview manage-candidates">
                        <div className="freelancer-overview-inner">
                          {/* Avatar */}
                          <div className="freelancer-avatar">
                            <a href="#"><img src="images/user-avatar-placeholder.png" alt="" /></a>
                          </div>
                          {/* Name */}
                          <div className="freelancer-name">
                            <h4><a href="#">Oldrich Ćuk <img className="flag" src="images/flags/sk.svg" alt="" title="Slovakia" data-tippy-placement="top" /></a></h4>
                            {/* Details */}
                            <span className="freelancer-detail-item"><a href="#"><i className="icon-feather-mail" /> oldrich@example.com</a></span>
                            <span className="freelancer-detail-item"><i className="icon-feather-phone" /> (+421) 123-456-789</span>
                            {/* Rating */}
                            <br />
                            <span className="company-not-rated">Minimum of 3 votes required</span>
                            {/* Bid Details */}
                            <ul className="dashboard-task-info bid-info">
                              <li><strong>$3,000</strong><span>Fixed Price</span></li>
                              <li><strong>14 Days</strong><span>Delivery Time</span></li>
                            </ul>
                            {/* Buttons */}
                             <div className="buttons-to-right always-visible margin-top-25 margin-bottom-0">
                              <a href="#" onClick={handleShow} className=" button ripple-effect"><i className="icon-material-outline-check" /> Accept Offer</a>
                              <a href="#" onClick={handleShowMessage} className=" button dark ripple-effect"><i className="icon-feather-mail" /> Send Message</a>
                              <a href="#" className="button gray ripple-effect ico" title="Remove Bid" data-tippy-placement="top"><i className="icon-feather-trash-2" /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      {/* Overview */}
                      <div className="freelancer-overview manage-candidates">
                        <div className="freelancer-overview-inner">
                          {/* Avatar */}
                          <div className="freelancer-avatar">
                            <div className="verified-badge" />
                            <a href="#"><img src="images/user-avatar-placeholder.png" alt="" /></a>
                          </div>
                          {/* Name */}
                          <div className="freelancer-name">
                            <h4><a href="#">Kuba Adamczyk <img className="flag" src="images/flags/pl.svg" alt="" title="Poland" data-tippy-placement="top" /></a></h4>
                            {/* Details */}
                            <span className="freelancer-detail-item"><a href="#"><i className="icon-feather-mail" /> kuba@example.com</a></span>
                            <span className="freelancer-detail-item"><i className="icon-feather-phone" /> (+48) 123-456-789</span>
                            {/* Rating */}
                            <div className="freelancer-rating">
                              <div className="star-rating" data-rating={5.0} />
                            </div>
                            {/* Bid Details */}
                            <ul className="dashboard-task-info bid-info">
                              <li><strong>$2,700</strong><span>Fixed Price</span></li>
                              <li><strong>30 Days</strong><span>Delivery Time</span></li>
                            </ul>
                            {/* Buttons */}
                            <div className="buttons-to-right always-visible margin-top-25 margin-bottom-0">
                              <a href="#" onClick={handleShow} className=" button ripple-effect"><i className="icon-material-outline-check" /> Accept Offer</a>
                              <a href="#" onClick={handleShowMessage} className=" button dark ripple-effect"><i className="icon-feather-mail" /> Send Message</a>
                              <a href="#" className="button gray ripple-effect ico" title="Remove Bid" data-tippy-placement="top"><i className="icon-feather-trash-2" /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Row / End */}
          {/* Footer */}
          <DashboardFooter />
          {/* Footer / End */}
        </div>
      </div>
      {/* Market Place Content / End */}

       {/* Bid Acceptance Popup
================================================== */}
<Modal
        show={show}
        onHide={handleClose}
        
        id="sign-in-dialog" 
      >
        <div  className="">
          {/*Tabs */}
          <div className="sign-in-form">
            <ul className="popup-tabs-nav">
              <li><a href="#tab1" >Accept Offer</a></li>
            </ul>
            <div className="popup-tabs-container">
              {/* Tab */}
              <div className="popup-tab-content" id="tab">
                {/* Welcome Text */}
                <div className="welcome-text">
                  <h3>Accept Offer From David</h3>
                  <div className="bid-acceptance margin-top-15">
                    $3200
                  </div>
                </div>
                <form id="terms">
                  <div className="radio">
                    <input id="radio-1" name="radio" type="radio" required />
                    <label className="text-secondary" htmlFor="radio-1"><span className="radio-label" />  I have read and agree to the Terms and Conditions</label>
                  </div>
                </form>
                {/* Button */}
                <button className="margin-top-15 button full-width button-sliding-icon ripple-effect" type="submit" form="terms">Accept <i className="icon-material-outline-arrow-right-alt" /></button>
              </div>
            </div>
          </div>
        </div>
        </Modal>
        {/* Bid Acceptance Popup / End */}
        {/* Send Direct Message Popup
================================================== */}
<Modal
        show={showMessage}
        onHide={handleCloseMessage}
        
        id="sign-in-dialog" 
      >
        <div id="small-dialog-2" className="">
          {/*Tabs */}
          <div className="sign-in-form">
            <ul className="popup-tabs-nav">
              <li><a href="#tab2">Send Message</a></li>
            </ul>
            <div className="popup-tabs-container">
              {/* Tab */}
              <div className="popup-tab-content" id="tab2">
                {/* Welcome Text */}
                <div className="welcome-text">
                  <h3>Direct Message To David</h3>
                </div>
                {/* Form */}
                <form method="post" id="send-pm" className='mb-4'>
                  <textarea name="textarea" cols={10} placeholder="Message" className="with-border" required defaultValue={""} />
                </form>
                {/* Button */}
                <button className="button full-width button-sliding-icon ripple-effect" type="submit" form="send-pm">Send <i className="icon-material-outline-arrow-right-alt" /></button>
              </div>
            </div>
          </div>
        </div>
        </Modal>
        {/* Send Direct Message Popup / End */}
        </>
    )
}
