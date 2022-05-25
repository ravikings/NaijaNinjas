import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import useUpdateResume from "../MakeOffer/components/ResumeComponents/useUpdateResume";

const Projects = ({
  setProjects,
  projects,
  setResumeDetails,
  data,
  isLoggedIn,
  user,
  owner,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const reqUpdateResume = useUpdateResume();

  const [present, setPresent] = useState(false);
  const [updatedProject, setUpdateProject] = useState({
    title: "",
    description: "",
    client: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  useEffect(() => {
    setUpdateProject({
      ...updatedProject,
      startDate: startDate,
      endDate: endDate,
      present: present,
    });
  }, [present]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProject({ ...updatedProject, [name]: value });
  };

  const handleSubmit = async () => {
    // Add UpdatedProject to Data
    const dataToSend = [...data, updatedProject];
    // const dataToSend = [data];

    await reqUpdateResume.callAPI({
      body: { projects: dataToSend },
      setResumeDetails,
    });
    setProjects(false);
  };
  return (
    <div id='projects_bx' className='job-bx bg-white m-b30'>
      <div className='d-flex'>
        <h5 className='m-b15'>Projects</h5>
        <Link
          to={"#"}
          onClick={() => setProjects(true)}
          className='site-button add-btn button-sm'
        >
          <i className='fa fa-plus m-r5'></i> Add
        </Link>
      </div>
      {data?.map((project, index) => (
        <div className='d-flex mb-2' key={index}>
          <div>
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
          <Link
            to={"#"}
            onClick={() => console.log(true)}
            className='site-button add-btn button-sm'
          >
            <i className='fa fa-pencil m-r5'></i> Edit
          </Link>
        </div>
      ))}

      <Modal
        className='modal fade modal-bx-info editor'
        show={projects}
        onHide={setProjects}
      >
        <div className='modal-dialog my-0' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='ProjectsModalLongTitle'>
                Add Projects
              </h5>
              <button
                type='button'
                className='close'
                onClick={() => setProjects(false)}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={() => handleSubmit()}>
                <div className='row'>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Project Title</label>
                      <input
                        type='text'
                        name='title'
                        value={updatedProject.title}
                        onChange={handleChange}
                        className='form-control'
                        placeholder='Enter Project Title'
                      />
                    </div>
                  </div>

                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Client</label>
                      <input
                        type='text'
                        name='client'
                        value={updatedProject.client}
                        onChange={handleChange}
                        className='form-control'
                        placeholder='Enter Client Name'
                      />
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Project Status</label>
                      <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                          <div className='custom-control custom-radio'>
                            <input
                              type='radio'
                              value={present}
                              onChange={() => setPresent(true)}
                              className='custom-control-input'
                              id='inprogress'
                              name='example1'
                            />
                            <label
                              className='custom-control-label'
                              htmlFor='inprogress'
                            >
                              In Progress
                            </label>
                          </div>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                          <div className='custom-control custom-radio'>
                            <input
                              type='radio'
                              className='custom-control-input'
                              id='finished'
                              value={present}
                              onChange={() => setPresent(false)}
                              name='example1'
                            />
                            <label
                              className='custom-control-label'
                              htmlFor='finished'
                            >
                              Finished
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                          <label>Started Working From</label>
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat='MM/yyyy'
                            showMonthYearPicker
                          />
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                          <label>Worked till</label>
                          <DatePicker
                            selected={endDate}
                            disabled={present}
                            onChange={(date) => setEndDate(date)}
                            dateFormat='MM/yyyy'
                            showMonthYearPicker
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Details of Project</label>
                      <textarea
                        name='description'
                        value={updatedProject.description}
                        onChange={handleChange}
                        className='form-control'
                        placeholder='Type Description'
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='site-button'
                onClick={() => setProjects(false)}
              >
                Cancel
              </button>
              <button
                type='button'
                className='site-button'
                onClick={() => handleSubmit()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Projects.propTypes = {
  setProjects: PropTypes.func.isRequired,
  projects: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.any,
  owner: PropTypes.any,
};

export default Projects;
