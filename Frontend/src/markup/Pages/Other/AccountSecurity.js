import React from "react"
import { Link } from "react-router-dom"
import Header2 from "../../Layout/Header2"
import Footer from "../../Layout/Footer"
import ProfileSidebar from "../../Element/Profilesidebar"
import { useFormik } from "formik"
import createRequest from "../../../utils/axios"
import { toast } from "react-toastify"

function AccountSecurity() {
  const [attachFile, setAttachFile] = React.useState(null)
  const changePassword = async (values) => {
    try {
      const { data } = await createRequest().get(
        "/api/v1/account/reset_password/",
        {
          params: {
            old_password: values.old_password,
            password1: values.password1,
            password2: values.password2,
          },
        }
      )
      toast.success(data?.message)
      formik.resetForm()
    } catch (e) {
      toast.error(e?.response?.data?.error || "Unknown Error")
    }
  }

  const formik = useFormik({
    initialValues: { old_password: "", password1: "", password2: "" },
    enableReinitialize: true,
    onSubmit: async (values) => {
      await changePassword(values)
      console.log(values)
    },
  })

  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <ProfileSidebar
                  showManagePropSetting={true}
                  active={"Security"}
                />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx job-profile">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Security
                      </h5>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>Upload Front ID</label>
                        <div className="custom-file  p-5">
                          <p className="m-a0">
                            <i className="fa fa-upload"></i>
                            Upload Front ID
                          </p>
                          <input
                            type="file"
                            className="site-button form-control"
                            id="customFile"
                            onChange={(e) => setAttachFile(e.target.files[0])}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Upload Back ID</label>
                        <div className="custom-file  p-5">
                          <p className="m-a0">
                            <i className="fa fa-upload"></i>
                            Upload Back ID
                          </p>
                          <input
                            type="file"
                            className="site-button form-control"
                            id="customFile"
                            onChange={(e) => setAttachFile(e.target.files[0])}
                          />
                        </div>
                      </div>
                      <h6 className="font-weight-700">
                        {" "}
                        Status : <span className="text-success">Verified</span>
                      </h6>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>Email Address</label>
                          <input
                            name="email"
                            type="email"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <i className="fa fa-envelope-o mr-3"></i> Email Address
                    <i className="fa fa-check-circle ml-3 text-green"></i>{" "}
                    <span className="ml-3 text-green">Verified</span>
                    <div className="row mt-3">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input
                            name="number"
                            type="number"
                            className="form-control"
                          />
                        </div>
                        <button type="submit" className="site-button w-25">
                          Add
                        </button>
                      </div>
                    </div>
                    <i className="fa fa-phone mr-3"></i> Phone Number
                    <i className="fa fa-check-circle ml-3 text-red"></i>{" "}
                    <span className="ml-3 text-red">Not Verified</span>
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
export default AccountSecurity
