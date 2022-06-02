import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import useUpdateResume from "../MakeOffer/components/ResumeComponents/useUpdateResume";

const PersonalDetails = ({
  setPersonalDetails,
  personaldetails,
  data,
  setResumeDetails,
  isLoggedIn,
  user,
  owner,
}) => {
  const [date, setDate] = useState(new Date());
  const [updatedPersonalDetails, setUpdatedPersonalDetails] = useState(
    data || {
      DOB: "",
      permanentAddress: "",
      gender: "",
      pinCode: "",
      maritalStatus: "",
      hometown: "",
      passportNumber: "",
      workPermitCountry: "",
      assistance: "",
    }
  );

  const reqUpdateResume = useUpdateResume();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPersonalDetails({
      ...updatedPersonalDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await reqUpdateResume.callAPI({
      body: {
        profile_summary: updatedPersonalDetails,
      },
      setResumeDetails,
    });
    setPersonalDetails(false);
  };

  return (
    <div id='personal_details_bx' className='job-bx bg-white m-b30'>
      <div className='d-flex'>
        <h5 className='m-b30'>Personal Details</h5>
        <Link
          to={"#"}
          onClick={() => setPersonalDetails(true)}
          className='site-button add-btn button-sm'
        >
          <i className='fa fa-pencil m-r5'></i> Edit
        </Link>
      </div>

      <Modal
        className='modal fade modal-bx-info editor'
        show={personaldetails}
        onHide={setPersonalDetails}
      >
        <div className='modal-dialog my-0' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='PersonaldetailsModalLongTitle'>
                Personal Details
              </h5>
              <button
                type='button'
                className='close'
                onClick={() => setPersonalDetails(false)}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Date of Birth</label>
                      <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                          <DatePicker
                            selected={date}
                            maxDate={date}
                            onChange={(date) => setDate(date)}
                            placeholderText='Availability to Join'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Gender</label>
                      <div className='row'>
                        <div className='col-lg-3 col-md-6 col-sm-6 col-6'>
                          <div className='custom-control custom-radio'>
                            <input
                              type='radio'
                              className='custom-control-input'
                              id='male'
                              name='example1'
                              defaultChecked={data?.gender === "Male"}
                              onChange={() =>
                                setUpdatedPersonalDetails({
                                  ...updatedPersonalDetails,
                                  gender: "Male",
                                })
                              }
                            />
                            <label
                              className='custom-control-label'
                              htmlFor='male'
                              onClick={() =>
                                setUpdatedPersonalDetails({
                                  ...updatedPersonalDetails,
                                  gender: "Male",
                                })
                              }
                            >
                              Male
                            </label>
                          </div>
                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-6 col-6'>
                          <div className='custom-control custom-radio'>
                            <input
                              type='radio'
                              className='custom-control-input'
                              defaultChecked={data?.gender === "Female"}
                              id='female'
                              name='example1'
                              onChange={() =>
                                setUpdatedPersonalDetails({
                                  ...updatedPersonalDetails,
                                  gender: "Female",
                                })
                              }
                            />
                            <label
                              className='custom-control-label'
                              htmlFor='female'
                              onClick={() =>
                                setUpdatedPersonalDetails({
                                  ...updatedPersonalDetails,
                                  gender: "Female",
                                })
                              }
                            >
                              Female
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Permanent Address</label>
                      <input
                        type='text'
                        value={updatedPersonalDetails.permanentAddress}
                        name='permanentAddress'
                        onChange={handleChange}
                        className='form-control'
                        placeholder='Enter Your Permanent Address'
                      />
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Hometown</label>
                      <input
                        type='text'
                        value={updatedPersonalDetails.hometown}
                        name='hometown'
                        onChange={handleChange}
                        className='form-control'
                        placeholder='Enter Hometown'
                      />
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Pincode</label>
                      <input
                        type='text'
                        value={updatedPersonalDetails.pinCode}
                        name='pinCode'
                        onChange={handleChange}
                        className='form-control'
                        placeholder='Enter Pincode'
                      />
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Marital Status</label>
                      <select
                        className='form-control'
                        name='maritalStatus'
                        onChange={handleChange}
                        value={updatedPersonalDetails.maritalStatus}
                      >
                        <option value=''>Select Marital Status</option>
                        <option>Married</option>
                        <option>Single / Unmarried</option>
                      </select>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Passport Number</label>
                      <input
                        type='text'
                        value={updatedPersonalDetails.passportNumber}
                        name='passportNumber'
                        onChange={handleChange}
                        className='form-control'
                        placeholder='Enter Passport Number'
                      />
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>What assistance do you need</label>
                      <textarea
                        value={updatedPersonalDetails.assistance}
                        name='assistance'
                        onChange={handleChange}
                        className='form-control'
                        placeholder='Type Description'
                      ></textarea>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Work Permit for Other Countries</label>
                      <Form.Control
                        as='select'
                        name='workPermit'
                        onChange={handleChange}
                      >
                        <option value=''>Select Work Permit</option>

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
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='site-button'
                onClick={() => setPersonalDetails(false)}
              >
                Cancel
              </button>
              <button
                type='button'
                onClick={handleSubmit}
                className='site-button'
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className='row'>
        <div className='col-lg-6 col-md-6 col-sm-6'>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Date of Birth</label>
            <span className='clearfix font-13'>31 July 1998</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Gender</label>
            <span className='clearfix font-13'>male</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Marital Status</label>
            <span className='clearfix font-13'>Single / unmarried</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Passport Number</label>
            <span className='clearfix font-13'>+ 123 456 7890</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Differently Abled</label>
            <span className='clearfix font-13'>None</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Languages</label>
            <span className='clearfix font-13'>English</span>
          </div>
        </div>
        <div className='col-lg-6 col-md-6 col-sm-6'>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Permanent Address</label>
            <span className='clearfix font-13'>Add Permanent Address</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Area Pin Code</label>
            <span className='clearfix font-13'>302010</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Hometown</label>
            <span className='clearfix font-13'>Delhi</span>
          </div>
          <div className='clearfix m-b20'>
            <label className='m-b0'>Work permit of other country</label>
            <span className='clearfix font-13'>USA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

PersonalDetails.propTypes = {
  setPersonalDetails: PropTypes.func.isRequired,
  personaldetails: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.any,
  owner: PropTypes.any,
};

export default PersonalDetails;
