import React from "react";
import PropTypes from "prop-types";

const PersonalDetails = ({ isLoggedIn, user, owner }) => {
  return (
    <div id='personal_details_bx' className='job-bx bg-white m-b30'>
      <div className='d-flex'>
        <h5 className='m-b30'>Personal Details</h5>
      </div>

      <div className='row'>
        <div className='col-lg-6 col-md-6 col-sm-6'>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Date of Birth</label>
            <span className='clearfix font-13'>31 July 1998</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Gender</label>
            <span className='clearfix font-13'>male</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Marital Status</label>
            <span className='clearfix font-13'>Single / unmarried</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Passport Number</label>
            <span className='clearfix font-13'>+ 123 456 7890</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Differently Abled</label>
            <span className='clearfix font-13'>None</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Languages</label>
            <span className='clearfix font-13'>English</span>
          </div>
        </div>
        <div className='col-lg-6 col-md-6 col-sm-6'>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Permanent Address</label>
            <span className='clearfix font-13'>Add Permanent Address</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Area Pin Code</label>
            <span className='clearfix font-13'>302010</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Hometown</label>
            <span className='clearfix font-13'>Delhi</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Work permit of other country</label>
            <span className='clearfix font-13'>USA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

PersonalDetails.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.any,
  owner: PropTypes.any,
};

export default PersonalDetails;
