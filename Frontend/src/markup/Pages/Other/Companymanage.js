import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Header2 from "../../Layout/Header2";
import Footer from "../../Layout/Footer";
import { Modal } from "react-bootstrap";
import ProfileSidebar from "../../Element/Profilesidebar";
import createRequest from "../../../utils/axios";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "react-js-pagination";
import axios from "axios";
import url from "../../../utils/baseUrl";
import swal from "sweetalert";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
function Companymanage() {
  let token = `Token ` + localStorage.getItem("access_token");
  const [company, setCompany] = useState(false);
  const [totalCount, setTotalCount] = useState(null);
  const [activePage, SetActivePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [viewData, setViewData] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { id, title } = useParams();
  const refTime = useRef(null);
  var userId = parseInt(localStorage.getItem("userID"));
  // geting data from api for fourm start
  const allData = (page = 1) => {
    setLoading(true);
    createRequest()
      .get(`api/v1/task/task-owner/?user_id=${userId}&page=${page}`)
      .then((res) => {
        setTotalCount(res?.data?.count);
        setData(res.data.results);

        setLoading(false);
      })
      .catch((e) => {
        if (e.response?.status === 400) {
          console.log(e?.response?.data?.non_field_errors[0]);
        } else {
          console.log("Unknown Error");
        }
        setLoading(false);
      });
  };

  // geting data from api for fourm end
  const deleteItem = (e) => {
    createRequest()
    .delete(`${url.baseURL}api/v1/task/task/${e}/`).then(
      (response) => {
        if (response) {
          swal("Success", "Task deleted successfully", "success");
          allData();
        }
      },
      (error) => {
        swal("Error", "Unable to delete task. Please try again", "error");
      }
    );
  };
  useEffect(() => {
    allData();
  }, []);

  //TODO: Use this method to reload componet accros
  // useEffect(() => {

  //   refTime.current = setInterval(() => allData(), 60 * 15 * 1000);
  //   console.log("callng api");
  //   console.log("callng api");
    
  //   return () => {
  //     if(refTime.current){
  //       clearInterval(refTime.current)
  //     }
  //   };
  // }, []);

  const Paginate = (page) => {
    SetActivePage(page);
    allData(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <ProfileSidebar showManageProp={true} active={"Manage jobs"} />
                <div className="col-xl-9 col-lg-8 m-b30">
                  {!loading ? (
                    <div className="job-bx browse-job clearfix">
                      <div className="job-bx-title  clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Manage tasks
                        </h5>
                        <div className="float-right">
                          <span className="select-title">
                            Sort by freshness
                          </span>
                          <select className="custom-btn">
                            <option>All</option>
                            <option>None</option>
                            <option>Read</option>
                            <option>Unread</option>
                            <option>Starred</option>
                            <option>Unstarred</option>
                          </select>
                        </div>
                      </div>
                      {!data.length ? (
                        <p>
                          No task to manage, post a task to get your project
                          done.
                        </p>
                      ) : (
                        <table className="table-job-bx table-responsive cv-manager company-manage-job">
                          <thead>
                            <tr>
                              <th className="feature">
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    id="check12"
                                    className="custom-control-input selectAllCheckBox"
                                    name="example1"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="check12"
                                  ></label>
                                </div>
                              </th>
                              <th>Task Title</th>
                              <th>Department</th>
                              <th>Date</th>
                              <th>Status</th>
                              <th>Action</th>
                              <th>Total Bids</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.map((e) => (
                              <tr>
                                <td className="feature">
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="check1"
                                      name="example1"
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="check1"
                                    ></label>
                                  </div>
                                </td>
                                <td className="job-name">
                                  <Link
                                    to={`/manage-bids/${e?.id}/${e?.title}`}
                                  >
                                    {e?.title}
                                  </Link>
                                  <ul className="job-post-info">
                                    <li>
                                      <i className="fa fa-filter"></i>{" "}
                                      {e?.category}
                                    </li>
                                  </ul>
                                </td>
                                <td className="application text-primary">
                                  {e?.department}
                                </td>
                                <td>{e?.updated.split("T")[0] || e?.created.split("T")[0]} </td>
                                <td className="expired success">
                                  {e?.post_status}{" "}
                                </td>
                                <td className="job-links">
                                  <Link
                                    to={"#"}
                                    onClick={() => {
                                      setCompany(true);
                                      setViewData(e);
                                    }}
                                  >
                                    <i className="fa fa-eye" ></i>
                                  </Link>
                                  <Link
                                    to={"#"}
                                  >
                                    <i className="ti-write" name="edit"></i>
                                  </Link>
                                  <Link
                                    to={"#"}
                                    onClick={() => deleteItem(e.id)}
                                  >
                                    <i className="ti-trash"></i>
                                  </Link>
                                </td>
                                <td className="application text-primary">
                                  {e?.total_bids}{" "}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}

                      <div className="mx-auto text-center m-t30">
                        {totalCount >= 10 ? (
                          <Pagination
                            activePage={activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={totalCount}
                            pageRangeDisplayed={5}
                            onChange={Paginate.bind(this)}
                            prevPageText="⇐ Prev"
                            nextPageText="Next ⇒"
                            firstPageText="◀"
                            lastPageText="▶"
                          />
                        ) : null}
                      </div>

                      <Modal
                        show={company}
                        onHide={setCompany}
                        className="modal fade modal-bx-info"
                      >
                        <div className="" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <div className="logo-img">
                                <img
                                  alt=""
                                  src={require("../../../images/logo/icon2.png")}
                                />
                              </div>
                              <h5 className="modal-title">Task Details</h5>

                              <button
                                type="button"
                                className="close"
                                onClick={() => setCompany(false)}
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <ul>
                                <li>
                                  <strong>Job Title :</strong>
                                  <p> {viewData?.title} </p>
                                </li>
                                <li>
                                  <strong>Date :</strong>
                                  <p>
                                    {" "}
                                    {viewData?.created ||
                                      viewData?.updated}{" "}
                                  </p>
                                </li>
                                <li>
                                  <strong>Sector :</strong>
                                  <p> {viewData?.sector} </p>
                                </li>
                                <li>
                                  <strong>Minimum Salary :</strong>
                                  <p>${viewData?.minimum_salary}</p>
                                </li>
                                <li>
                                  <strong>Maximum Salary :</strong>
                                  <p>${viewData?.maximum_salary}</p>
                                </li>
                                <li>
                                  <strong>Region :</strong>
                                  <p>{viewData?.region}</p>
                                </li>
                                <li>
                                  <strong>Location:</strong>
                                  <p>{viewData?.location}</p>
                                </li>
                                <li>
                                  <strong>Department:</strong>
                                  <p>{viewData?.department}</p>
                                </li>
                                <li>
                                  <strong>Category:</strong>
                                  <p>{viewData?.category}</p>
                                </li>
                                <li>
                                  <strong>Deseription :</strong>
                                  <p>{viewData?.description}</p>
                                </li>
                                <li>
                                  <strong>Tags :</strong>
                                  <p>{viewData?.tags}</p>
                                </li>
                              </ul>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setCompany(false)}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  ) : (
                    <div className="loader">
                      <ClipLoader color={"#2e55fa"} loading={true} size={150} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Companymanage;
