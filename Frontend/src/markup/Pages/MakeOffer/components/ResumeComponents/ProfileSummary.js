import React from "react";
import PropTypes from "prop-types";

const ProfileSummary = ({ summary }) => {
  return (
    <div id='profile_summary_bx' className='job-bx bg-white m-b30'>
      <div className='d-flex'>
        <h5 className='m-b15'>Profile Summary</h5>
      </div>
      <p className='m-b0'>{summary}</p>
    </div>
  );
};

ProfileSummary.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.any,
  owner: PropTypes.any,
};

export default ProfileSummary;
