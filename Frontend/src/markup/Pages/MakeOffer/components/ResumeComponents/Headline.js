import React from "react";
import PropTypes from "prop-types";

const Headline = ({ headline, isLoggedIn, user, owner }) => {
  return (
    <div id='resume_headline_bx' className=' job-bx bg-white m-b30'>
      <div className='d-flex'>
        <h5 className='m-b15'>Resume Headline</h5>
      </div>
      <p className='m-b0'>{headline}</p>
    </div>
  );
};

Headline.propTypes = {
  headline: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.any,
  owner: PropTypes.any,
};

export default Headline;
