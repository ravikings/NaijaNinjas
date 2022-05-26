import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useUpdateResume from "../MakeOffer/components/ResumeComponents/useUpdateResume";
import { toast } from "react-toastify";
import Loader from "../../Element/Loader";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

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
  console.log(true || "something", "Resume data");
  const [present, setPresent] = useState(false);
  const [error, setError] = useState(false);
  const [newEmploymentObj, setNewEmploymentObj] = useState({
    description: "",
    company: "",
    designation: "",
    startDate: "",
    endDate: "",
    present: data ? data.present : present,
  });

  const [editEmployment, setEditEmployment] = useState(false);
  const [editEmploymentObj, setEditEmploymentObj] = useState();
  const [editPresent, setEditPresent] = useState(false);

  const [deleteEmployment, setDeleteEmployment] = useState(false);

  useEffect(() => {
    setEditEmploymentObj({
      ...editEmploymentObj,
      present: editPresent,
    });
  }, [editPresent]);

  useEffect(() => {
    setNewEmploymentObj({
      ...newEmploymentObj,
      startDate: startDate,
      endDate: endDate,
      present: present,
    });
  }, [present]);

  useEffect(() => {
    setNewEmploymentObj({
      ...newEmploymentObj,
      startDate: startDate,
    });
  }, [startDate]);
  useEffect(() => {
    setNewEmploymentObj({
      ...newEmploymentObj,
      endDate: endDate,
    });
  }, [endDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmploymentObj({ ...newEmploymentObj, [name]: value });
  };
  const reqUpdateResume = useUpdateResume();

  const handleSubmit = async () => {
    if (
      newEmploymentObj.description &&
      newEmploymentObj.company &&
      newEmploymentObj.designation &&
      newEmploymentObj.startDate &&
      newEmploymentObj.endDate
    ) {
      setError(false);
      const dataToSend = [
        ...data,
        {
          ...newEmploymentObj,
          id: uuidv4(),
        },
      ];
      const { employment } = await reqUpdateResume.callAPI({
        body: { employment: dataToSend },
        setResumeDetails,
      });
      setEmployment(false);
    } else {
      setError(true);
    }
  };

  const handleEdit = (e, item) => {
    e.preventDefault();
    setEditEmployment(true);
    setEditEmploymentObj(item);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setEditEmploymentObj({ ...editEmploymentObj, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    // Update employments where id is equal to editEmploymentObj.id
    const dataToSend = data.map((item) =>
      item.id === editEmploymentObj.id ? editEmploymentObj : item
    );
    console.log(dataToSend);
    const { employment } = await reqUpdateResume.callAPI({
      body: { employment: dataToSend },
      setResumeDetails,
    });
    setEditEmployment(false);
  };

  // Delete employemt where id is equal to editEmploymentObj.id
  const handleDelete = async (e) => {
    e.preventDefault();
    const dataToSend = data.filter((item) => item.id !== editEmploymentObj.id);
    const { employment } = await reqUpdateResume.callAPI({
      body: { employment: dataToSend },
      setResumeDetails,
    });
    setEditEmployment(false);
    setDeleteEmployment(false);
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
          <i className='fa fa-plus m-r5'></i> Add
        </Link>
      </div>
      {/* {data} */}
      {data.length > 0 &&
        data.map((item) => (
          <div className='d-flex mb-2' key={item.id}>
            <div>
              <h6 className='font-14 m-b0'>{item?.designation}</h6>
              <p className='m-b0'>{item?.company}</p>
              <p className='m-b0'>
                {
                  // Extract Month and year from startDate
                  item?.startDate &&
                    item?.startDate.split("-")[0] +
                      "/" +
                      item?.startDate.split("-")[1]
                }{" "}
                -{" "}
                {item?.present === true
                  ? "Present"
                  : item?.endDate.split("-")[0] +
                    "/" +
                    item?.endDate.split("-")[1]}
              </p>
              <p className='m-b0'>{item?.description}</p>
            </div>
            <Link
              to={"#"}
              onClick={(e) => handleEdit(e, item)}
              className='site-button add-btn button-sm'
            >
              <i className='fa fa-pencil m-r5'></i> Edit
            </Link>
          </div>
        ))}

      <Modal
        show={employment}
        onHide={setEmployment}
        className='modal fade modal-bx-info editor'
      >
        {reqUpdateResume.loading ? (
          <Loader />
        ) : (
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
                {error && (
                  <div className='alert alert-danger' role='alert'>
                    Please fill all the fields
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-lg-12 col-md-12'>
                      <div className='form-group'>
                        <label>Your Designation</label>
                        <input
                          type='text'
                          name='designation'
                          value={newEmploymentObj.designation}
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
                          value={newEmploymentObj.company}
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
                          value={newEmploymentObj.description}
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
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        show={editEmployment}
        onHide={setEditEmployment}
        className='modal fade modal-bx-info editor'
      >
        {reqUpdateResume.loading ? (
          <Loader />
        ) : (
          editEmployment && (
            <div className='modal-dialog my-0' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='EmploymentModalLongTitle'>
                    Add Employment
                  </h5>
                  <button
                    type='button'
                    className='close'
                    onClick={() => setEditEmployment(false)}
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
                          <label>Your Designation</label>
                          <input
                            type='text'
                            name='designation'
                            value={editEmploymentObj.designation}
                            onChange={handleEditChange}
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
                            value={editEmploymentObj.company}
                            onChange={handleEditChange}
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
                                  value={editEmploymentObj.present}
                                  className='custom-control-input'
                                  onChange={() => setEditPresent(false)}
                                  id='employ_yes'
                                  name='example1'
                                />
                                <label
                                  className='custom-control-label'
                                  htmlFor='employ_yes'
                                  onClick={() => setEditPresent(false)}
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
                                  onChange={() => setEditPresent(false)}
                                  id='employ_no'
                                  name='example1'
                                />
                                <label
                                  className='custom-control-label'
                                  htmlFor='employ_no'
                                  onClick={() => setEditPresent(false)}
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
                                selected={moment(
                                  editEmploymentObj.startDate
                                ).toDate()}
                                onChange={(date) => ({
                                  ...editEmploymentObj,
                                  startDate: date,
                                })}
                                dateFormat='yyyy-MM-dd'
                                showMonthYearPicker
                              />
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                              <label>Worked till</label>
                              <DatePicker
                                selected={moment(
                                  editEmploymentObj.endDate
                                ).toDate()}
                                disabled={editPresent}
                                onChange={(date) => ({
                                  ...editEmploymentObj,
                                  endDate: date,
                                })}
                                dateFormat='yyyy-MM-dd'
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
                            value={editEmploymentObj.description}
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
                    onClick={() => setEditEmployment(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='site-button delete-btn'
                    onClick={() => {
                      setEditEmployment(false);
                      setDeleteEmployment(true);
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
          )
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        show={deleteEmployment}
        onHide={setDeleteEmployment}
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
              onClick={() => setDeleteEmployment(false)}
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
              onClick={() => setDeleteEmployment(false)}
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

Employment.propTypes = {
  setEmployment: PropTypes.func.isRequired,
  employment: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.any,
  owner: PropTypes.any,
};

export default Employment;
