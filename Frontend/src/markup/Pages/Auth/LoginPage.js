import { Link, useHistory, useLocation } from "react-router-dom";
import { authActionTypes } from "./Redux/AuthActions";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import createRequest from "../../../utils/axios";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GoogleLoginButton, FacebookLoginButton } from "./components";
import Button from "@material-ui/core/Button";
// import {
//   loadCaptchaEnginge,
//   LoadCanvasTemplateNoReload,
//   validateCaptcha,
// } from "react-simple-captcha";
import Cookies from "js-cookie";
import axios from "axios"


const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter valid email.")
    .required("Email is required"),

  password: Yup.string().required("Password is required"),
  // .min(4, "Password is too short - should be 4 chars minimum"),
});

const MfaSignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter valid email.")
    .required("Email is required"),
});

const initialValues = {
  email: "",
  password: "",
  client: "frontend"
};

function LoginPage() {
  //const userDetails = useUser();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [value, setValue] = useState("");
  const [mfaSchema, setmfaSchema] = useState(false);
  const [mainLoginButton, setmainLoginButton] = useState(false);
  const [mfaemail, setMfaemail] = useState("");
  const [emailverify, setemailverify] = useState(false);

  // const checkCaptcha = () => {
  //   const isValid = validateCaptcha(value);
  //   return isValid;
  // };

  // useEffect(() => {
  //   loadCaptchaEnginge(6, "black", "white");
  // }, []);

  const login = (loginDetails) => {
    createRequest()
      .post("/api/auth/v1.0/login/", loginDetails)
      .then((res) => {
        //    returnconsole.log("the res is "+res)
        localStorage.setItem("userID", res?.data?.user?.pk);
        localStorage.setItem("access_token", res?.data?.token);
        localStorage.setItem("userData", JSON.stringify(res?.data?.user))
        localStorage.setItem("checker", res?.data?.user?.is_a_runner)
        toast.success("You're login successfully!")
        //Cookies.set("checker", res?.data?.user?.is_a_runner, {expires: 10});
        const inFiveMinutes = new Date(new Date().getTime() + 60 * 60 * 60 * 1000);
        Cookies.set("access_token", res?.data?.token, {
          expires: inFiveMinutes,
        });
        dispatch({
          type: authActionTypes.LOGIN_SUCCESS,
          user: res?.data?.user,
          accessToken: res?.data?.token,
        });
        const redirectURL = new URLSearchParams(location.search).get(
          "redirect"
        );
        if (res?.data?.user?.pk) {
          createRequest().post(
            `/api/v1/user-status/${res?.data?.user?.pk}/login/`
          );
        }
        if (redirectURL) {
          history.push(redirectURL);
        } else {
          history.push("/");
        }
      })
      .catch((e) => {
        if (e.response?.status === 400) {
          toast.error(e?.response?.data?.non_field_errors[0]);
          //loadCaptchaEnginge(6, "white", "#2e55fa");
          setValue("");
        } else {
          toast.error("Login failed!")
          toast.error(e?.response?.data);
        }
      });
  };

  const handleSubmit = (values) => {
    // if (checkCaptcha()) {
    if (values) {
      values.username = values.email;
      delete values.email;
      login(values);
    } else if (!value) {
      toast.error("Please enter captcha to verify");
    } else if (value.length < 6) {
      toast.error("Make sure Captcha is 6 characters long");
    } else {
      toast.error("Please enter correct captcha");
      setValue("");
    }
  };

  const handleMfa = (event) => {
    console.log("here is mfa")
    setmfaSchema(true);
    setmainLoginButton(true);
    setMfaemail(event.target.value)
  }

  const sendToken = () => {
    createRequest().post("/auth/email/", { email: mfaemail })
      .then((res) => {
        toast.success("Secure token sent!");
        history.push({
          pathname: "/mfa-login",
          state: { email: mfaemail }
        });
      })
      .catch((e) => {
        if (e.response?.status === 400) {
          toast.info("Please singup to continue.");
          setValue("");
        } else {
          toast.error("service not available.")
        }
      });
  };


  const handlemfaCreate = () => {
    console.log("handle is request code is called");

    const validate = () => MfaSignInSchema.validate(
      { email: mfaemail },
      { strict: true },
    )
    try {
      validate();
      //setemailverify(true);
      sendToken();
    } catch (error) {
      toast.error("Please enter valid email.");
      //setmainLoginButton(false);
      //setemailverify(false);
    };
  };


  return (
    <div className="page-content bg-gray login-form-bx browse-job login-style2">
      <div className="section-full">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-7 box-skew d-flex">
              <div
                className="login-2 p-a30 seth d-flex align-self-center m-auto wow fadeInRight"
                data-wow-delay="0.8s"
              >
                <div className="tab-content nav">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={SignInSchema}
                    onSubmit={(values) => {
                      handleSubmit(values);
                    }}
                  >
                    {(formik) => {
                      const { errors, touched, isValid, dirty } = formik;
                      return (
                        <div
                          className="tab-pane active col-12 p-a0 "
                          style={{ width: "310px" }}
                          id="login"
                        >
                          <p className="font-weight-bold text-center text-dark h4">
                            We're glad to see you again!
                          </p>
                          <p className="font-weight-600 text-center">
                            Don't have an account?
                            <Link to="register" className="text-primary">
                              {" "}
                              Sign Up
                            </Link>
                          </p>
                          <Form>
                            <div className="form-group">
                              <label>E-Mail Address*</label>
                              <div className="input-group">
                                <Field
                                  type="email"
                                  name="email"
                                  id="email"
                                  className={
                                    errors.email && touched.email
                                      ? "input-error form-control border-danger "
                                      : "form-control"
                                  }
                                />
                              </div>
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="error text-danger"
                              />
                            </div>
                            <div className="form-group">
                              <label>Password *</label>
                              <div className="input-group">
                                <Field
                                  type="password"
                                  name="password"
                                  id="password"
                                  className={
                                    errors.password && touched.password
                                      ? "input-error form-control border-danger"
                                      : "form-control"
                                  }
                                />
                              </div>
                              <ErrorMessage
                                name="password"
                                component="span"
                                className="error text-danger"
                              />
                            </div>
                            <div className="form-group">
                              {/* <label>Verify *</label> */}
                              {/* <LoadCanvasTemplateNoReload /> */}
                              {/* <div className="input-group mb-4">
                                <input
                                  name="text"
                                  onChange={(e) => setValue(e.target.value)}
                                  maxLength="6"
                                  value={value}
                                  type="text"
                                  placeholder="Enter above text"
                                  className="form-control"
                                />
                              </div> */}
                            </div>
                            <div className="text-left">
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
                              // className='site-button'
                              >
                                login
                              </Button>
                            </div>
                          </Form>
                          <div className={"separator"}>
                            <span>Or, use your email</span>
                          </div>
                          <div className="form-group">
                            <div className="input-group">
                              <input
                                type="email"
                                name="mfaemail"
                                id="mfaemail"
                                value={mfaemail}
                                className={
                                  errors.email && touched.email
                                    ? "input-error form-control border-danger "
                                    : "form-control"
                                }
                                onChange={(event) => handleMfa(event)}
                              />
                            </div>
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="error text-danger"
                            />
                          </div>
                          <Button
                            fullWidth
                            variant={"contained"}
                            color={"primary"}
                            //type={"submit"}
                            className={
                              !mainLoginButton
                                ? "disabled-btn"
                                : "site-button"
                            }
                            disabled={!mainLoginButton}
                            onClick={() => handlemfaCreate()}
                          // className='site-button'
                          >
                            Send secure Code
                          </Button>
                          <div className="text-center">
                            <Link
                              data-toggle="tab"
                              to="/forgot-password"
                              className="site-button-link forget-pass m-t15"
                            >
                              <i className="fa fa-unlock-alt"></i> Forgot
                              Password
                            </Link>
                          </div>
                          {/* <FacebookLoginButton
                            startIcon={<i className="fa fa-envelope"></i>}
                            fullWidth
                            onClick={console.log("i was clicked")}
                          >
                            Send secure Token
                          </FacebookLoginButton> */}

                          {/* <GoogleLoginButton
                            className={"mt-3"}
                            startIcon={<i className="fa fa-google-plus"></i>}
                            fullWidth
                          >
                            Login via Google+
                          </GoogleLoginButton> */}
                        </div>
                      );
                    }}
                  </Formik>
                  <form
                    id="forgot-password"
                    className="tab-pane fade col-12 p-a0"
                  >
                    <p>We will send you an email to reset your password. </p>
                    <div className="form-group">
                      <label>E-Mail address *</label>
                      <div className="input-group">
                        <input
                          name="dzName"
                          required=""
                          className="form-control"
                          placeholder="Your Email Address"
                          type="email"
                        />
                      </div>
                    </div>
                    <div className="text-left">
                      <Link
                        className="site-button outline gray"
                        data-toggle="tab"
                        to="#login"
                      >
                        Back
                      </Link>
                      <button className="site-button pull-right">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-5 d-flex box-skew1">
              <div className="text-white max-w400 align-self-center">
                <div className="logo">
                  <Link to={"./"}>
                    <img src="assets/logo.png" alt="" />
                  </Link>
                </div>
                <h2 className="m-b10">Login To You Now</h2>
                <p className="m-b30">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry has been the industry.
                </p>
                <ul className="list-inline m-a0">
                  <li>
                    <Link to={""} className="m-r10 text-white">
                      <i className="fa fa-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to={""} className="m-r10 text-white">
                      <i className="fa fa-google-plus"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to={""} className="m-r10 text-white">
                      <i className="fa fa-linkedin"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to={""} className="m-r10 text-white">
                      <i className="fa fa-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to={""} className="m-r10 text-white">
                      <i className="fa fa-twitter"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="login-footer">
        {/* <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <span className="float-left text-black-light">
                {" "}
                © Copyright by{" "}
                <i className="fa fa-heart m-lr5 text-red heart"></i>
                <Link to={"#"} className="text-primary">
                  NaijaNinjas
                </Link>
              </span>
              <span className="float-right">All rights reserved.</span>
            </div>
          </div>
        </div> */}
      </footer>
    </div>
  );
}

export default LoginPage;
