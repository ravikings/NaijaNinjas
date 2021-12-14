import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useUser} from "../../Context/AuthContext";
import createRequest from "../../../utils/axios";
import {toast} from "react-toastify";
import {useFormik} from "formik";
import {GoogleLoginButton,FacebookLoginButton} from './components';
import Button from "@material-ui/core/Button";

function LoginPage(){
	const userDetails = useUser();
	const history = useHistory();

	const login = (loginDetails) => {
		createRequest().post('/dj-rest-auth/login/', loginDetails)
			.then((res) => {
				console.log(res)
				localStorage.setItem('userID',res?.data?.user?.pk)
				userDetails.signIn(res?.data?.user);
				history.push("/")
			})
			.catch((e) => {
				if(e.response?.status===400){
					toast.error(e?.response?.data?.non_field_errors[0]);
				}else{
					toast.error("Unknown Error");
				}
			});
	};

	const formik = useFormik({
		initialValues: { email: '', password: '' },
		enableReinitialize: true,
		onSubmit: (values, { resetForm }) => {
			login(values);
			console.log(values)
		},
	});

	return(
		<div className="page-content bg-gray login-form-bx browse-job login-style2">
			<div className="section-full">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-6 col-md-7 box-skew d-flex">
							<div className="login-2 p-a30 seth d-flex align-self-center m-auto wow fadeInRight" data-wow-delay="0.8s" >
								<div className="tab-content nav">
									<form onSubmit={formik.handleSubmit} id="login" className="tab-pane active col-12 p-a0 " style={{width:'310px'}}>
										<p className="font-weight-bold text-center text-dark h4">We're glad to see you again!</p>
										<p className="font-weight-600 text-center">
											Don't have an account?
											<Link to="register" className="text-primary"> Sign Up</Link>
										</p>
										<div className="form-group">
											<label>E-Mail Address*</label>
											<div className="input-group">
												<input name='email'
													   onChange={formik.handleChange}
													   value={formik.values.email}
													   className="form-control"
													   placeholder="email" />
											</div>
										</div>
										<div className="form-group">
											<label>Password *</label>
											<div className="input-group">
												<input  name='password'
														onChange={formik.handleChange}
														value={formik.values.password}
														type='password'
														className="form-control"
														placeholder="password" />
											</div>
										</div>
										<div className="text-left">
											<Button fullWidth variant={'contained'} color={'primary'} type={"submit"} className="site-button">
												login
											</Button>
										</div>
										<div className={"separator"}>
											<span>or</span>
										</div>
										<FacebookLoginButton startIcon={<i className="fa fa-facebook"></i>} fullWidth>Login via Faceboook</FacebookLoginButton>
										<GoogleLoginButton className={'mt-3'} startIcon={<i className="fa fa-google-plus"></i>} fullWidth>Login via Google+</GoogleLoginButton>
									</form>
									<form id="forgot-password" className="tab-pane fade col-12 p-a0">
										<p>We will send you an email to reset your password. </p>
										<div className="form-group">
											<label>E-Mail address *</label>
											<div className="input-group">
												<input name="dzName" required="" className="form-control" placeholder="Your Email Address" type="email" />
											</div>
										</div>
										<div className="text-left"> 
											<Link className="site-button outline gray" data-toggle="tab" to="#login">Back</Link>
											<button className="site-button pull-right">Submit</button>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div className="col-lg-6 col-md-5 d-flex box-skew1">
							<div className="text-white max-w400 align-self-center">
								<div className="logo">
									<Link to={"./"}><img src={require("../../../images/logo-white2.png")} alt="" /></Link>
								</div>
								<h2 className="m-b10">Login To You Now</h2>
								<p className="m-b30">Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry.</p>
								<ul className="list-inline m-a0">
									<li><Link to={''} className="m-r10 text-white"><i className="fa fa-facebook"></i></Link></li>
									<li><Link to={''} className="m-r10 text-white"><i className="fa fa-google-plus"></i></Link></li>
									<li><Link to={''} className="m-r10 text-white"><i className="fa fa-linkedin"></i></Link></li>
									<li><Link to={''} className="m-r10 text-white"><i className="fa fa-instagram"></i></Link></li>
									<li><Link to={''} className="m-r10 text-white"><i className="fa fa-twitter"></i></Link></li>
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
							<span className="float-left text-black-light"> © Copyright by <i className="fa fa-heart m-lr5 text-red heart"></i>
							<Link to={"#"} className="text-primary">DexignZone </Link></span>
							<span className="float-right">All rights reserved.</span>
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}
export default LoginPage;