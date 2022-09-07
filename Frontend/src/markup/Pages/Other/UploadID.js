import React from "react"
import { Link } from "react-router-dom"
import Header2 from "../../Layout/Header2"
import Footer from "../../Layout/Footer"
import ProfileSidebar from "../../Element/Profilesidebar"

function UploadID() {
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
                        Upload your ID card
                      </h5>
                    </div>
                    <p className="text-muted text-center">
                      Upload your ID card to verify your identity.
                    </p>
                    <hr />

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
                    </div>
                    <div className="col-lg-12 col-md-12">
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
                    </div>
                    <div className="d-flex justify-content-center ">
                      <Link to="/account-security">
                        <button className="site-button button-md ">
                          Upload
                        </button>
                      </Link>
                    </div>
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
export default UploadID
