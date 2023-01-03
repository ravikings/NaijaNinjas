import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import createRequest from "../../../utils/axios";
import { toast } from "react-toastify";
import {
  GoogleLoginButton,
  FacebookLoginButton,
  RunnerButton,
} from "./components";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { authActionTypes, getCurrentUser } from "./Redux/AuthActions";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import BusinessCenterOutlinedIcon from "@material-ui/icons/BusinessCenterOutlined";
// import {
//   loadCaptchaEnginge,
//   LoadCanvasTemplateNoReload,
//   validateCaptcha,
// } from "react-simple-captcha";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import Loader from "../../Element/Loader";

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter valid email.")
    .required("Email is required"),
  password1: Yup.string()
    .required("Password is required")
    .min(9, "Password is too short - should be 9 chars minimum"),
  password2: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password1"), null], "Passwords must match"),
  phone_number: Yup.string()
    .required("Phone is required")
    .min(11, "Phone is too short - should be 11 chars minimum"),
  is_a_runner: Yup.boolean(),
});

const initialValues = {
  email: "",
  password1: "",
  password2: "",
  phone_number: "",
  is_a_runner: false,
};

function RegisterPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState("");

  // const checkCaptcha = () => {
  //   const isValid = validateCaptcha(value);
  //   return isValid;
  // };

  // useEffect(() => {
  //   loadCaptchaEnginge(6, "black", "white");
  // }, []);

  const register = (loginDetails) => {
    setLoading(true);
    createRequest()
      .post("/dj-rest-auth/registration/", {
        ...loginDetails,
      })
      .then((res) => {
        Cookies.set("refresh_token", res?.data?.refresh_token, { expires: 1 });
        const inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);

        Cookies.set("access_token", res?.data?.access_token, {
          expires: inFiveMinutes,
        });
        dispatch({
          type: authActionTypes.LOGIN_SUCCESS,
          user: res?.data?.user,
          accessToken: res?.data?.access_token,
        });
        dispatch(getCurrentUser());
        history.push("/");
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        setValue("");
        if (e.response.data.email) {
          return toast.error(e.response.data.email[0]);
        } else if (e.response.data.password1) {
          let message =
            e.response.data.password1[0] +
            " " +
            e.response.data.password1.length >
            1 && e.response.data.password1[1];
          if (e.response.data.password1.length > 1) {
            message =
              e.response.data.password1[0] +
              " and " +
              e.response.data.password1[1];
          } else {
            message = e.response.data.password1[0];
          }
          console.log(message);
          return toast.error(message);
        } else if (e.response.data.phone_number) {
          return toast.error(e.response.data.phone_number[0]);
        } else if (e.response.data.is_a_runner) {
          return toast.error(e.response.data.is_a_runner[0]);
        } else if (e.response?.status === 400) {
          toast.error(e?.response?.data?.non_field_errors[0]);
        } else {
          return toast.error("Something went wrong");
        }
      });
  };

  const handleSumbit = (values) => {
    // if (checkCaptcha()) {
    if (values) {
      register(values);
    } else if (!value) {
      toast.error("Please enter captcha to verify");
    } else if (value.length < 6) {
      toast.error("Make sure Captcha is 6 characters long");
    } else {
      toast.error("Please enter correct captcha");
      setValue("");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='page-content bg-gray login-form-bx browse-job login-style2'>
          <div className='section-full'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-lg-6 col-md-7 box-skew signup d-flex'>
                  <div
                    className='login-2 p-a30 seth d-flex align-self-center m-auto wow fadeInRight'
                    data-wow-delay='0.8s'
                  >
                    <div className='tab-content nav'>
                      <Formik
                        id='login'
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={SignUpSchema}
                        onSubmit={(values) => {
                          handleSumbit(values);
                        }}
                      >
                        {(formik) => {
                          const { errors, touched, isValid, dirty } = formik;
                          return (
                            <div
                              className='tab-pane active col-12 p-a0 '
                              style={{ width: "310px" }}
                            >
                              <p className='font-weight-bold text-center text-dark h4'>
                                Let's create your account!
                              </p>
                              <p className='font-weight-600 text-center'>
                                Already have an account?
                                <Link to='login' className='text-primary'>
                                  {" "}
                                  Sign In
                                </Link>
                              </p>
                              <Form>
                                <div
                                  style={{ marginBottom: 15 }}
                                  className='form-group d-flex justify-content-between'
                                >
                                  <RunnerButton
                                    startIcon={<AccountCircleOutlinedIcon />}
                                    onClick={() =>
                                      formik.setFieldValue("is_a_runner", false)
                                    }
                                    variant={
                                      !formik.values.is_a_runner
                                        ? "contained"
                                        : "outlined"
                                    }
                                  >
                                    Employer
                                  </RunnerButton>
                                  <RunnerButton
                                    startIcon={<BusinessCenterOutlinedIcon />}
                                    onClick={() =>
                                      formik.setFieldValue("is_a_runner", true)
                                    }
                                    variant={
                                      formik.values.is_a_runner
                                        ? "contained"
                                        : "outlined"
                                    }
                                  >
                                    Freelancer
                                  </RunnerButton>
                                </div>
                                <div
                                  style={{ marginBottom: 15 }}
                                  className='form-group'
                                >
                                  <label
                                    style={{ fontSize: 13, marginBottom: 5 }}
                                  >
                                    E-Mail Address*
                                  </label>
                                  <div className='input-group'>
                                    <Field
                                      name='email'
                                      type='email'
                                      value={formik.values.email}
                                      className={
                                        errors.email && touched.email
                                          ? "input-error form-control border-danger "
                                          : "form-control"
                                      }
                                      placeholder='Email'
                                    />
                                  </div>
                                  <ErrorMessage
                                    name='email'
                                    component='div'
                                    className='error text-danger'
                                  />
                                </div>
                                <div
                                  style={{ marginBottom: 15 }}
                                  className='form-group'
                                >
                                  <label
                                    style={{ fontSize: 13, marginBottom: 5 }}
                                  >
                                    Password *
                                  </label>
                                  <div className='input-group'>
                                    <Field
                                      type='password'
                                      name='password1'
                                      placeholder='password'
                                      id='password'
                                      className={
                                        errors.password && touched.password
                                          ? "input-error form-control border-danger"
                                          : "form-control"
                                      }
                                    />
                                  </div>
                                  <ErrorMessage
                                    name='password1'
                                    component='span'
                                    className='error text-danger'
                                  />
                                </div>
                                <div
                                  style={{ marginBottom: 15 }}
                                  className='form-group'
                                >
                                  <label
                                    style={{ fontSize: 13, marginBottom: 5 }}
                                  >
                                    Confirm Password *
                                  </label>
                                  <div className='input-group'>
                                    <Field
                                      type='password'
                                      name='password2'
                                      placeholder='password'
                                      id='password'
                                      className={
                                        errors.password && touched.password
                                          ? "input-error form-control border-danger"
                                          : "form-control"
                                      }
                                    />
                                  </div>
                                  <ErrorMessage
                                    name='password2'
                                    component='span'
                                    className='error text-danger'
                                  />
                                </div>
                                <div
                                  style={{ marginBottom: 15 }}
                                  className='form-group'
                                >
                                  <label
                                    style={{ fontSize: 13, marginBottom: 5 }}
                                  >
                                    Phone Number *
                                  </label>
                                  <div className='input-group'>
                                    <Field
                                      name='phone_number'
                                      type='number'
                                      placeholder='Phone Number'
                                      className={
                                        errors.password && touched.password
                                          ? "input-error form-control border-danger"
                                          : "form-control"
                                      }
                                    />
                                  </div>
                                  <ErrorMessage
                                    name='phone_number'
                                    component='span'
                                    className='error text-danger'
                                  />
                                </div>
                                {/* <div className='form-group'>
                                  <label>Verify *</label>
                                  <LoadCanvasTemplateNoReload />
                                  <div className='input-group mb-4'>
                                    <input
                                      name='text'
                                      onChange={(e) => setValue(e.target.value)}
                                      maxLength='6'
                                      value={value}
                                      type='text'
                                      placeholder='Enter above text'
                                      className='form-control'
                                    />
                                  </div>
                                </div> */}

                                <div className='text-left'>
                                  <Button
                                    fullWidth
                                    variant={"contained"}
                                    color={"primary"}
                                    type={"submit"}
                                    className={
                                      !(dirty && isValid)
                                        ? "disabled-btn"
                                        : "site-button"
                                    }
                                    disabled={!(dirty && isValid)}
                                  >
                                    Create Account
                                  </Button>
                                </div>
                              </Form>
                              {/* <div className={"separator"}>
                                <span>or</span>
                              </div>
                              <div className='text-left'>
                                <Link to='login' className='text-primary'>


                                  <Button
                                    fullWidth
                                    variant={"contained"}
                                    color={"primary"}
                                    type={"submit"}
                                    className={
                                      !(dirty && isValid)
                                        ? "disabled-btn"
                                        : "site-button"
                                    }
                                    disabled={!(dirty && isValid)}
                                  >
                                    Use secure code
                                  </Button>
                                </Link>
                              </div> */}
                              {/* <div className={"separator"}>
                                <span>or</span>
                              </div>
                              <FacebookLoginButton
                                startIcon={<i className='fa fa-facebook'></i>}
                                fullWidth
                              >
                                Login via Faceboook
                              </FacebookLoginButton>
                              <GoogleLoginButton
                                className={"mt-3"}
                                startIcon={
                                  <i className='fa fa-google-plus'></i>
                                }
                                fullWidth
                              >
                                Login via Google+
                              </GoogleLoginButton> */}
                            </div>
                          );
                        }}
                      </Formik>
                      <form
                        id='forgot-password'
                        className='tab-pane fade col-12 p-a0'
                      >
                        <p>
                          We will send you an email to reset your password.{" "}
                        </p>
                        <div className='form-group'>
                          <label>E-Mail address *</label>
                          <div className='input-group'>
                            <input
                              name='dzName'
                              required=''
                              className='form-control'
                              placeholder='Your Email Address'
                              type='email'
                            />
                          </div>
                        </div>
                        <div className='text-left'>
                          <Link
                            className='site-button outline gray'
                            data-toggle='tab'
                            to='#login'
                          >
                            Back
                          </Link>
                          <button className='site-button pull-right'>
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className='col-lg-6 col-md-5 d-flex box-skew1 skew-signup'>
                  <div className='text-white max-w400 align-self-center '>
                    <div className='logo'>
                      <Link to={"./"}>
                        <img src='assets/logo.png' alt='' />
                      </Link>
                    </div>
                    <h2 className='m-b10'>Login To You Now</h2>
                    <p className='m-b30'>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry has been the industry.
                    </p>
                    <ul className='list-inline m-a0'>
                      <li>
                        <Link to={""} className='m-r10 text-white'>
                          <i className='fa fa-facebook'></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={""} className='m-r10 text-white'>
                          <i className='fa fa-google-plus'></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={""} className='m-r10 text-white'>
                          <i className='fa fa-linkedin'></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={""} className='m-r10 text-white'>
                          <i className='fa fa-instagram'></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={""} className='m-r10 text-white'>
                          <i className='fa fa-twitter'></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className='login-footer'>
            <div className='container'>
              <div className='row'>
                <div className='col-lg-12 text-center'>
                  {/* <span className='float-left text-black-light'>
                    {" "}
                    © Copyright by{" "}
                    <i className='fa fa-heart m-lr5 text-red heart'></i>
                    <Link to={"#"} className='text-primary'>
                      DexignZone{" "}
                    </Link>
                  </span> */}
                  <span className='float-right'>All rights reserved.</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

export default RegisterPage;
