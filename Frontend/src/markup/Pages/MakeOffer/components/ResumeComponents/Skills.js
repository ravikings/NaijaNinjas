import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Skills = ({ skills, isLoggedIn, user, owner }) => {
  return (
    <div id='key_skills_bx' className='job-bx bg-white m-b30'>
      <div className='d-flex'>
        <h5 className='m-b15'>Key Skills</h5>
      </div>
      <div className='job-time mr-auto'>
        <Link to={""} className='mr-1'>
          <span>Javascript</span>
        </Link>
        <Link to={""} className='mr-1'>
          <span>CSS</span>
        </Link>
        <Link to={""} className='mr-1'>
          <span>HTML</span>
        </Link>
        <Link to={""} className='mr-1'>
          <span>Bootstrap</span>
        </Link>
        <Link to={""} className='mr-1'>
          <span>Web Designing</span>
        </Link>
        <Link to={""} className='mr-1'>
          <span>Photoshop</span>
        </Link>
      </div>
    </div>
  );
};

Skills.propTypes = {
  skills: PropTypes.array.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.any,
  owner: PropTypes.any,
};

export default Skills;
