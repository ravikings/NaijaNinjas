import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import useUpdateResume from "../MakeOffer/components/ResumeComponents/useUpdateResume";

const Education = ({
  setEducation,
  education,
  setResumeDetails,
  data,
  isLoggedIn,
  user,
  owner,
}) => {
  const [updatedEducation, setUpdatedEducation] = React.useState(
    data || {
      education: "",
      course: "",
      university: "",
    }
  );
  const reqUpdateResume = useUpdateResume();
  const handleSubmit = async () => {
    await reqUpdateResume.callAPI({
      body: { education: updatedEducation },
      setResumeDetails,
    });
    setEducation(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEducation({ ...updatedEducation, [name]: value });
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
          <i className='fa fa-pencil m-r5'></i> Edit
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
              <form onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Education</label>
                      <Form.Control
                        as='select'
                        name='education'
                        value={updatedEducation?.education}
                        defaultValue={updatedEducation?.education}
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
                        value={updatedEducation?.course}
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
                        value={updatedEducation?.university}
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

      {data && (
        <div className='row'>
          <div className='col-lg-12 col-md-12 col-sm-12'>
            <div className='clearfix m-b20'>
              <label className='m-b0'>
                {data?.education + " - " + data?.course}
              </label>
              <span className='clearfix font-13'>{data?.university}</span>
            </div>
          </div>
        </div>
      )}
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
