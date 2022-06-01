import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Skills = ({ data, isLoggedIn, user, owner }) => {
  return (
    <div id='key_skills_bx' className='job-bx bg-white m-b30'>
      <div className='d-flex'>
        <h5 className='m-b15'>Key Skills</h5>
      </div>
      <div className='job-time mr-auto'>
        {data &&
          data.split(",").map((skill, index) => (
            <Link
              className='mr-2'
              to={""}
              key={index}
              onClick={(e) => e.preventDefault()}
            >
              <span>{skill}</span>
            </Link>
          ))}
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
