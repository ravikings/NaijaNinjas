import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CareerProfile = ({ isLoggedIn, user, owner }) => {
  return (
    <div id='desired_career_profile_bx' className='job-bx bg-white m-b30'>
      <div className='d-flex'>
        <h5 className='m-b30'>No desired Career Profile</h5>
      </div>

      <div className='row'>
        <div className='col-lg-6 col-md-6 col-sm-6'>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Industry</label>
            <span className='clearfix font-13'>
              IT-Software/Software Services
            </span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Role</label>
            <span className='clearfix font-13'>Web Designer</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Employment Type</label>
            <span className='clearfix font-13'>Full Time</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Availability to Join</label>
            <span className='clearfix font-13'>12 july</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Desired Location</label>
            <span className='clearfix font-13'>Add Desired Location</span>
          </div>
        </div>
        <div className='col-lg-6 col-md-6 col-sm-6'>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Functional Area</label>
            <span className='clearfix font-13'>
              Design / Creative / User Experience
            </span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Job Type</label>
            <span className='clearfix font-13'>permanent</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Desired Shift</label>
            <span className='clearfix font-13'>Add Desired Shift</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Expected Salary</label>
            <span className='clearfix font-13'>1 Lakhs</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Desired Industry</label>
            <span className='clearfix font-13'>Add Desired Industry</span>
          </div>
        </div>
      </div>
    </div>
  );
};

CareerProfile.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.any,
  owner: PropTypes.any,
};

export default CareerProfile;
