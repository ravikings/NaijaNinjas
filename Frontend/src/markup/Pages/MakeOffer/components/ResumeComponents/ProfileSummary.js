import React from "react";

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

export default ProfileSummary;
