/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import PageTitle from "./../Layout/PageTitle";
import Jobfindbox from "./../Element/Jobfindbox";
import { Button, Form } from "react-bootstrap";
import createRequest from "../../utils/axios";

var bnr = require("./../../images/banner/bnr1.jpg");

function Browsecandidates() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const [userStatus, setUserStatus] = useState(null);
  const [userNext, setUserNext] = useState(null);
  const [userPrevious, setUserPrevious] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [keyLoad, setKeyLoad] = useState(false);

  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [count, setCount] = useState(null);
  const [page, setPage] = useState(0);

  const { state } = useLocation();

  const checkOnline = async (req = "/api/v1/account/user-status/") => {
    setLoading(true);
    try {
      const { data } = await createRequest().get(req);
      data.next ? setUserNext(data.next) : setUserNext(null);
      data.previous ? setUserPrevious(data.previous) : setUserPrevious(null);
      setUserStatus(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleRequest = async (title) => {
    setLoading(true);
    setKeyLoad(true);
    try {
      console.log(title);
      const params = {
        search: title,
      };
      const { data } = await createRequest().get("/api/v1/account/search/", {
        params,
      });
      if (data.results) {
        setResults(data.results);
        data.next ? setNext(data.next) : setNext(null);
        data.previous ? setPrevious(data.previous) : setPrevious(null);
        const pgs = Math.ceil(data.count / 10);
        data.count && setCount(pgs);
        setLoading(false);
        setKeyLoad(false);
        console.log(data, "data");
      } else {
        setError("No results found");
      }
    } catch (error) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  const handleClick = async (e, req, forNext) => {
    if (!req) {
      return e.preventDefault();
    }

    e.preventDefault();
    setLoading(true);
    setKeyLoad(true);
    console.log("cliked");
    try {
      const { data } = await createRequest().get(req);
      if (forNext) {
        console.log("next Called");
        checkOnline(userNext);
      } else {
        checkOnline(userPrevious);
      }
      if (data.results) {
        setResults(data.results);
        data.previous ? setPrevious(data.previous) : setPrevious(null);
        data.next ? setNext(data.next) : setNext(null);
        setLoading(false);
        if (forNext) {
          setPage(page + 1);
        } else {
          setPage(page - 1);
        }

        console.log(data, "new data");
      } else {
        setError("No results found");
      }
    } catch (error) {
      setError("Something went wrong");
      setLoading(true);
    }
  };

  useEffect(() => {
    handleRequest(state.title);
    checkOnline();
  }, []);

  const handleKeyword = () => {
    if (!keyword) {
      return alert("Please enter a keyword");
    }
    handleRequest(keyword);
    checkOnline();
  };

  return (
    <>
      <Header />
      <div className='page-content bg-white'>
        <div
          className='dez-bnr-inr overlay-black-middle'
          style={{ backgroundImage: "url(" + bnr + ")" }}
        >
          <PageTitle motherName='Home' activeName='Browse Candidates' />
        </div>
        {/* <Jobfindbox /> */}
        <div className='content-block'>
          <div className='section-full bg-white browse-job p-b50'>
            <div className='container'>
              <div className='row mt-4'>
                <div className='col-xl-9 col-lg-8'>
                  {/* <div className='m-b30'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Search freelancer services'
                    />
                  </div> */}
                  <ul className='post-job-bx'>
                    {results && !keyLoad && !loading ? (
                      results.map((item, index) => (
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
                                  <Link
                                    to={{
                                      pathname: "/make-offer",
                                      state: {
                                        id: item.id,
                                      },
                                    }}
                                  >
                                    {item.first_name} {item.last_name}
                                  </Link>
                                </h4>
                                {/* <i class='fa fa-solid fa-circle circle'></i> */}
                                {userStatus &&
                                  userStatus.results.map((user) =>
                                    // user.id === 1 && item.first_name === "Wayne" && true ? (
                                    user.id === item.id && user.online ? (
                                      <div className='d-flex mb-1'>
                                        <i
                                          className='fa fa-check-circle circle align-self-center'
                                          aria-hidden='true'
                                        ></i>

                                        <span className='  ml-1'>
                                          Online Now
                                        </span>
                                      </div>
                                    ) : (
                                      <></>
                                    )
                                  )}
                                <div>
                                  <i className='fa fa-money money'></i>
                                  <span className='ml-1'>
                                    {/* {item.salary} */}$ 500,000
                                  </span>
                                </div>

                                <ul>
                                  <li>
                                    <i className='fa fa-map-marker '></i>{" "}
                                    {item.location}{" "}
                                    {item.city && ", " + item.city}{" "}
                                    {item.city && item.country}
                                  </li>
                                  <li>
                                    <i className='fa fa-usd'></i> Full Time
                                  </li>
                                  <li>
                                    <i className='fa fa-clock-o'></i> Published
                                    11 months ago
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className='d-flex'>
                              <div style={{ width: "65px" }}></div>
                              <div className='job-time mr-4'>
                                <span>{item.description}</span>
                              </div>
                              {item.salary && (
                                <div className='salary-bx'>
                                  <span>{item.salary}</span>
                                </div>
                              )}

                              <div className='salary-bx'>
                                <Link
                                  to={{
                                    pathname: "/make-offer",
                                    state: {
                                      id: item.id,
                                    },
                                  }}
                                >
                                  <Button variant='primary' size='md'>
                                    <b className='fw8'>View Profile</b>
                                  </Button>
                                </Link>
                              </div>
                            </div>
                            <label className='like-btn'>
                              <input type='checkbox' />
                              <span className='checkmark'></span>
                            </label>
                          </div>
                        </li>
                      ))
                    ) : error ? (
                      <p>{error}</p>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </ul>
                  {results && !keyLoad && !loading && (
                    <div className='pagination-bx m-t30'>
                      <ul className='pagination'>
                        <li className='previous'>
                          <Link
                            to={""}
                            className={!previous && "disabledCursor"}
                            onClick={(e) =>
                              previous
                                ? handleClick(e, previous)
                                : handleClick(e)
                            }
                          >
                            <i className='ti-arrow-left'></i> Prev
                          </Link>
                        </li>
                        {Array.from(Array(count), (e, i) => {
                          return (
                            <li
                              key={i}
                              className={
                                i === page ? "activeNumber " : "notActive"
                              }
                            >
                              <Link to='' onClick={(e) => handleClick(e)}>
                                {i + 1}
                              </Link>
                            </li>
                          );
                        })}
                        <li className='next'>
                          <Link
                            to={""}
                            className={!next && "disabledCursor"}
                            onClick={(e) =>
                              next
                                ? handleClick(e, next, "forNext")
                                : handleClick(e)
                            }
                          >
                            Next <i className='ti-arrow-right'></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className='col-xl-3 col-lg-4'>
                  <div className='sticky-top browse-candidates'>
                    <div className='clearfix m-b30'>
                      <h5 className='widget-title font-weight-700 text-uppercase'>
                        Keywords
                      </h5>
                      <div className=''>
                        <input
                          type='text'
                          value={keyword}
                          onChange={(e) => setKeyword(e.target.value)}
                          className='form-control'
                          placeholder='Search'
                        />
                      </div>
                    </div>
                    {/* <div className='clearfix m-b10'>
                        <h5 className='widget-title font-weight-700 m-t0 text-uppercase'>
                          Location
                        </h5>
                        <input
                          type='text'
                          className='form-control m-b30'
                          placeholder='Location'
                        />
                        <div className='input-group m-b20'>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='120'
                          />
                          <Form.Control
                            as='select'
                            custom
                            className='btn dropdown-toggle text-left btn-default'
                          >
                            <option>Km</option>
                            <option>miles</option>
                          </Form.Control>
                        </div>
                      </div> */}
                    {/* <div className='clearfix m-b30'>
                      <h5 className='widget-title font-weight-700 text-uppercase'>
                        Job type
                      </h5>
                      <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                          <div className='product-brand'>
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
                              >
                                Freelance
                              </label>
                            </div>
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
                              >
                                Full Time
                              </label>
                            </div>
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
                              >
                                Internship
                              </label>
                            </div>
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
                              >
                                Part Time
                              </label>
                            </div>
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
                              >
                                Temporary
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                          <div className='product-brand'>
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
                              >
                                Internship
                              </label>
                            </div>
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
                              >
                                Part Time
                              </label>
                            </div>
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
                              >
                                Temporary
                              </label>
                            </div>
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
                              >
                                Freelance
                              </label>
                            </div>
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
                              >
                                Full Time
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div className='clearfix .browse-job'>
                      <h5 className='widget-title font-weight-700 text-uppercase'>
                        Category
                      </h5>
                      <Form.Control
                        as='select'
                        custom
                        className='btn dropdown-toggle text-left btn-default'
                      >
                        <option>Any Category</option>
                        <option>Automotive Jobs</option>
                        <option>Construction Facilities</option>
                        <option>Design, Art & Multimedia</option>
                        <option>Food Services</option>
                      </Form.Control>
                    </div>
                    <div className='clearfix .browse-job mt-4'>
                      <Button
                        variant='primary'
                        onClick={handleKeyword}
                        className='w-100'
                      >
                        <b className='fw8'>FIND JOB</b>
                      </Button>
                    </div>
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
export default Browsecandidates;