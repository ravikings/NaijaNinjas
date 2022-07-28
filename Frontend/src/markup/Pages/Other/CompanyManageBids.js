import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Header2 from "../../Layout/Header2";
import Footer from "../../Layout/Footer";
import { Modal } from "react-bootstrap";
import ProfileSidebar from "../../Element/Profilesidebar";
import DeleteIcon from "@material-ui/icons/Delete";
import createRequest from "../../../utils/axios";
import logo from "../../../images/logo/icon1.png";
import Ratings from "../MakeOffer/components/Ratings";
import { Button, IconButton } from "@material-ui/core";

const postBox = [
  { image: logo },
  { image: logo },
  { image: logo },
  { image: logo },
  { image: logo },
  { image: logo },
];

function CompanyManageBids() {
  const location = useLocation();
  const [company, setCompany] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(null);
  const { id, title } = useParams();
  const [data, setData] = useState([]);
  const taskId = location?.pathname?.split("/")[2];
  const allData = () => {
    setLoading(true);
    createRequest()
      .get(`api/v1/task/task-bidding/?task=${id}`)
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
      });
  };
  useEffect(() => {
    allData();
  }, []);

  const dummyText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Mauris eget nulla eu nunc efficitur tincidunt.
    Nulla euismod, urna eu aliquet aliquet,
    nisi nunc ultricies nisi, euismod ornare nisl nunc euismod nisl.
    Mauris eget nulla eu nunc efficitur tincidunt.`;

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
                  <div className="job-bx browse-job clearfix">
                    <div className="job-bx-title  clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Manage Bids
                      </h5>
                      <div className="float-right">
                        <span className="select-title">Sort by freshness</span>
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
                    <ul className="post-job-bx">
                      {data.length === 0
                        ? "No data"
                        : data.map((item, index) => (
                            <li key={index}>
                              <div className="post-bx">
                                <div className="d-flex m-b30">
                                  <div className="job-post-company">
                                    <Link to={""}>
                                      <span style={{ borderRadius: "50%" }}>
                                        <img
                                          alt=""
                                          src={item.bidder_info.photo}
                                        />
                                      </span>
                                    </Link>
                                  </div>
                                  <div className="job-post-info">
                                    <h4>
                                      <Link to={"/make-offer"}>
                                        {`${item.bidder_info[0].first_name} ${item.bidder_info[0].last_name}`}
                                      </Link>
                                    </h4>
                                    <Ratings />
                                    <div className="mt-3">
                                      <Button
                                        style={{
                                          backgroundColor: "#2e55fa",
                                          color: "white",
                                        }}
                                        variant="outlined"
                                        startIcon={
                                          <i className="fa fa-check"></i>
                                        }
                                      >
                                        Accept offer
                                      </Button>
                                      <Button
                                        style={{
                                          backgroundColor: "#333333",
                                          color: "white",
                                        }}
                                        className="ml-2"
                                        variant="outlined"
                                        startIcon={
                                          <i className="fa fa-envelope"></i>
                                        }
                                      >
                                        Send message
                                      </Button>
                                      <IconButton
                                        className="ml-2"
                                        style={{
                                          backgroundColor: "#eeeeee",
                                          borderRadius: "10px",
                                          height: "40px",
                                          width: "40px",
                                        }}
                                        aria-label="delete"
                                        size="large"
                                      >
                                        <i className="fa fa-trash"></i>
                                      </IconButton>
                                    </div>
                                  </div>
                                  <div className="rates">
                                    <ul class="dashboard-task-info bid-info">
                                      <li>
                                        <strong>${item.offer}</strong>
                                        <span>Fixed Price</span>
                                      </li>
                                      <li>
                                        <strong>
                                          {item.delivery_date
                                            ? item.delivery_date
                                            : "0"}
                                        </strong>
                                        <span>Delivery Time</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>

                                {/* <label className='like-btn'>
                              <input type='checkbox' />
                              <span className='checkmark'></span>
                            </label> */}
                              </div>
                            </li>
                          ))}
                    </ul>
                    {/* <table className='table-job-bx cv-manager company-manage-job'>
                      <thead>
                        <tr>
                          <th className='feature'>
                            <div className='custom-control custom-checkbox'>
                              <input
                                type='checkbox'
                                id='check12'
                                className='custom-control-input selectAllCheckBox'
                                name='example1'
                              />
                              <label
                                className='custom-control-label'
                                htmlFor='check12'
                              ></label>
                            </div>
                          </th>
                          <th>Job Title</th>
                          <th>Applications</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='feature'>
                            <div className='custom-control custom-checkbox'>
                              <input
                                type='checkbox'
                                className='custom-control-input'
                                id='check1'
                                name='example1'
                              />
                              <label
                                className='custom-control-label'
                                htmlFor='check1'
                              ></label>
                            </div>
                          </td>
                          <td className='job-name'>
                            <Link to={""}>Social Media Expert</Link>
                            <ul className='job-post-info'>
                              <li>
                                <i className='fa fa-map-marker'></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className='fa fa-bookmark-o'></i> Full Time
                              </li>
                              <li>
                                <i className='fa fa-filter'></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className='application text-primary'>
                            (5) Applications
                          </td>
                          <td className='expired pending'>Pending </td>
                          <td className='job-links'>
                            <Link to={"#"} onClick={() => setCompany(true)}>
                              <i className='fa fa-eye'></i>
                            </Link>
                            <Link to={""}>
                              <i className='ti-trash'></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className='feature'>
                            <div className='custom-control custom-checkbox'>
                              <input
                                type='checkbox'
                                className='custom-control-input'
                                id='check2'
                                name='example1'
                              />
                              <label
                                className='custom-control-label'
                                htmlFor='check2'
                              ></label>
                            </div>
                          </td>
                          <td className='job-name'>
                            <Link to={""}>Web Designer</Link>
                            <ul className='job-post-info'>
                              <li>
                                <i className='fa fa-map-marker'></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className='fa fa-bookmark-o'></i> Full Time
                              </li>
                              <li>
                                <i className='fa fa-filter'></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className='application text-primary'>
                            (8) Applications
                          </td>
                          <td className='expired text-red'>Expired</td>
                          <td className='job-links'>
                            <Link to={"#"} onClick={() => setCompany(true)}>
                              <i className='fa fa-eye'></i>
                            </Link>
                            <Link to={""}>
                              <i className='ti-trash'></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className='feature'>
                            <div className='custom-control custom-checkbox'>
                              <input
                                type='checkbox'
                                className='custom-control-input'
                                id='check3'
                                name='example1'
                              />
                              <label
                                className='custom-control-label'
                                htmlFor='check3'
                              ></label>
                            </div>
                          </td>
                          <td className='job-name'>
                            <Link to={""}>Finance Accountant</Link>
                            <ul className='job-post-info'>
                              <li>
                                <i className='fa fa-map-marker'></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className='fa fa-bookmark-o'></i> Full Time
                              </li>
                              <li>
                                <i className='fa fa-filter'></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className='application text-primary'>
                            (9) Applications
                          </td>
                          <td className='expired pending'>Pending </td>
                          <td className='job-links'>
                            <Link to={"#"} onClick={() => setCompany(true)}>
                              <i className='fa fa-eye'></i>
                            </Link>
                            <Link to={""}>
                              <i className='ti-trash'></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className='feature'>
                            <div className='custom-control custom-checkbox'>
                              <input
                                type='checkbox'
                                className='custom-control-input'
                                id='check4'
                                name='example1'
                              />
                              <label
                                className='custom-control-label'
                                htmlFor='check4'
                              ></label>
                            </div>
                          </td>
                          <td className='job-name'>
                            <Link to={""}>Social Media Expert</Link>
                            <ul className='job-post-info'>
                              <li>
                                <i className='fa fa-map-marker'></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className='fa fa-bookmark-o'></i> Full Time
                              </li>
                              <li>
                                <i className='fa fa-filter'></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className='application text-primary'>
                            (7) Applications
                          </td>
                          <td className='expired success'>Active </td>
                          <td className='job-links'>
                            <Link to={"#"} onClick={() => setCompany(true)}>
                              <i className='fa fa-eye'></i>
                            </Link>
                            <Link to={""}>
                              <i className='ti-trash'></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className='feature'>
                            <div className='custom-control custom-checkbox'>
                              <input
                                type='checkbox'
                                className='custom-control-input'
                                id='check5'
                                name='example1'
                              />
                              <label
                                className='custom-control-label'
                                htmlFor='check5'
                              ></label>
                            </div>
                          </td>
                          <td className='job-name'>
                            <Link to={""}>Web Designer</Link>
                            <ul className='job-post-info'>
                              <li>
                                <i className='fa fa-map-marker'></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className='fa fa-bookmark-o'></i> Full Time
                              </li>
                              <li>
                                <i className='fa fa-filter'></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className='application text-primary'>
                            (6) Applications
                          </td>
                          <td className='expired pending'>Pending </td>
                          <td className='job-links'>
                            <Link to={"#"} onClick={() => setCompany(true)}>
                              <i className='fa fa-eye'></i>
                            </Link>
                            <Link to={""}>
                              <i className='ti-trash'></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className='feature'>
                            <div className='custom-control custom-checkbox'>
                              <input
                                type='checkbox'
                                className='custom-control-input'
                                id='check6'
                                name='example1'
                              />
                              <label
                                className='custom-control-label'
                                htmlFor='check6'
                              ></label>
                            </div>
                          </td>
                          <td className='job-name'>
                            <Link to={""}>Finance Accountant</Link>
                            <ul className='job-post-info'>
                              <li>
                                <i className='fa fa-map-marker'></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className='fa fa-bookmark-o'></i> Full Time
                              </li>
                              <li>
                                <i className='fa fa-filter'></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className='application text-primary'>
                            (3) Applications
                          </td>
                          <td className='expired text-red'>Expired</td>
                          <td className='job-links'>
                            <Link to={"#"} onClick={() => setCompany(true)}>
                              <i className='fa fa-eye'></i>
                            </Link>
                            <Link to={""}>
                              <i className='ti-trash'></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className='feature'>
                            <div className='custom-control custom-checkbox'>
                              <input
                                type='checkbox'
                                className='custom-control-input'
                                id='check7'
                                name='example1'
                              />
                              <label
                                className='custom-control-label'
                                htmlFor='check7'
                              ></label>
                            </div>
                          </td>
                          <td className='job-name'>
                            <Link to={""}>Social Media Expert</Link>
                            <ul className='job-post-info'>
                              <li>
                                <i className='fa fa-map-marker'></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className='fa fa-bookmark-o'></i> Full Time
                              </li>
                              <li>
                                <i className='fa fa-filter'></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className='application text-primary'>
                            (2) Applications
                          </td>
                          <td className='expired success'>Active </td>
                          <td className='job-links'>
                            <Link to={"#"} onClick={() => setCompany(true)}>
                              <i className='fa fa-eye'></i>
                            </Link>
                            <Link to={""}>
                              <i className='ti-trash'></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className='feature'>
                            <div className='custom-control custom-checkbox'>
                              <input
                                type='checkbox'
                                className='custom-control-input'
                                id='check8'
                                name='example1'
                              />
                              <label
                                className='custom-control-label'
                                htmlFor='check8'
                              ></label>
                            </div>
                          </td>
                          <td className='job-name'>
                            <Link to={""}>Web Designer</Link>
                            <ul className='job-post-info'>
                              <li>
                                <i className='fa fa-map-marker'></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className='fa fa-bookmark-o'></i> Full Time
                              </li>
                              <li>
                                <i className='fa fa-filter'></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className='application text-primary'>
                            (4) Applications
                          </td>
                          <td className='expired success'>Active </td>
                          <td className='job-links'>
                            <Link to={"#"} onClick={() => setCompany(true)}>
                              <i className='fa fa-eye'></i>
                            </Link>
                            <Link to={""}>
                              <i className='ti-trash'></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className='feature'>
                            <div className='custom-control custom-checkbox'>
                              <input
                                type='checkbox'
                                className='custom-control-input'
                                id='check9'
                                name='example1'
                              />
                              <label
                                className='custom-control-label'
                                htmlFor='check9'
                              ></label>
                            </div>
                          </td>
                          <td className='job-name'>
                            <Link to={""}>Finance Accountant</Link>
                            <ul className='job-post-info'>
                              <li>
                                <i className='fa fa-map-marker'></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className='fa fa-bookmark-o'></i> Full Time
                              </li>
                              <li>
                                <i className='fa fa-filter'></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className='application text-primary'>
                            (1) Applications
                          </td>
                          <td className='expired text-red'>Expired</td>
                          <td className='job-links'>
                            <Link to={"#"} onClick={() => setCompany(true)}>
                              <i className='fa fa-eye'></i>
                            </Link>
                            <Link to={""}>
                              <i className='ti-trash'></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className='feature'>
                            <div className='custom-control custom-checkbox'>
                              <input
                                type='checkbox'
                                className='custom-control-input'
                                id='check10'
                                name='example1'
                              />
                              <label
                                className='custom-control-label'
                                htmlFor='check10'
                              ></label>
                            </div>
                          </td>
                          <td className='job-name'>
                            <Link to={""}>Web Designer</Link>
                            <ul className='job-post-info'>
                              <li>
                                <i className='fa fa-map-marker'></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className='fa fa-bookmark-o'></i> Full Time
                              </li>
                              <li>
                                <i className='fa fa-filter'></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className='application text-primary'>
                            (1) Applications
                          </td>
                          <td className='expired success'>Active </td>
                          <td className='job-links'>
                            <Link to={"#"} onClick={() => setCompany(true)}>
                              <i className='fa fa-eye'></i>
                            </Link>
                            <Link to={""}>
                              <i className='ti-trash'></i>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table> */}
                    {data.length === 0 ? (
                      ""
                    ) : (
                      <div className="pagination-bx m-t30 float-right">
                        <ul className="pagination">
                          <li className="previous">
                            <Link to={""}>
                              <i className="ti-arrow-left"></i> Prev
                            </Link>
                          </li>
                          <li className="active">
                            <Link to={""}>1</Link>
                          </li>
                          <li>
                            <Link to={""}>2</Link>
                          </li>
                          <li>
                            <Link to={""}>3</Link>
                          </li>
                          <li className="next">
                            <Link to={""}>
                              Next <i className="ti-arrow-right"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}

                    <Modal
                      show={company}
                      onHide={setCompany}
                      className="modal fade modal-bx-info"
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="logo-img">
                              <img
                                alt=""
                                src={require("../../../images/logo/icon2.png")}
                              />
                            </div>
                            <h5 className="modal-title">Company Name</h5>
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
                                <p> Web Developer – PHP, HTML, CSS </p>
                              </li>
                              <li>
                                <strong>Experience :</strong>
                                <p>5 Year 3 Months</p>
                              </li>
                              <li>
                                <strong>Deseription :</strong>
                                <p>
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry has been the
                                  industry's standard dummy text ever since.
                                </p>
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
export default CompanyManageBids;
