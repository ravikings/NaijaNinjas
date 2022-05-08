import React from 'react';
import {Modal} from "react-bootstrap";
import bnr3 from "./../../images/background/bg3.jpg";
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import {useHistory} from 'react-router-dom';
import {useDispatch} from "react-redux";

function LoginDialog({showLoginDialog,handleClose}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const login = (loginDetails) => {
        dispatch(login(history,loginDetails));
    };

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        enableReinitialize: true,
        onSubmit: (values, { resetForm }) => {
            login(values);
            console.log(values)
        },
    });

    return (
        <Modal className=" lead-form-modal" show={showLoginDialog} onHide={handleClose} centered>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <button type="button" className="close" onClick={handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="modal-body row m-a0 clearfix">
                        <div className="col-lg-6 col-md-6 overlay-primary-dark d-flex p-a0" style={{
                            backgroundImage: "url(" + bnr3 + ")",
                            backgroundPosition: "center",
                            backgroundSize: "cover"
                        }}>
                            <div className="form-info text-white align-self-center">
                                <h3 className="m-b15">Login To You Now</h3>
                                <p className="m-b15">Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry has been the industry.</p>
                                <ul className="list-inline m-a0">
                                    <li><Link to={"#"} className="m-r10 text-white"><i
                                        className="fa fa-facebook"></i></Link></li>
                                    <li><Link to={"#"} className="m-r10 text-white"><i
                                        className="fa fa-google-plus"></i></Link></li>
                                    <li><Link to={"#"} className="m-r10 text-white"><i
                                        className="fa fa-linkedin"></i></Link></li>
                                    <li><Link to={"#"} className="m-r10 text-white"><i
                                        className="fa fa-instagram"></i></Link></li>
                                    <li><Link to={"#"} className="m-r10 text-white"><i
                                        className="fa fa-twitter"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 p-a0">
                            <div className="lead-form browse-job text-left">
                                <form onSubmit={formik.handleSubmit}>
                                    <h3 className="m-t0">Personal Details</h3>
                                    <div className="form-group">
                                        <input
                                            name='email'
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                            className="form-control"
                                            placeholder="email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            name='password'
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            type='password'
                                            className="form-control"
                                            placeholder="password"
                                        />
                                    </div>
                                    <div className="clearfix">
                                        <button type="submit" className="btn-primary site-button btn-block">Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default LoginDialog;