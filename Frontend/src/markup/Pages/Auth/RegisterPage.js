import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useUser} from "../../Context/AuthContext";
import createRequest from "../../../utils/axios";
import {toast} from "react-toastify";
import {useFormik} from "formik";
import {GoogleLoginButton, FacebookLoginButton, RunnerButton} from './components';
import Button from "@material-ui/core/Button";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import BusinessCenterOutlinedIcon from '@material-ui/icons/BusinessCenterOutlined';

function RegisterPage() {
    const userDetails = useUser();
    const history = useHistory();

    const register = (loginDetails) => {
        createRequest().post('/dj-rest-auth/registration/', {...loginDetails, password2: loginDetails.password1})
            .then((res) => {
                userDetails.signIn(res?.data?.user);
                history.push('/')
            })
            .catch((e) => {
                if (e.response?.status === 400) {
                    toast.error("Unknown Error");
                } else {
                    toast.error("Unknown Error");
                }
            });
    };

    const formik = useFormik({
        initialValues: {email: '', password1: '', is_a_runner: false},
        enableReinitialize: true,
        onSubmit: (values, {resetForm}) => {
            register(values);
        },
    });

    return (
        <div className="page-content bg-gray login-form-bx browse-job login-style2">
            <div className="section-full">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-md-7 box-skew d-flex">
                            <div className="login-2 p-a30 seth d-flex align-self-center m-auto wow fadeInRight"
                                 data-wow-delay="0.8s">
                                <div className="tab-content nav">
                                    <form onSubmit={formik.handleSubmit} id="login"
                                          className="tab-pane active col-12 p-a0 " style={{width: '310px'}}>
                                        <p className="font-weight-bold text-center text-dark h4">Let's create your
                                            account!</p>
                                        <p className="font-weight-600 text-center">
                                            Already have an account?
                                            <Link to="login" className="text-primary"> Sign In</Link>
                                        </p>
                                        <div style={{marginBottom: 15}}
                                             className="form-group d-flex justify-content-between">
                                            <RunnerButton
                                                startIcon={<AccountCircleOutlinedIcon/>}
                                                onClick={() => formik.setFieldValue('is_a_runner', false)}
                                                variant={!formik.values.is_a_runner ? 'contained' : 'outlined'}
                                            >
                                                Employer
                                            </RunnerButton>
                                            <RunnerButton
                                                startIcon={<BusinessCenterOutlinedIcon/>}
                                                onClick={() => formik.setFieldValue('is_a_runner', true)}
                                                variant={formik.values.is_a_runner ? 'contained' : 'outlined'}
                                            >
                                                Freelancer
                                            </RunnerButton>
                                        </div>
                                        <div style={{marginBottom: 15}} className="form-group">
                                            <label style={{fontSize: 13, marginBottom: 5}}>E-Mail Address*</label>
                                            <div className="input-group">
                                                <input name='email'
                                                       onChange={formik.handleChange}
                                                       value={formik.values.email}
                                                       className="form-control"
                                                       placeholder="email"/>
                                            </div>
                                        </div>
                                        <div style={{marginBottom: 15}} className="form-group">
                                            <label style={{fontSize: 13, marginBottom: 5}}>Password *</label>
                                            <div className="input-group">
                                                <input name='password1'
                                                       onChange={formik.handleChange}
                                                       value={formik.values.password1}
                                                       type='password'
                                                       className="form-control"
                                                       placeholder="password"/>
                                            </div>
                                        </div>
                                        <div style={{marginBottom: 15}} className="form-group">
                                            <label style={{fontSize: 13, marginBottom: 5}}>Phone Number *</label>
                                            <div className="input-group">
                                                <input
                                                    onChange={formik.handleChange}
                                                    value={formik.values.phone_number}
                                                    name="phone_number"
                                                    type='text'
                                                    className="form-control"
                                                    placeholder="Phone Number"/>
                                            </div>
                                        </div>
                                        <div className="text-left">
                                            <Button fullWidth variant={'contained'} color={'primary'} type={"submit"}
                                                    className="site-button">Create Account</Button>
                                        </div>
                                        <div className={"separator"}>
                                            <span>or</span>
                                        </div>
                                        <FacebookLoginButton startIcon={<i className="fa fa-facebook"></i>} fullWidth>Login
                                            via Faceboook</FacebookLoginButton>
                                        <GoogleLoginButton className={'mt-3'}
                                                           startIcon={<i className="fa fa-google-plus"></i>} fullWidth>Login
                                            via Google+</GoogleLoginButton>

                                    </form>
                                    <form id="forgot-password" className="tab-pane fade col-12 p-a0">
                                        <p>We will send you an email to reset your password. </p>
                                        <div className="form-group">
                                            <label>E-Mail address *</label>
                                            <div className="input-group">
                                                <input name="dzName" required="" className="form-control"
                                                       placeholder="Your Email Address" type="email"/>
                                            </div>
                                        </div>
                                        <div className="text-left">
                                            <Link className="site-button outline gray" data-toggle="tab"
                                                  to="#login">Back</Link>
                                            <button className="site-button pull-right">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-5 d-flex box-skew1">
                            <div className="text-white max-w400 align-self-center">
                                <div className="logo">
                                    <Link to={"./"}><img src='assets/logo.png'
                                                         alt=""/></Link>
                                </div>
                                <h2 className="m-b10">Login To You Now</h2>
                                <p className="m-b30">Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry has been the industry.</p>
                                <ul className="list-inline m-a0">
                                    <li><Link to={''} className="m-r10 text-white"><i
                                        className="fa fa-facebook"></i></Link></li>
                                    <li><Link to={''} className="m-r10 text-white"><i className="fa fa-google-plus"></i></Link>
                                    </li>
                                    <li><Link to={''} className="m-r10 text-white"><i
                                        className="fa fa-linkedin"></i></Link></li>
                                    <li><Link to={''} className="m-r10 text-white"><i
                                        className="fa fa-instagram"></i></Link></li>
                                    <li><Link to={''} className="m-r10 text-white"><i
                                        className="fa fa-twitter"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <footer className="login-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
							<span className="float-left text-black-light"> © Copyright by <i
                                className="fa fa-heart m-lr5 text-red heart"></i>
							<Link to={"#"} className="text-primary">DexignZone </Link></span>
                            <span className="float-right">All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default RegisterPage;