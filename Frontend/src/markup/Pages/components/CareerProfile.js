import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import useUpdateResume from "../MakeOffer/components/ResumeComponents/useUpdateResume";
import moment from "moment";

const CareerProfile = ({
  setCareerProfile,
  careerprofile,
  setResumeDetails,
  data,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [updatedCareerProfile, setUpdatedCareerProfile] = useState(
    data || {
      industry: "",
      functionalArea: "",
      role: "",
      jobType: "",
      employmentType: "",
      preferredShift: "",
      expectedSalary: "",
      desiredLocation: "",
      desiredIndustry: "",
      availability: startDate,
    }
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCareerProfile({ ...updatedCareerProfile, [name]: value });
  };
  const reqUpdateResume = useUpdateResume();
  const handleSubmit = async () => {
    await reqUpdateResume.callAPI({
      body: { career_profile: updatedCareerProfile },
      setResumeDetails,
    });
    setCareerProfile(false);
  };

  return (
    <div id='desired_career_profile_bx' className='job-bx bg-white m-b30'>
      <div className='d-flex'>
        <h5 className='m-b30'>Desired Career Profile</h5>
        <Link
          to={"#"}
          onClick={() => setCareerProfile(true)}
          className='site-button add-btn button-sm'
        >
          <i className='fa fa-pencil m-r5'></i> Edit
        </Link>
      </div>
      <Modal
        className='modal fade modal-bx-info editor'
        show={careerprofile}
        onHide={setCareerProfile}
      >
        <div className='modal-dialog my-0' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='DesiredprofileModalLongTitle'>
                Desired Career Profile{" "}
              </h5>
              <button
                type='button'
                className='close'
                onClick={() => setCareerProfile(false)}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Industry</label>
                      <Form.Control
                        as='select'
                        name='industry'
                        value={updatedCareerProfile?.industry}
                        defaultValue={updatedCareerProfile?.industry}
                        onChange={(e) => handleChange(e)}
                      >
                        <option value=''>Select Industry</option>
                        <option>Accounting / Finance</option>
                        <option>Banking / Financial Services / Broking</option>
                        <option>Education / Teaching / Training</option>
                        <option>IT-Hardware &amp; Networking</option>
                        <option>Other</option>
                      </Form.Control>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Functional Area / Department</label>
                      <Form.Control
                        as='select'
                        name='functionalArea'
                        value={updatedCareerProfile?.functionalArea}
                        defaultValue={updatedCareerProfile?.functionalArea}
                        onChange={(e) => handleChange(e)}
                      >
                        <option value=''>Select Functional Area</option>
                        <option>Agent</option>
                        <option>Architecture / Interior Design</option>
                        <option>Beauty / Fitness / Spa Services</option>
                        <option>IT Hardware / Technical Support</option>
                        <option>IT Software - System Programming</option>
                        <option>Other</option>
                      </Form.Control>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Role</label>
                      <Form.Control
                        name='role'
                        value={updatedCareerProfile?.role}
                        defaultValue={updatedCareerProfile?.role}
                        onChange={(e) => handleChange(e)}
                        as='select'
                      >
                        <option value=''>Select Role</option>
                        <option>Creative</option>
                        <option>Web Designer</option>
                        <option>Graphic Designer</option>
                        <option>National Creative Director</option>
                        <option>Fresher</option>
                        <option>Other</option>
                      </Form.Control>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Job Type</label>
                      <div className='row'>
                        <div className='col-lg-3 col-md-6 col-sm-6 col-6'>
                          <div className='custom-control custom-checkbox'>
                            <input
                              type='checkbox'
                              className='custom-control-input'
                              id='permanent'
                              name='example1'
                              value='Permanent'
                              defaultChecked={
                                updatedCareerProfile?.jobType === "Permanent"
                              }
                              onChange={() =>
                                setUpdatedCareerProfile({
                                  ...updatedCareerProfile,
                                  jobType: "Permanent",
                                })
                              }
                            />
                            <label
                              className='custom-control-label'
                              htmlFor='permanent'
                            >
                              Permanent
                            </label>
                          </div>
                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-6 col-6'>
                          <div className='custom-control custom-checkbox'>
                            <input
                              type='checkbox'
                              className='custom-control-input'
                              id='contractual'
                              name='example1'
                              value='Contractual'
                              defaultChecked={
                                updatedCareerProfile?.jobType === "Contractual"
                              }
                              onChange={() =>
                                setUpdatedCareerProfile({
                                  ...updatedCareerProfile,
                                  jobType: "Contractual",
                                })
                              }
                            />
                            <label
                              className='custom-control-label'
                              htmlFor='contractual'
                            >
                              Contractual
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Employment Type</label>
                      <div className='row'>
                        <div className='col-lg-3 col-md-6 col-sm-6 col-6'>
                          <div className='custom-control custom-checkbox'>
                            <input
                              type='checkbox'
                              className='custom-control-input'
                              id='fulltime'
                              name='example1'
                              value='Full Time'
                              defaultChecked={
                                updatedCareerProfile?.employmentType ===
                                "Full Time"
                              }
                              onChange={() =>
                                setUpdatedCareerProfile({
                                  ...updatedCareerProfile,
                                  employmentType: "Full Time",
                                })
                              }
                            />
                            <label
                              className='custom-control-label'
                              htmlFor='fulltime'
                            >
                              Full Time
                            </label>
                          </div>
                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-6 col-6'>
                          <div className='custom-control custom-checkbox'>
                            <input
                              type='checkbox'
                              className='custom-control-input'
                              id='parttime'
                              name='example1'
                              value='Part Time'
                              defaultChecked={
                                updatedCareerProfile?.employmentType ===
                                "Part Time"
                              }
                              onChange={() =>
                                setUpdatedCareerProfile({
                                  ...updatedCareerProfile,
                                  employmentType: "Part Time",
                                })
                              }
                            />
                            <label
                              className='custom-control-label'
                              htmlFor='parttime'
                            >
                              Part Time
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Preferred Shift</label>
                      <div className='row'>
                        <div className='col-lg-3 col-md-6 col-sm-6 col-6'>
                          <div className='custom-control custom-radio'>
                            <input
                              type='radio'
                              className='custom-control-input'
                              id='day'
                              name='example1'
                              value='Day'
                              defaultChecked={
                                updatedCareerProfile?.preferredShift === "Day"
                              }
                              onChange={() =>
                                setUpdatedCareerProfile({
                                  ...updatedCareerProfile,
                                  preferredShift: "Day",
                                })
                              }
                            />
                            <label
                              className='custom-control-label'
                              htmlFor='day'
                            >
                              Day
                            </label>
                          </div>
                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-6 col-6'>
                          <div className='custom-control custom-radio'>
                            <input
                              type='radio'
                              className='custom-control-input'
                              id='night'
                              name='example1'
                              value='Night'
                              defaultChecked={
                                updatedCareerProfile?.preferredShift === "Night"
                              }
                              onChange={() =>
                                setUpdatedCareerProfile({
                                  ...updatedCareerProfile,
                                  preferredShift: "Night",
                                })
                              }
                            />
                            <label
                              className='custom-control-label'
                              htmlFor='night'
                            >
                              Night
                            </label>
                          </div>
                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-6 col-6'>
                          <div className='custom-control custom-radio'>
                            <input
                              type='radio'
                              className='custom-control-input'
                              id='flexible'
                              name='example1'
                              onChange={() =>
                                setUpdatedCareerProfile({
                                  ...updatedCareerProfile,
                                  preferredShift: "Flexible",
                                })
                              }
                            />
                            <label
                              className='custom-control-label'
                              htmlFor='flexible'
                            >
                              Part Time
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-6'>
                    <div className='form-group'>
                      <label>Availability to Join</label>
                      <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                          <DatePicker
                            selected={startDate}
                            minDate={startDate}
                            onChange={(date) => setStartDate(date)}
                            placeholderText='Availability to Join'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Expected Salary</label>
                      <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                          <input
                            type={"number"}
                            className='form-control'
                            id='salary'
                            placeholder='Expected Salary in Dollars'
                            name='expectedSalary'
                            value={updatedCareerProfile?.expectedSalary}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Desired Location</label>
                      <Form.Control
                        as='select'
                        name='desiredLocation'
                        value={updatedCareerProfile?.desiredLocation}
                        onChange={(e) => handleChange(e)}
                      >
                        <option value=''>Select Location</option>
                        <option>India</option>
                        <option>Australia</option>
                        <option>Bahrain</option>
                        <option>China</option>
                        <option>Dubai</option>
                        <option>France</option>
                        <option>Germany</option>
                        <option>Hong Kong</option>
                        <option>Kuwait</option>
                      </Form.Control>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Desired Industry</label>
                      <Form.Control
                        as='select'
                        name='desiredIndustry'
                        value={updatedCareerProfile?.desiredIndustry}
                        onChange={(e) => handleChange(e)}
                      >
                        <option value=''>Select Industry</option>
                        <option>Software</option>
                        <option>Factory</option>
                        <option>Ngo</option>
                        <option>Other</option>
                      </Form.Control>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='site-button'
                onClick={() => setCareerProfile(false)}
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
          <div className='col-lg-6 col-md-6 col-sm-6'>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Industry</label>
              <span className='clearfix font-13'>{data?.desiredIndustry}</span>
            </div>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Role</label>
              <span className='clearfix font-13'>{data?.role}</span>
            </div>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Employment Type</label>
              <span className='clearfix font-13'>
                {data?.employmentType === "Full Time"
                  ? "Full Time"
                  : "Part Time"}
              </span>
            </div>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Availability to Join</label>
              <span className='clearfix font-13'>
                {moment(data?.availabilityToJoin).format("MMMM Do YYYY")}
              </span>
            </div>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Desired Location</label>
              <span className='clearfix font-13'>{data?.desiredLocation}</span>
            </div>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-6'>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Functional Area</label>
              <span className='clearfix font-13'>{data?.functionalArea}</span>
            </div>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Job Type</label>
              <span className='clearfix font-13'>{data?.jobType}</span>
            </div>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Desired Shift</label>
              <span className='clearfix font-13'>{data?.preferredShift}</span>
            </div>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Expected Salary</label>
              <span className='clearfix font-13'>
                {"$" + data?.expectedSalary}
              </span>
            </div>
            <div className='clearfix m-b20'>
              <label className='m-b0'>Desired Industry</label>
              <span className='clearfix font-13'>{data?.desiredIndustry}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CareerProfile.propTypes = {
  setCareerProfile: PropTypes.func.isRequired,
  careerprofile: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.any,
  owner: PropTypes.any,
};

export default CareerProfile;
