import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";

const ItSkills = ({ isLoggedIn, user, owner }) => {
  return (
    <div id='it_skills_bx' className='job-bx table-job-bx bg-white m-b30'>
      <div className='d-flex'>
        <h5 className='m-b15'>IT Skills</h5>
      </div>
      <p>
        Mention your employment details including your current and previous
        company work experience
      </p>
      <table>
        <thead>
          <tr>
            <th>Skills</th>
            <th>Version</th>
            <th>Last Used</th>
            <th>Experience</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bootstrap</td>
            <td>3</td>
            <td>2018</td>
            <td>1 Year 5 Months</td>
          </tr>
          <tr>
            <td>Bootstrap</td>
            <td>4</td>
            <td>2013</td>
            <td>5 Year 5 Months</td>
          </tr>
          <tr>
            <td>html</td>
            <td>5</td>
            <td>2016</td>
            <td>2 Year 7 Months</td>
          </tr>
          <tr>
            <td>css</td>
            <td>3</td>
            <td>2018</td>
            <td>0 Year 5 Months</td>
          </tr>
          <tr>
            <td>photoshop</td>
            <td>64bit</td>
            <td>2017</td>
            <td>1 Year 0 Months</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

ItSkills.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.any,
  owner: PropTypes.any,
};

export default ItSkills;
