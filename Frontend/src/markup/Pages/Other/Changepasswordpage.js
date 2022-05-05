import React from "react";
import { Link } from "react-router-dom";
import Header2 from "../../Layout/Header2";
import Footer from "../../Layout/Footer";
import ProfileSidebar from "../../Element/Profilesidebar";
import {useFormik} from "formik";
import createRequest from "../../../utils/axios";
import {toast} from "react-toastify";

function Changepasswordpage() {

  const changePassword = async (values) => {
    try {
      const {data} = await createRequest().get("/api/v1/account/reset_password/", {
        params: {
          old_password: values.old_password,
          password1: values.password1,
          password2: values.password2,
        }
      })
      toast.success(data?.message);
      formik.resetForm()
    } catch (e) {
      toast.error(e?.response?.data?.error || "Unknown Error");
    }
  }

  const formik = useFormik({
    initialValues: {old_password:'',password1: "", password2: ""},
    enableReinitialize: true,
    onSubmit: async (values) => {
      await changePassword(values);
      console.log(values)
    },
  });

  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <ProfileSidebar active={"Change Password"} />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx job-profile">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Change Password
                      </h5>
                      <Link
                        to={"/jobs-cv-manager"}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Old Password</label>
                            <input name='old_password' value={formik.values.old_password} onChange={formik.handleChange} type="password" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>New Password </label>
                            <input name='password1' value={formik.values.password1} onChange={formik.handleChange} type="password" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Confirm New Password</label>
                            <input name='password2' value={formik.values.password2} onChange={formik.handleChange} type="password" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-12 m-b10">
                          <button className="site-button" type='submit'>
                            Update Password
                          </button>
                        </div>
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
  );
}
export default Changepasswordpage;
