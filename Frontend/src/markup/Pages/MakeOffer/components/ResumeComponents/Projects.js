import React from "react";
import PropTypes from "prop-types";

const Projects = ({ data, isLoggedIn, user, owner }) => {
  return (
    <div id='projects_bx' className='job-bx bg-white m-b30'>
      <div className='d-flex'>
        <h5 className='m-b15'>Projects</h5>
      </div>
      {data?.map((project) => (
        <div key={project.id}>
          <h6 className='font-14 m-b0'>{project?.title}</h6>
          <p className='m-b0'>{project?.client}</p>
          <p className='m-b0'>
            {
              // Extract Month and year from startDate
              project?.startDate.split("-")[0] +
                "/" +
                project?.startDate.split("-")[1]
            }{" "}
            -{" "}
            {project?.present === true
              ? "Present"
              : project?.endDate.split("-")[0] +
                "/" +
                project?.endDate.split("-")[1]}
          </p>
          <p className='m-b0'>{project?.description}</p>
        </div>
      ))}
    </div>
  );
};

Projects.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.any,
  owner: PropTypes.any,
};

export default Projects;
