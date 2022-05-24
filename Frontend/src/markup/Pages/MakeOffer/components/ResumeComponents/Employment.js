import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Employment = ({ isLoggedIn, user, owner }) => {
  return (
    <div id='employment_bx' className='job-bx bg-white m-b30 '>
      <div className='d-flex'>
        <h5 className='m-b15'>Employment</h5>
      </div>
      <h6 className='font-14 m-b0'>Junior Software DeveloperEdit</h6>
      <p className='m-b0'>W3itexperts</p>
      <p className='m-b0'>Oct 2015 to Present (3 years 4 months)</p>
      <p className='m-b0'>Available to join in 1 Months</p>
      <p className='m-b0'>Junior Software Developer</p>
    </div>
  );
};

Employment.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.any,
  owner: PropTypes.any,
};

export default Employment;
