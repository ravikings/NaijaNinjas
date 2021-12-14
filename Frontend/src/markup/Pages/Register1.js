import React, {useEffect} from 'react';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import PageTitle from './../Layout/PageTitle';
import {useUser} from "../Context/AuthContext";
import {useHistory} from "react-router-dom";
import createRequest from "../../utils/axios";
import {toast} from "react-toastify";
import {useFormik} from "formik";
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";


var bnr = require('./../../images/banner/bnr2.jpg');

function Register1(){

	const userDetails = useUser();
	const history = useHistory();

	useEffect(()=>{
		if(userDetails.isAuthenticated){
			history.push('/')
		}
	},[userDetails])

	const register = (loginDetails) => {
		createRequest().post('/dj-rest-auth/registration/', {...loginDetails,password2:loginDetails.password1})
			.then((res) => {
				userDetails.signIn(res?.data?.user);
				//history.push('/')
			})
			.catch((e) => {
				if(e.response?.status===400){
					toast.error("Unknown Error");
				}else{
					toast.error("Unknown Error");
				}
			});
	};

	const formik = useFormik({
		initialValues: { email: '', password1: '',password2: '',phone_number: '',is_a_runner: "1" },
		enableReinitialize: true,
		onSubmit: (values, { resetForm }) => {
			const loginDetails = {...values,password2:values.password1}
			loginDetails.is_a_runner=values.is_a_runner==="1"?false:true
			register(loginDetails);
			console.log(loginDetails)
		},
	});

	return(
		<>
			<Header />
			<div className="page-content">
				<div className="dez-bnr-inr overlay-black-middle bg-pt" style={{backgroundImage: `url(${bnr})`}}>
					<PageTitle motherName="Home" activeName="Register" />
				</div>
				<div className="section-full content-inner browse-job shop-account">
					<div className="container">
						<div className="row">
							<div className="col-md-12 m-b30">
								<div className="p-a30 job-bx max-w500 radius-sm bg-white m-auto">
									<div className="tab-content">
										<form onSubmit={formik.handleSubmit} id="login" className="tab-pane active">
											<h4 className="font-weight-700 m-b5">PERSONAL INFORMATION</h4>
											<p className="font-weight-600">If you have an account with us, please log in.</p>
											<div className="form-group">
												<label className="font-weight-700">E-MAIL *</label>
												<input onChange={formik.handleChange} value={formik.values.email} name="email" required="" className="form-control" placeholder="Your Email Address" type="email" />
											</div>
											<div className="form-group">
												<label className="font-weight-700">Password *</label>
												<input onChange={formik.handleChange} value={formik.values.password1} name="password1" required="" className="form-control " placeholder="Type Password" type="password" />
											</div>
											<div className="form-group">
												<label className="font-weight-700">Phone Number *</label>
												<input onChange={formik.handleChange} value={formik.values.phone_number} name="phone_number" required="" className="form-control " placeholder="Phone Number" type="text" />
											</div>
											<div className="form-group">
												<RadioGroup aria-label="gender" name="is_a_runner" value={formik.values.is_a_runner} onChange={(event,value)=> {
													formik.setFieldValue('is_a_runner', value)
												}}>
													<FormControlLabel value={"1"} control={<Radio />} label="not a_runner" />
													<FormControlLabel  value={"2"} control={<Radio />} label="is_a_runner" />
												</RadioGroup>
											</div>
											<div className="text-left">
												<button type={"submit"} className="site-button button-lg outline outline-2">CREATE</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>	
			<Footer />
		</>
	)
}
export default Register1;