import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import PageTitle from "../../Layout/PageTitle";
import Jobfindbox from "../../Element/Jobfindbox";
import Accordsidebar from "../../Element/Accordsidebar";

//Images
import logo from "../../../images/logo/icon1.png";
import { Badge } from "react-bootstrap";
var bnr = require("../../../images/banner/bnr1.jpg");

const postBox = [
  { image: logo },
  { image: logo },
  { image: logo },
  { image: logo },
  { image: logo },
  { image: logo },
];

function Browsejobfilterlist() {
  const dummyText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Mauris eget nulla eu nunc efficitur tincidunt.
  Nulla euismod, urna eu aliquet aliquet,
  nisi nunc ultricies nisi, euismod ornare nisl nunc euismod nisl.
  Mauris eget nulla eu nunc efficitur tincidunt.`;

  return (
    <>
      <Header />
      <div className='page-content bg-white'>
        <Jobfindbox style={{ marginTop: "80px" }} />
        <div className='content-block'>
          <div className='section-full browse-job p-b50'>
            <div className='container'>
              <div className='row'>
                <Accordsidebar />
                <div className='col-xl-9 col-lg-8 col-md-7'>
                  <div className='job-bx-title clearfix'>
                    <h5 className='font-weight-700 pull-left text-uppercase'>
                      2269 Jobs Found
                    </h5>
                  </div>
                  <ul className='post-job-bx'>
                    {postBox.map((item, index) => (
                      <li key={index}>
                        <div className='post-bx'>
                          <div className='d-flex m-b30'>
                            <div className='job-post-company'>
                              <Link to={""}>
                                <span>
                                  <img alt='' src={item.image} />
                                </span>
                              </Link>
                            </div>
                            <div className='job-post-info'>
                              <h4>
                                <Link to={"/make-offer-task"}>
                                  Digital Marketing Executive
                                </Link>
                              </h4>
                              <ul>
                                <li>
                                  <i className='fa fa-map-marker'></i>{" "}
                                  Sacramento, California
                                </li>
                                <li>
                                  <i className='fa fa-bookmark-o'></i> Full Time
                                </li>
                                <li>
                                  <i className='fa fa-clock-o'></i> Published 11
                                  months ago
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className='d-flex'>
                            <div className='job-time mr-auto align-self-center'>
                              <p className='h-100'>
                                {dummyText.substring(0, 150)} ...{"  "}
                                <Link
                                  to={"/make-offer-task"}
                                  className='text-primary'
                                >
                                  See more
                                </Link>
                              </p>
                              <div className='d-flex badge-div '>
                                <Badge>iOS</Badge>
                                <Badge>Android</Badge>
                                <Badge>Mobile apps</Badge>
                                <Badge>Python</Badge>
                              </div>
                              {/* <Link to={""}>
                                <span>Full Time</span>
                              </Link> */}
                            </div>

                            <div className='salary-bx d-flex flex-column'>
                              <span>$1200 - $ 2500</span>
                              {/* <small class='text-muted'>Per hour</small> */}

                              <p className='text-muted text-capitalize'>
                                per month
                              </p>
                              <Link to={"/make-offer-task"}>
                                <button className='site-button btn-block '>
                                  Show Interest
                                </button>
                              </Link>
                            </div>
                          </div>
                          <label className='like-btn'>
                            <input type='checkbox' />
                            <span className='checkmark'></span>
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className='pagination-bx float-right m-t30'>
                    <ul className='pagination'>
                      <li className='previous'>
                        <Link to={""}>
                          <i className='ti-arrow-left'></i> Prev
                        </Link>
                      </li>
                      <li className='active'>
                        <Link to={""}>1</Link>
                      </li>
                      <li>
                        <Link to={""}>2</Link>
                      </li>
                      <li>
                        <Link to={""}>3</Link>
                      </li>
                      <li className='next'>
                        <Link to={""}>
                          Next <i className='ti-arrow-right'></i>
                        </Link>
                      </li>
                    </ul>
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
export default Browsejobfilterlist;
