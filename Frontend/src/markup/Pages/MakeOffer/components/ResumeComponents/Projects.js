import React from "react";
import PropTypes from "prop-types";

const Projects = ({ isLoggedIn, user, owner }) => {
  return (
    <div id='projects_bx' className='job-bx bg-white m-b30'>
      <div className='d-flex'>
        <h5 className='m-b15'>Projects</h5>
      </div>
      <h6 className='font-14 m-b0'>Job BoardEdit</h6>
      <p className='m-b0'>w3itexpert (Offsite)</p>
      <p className='m-b0'>Dec 2018 to Present (Full Time)</p>
      <p className='m-b0'>Job Board Template</p>
    </div>
  );
};

Projects.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.any,
  owner: PropTypes.any,
};

export default Projects;
