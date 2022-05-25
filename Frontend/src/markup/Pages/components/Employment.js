import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useUpdateResume from "../MakeOffer/components/ResumeComponents/useUpdateResume";

const Employment = ({
  setEmployment,
  employment,
  setResumeDetails,
  data,
  isLoggedIn,
  user,
  owner,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [present, setPresent] = useState(false);
  const [updatedEmployment, setUpdatedEmployment] = useState(
    data || [
      {
        description: "",
        company: "",
        designation: "",
        startDate: data ? data.startDate : startDate,
        endDate: data.endDate ? data.endDate : present,
        present: data ? data.present : present,
      },
    ]
  );
  useEffect(() => {
    setUpdatedEmployment({
      ...updatedEmployment,
      startDate: startDate,
      endDate: endDate,
      present: present,
    });
  }, [present]);

  const handleChange = (e) => {
    console.log(updatedEmployment);
    const { name, value } = e.target;
    setUpdatedEmployment({ ...updatedEmployment, [name]: value });
  };
  const reqUpdateResume = useUpdateResume();
  console.log(data.startDate);
  const handleSubmit = async () => {
    await reqUpdateResume.callAPI({
      body: { employment: updatedEmployment },
      setResumeDetails,
    });
    setEmployment(false);
  };

  return (
    <div id='employment_bx' className='job-bx bg-white m-b30 '>
      <div className='d-flex'>
        <h5 className='m-b15'>Employment</h5>
        <Link
          to={"#"}
          onClick={() => setEmployment(true)}
          className='site-button add-btn button-sm'
        >
          <i className='fa fa-pencil m-r5'></i> Edit
        </Link>
      </div>
      {/* {data} */}
      <h6 className='font-14 m-b0'>{data?.designation}</h6>
      <p className='m-b0'>{data?.company}</p>
      <p className='m-b0'>
        {
          // Extract Month and year from startDate
          data?.startDate.split("-")[0] + "/" + data?.startDate.split("-")[1]
        }{" "}
        -{" "}
        {data?.present === true
          ? "Present"
          : data?.endDate.split("-")[0] + "/" + data?.endDate.split("-")[1]}
      </p>
      <p className='m-b0'>{data?.description}</p>

      <Modal
        show={employment}
        onHide={setEmployment}
        className='modal fade modal-bx-info editor'
      >
        <div className='modal-dialog my-0' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='EmploymentModalLongTitle'>
                Add Employment
              </h5>
              <button
                type='button'
                className='close'
                onClick={() => setEmployment(false)}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Your Designation</label>
                      <input
                        type='text'
                        name='designation'
                        value={updatedEmployment.designation}
                        onChange={handleChange}
                        className='form-control'
                        placeholder='Enter Your Designation'
                      />
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Your Organization</label>
                      <input
                        type='text'
                        name='company'
                        value={updatedEmployment.company}
                        onChange={handleChange}
                        className='form-control'
                        placeholder='Enter Your Organization'
                      />
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <label>Is this your current company?</label>
                      <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                          <div className='custom-control custom-radio'>
                            <input
                              type='radio'
                              value={present}
                              className='custom-control-input'
                              onChange={() => setPresent(true)}
                              id='employ_yes'
                              name='example1'
                            />
                            <label
                              className='custom-control-label'
                              htmlFor='employ_yes'
                              onClick={() => setPresent(true)}
                            >
                              Yes
                            </label>
                          </div>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                          <div className='custom-control custom-radio'>
                            <input
                              type='radio'
                              className='custom-control-input'
                              onChange={() => setPresent(false)}
                              id='employ_no'
                              name='example1'
                            />
                            <label
                              className='custom-control-label'
                              htmlFor='employ_no'
                              onClick={() => setPresent(false)}
                            >
                              No
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
                      <label>Describe your Job Profile</label>
                      <textarea
                        name='description'
                        value={updatedEmployment.description}
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
                onClick={() => setEmployment(false)}
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
    </div>
  );
};

Employment.propTypes = {
  setEmployment: PropTypes.func.isRequired,
  employment: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.any,
  owner: PropTypes.any,
};

export default Employment;
