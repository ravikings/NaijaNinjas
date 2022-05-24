import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Education = ({ isLoggedIn, user, owner }) => {
  return (
    <div id='education_bx' className='job-bx bg-white m-b30'>
      <div className='d-flex'>
        <h5 className='m-b15'>Education</h5>
      </div>
      <p>
        Mention your education details including your current and previous
        company work experience
      </p>

      <div className='row'>
        <div className='col-lg-12 col-md-12 col-sm-12'>
          <div className='clearfix m-b20'>
            <label className='m-b0'>London - 12th</label>
            <span className='clearfix font-13'>2017</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>London - 10th</label>
            <span className='clearfix font-13'>2015</span>
          </div>
        </div>
      </div>
      <Link to={""} className='clearfix'>
        Add Doctorate/PhD
      </Link>
      <Link to={""} className='clearfix'>
        Add Masters/Post-Graduation
      </Link>
      <Link to={""} className='clearfix'>
        Add Graduation/Diploma
      </Link>
    </div>
  );
};

Education.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.any,
  owner: PropTypes.any,
};

export default Education;
