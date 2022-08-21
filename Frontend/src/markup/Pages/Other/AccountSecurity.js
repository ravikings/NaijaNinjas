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
                    <div className="d-flex ">
                      <img
                        src="https://demo.quixlab.com/treemium-html/images/id.png"
                        alt="id"
                        className="img-fluid p-3"
                        width={300}
                        style={{
                          border: "2px solid #e6e6e6",
                          borderRadius: "5px",
                        }}
                      />
                      <div className="ml-5">
                        <h5 className="font-weight-700">Name</h5>
                        <p className="text-muted">
                          {" "}
                          ID: 0024 5687 2254 3698 <br /> Status :{" "}
                          <span className="text-success">Verified</span>{" "}
                        </p>
                        <Link to="/account-security/new-id">
                          <button className="site-button button-md">
                            New ID
                          </button>
                        </Link>
                      </div>
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
                    <i className="fa fa-check-circle ml-3 text-success"></i>{" "}
                    <span className="ml-3 text-success">Verified</span>
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
