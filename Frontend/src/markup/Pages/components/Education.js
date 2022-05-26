import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import useUpdateResume from "../MakeOffer/components/ResumeComponents/useUpdateResume";
import { v4 as uuidv4 } from "uuid";

const Education = ({
  setEducation,
  education,
  setResumeDetails,
  data,
  isLoggedIn,
  user,
  owner,
}) => {
  const [error, setError] = useState(false);
  const [newEducation, setNewEducation] = useState({
    education: "",
    course: "",
    university: "",
  });

  const [editEducation, setEditEducation] = useState(false);
  const [editEducationObj, setEditEducationObj] = useState();

  const [deleteEducation, setDeleteEducation] = useState(false);

  const reqUpdateResume = useUpdateResume();
  const handleSubmit = async () => {
    if (
      newEducation.education === "" ||
      newEducation.course === "" ||
      newEducation.university === ""
    ) {
      setError(true);
    } else {
      setError(false);
      const dataToSend = [
        ...data,
        {
          id: uuidv4(),
          ...newEducation,
        },
      ];
      await reqUpdateResume.callAPI({
        body: { education: dataToSend },
        setResumeDetails,
      });
      setEducation(false);
    }
  };

  const handleEdit = (e, item) => {
    e.preventDefault();
    setEditEducation(true);
    setEditEducationObj(item);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEducationObj({ ...editEducationObj, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = data.map((item) => {
      if (item.id === editEducationObj.id) {
        return editEducationObj;
      } else {
        return item;
      }
    });
    await reqUpdateResume.callAPI({
      body: { education: dataToSend },
      setResumeDetails,
    });
    setEditEducation(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setNewEducation({ ...newEducation, [name]: value });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const dataToSend = data.filter((item) => item.id !== editEducationObj.id);
    await reqUpdateResume.callAPI({
      body: { education: dataToSend },
      setResumeDetails,
    });
    setEditEducation(false);
    setDeleteEducation(false);
  };

  return (
    <div id='education_bx' className='job-bx bg-white m-b30'>
      <div className='d-flex'>
        <h5 className='m-b15'>Education</h5>
        <Link
          to={"#"}
          onClick={() => setEducation(true)}
          className='site-button add-btn button-sm'
        >
          <i className='fa fa-plus m-r5'></i> Add
        </Link>
      </div>
      <p>Mention your education details.</p>

      <Modal
        className='modal fade modal-bx-info editor'
        show={education}
        onHide={setEducation}
      >
        <div className='modal-dialog my-0' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='EducationModalLongTitle'>
                Education
              </h5>
              <button
                type='button'
                className='close'
                onClick={() => setEducation(false)}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              {error && (
                <div className='alert alert-danger' role='alert'>
                  Please fill all the fields
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Education</label>
                      <Form.Control
                        as='select'
                        name='education'
                        value={newEducation?.education}
                        defaultValue={newEducation?.education}
                        onChange={(e) => onChange(e)}
                      >
                        <option>Doctorate/PhD</option>
                        <option>Masters/Post-Graduation</option>
                        <option>Graduation/Diploma</option>
                      </Form.Control>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Course</label>
                      <input
                        type='text'
                        name='course'
                        value={newEducation?.course}
                        onChange={(e) => onChange(e)}
                        className='form-control'
                        placeholder='Select Course'
                      />
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>University/Institute</label>
                      <input
                        type='text'
                        name='university'
                        value={newEducation?.university}
                        onChange={(e) => onChange(e)}
                        className='form-control'
                        placeholder='Select University/Institute'
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='site-button'
                onClick={() => setEducation(false)}
              >
                Cancel
              </button>
              <button
                type='button'
                className='site-button'
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {data.length > 0 &&
        data.map((edu) => (
          <div className='d-flex mb-2' key={edu.id}>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-sm-12'>
                <div className='clearfix m-b20'>
                  <label className='m-b0'>
                    {edu?.education + " - " + edu?.course}
                  </label>
                  <span className='clearfix font-13'>{edu?.university}</span>
                </div>
              </div>
            </div>
            <Link
              to={"#"}
              onClick={(e) => handleEdit(e, edu)}
              className='site-button add-btn button-sm'
            >
              <i className='fa fa-pencil m-r5'></i> Edit
            </Link>
          </div>
        ))}

      <Modal
        className='modal fade modal-bx-info editor'
        show={editEducation}
        onHide={setEditEducation}
      >
        <div className='modal-dialog my-0' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='EducationModalLongTitle'>
                Education
              </h5>
              <button
                type='button'
                className='close'
                onClick={() => setEditEducation(false)}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              {error && (
                <div className='alert alert-danger' role='alert'>
                  Please fill all the fields
                </div>
              )}
              <form onSubmit={handleEditSubmit}>
                <div className='row'>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Education</label>
                      <Form.Control
                        as='select'
                        name='education'
                        value={editEducationObj?.education}
                        defaultValue={editEducationObj?.education}
                        onChange={(e) => handleEditChange(e)}
                      >
                        <option>Doctorate/PhD</option>
                        <option>Masters/Post-Graduation</option>
                        <option>Graduation/Diploma</option>
                      </Form.Control>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Course</label>
                      <input
                        type='text'
                        name='course'
                        value={editEducationObj?.course}
                        onChange={(e) => handleEditChange(e)}
                        className='form-control'
                        placeholder='Select Course'
                      />
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>University/Institute</label>
                      <input
                        type='text'
                        name='university'
                        value={editEducationObj?.university}
                        onChange={(e) => handleEditChange(e)}
                        className='form-control'
                        placeholder='Select University/Institute'
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='site-button'
                onClick={() => setEditEducation(false)}
              >
                Cancel
              </button>
              <button
                type='button'
                className='site-button delete-btn'
                onClick={() => {
                  setEditEducation(false);
                  setDeleteEducation(true);
                }}
              >
                Delete
              </button>
              <button
                type='button'
                className='site-button'
                onClick={handleEditSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Moda */}

      <Modal
        show={deleteEducation}
        onHide={setDeleteEducation}
        className='modal fade modal-bx-info editor'
      >
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='EmploymentModalLongTitle'>
              Delete Employment
            </h5>
            <button
              type='button'
              className='close'
              onClick={() => setDeleteEducation(false)}
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <p>Are you sure you want to delete this Employment?</p>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='site-button'
              onClick={() => setDeleteEducation(false)}
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

      {/* <Link to={""} className='clearfix'>
        Add Doctorate/PhD
      </Link>
      <Link to={""} className='clearfix'>
        Add Masters/Post-Graduation
      </Link>
      <Link to={""} className='clearfix'>
        Add Graduation/Diploma
      </Link> */}
    </div>
  );
};

Education.propTypes = {
  seteducation: PropTypes.func.isRequired,
  education: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.any,
  owner: PropTypes.any,
};

export default Education;
