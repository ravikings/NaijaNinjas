import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Education = ({ data, isLoggedIn, user, owner }) => {
  return (
    <div id='education_bx' className='job-bx bg-white m-b30'>
      <div className='d-flex'>
        <h5 className='m-b15'>Education</h5>
      </div>

      {data?.length > 0 &&
        data.map((edu) => (
          <div className='row' key={edu.id}>
            <div className='col-lg-12 col-md-12 col-sm-12'>
              <div className='clearfix m-b20'>
                <label className='m-b0'>
                  {edu?.education + " - " + edu?.course}
                </label>
                <span className='clearfix font-13'>{edu?.university}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

Education.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.any,
  owner: PropTypes.any,
};

export default Education;
