import React from "react";
import moment from "moment";
const CareerProfile = ({ data, isLoggedIn, user, owner }) => {
  return (
    <div id='desired_career_profile_bx' className='job-bx bg-white m-b30'>
      <div className='d-flex'>
        <h5 className='m-b30'>Desired Career Profile</h5>
      </div>

      {data && (
        <div className='row'>
          <div className='col-lg-6 col-md-6 col-sm-6'>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Industry</label>
              <span className='clearfix font-13'>{data?.desiredIndustry}</span>
            </div>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Role</label>
              <span className='clearfix font-13'>{data?.role}</span>
            </div>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Employment Type</label>
              <span className='clearfix font-13'>
                {data?.employmentType === "Full Time"
                  ? "Full Time"
                  : "Part Time"}
              </span>
            </div>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Availability to Join</label>
              <span className='clearfix font-13'>
                {moment(data?.availabilityToJoin).format("MMMM Do YYYY")}
              </span>
            </div>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Desired Location</label>
              <span className='clearfix font-13'>{data?.desiredLocation}</span>
            </div>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-6'>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Functional Area</label>
              <span className='clearfix font-13'>{data?.functionalArea}</span>
            </div>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Job Type</label>
              <span className='clearfix font-13'>{data?.jobType}</span>
            </div>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Desired Shift</label>
              <span className='clearfix font-13'>{data?.preferredShift}</span>
            </div>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Expected Salary</label>
              <span className='clearfix font-13'>
                {"$" + data?.expectedSalary}
              </span>
            </div>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Desired Industry</label>
              <span className='clearfix font-13'>{data?.desiredIndustry}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerProfile;
