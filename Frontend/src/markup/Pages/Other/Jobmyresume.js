import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Listingsidebar from "../../Element/Listingsidebar";
import {
  Headline,
  Skills,
  Employment,
  Education,
  ItSkills,
  Projects,
  ProfileSummary,
  CareerProfile,
  PersonalDetails,
} from "../components";
import Loader from "../../Element/Loader";
import createRequest from "../../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { authActionTypes } from "../Auth/Redux/AuthActions";
import { toast } from "react-toastify";

var bnr = require("../../../images/banner/bnr1.jpg");
//var bnr2 = require('./../../images/background/bg3.jpg');

function Jobmyresume() {
  const [basicdetails, setBasicDetails] = useState(false);
  const [resume, setResume] = useState(false);
  const [keyskill, setKeyskill] = useState(false);
  const [employment, setEmployment] = useState(false);
  const [education, setEducation] = useState(false);
  const [itskills, setItSkills] = useState(false);
  const [projects, setProjects] = useState(false);
  const [profilesummary, setProfileSummary] = useState(false);
  const [onlineprofile, setOnlineProfile] = useState(false);
  const [worksample, setWorkSample] = useState(false);
  const [whitepaper, setWhitePaper] = useState(false);
  const [presentation, setPresentation] = useState(false);
  const [patent, setPatent] = useState(false);
  const [certification, setCertification] = useState(false);
  const [careerprofile, setCareerProfile] = useState(false);
  const [personaldetails, setPersonalDetails] = useState(false);

  const { currentUser, userProfile } = useSelector(
    (state) => state.authReducer
  );

  const [loading, setLoading] = useState(true);
  const [resumeDetails, setResumeDetails] = useState(null);

  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (!userProfile) {
      getUserDetails();
    }
  }, [currentUser]);

  useEffect(() => {
    if (userDetails) {
      dispatch({
        type: authActionTypes.USER_PROFILE,
        payload: userDetails,
      });
    }
  }, [userDetails]);

  const getUserDetails = () => {
    if (currentUser) {
      createRequest()
        .get(`/api/v1/account/user-profile/${currentUser?.pk}/`)
        .then(({ data }) => {
          setUserDetails(data);
        })
        .catch((e) => {
          toast.error(e.response?.data?.message || "Unknown Error");
          console.log(e);
        });
    }
  };

  const getResume = async () => {
    setLoading(true);
    try {
      const { data } = await createRequest().get(
        `/api/v1/account/user-resume/${currentUser?.pk}/`
      );
      console.log(data, "RESUME DATA");
      setResumeDetails(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resumeDetails) {
      dispatch({
        type: authActionTypes.GET_USER_RESUME,
        payload: resumeDetails,
      });
    }
  }, [resumeDetails]);

  useEffect(() => {
    if (currentUser && resumeDetails === null) {
      console.log("Chaling", "checkingloading");
      getResume();
    }
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <div className='page-content'>
          <nav aria-label='breadcrumb'>
            <ol
              className='breadcrumb ml-4'
              style={{ backgroundColor: "#f8f8f8" }}
            >
              <li className='breadcrumb-item'>
                <Link to='/'>Home</Link>
              </li>
              <li className='breadcrumb-item'>
                <Link to='/jobs-profile'>Dashboard</Link>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                My Resume
              </li>
              <div className='flex-fill mr-5'>
                <Link
                  to={"/jobs-profile"}
                  className='site-button right-arrow button-sm float-right'
                >
                  Back
                </Link>
              </div>
            </ol>
          </nav>
          <div
            className='overlay-black-dark profile-edit p-t50 p-b20'
            style={{ backgroundImage: "url(" + bnr + ")" }}
          >
            <div className='container'>
              <div className='row'>
                <div className='col-lg-8 col-md-7 candidate-info'>
                  <div className='candidate-detail'>
                    <div className='canditate-des text-center'>
                      <Link to={""}>
                        <img
                          alt=''
                          src={require("../../../images/team/pic1.jpg")}
                        />
                      </Link>
                      <div
                        className='upload-link'
                        title='update'
                        data-toggle='tooltip'
                        data-placement='right'
                      >
                        <input type='file' className='update-flie' />
                        <i className='fa fa-camera'></i>
                      </div>
                    </div>
                    <div className='text-white browse-job text-left'>
                      <h4 className='m-b0'>
                        {userProfile?.first_name} {userProfile?.last_name}
                        {/* <Link
                          to={"#"}
                          onClick={() => setBasicDetails(true)}
                          className='m-l15 font-16 text-white'
                        >
                          <i className='fa fa-pencil'></i>
                        </Link> */}
                      </h4>
                      <p className='m-b15'>{userProfile?.title}</p>
                      <ul className='clearfix'>
                        {userProfile?.city && (
                          <li>
                            <i className='ti-location-pin'></i>
                            {userProfile?.city}{" "}
                            {userProfile.country && userProfile?.country}
                          </li>
                        )}
                        <li>
                          <i className='ti-mobile'></i> +1 123 456 7890
                        </li>
                        <li>
                          <i className='ti-briefcase'></i> Fresher
                        </li>
                        <li>
                          <i className='ti-email'></i> info@example.com
                        </li>
                      </ul>
                      <div className='progress-box m-t10'>
                        <div className='progress-info'>
                          Profile Strength (Average)<span>70%</span>
                        </div>
                        <div className='progress'>
                          <div
                            className='progress-bar bg-primary'
                            style={{ width: "80%" }}
                            role='progressbar'
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-4 col-md-5'>
                  <Link to={""}>
                    <div className='pending-info text-white p-a25'>
                      <h5>Pending Action</h5>
                      <ul className='list-check secondry'>
                        <li>Verify Mobile Number</li>
                        <li>Add Preferred Location</li>
                        <li>Add Resume</li>
                      </ul>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <Modal
              className='modal fade browse-job modal-bx-info editor'
              show={basicdetails}
              onHide={setBasicDetails}
            >
              <div className='modal-dialog my-0' role='document'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='ProfilenameModalLongTitle'>
                      Basic Details
                    </h5>
                    <button
                      type='button'
                      className='close'
                      onClick={() => setBasicDetails(false)}
                    >
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <form>
                      <div className='row'>
                        <div className='col-lg-12 col-md-12'>
                          <div className='form-group'>
                            <label>Your Name</label>
                            <input
                              type='email'
                              className='form-control'
                              placeholder='Enter Your Name'
                            />
                          </div>
                        </div>
                        <div className='col-lg-12 col-md-12'>
                          <div className='form-group'>
                            <div className='row'>
                              <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className='custom-control custom-radio'>
                                  <input
                                    type='radio'
                                    className='custom-control-input'
                                    id='fresher'
                                    name='example1'
                                  />
                                  <label
                                    className='custom-control-label'
                                    htmlFor='fresher'
                                  >
                                    Fresher
                                  </label>
                                </div>
                              </div>
                              <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className='custom-control custom-radio'>
                                  <input
                                    type='radio'
                                    className='custom-control-input'
                                    id='experienced'
                                    name='example1'
                                  />
                                  <label
                                    className='custom-control-label'
                                    htmlFor='experienced'
                                  >
                                    Experienced
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-6 col-md-6'>
                          <div className='form-group'>
                            <label>Select Your Country</label>
                            <Form.Control as='select'>
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
                        <div className='col-lg-6 col-md-6'>
                          <div className='form-group'>
                            <label>Select Your Country</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Select Your Country'
                            />
                          </div>
                        </div>
                        <div className='col-lg-12 col-md-12'>
                          <div className='form-group'>
                            <label>Select Your City</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Select Your City'
                            />
                          </div>
                        </div>
                        <div className='col-lg-12 col-md-12'>
                          <div className='form-group'>
                            <label>Telephone Number</label>
                            <div className='row'>
                              <div className='col-lg-4 col-md-4 col-sm-4 col-4'>
                                <input
                                  type='text'
                                  className='form-control'
                                  placeholder='Country Code'
                                />
                              </div>
                              <div className='col-lg-4 col-md-4 col-sm-4 col-4'>
                                <input
                                  type='text'
                                  className='form-control'
                                  placeholder='Area Code'
                                />
                              </div>
                              <div className='col-lg-4 col-md-4 col-sm-4 col-4'>
                                <input
                                  type='text'
                                  className='form-control'
                                  placeholder='Phone Number'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-12 col-md-12'>
                          <div className='form-group'>
                            <label>Email Address</label>
                            <h6 className='m-a0 font-14'>info@example.com</h6>
                            <Link to={""}>Change Email Address</Link>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='site-button'
                      onClick={() => setBasicDetails(false)}
                    >
                      Cancel
                    </button>
                    <button type='button' className='site-button'>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>

          <div className='content-block'>
            <div className='section-full browse-job content-inner-2'>
              <div className='container'>
                <div className='row'>
                  <div className='col-xl-3 col-lg-4 col-md-4 col-sm-12 m-b30'>
                    <Listingsidebar />
                  </div>
                  <div className='col-xl-9 col-lg-8 col-md-8 col-sm-12'>
                    {/* Headline Section Start */}

                    <Headline
                      headline={resumeDetails?.headline}
                      {...{ setResume, resume, setResumeDetails }}
                      isLoggedIn={true}
                      user={{ id: 1 }}
                      owner={{ id: 1 }}
                    />

                    {/* Headline Section Ends */}

                    {/* Key Skills Start */}

                    <Skills
                      {...{ setKeyskill, keyskill, setResumeDetails }}
                      skills={resumeDetails?.skills}
                      isLoggedIn={true}
                      user={{ id: 1 }}
                      owner={{ id: 1 }}
                    />

                    {/* Key Skills Ends */}

                    {/* Employment Start */}
                    <Employment
                      {...{ setEmployment, employment, setResumeDetails }}
                      data={resumeDetails?.employment}
                      isLoggedIn={true}
                      user={{ id: 1 }}
                      owner={{ id: 1 }}
                    />

                    {/* Employment Ends */}

                    {/* Education Start */}
                    <Education
                      {...{ setEducation, education, setResumeDetails }}
                      data={resumeDetails?.education}
                      isLoggedIn={true}
                      user={{ id: 1 }}
                      owner={{ id: 1 }}
                    />

                    {/* Education Ends */}

                    {/* It Skills Start */}

                    {/* <ItSkills
                      {...{ setItSkills, itskills }}
                      isLoggedIn={true}
                      user={{ id: 1 }}
                      owner={{ id: 1 }}
                    /> */}

                    {/* It Skills Ends */}

                    {/* Projects Start */}
                    <Projects
                      {...{ setProjects, projects, setResumeDetails }}
                      data={resumeDetails?.projects}
                      isLoggedIn={true}
                      user={{ id: 1 }}
                      owner={{ id: 1 }}
                    />
                    {/* Projects End */}

                    {/* Projects Start */}
                    <ProfileSummary
                      {...{
                        setProfileSummary,
                        profilesummary,
                        setResumeDetails,
                      }}
                      data={resumeDetails?.profile_summary}
                      isLoggedIn={true}
                      user={{ id: 1 }}
                      owner={{ id: 1 }}
                    />
                    {/* Projects End */}

                    <div
                      id='accomplishments_bx'
                      className='job-bx bg-white m-b30'
                    >
                      <h5 className='m-b10'>Accomplishments</h5>
                      <div className='list-row'>
                        <div className='list-line'>
                          <div className='d-flex'>
                            <h6 className='font-14 m-b5'>Online Profile</h6>
                            <Link
                              to={"#"}
                              onClick={() => setOnlineProfile(true)}
                              className='site-button add-btn button-sm'
                            >
                              <i className='fa fa-pencil m-r5'></i> Edit
                            </Link>
                          </div>
                          <p className='m-b0'>
                            Add link to Online profiles (e.g. Linkedin, Facebook
                            etc.).
                          </p>

                          <Modal
                            className='modal fade modal-bx-info editor'
                            show={onlineprofile}
                            onHide={setOnlineProfile}
                          >
                            <div className='modal-dialog my-0' role='document'>
                              <div className='modal-content'>
                                <div className='modal-header'>
                                  <h5 className='modal-title'>
                                    Online Profiles
                                  </h5>
                                  <button
                                    type='button'
                                    className='close'
                                    onClick={() => setOnlineProfile(false)}
                                  >
                                    <span aria-hidden='true'>&times;</span>
                                  </button>
                                </div>
                                <div className='modal-body'>
                                  <form>
                                    <div className='row'>
                                      <div className='col-lg-12 col-md-12'>
                                        <div className='form-group'>
                                          <label>Social Profile</label>
                                          <input
                                            type='email'
                                            className='form-control'
                                            placeholder='Social Profile Name'
                                          />
                                        </div>
                                      </div>
                                      <div className='col-lg-12 col-md-12'>
                                        <div className='form-group'>
                                          <label>URL</label>
                                          <input
                                            type='email'
                                            className='form-control'
                                            placeholder='www.google.com'
                                          />
                                        </div>
                                      </div>
                                      <div className='col-lg-12 col-md-12'>
                                        <div className='form-group'>
                                          <label>Description</label>
                                          <textarea
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
                                    onClick={() => setOnlineProfile(false)}
                                  >
                                    Cancel
                                  </button>
                                  <button type='button' className='site-button'>
                                    Save
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Modal>

                          <div className='list-line'>
                            <div className='d-flex'>
                              <h6 className='font-14 m-b5'>Work Sample</h6>
                              <Link
                                to={"#"}
                                onClick={() => setWorkSample(true)}
                                className='site-button add-btn button-sm'
                              >
                                <i className='fa fa-pencil m-r5'></i> Edit
                              </Link>
                            </div>
                            <p className='m-b0'>
                              Add link to your Projects (e.g. Github links
                              etc.).
                            </p>

                            <Modal
                              className='modal fade modal-bx-info editor'
                              show={worksample}
                              onHide={setWorkSample}
                            >
                              <div
                                className='modal-dialog my-0'
                                role='document'
                              >
                                <div className='modal-content'>
                                  <div className='modal-header'>
                                    <h5 className='modal-title'>Work Sample</h5>
                                    <button
                                      type='button'
                                      className='close'
                                      onClick={() => setWorkSample(false)}
                                    >
                                      <span aria-hidden='true'>&times;</span>
                                    </button>
                                  </div>
                                  <div className='modal-body'>
                                    <form>
                                      <div className='row'>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
                                            <label>Work Title</label>
                                            <input
                                              type='email'
                                              className='form-control'
                                              placeholder='Enter Title'
                                            />
                                          </div>
                                        </div>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
                                            <label>URL</label>
                                            <input
                                              type='email'
                                              className='form-control'
                                              placeholder='www.google.com'
                                            />
                                          </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6'>
                                          <div className='form-group'>
                                            <label>Duration From</label>
                                            <div className='row'>
                                              <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                                <Form.Control as='select'>
                                                  <option>2018</option>
                                                  <option>2017</option>
                                                  <option>2016</option>
                                                  <option>2015</option>
                                                  <option>2014</option>
                                                  <option>2013</option>
                                                  <option>2012</option>
                                                  <option>2011</option>
                                                  <option>2010</option>
                                                  <option>2009</option>
                                                  <option>2008</option>
                                                  <option>2007</option>
                                                  <option>2006</option>
                                                  <option>2005</option>
                                                  <option>2004</option>
                                                  <option>2003</option>
                                                  <option>2002</option>
                                                  <option>2001</option>
                                                </Form.Control>
                                              </div>
                                              <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                                <Form.Control as='select'>
                                                  <option>january</option>
                                                  <option>february</option>
                                                  <option>March</option>
                                                  <option>April</option>
                                                  <option>May</option>
                                                  <option>Jun</option>
                                                  <option>July</option>
                                                  <option>August</option>
                                                  <option>September</option>
                                                  <option>October</option>
                                                  <option>November</option>
                                                  <option>December</option>
                                                </Form.Control>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6'>
                                          <div className='form-group'>
                                            <label>Duration To</label>
                                            <div className='row'>
                                              <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                                <Form.Control as='select'>
                                                  <option>2018</option>
                                                  <option>2017</option>
                                                  <option>2016</option>
                                                  <option>2015</option>
                                                  <option>2014</option>
                                                  <option>2013</option>
                                                  <option>2012</option>
                                                  <option>2011</option>
                                                  <option>2010</option>
                                                  <option>2009</option>
                                                  <option>2008</option>
                                                  <option>2007</option>
                                                  <option>2006</option>
                                                  <option>2005</option>
                                                  <option>2004</option>
                                                  <option>2003</option>
                                                  <option>2002</option>
                                                  <option>2001</option>
                                                </Form.Control>
                                              </div>
                                              <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                                <Form.Control as='select'>
                                                  <option>january</option>
                                                  <option>february</option>
                                                  <option>March</option>
                                                  <option>April</option>
                                                  <option>May</option>
                                                  <option>Jun</option>
                                                  <option>July</option>
                                                  <option>August</option>
                                                  <option>September</option>
                                                  <option>October</option>
                                                  <option>November</option>
                                                  <option>December</option>
                                                </Form.Control>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
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
                                                I am currently working on this
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
                                            <label>Description</label>
                                            <textarea
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
                                      onClick={() => setWorkSample(false)}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type='button'
                                      className='site-button'
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Modal>
                          </div>
                          <div className='list-line'>
                            <div className='d-flex'>
                              <h6 className='font-14 m-b5'>
                                White Paper / Research Publication / Journal
                                Entry
                              </h6>
                              <Link
                                to={"#"}
                                onClick={() => setWhitePaper(true)}
                                className='site-button add-btn button-sm'
                              >
                                <i className='fa fa-pencil m-r5'></i> Edit
                              </Link>
                            </div>
                            <p className='m-b0'>
                              Add links to your Online publications.
                            </p>

                            <Modal
                              className='modal fade modal-bx-info editor'
                              show={whitepaper}
                              onHide={setWhitePaper}
                            >
                              <div
                                className='modal-dialog my-0'
                                role='document'
                              >
                                <div className='modal-content'>
                                  <div className='modal-header'>
                                    <h5
                                      className='modal-title'
                                      id='JournalentryModalLongTitle'
                                    >
                                      White Paper / Research Publication /
                                      Journal Entry
                                    </h5>
                                    <button
                                      type='button'
                                      className='close'
                                      onClick={() => setWhitePaper(false)}
                                    >
                                      <span aria-hidden='true'>&times;</span>
                                    </button>
                                  </div>
                                  <div className='modal-body'>
                                    <form>
                                      <div className='row'>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
                                            <label>Title</label>
                                            <input
                                              type='email'
                                              className='form-control'
                                              placeholder='Enter Title'
                                            />
                                          </div>
                                        </div>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
                                            <label>URL</label>
                                            <input
                                              type='email'
                                              className='form-control'
                                              placeholder='www.google.com'
                                            />
                                          </div>
                                        </div>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
                                            <label>Published On</label>
                                            <div className='row'>
                                              <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                                <Form.Control as='select'>
                                                  <option>2018</option>
                                                  <option>2017</option>
                                                  <option>2016</option>
                                                  <option>2015</option>
                                                  <option>2014</option>
                                                  <option>2013</option>
                                                  <option>2012</option>
                                                  <option>2011</option>
                                                  <option>2010</option>
                                                  <option>2009</option>
                                                  <option>2008</option>
                                                  <option>2007</option>
                                                  <option>2006</option>
                                                  <option>2005</option>
                                                  <option>2004</option>
                                                  <option>2003</option>
                                                  <option>2002</option>
                                                  <option>2001</option>
                                                </Form.Control>
                                              </div>
                                              <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                                <Form.Control as='select'>
                                                  <option>january</option>
                                                  <option>february</option>
                                                  <option>March</option>
                                                  <option>April</option>
                                                  <option>May</option>
                                                  <option>Jun</option>
                                                  <option>July</option>
                                                  <option>August</option>
                                                  <option>September</option>
                                                  <option>October</option>
                                                  <option>November</option>
                                                  <option>December</option>
                                                </Form.Control>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
                                            <label>Description</label>
                                            <textarea
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
                                      onClick={() => setWhitePaper(false)}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type='button'
                                      className='site-button'
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Modal>
                          </div>
                          <div className='list-line'>
                            <div className='d-flex'>
                              <h6 className='font-14 m-b5'>Presentation</h6>
                              <Link
                                to={"#"}
                                onClick={() => setPresentation(true)}
                                className='site-button add-btn button-sm'
                              >
                                <i className='fa fa-pencil m-r5'></i> Edit
                              </Link>
                            </div>
                            <p className='m-b0'>
                              Add links to your Online presentations (e.g.
                              Slideshare presentation links etc.).
                            </p>

                            <Modal
                              className='modal fade modal-bx-info editor'
                              id='presentation'
                              show={presentation}
                              onHide={setPresentation}
                            >
                              <div
                                className='modal-dialog my-0'
                                role='document'
                              >
                                <div className='modal-content'>
                                  <div className='modal-header'>
                                    <h5
                                      className='modal-title'
                                      id='PresentationModalLongTitle'
                                    >
                                      Presentation
                                    </h5>
                                    <button
                                      type='button'
                                      className='close'
                                      onClick={() => setPresentation(false)}
                                    >
                                      <span aria-hidden='true'>&times;</span>
                                    </button>
                                  </div>
                                  <div className='modal-body'>
                                    <form>
                                      <div className='row'>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
                                            <label>Title</label>
                                            <input
                                              type='email'
                                              className='form-control'
                                              placeholder='Enter Title'
                                            />
                                          </div>
                                        </div>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
                                            <label>URL</label>
                                            <input
                                              type='email'
                                              className='form-control'
                                              placeholder='www.google.com'
                                            />
                                          </div>
                                        </div>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
                                            <label>Description</label>
                                            <textarea
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
                                      data-dismiss='modal'
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type='button'
                                      className='site-button'
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Modal>
                          </div>
                          <div className='list-line'>
                            <div className='d-flex'>
                              <h6 className='font-14 m-b5'>Patent</h6>
                              <Link
                                to={"#"}
                                data-toggle='modal'
                                data-target='#patent'
                                onClick={() => setPatent(true)}
                                className='site-button add-btn button-sm'
                              >
                                <i className='fa fa-pencil m-r5'></i> Edit
                              </Link>
                            </div>
                            <p className='m-b0'>
                              Add details of Patents you have filed.
                            </p>

                            <Modal
                              className='modal fade modal-bx-info editor'
                              show={patent}
                              onHide={setPatent}
                            >
                              <div
                                className='modal-dialog my-0'
                                role='document'
                              >
                                <div className='modal-content'>
                                  <div className='modal-header'>
                                    <h5
                                      className='modal-title'
                                      id='PatentModalLongTitle'
                                    >
                                      Patent
                                    </h5>
                                    <button
                                      type='button'
                                      className='close'
                                      onClick={() => setPatent(false)}
                                    >
                                      <span aria-hidden='true'>&times;</span>
                                    </button>
                                  </div>
                                  <div className='modal-body'>
                                    <form>
                                      <div className='row'>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
                                            <label>Title</label>
                                            <input
                                              type='email'
                                              className='form-control'
                                              placeholder='Enter Title'
                                            />
                                          </div>
                                        </div>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
                                            <label>URL</label>
                                            <input
                                              type='email'
                                              className='form-control'
                                              placeholder='www.google.com'
                                            />
                                          </div>
                                        </div>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
                                            <label>Patent Office</label>
                                            <input
                                              type='email'
                                              className='form-control'
                                              placeholder='Enter Patent Office'
                                            />
                                          </div>
                                        </div>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
                                            <label>Status</label>
                                            <div className='row'>
                                              <div className='col-lg-6 col-md-6'>
                                                <div className='custom-control custom-radio'>
                                                  <input
                                                    type='radio'
                                                    className='custom-control-input'
                                                    id='check2'
                                                    name='example1'
                                                  />
                                                  <label
                                                    className='custom-control-label'
                                                    htmlFor='check2'
                                                  >
                                                    Patent Issued
                                                  </label>
                                                </div>
                                              </div>
                                              <div className='col-lg-6 col-md-6'>
                                                <div className='custom-control custom-radio'>
                                                  <input
                                                    type='radio'
                                                    className='custom-control-input'
                                                    id='check3'
                                                    name='example1'
                                                  />
                                                  <label
                                                    className='custom-control-label'
                                                    htmlFor='check3'
                                                  >
                                                    Patent pending
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
                                            <label>Application Number</label>
                                            <input
                                              type='email'
                                              className='form-control'
                                              placeholder='Enter Application Number'
                                            />
                                          </div>
                                        </div>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
                                            <label>Published On</label>
                                            <div className='row'>
                                              <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                                <Form.Control as='select'>
                                                  <option>2018</option>
                                                  <option>2017</option>
                                                  <option>2016</option>
                                                  <option>2015</option>
                                                  <option>2014</option>
                                                  <option>2013</option>
                                                  <option>2012</option>
                                                  <option>2011</option>
                                                  <option>2010</option>
                                                  <option>2009</option>
                                                  <option>2008</option>
                                                  <option>2007</option>
                                                  <option>2006</option>
                                                  <option>2005</option>
                                                  <option>2004</option>
                                                  <option>2003</option>
                                                  <option>2002</option>
                                                  <option>2001</option>
                                                </Form.Control>
                                              </div>
                                              <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                                <Form.Control as='select'>
                                                  <option>january</option>
                                                  <option>february</option>
                                                  <option>March</option>
                                                  <option>April</option>
                                                  <option>May</option>
                                                  <option>Jun</option>
                                                  <option>July</option>
                                                  <option>August</option>
                                                  <option>September</option>
                                                  <option>October</option>
                                                  <option>November</option>
                                                  <option>December</option>
                                                </Form.Control>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
                                            <label>Description</label>
                                            <textarea
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
                                      onClick={() => setPatent(false)}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type='button'
                                      className='site-button'
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Modal>
                          </div>
                          <div className='list-line'>
                            <div className='d-flex'>
                              <h6 className='font-14 m-b5'>Certification</h6>
                              <Link
                                to={"#"}
                                onClick={() => setCertification(true)}
                                className='site-button add-btn button-sm'
                              >
                                <i className='fa fa-pencil m-r5'></i> Edit
                              </Link>
                            </div>
                            <p className='m-b0'>
                              Add details of Certification you have filed.
                            </p>

                            <Modal
                              className='modal fade modal-bx-info editor'
                              show={certification}
                              onHide={setCertification}
                            >
                              <div
                                className='modal-dialog my-0'
                                role='document'
                              >
                                <div className='modal-content'>
                                  <div className='modal-header'>
                                    <h5
                                      className='modal-title'
                                      id='CertificationModalLongTitle'
                                    >
                                      Certification
                                    </h5>
                                    <button
                                      type='button'
                                      className='close'
                                      onClick={() => setCertification(false)}
                                    >
                                      <span aria-hidden='true'>&times;</span>
                                    </button>
                                  </div>
                                  <div className='modal-body'>
                                    <form>
                                      <div className='row'>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
                                            <label>Certification Name</label>
                                            <input
                                              type='text'
                                              className='form-control'
                                              placeholder='Enter Certification Name'
                                            />
                                          </div>
                                        </div>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='form-group'>
                                            <label>Certification Body</label>
                                            <input
                                              type='text'
                                              className='form-control'
                                              placeholder='Enter Certification Body'
                                            />
                                          </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6'>
                                          <div className='form-group'>
                                            <label>Year Onlabel</label>
                                            <Form.Control as='select'>
                                              <option>2018</option>
                                              <option>2017</option>
                                              <option>2016</option>
                                              <option>2015</option>
                                              <option>2014</option>
                                              <option>2013</option>
                                              <option>2012</option>
                                              <option>2011</option>
                                              <option>2010</option>
                                              <option>2009</option>
                                              <option>2008</option>
                                              <option>2007</option>
                                              <option>2006</option>
                                              <option>2005</option>
                                              <option>2004</option>
                                              <option>2003</option>
                                              <option>2002</option>
                                              <option>2001</option>
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
                                      onClick={() => setCertification(false)}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type='button'
                                      className='site-button'
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Career Profile Start */}
                    <CareerProfile
                      {...{ setCareerProfile, careerprofile, setResumeDetails }}
                      data={resumeDetails?.career_profile}
                      isLoggedIn={true}
                      user={{ id: 1 }}
                      owner={{ id: 1 }}
                    />
                    {/* Career Profile End */}

                    {/* Personal Details Start */}
                    {/* <PersonalDetails
                      {...{
                        setPersonalDetails,
                        personaldetails,
                        setResumeDetails,
                      }}
                      data={resumeDetails?.profile}
                      isLoggedIn={true}
                      user={{ id: 1 }}
                      owner={{ id: 1 }}
                    /> */}
                    {/* Career Profile End */}

                    <div
                      id='attach_resume_bx'
                      className='job-bx bg-white m-b30'
                    >
                      <h5 className='m-b10'>Attach Resume</h5>
                      <p>
                        Resume is the most important document recruiters look
                        for. Recruiters generally do not look at profiles
                        without resumes.
                      </p>
                      <form className='attach-resume'>
                        <div className='row'>
                          <div className='col-lg-12 col-md-12'>
                            <div className='form-group'>
                              <div className='custom-file'>
                                <p className='m-auto align-self-center'>
                                  <i className='fa fa-upload'></i>
                                  Upload Resume File size is 3 MB
                                </p>
                                <input
                                  type='file'
                                  className='site-button form-control'
                                  id='customFile'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                      <p className='text-center'>
                        If you do not have a resume document, you may write your
                        brief professional profile{" "}
                        <Link to={""} className='site-button-link'>
                          here
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
export default Jobmyresume;
