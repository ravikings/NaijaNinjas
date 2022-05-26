import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import useUpdateResume from "../MakeOffer/components/ResumeComponents/useUpdateResume";
import moment from "moment";
import Loader from "../../Element/Loader";
import { v4 as uuidv4 } from "uuid";

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
  const [present, setPresent] = useState(false);

  const [error, setError] = useState(false);
  const reqUpdateResume = useUpdateResume();

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    client: "",
    startDate: startDate,
    endDate: endDate,
    present: false,
  });

  const [editProject, setEditProject] = useState(false);
  const [editProjectObj, setEditProjectObj] = useState();
  const [editPresent, setEditPresent] = useState(false);

  const [deleteProject, setDeleteProject] = useState(false);

  useEffect(() => {
    setEditProjectObj({
      ...editProjectObj,
      present: editPresent,
    });
  }, [editPresent]);

  useEffect(() => {
    setNewProject({
      ...newProject,
      startDate: startDate,
      endDate: endDate,
      present: present,
    });
  }, [present]);

  useEffect(() => {
    setNewProject({
      ...newProject,
      startDate: startDate,
    });
  }, [startDate]);
  useEffect(() => {
    setNewProject({
      ...newProject,
      endDate: endDate,
    });
  }, [endDate]);

  const handleEdit = (e, item) => {
    e.preventDefault();
    setEditProject(true);
    setEditProjectObj(item);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProjectObj({ ...editProjectObj, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log(editProjectObj);
    if (
      editProjectObj.title === "" ||
      editProjectObj.description === "" ||
      editProjectObj.client === "" ||
      editProjectObj.startDate === ""
    ) {
      return setError(true);
    }
    const dataToSend = data.map((project) => {
      if (project.id === editProjectObj.id) {
        return editProjectObj;
      }
      return project;
    });
    await reqUpdateResume.callAPI({
      body: { projects: dataToSend },
      setResumeDetails,
    });
    setEditProject(false);
  };

  const handleSubmit = async () => {
    if (
      newProject.title === "" ||
      newProject.description === "" ||
      newProject.client === "" ||
      newProject.startDate === ""
    ) {
      console.log(newProject);
      setError(true);
    } else {
      const dataToSend = [
        ...data,
        {
          ...newProject,
          id: uuidv4(),
        },
      ];
      await reqUpdateResume.callAPI({
        body: { projects: dataToSend },
        setResumeDetails,
      });
      setProjects(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const dataToSend = data.filter(
      (project) => project.id !== editProjectObj.id
    );
    await reqUpdateResume.callAPI({
      body: { projects: dataToSend },
      setResumeDetails,
    });
    setDeleteProject(false);
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
            onClick={(e) => handleEdit(e, project)}
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
              {error && (
                <div className='alert alert-danger'>
                  Please fill all the fields
                </div>
              )}
              <form onSubmit={() => handleSubmit()}>
                <div className='row'>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Project Title</label>
                      <input
                        type='text'
                        name='title'
                        value={newProject.title}
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
                        value={newProject.client}
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
                        value={newProject.description}
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

      {/* Edit Project Modal */}
      <Modal
        className='modal fade modal-bx-info editor'
        show={editProject}
        onHide={setEditProject}
      >
        {reqUpdateResume.loading ? (
          <Loader />
        ) : (
          editProjectObj && (
            <div className='modal-dialog my-0' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='ProjectsModalLongTitle'>
                    Add Projects
                  </h5>
                  <button
                    type='button'
                    className='close'
                    onClick={() => setEditProject(false)}
                  >
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>
                  {error && (
                    <div className='alert alert-danger'>
                      Please fill all the fields
                    </div>
                  )}
                  <form onSubmit={() => handleEditSubmit()}>
                    <div className='row'>
                      <div className='col-lg-12 col-md-12'>
                        <div className='form-group'>
                          <label>Project Title</label>
                          <input
                            type='text'
                            name='title'
                            value={editProjectObj.title}
                            onChange={handleEditChange}
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
                            value={editProjectObj.client}
                            onChange={handleEditChange}
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
                                  value={editProjectObj.present}
                                  onChange={() => setEditPresent(true)}
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
                                  value={editProjectObj.present}
                                  onChange={() => setEditPresent(false)}
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
                                selected={moment(
                                  editProjectObj.startDate
                                ).toDate()}
                                onChange={(date) => ({
                                  ...editProjectObj,
                                  startDate: date,
                                })}
                                dateFormat='MM/yyyy'
                                showMonthYearPicker
                              />
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                              <label>Worked till</label>
                              <DatePicker
                                selected={moment(
                                  editProjectObj.endDate
                                ).toDate()}
                                onChange={(date) => ({
                                  ...editProjectObj,
                                  endDate: date,
                                })}
                                disabled={editPresent}
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
                            value={editProjectObj.description}
                            onChange={handleEditChange}
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
                    onClick={() => setEditProject(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='site-button delete-btn'
                    onClick={() => {
                      setEditProject(false);
                      setDeleteProject(true);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    type='button'
                    className='site-button'
                    onClick={(e) => handleEditSubmit(e)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </Modal>

      <Modal
        show={deleteProject}
        onHide={setDeleteProject}
        className='modal fade modal-bx-info editor'
      >
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='EmploymentModalLongTitle'>
              Delete Project
            </h5>
            <button
              type='button'
              className='close'
              onClick={() => setDeleteProject(false)}
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <p>Are you sure you want to delete this Project?</p>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='site-button'
              onClick={() => setDeleteProject(false)}
            >
              Cancel
            </button>
            <button
              type='button'
              className='site-button delete-btn'
              onClick={handleDelete}
            >
              Delete
            </button>
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
