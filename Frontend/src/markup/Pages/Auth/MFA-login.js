import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link, useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import createRequest from "../../../utils/axios";
import { toast } from "react-toastify";
import { authActionTypes } from "./Redux/AuthActions";
import { useDispatch } from "react-redux";
// import {
//   loadCaptchaEnginge,
//   LoadCanvasTemplate,
//   LoadCanvasTemplateNoReload,
//   validateCaptcha,
// } from "react-simple-captcha";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ForgotPassSchema = Yup.object().shape({
  code: Yup.number()
    .required("Plase enter your six(6) digit code")
    .positive()

});

const initialValues = {
  code: "",
};

function MfaLogin() {

  const History = useHistory();
  const location = useLocation();
  const [useValue, setValue] = useState("");
  const dispatch = useDispatch();


  const verifyEmailToken = (values) => {
    createRequest().post(
      "/auth/token/",
      { token: values.code, email: location.state.email }
    ).then((res) => {
      console.log(res.data)
      localStorage.setItem("access_token", res?.data?.token);
      localStorage.setItem("mfa", true);
      toast.success("Code validated succesfully!");
      dispatch({
        type: authActionTypes.LOGIN_SUCCESS,
      });
      History.push("/");
    }
    ).catch((e) => {
      console(e);
      toast.error("The token you entered isn't valid or expired.")
    });
  };

  const handleSubmit = (values) => {
    // setValue(values);
    console.log("value is set o")
    getAccesToken(values);
  };

  const getAccesToken = (values) => {

    if (values) {
      console.log("printing email");
      console.log(location.state.email)
      verifyEmailToken(values);
    } else {
      toast.error("Please enter correct token");
    }
  }

  return (
    <div className='page-content bg-gray login-form-bx browse-job login-style2'>
      <div className='section-full'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-6 col-md-7 box-skew d-flex'>
              <div
                className='login-2 p-a30 seth d-flex align-self-center m-auto wow fadeInRight'
                data-wow-delay='0.8s'
              >
                <div className='tab-content nav'>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={ForgotPassSchema}
                    onSubmit={(values) => {
                      handleSubmit(values);
                    }}
                    id='login'
                  >
                    {(formik) => {
                      const { errors, touched, isValid, dirty } = formik;
                      return (
                        <div
                          className='tab-pane active col-12 p-a0 '
                          style={{ width: "310px" }}
                        >
                          <Form>
                            <p className='font-weight-bold text-center text-dark h4'>
                              Let's get you signed in
                            </p>
                            <p className='font-weight-600 text-center'>
                              Code sent!, we use this easy sign-in so you dont have to type long password.
                            </p>
                            <div className='form-group'>
                              <label>Enter Code</label>
                              <div className='input-group'>
                                <Field
                                  name='code'
                                  type='number'
                                  className={
                                    errors.code && touched.code
                                      ? "input-error form-control border-danger "
                                      : "form-control"
                                  }
                                  placeholder='Plase enter your six(6) digit code'
                                />
                              </div>
                              <ErrorMessage
                                name='code'
                                component='div'
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
                                Sign in
                              </Button>
                            </div>
                          </Form>
                        </div>
                      );
                    }}
                  </Formik>
                  <form
                    id='forgot-password'
                    className='tab-pane fade col-12 p-a0'
                  >
                    <p>We will send you an email to reset your password. </p>
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
                      <button className='site-button pull-right'>Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='col-lg-6 col-md-5 d-flex box-skew1'>
              <div className='text-white max-w400 align-self-center'>
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
              <span className='float-left text-black-light'>
                {" "}
                © Copyright by{" "}
                <i className='fa fa-heart m-lr5 text-red heart'></i>
                <Link to={"#"} className='text-primary'>
                  NaijaNinjas
                </Link>
              </span>
              <span className='float-right'>All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MfaLogin;
