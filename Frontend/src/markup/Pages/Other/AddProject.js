import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import Header2 from "../../Layout/Header2"
import Footer from "../../Layout/Footer"
import { Form } from "react-bootstrap"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import ProfileSidebar from "../../Element/Profilesidebar"
import axios from "axios"
import url from "../../../utils/baseUrl"

import "react-dropzone-uploader/dist/styles.css"
import Dropzone from "react-dropzone-uploader"
import { axiosPrivate } from "../../../utils/axios"
const postBlog = [
  { title: "PHP Web Developer" },
  { title: "Software Developer" },
  { title: "Branch Credit Manager" },
]

function AddProject() {
  const history = useHistory()
  let token = `Token ` + localStorage.getItem("access_token")
  let userId = parseInt(localStorage.getItem("userID"))
  const [detailsValue, setDetailsValue] = useState()
  const [attachFile, setAttachFile] = useState([])

  // upload image start
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" }
  }
  useEffect(() => {
    console.log(attachFile)
  }, [attachFile])

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "done") {
      console.log(meta, file)
      setAttachFile([...attachFile, file])
    }
    if (status === "removed") {
      console.log(meta, file)
      setAttachFile(attachFile.filter((item) => item !== file))
    }
  }

  // upload image end
  const SubmitQuestion = (e) => {
    e.preventDefault()
    console.log("woow" + e.target[0].value)
    console.log("woow" + e.target[1].value)
    console.log("woow" + e.target[2].value)

    console.log("image " + attachFile)

    var formdata = new FormData()
    formdata.append("title", e.target[0].value)
    formdata.append("description", detailsValue)
    formdata.append("author", userId)
    attachFile.forEach((file) => {
      formdata.append("image", file)
    })

    // formdata.append("tags", e.target[1].value)
    // formdata.append("category", e.target[2].value)
    // formdata.append("project", 1)
    // axios({
    // 	method: 'POST',
    // 	url: `${url.baseURL}forum/list/`,
    // 	data: formdata,
    // 	headers: {

    // 	  Authorization: token,

    // 	},
    // })
    axiosPrivate
      .post(`/api/v1/account/project-create/`, formdata)
      .then(
        (response) => {
          console.log("the response is ", response)

          if (response.status === 201) {
            history.push(`/user-projects`)
          }
          //console.log(response.data);
        },
        (error) => {
          console.log(error)
        }
      )
  }
  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <ProfileSidebar active={"project"} />
                <div className="col-xl-9 col-lg-8 m-b30 browse-job">
                  <div className="job-bx-title  clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase">
                      Projects
                    </h5>
                    <div className="float-right">
                      <Link
                        to={"/user-projects"}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>
                  </div>
                  <form onSubmit={SubmitQuestion} enctype="multipart/form-data">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Project Title</label>
                          <input
                            type="text"
                            name="QuestionTitle"
                            className="form-control"
                            placeholder="Enter Project Title"
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Description:</label>
                          <ReactQuill
                            value={detailsValue || ""}
                            onChange={(e) => {
                              setDetailsValue(e)
                            }}
                            style={{ height: "200px", paddingBottom: "70px" }}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <label>Image</label>
                        <Dropzone
                          getUploadParams={getUploadParams}
                          onChangeStatus={handleChangeStatus}
                          accept="image/*"
                        />
                      </div>
                    </div>
                    <button type="submit" className="site-button m-b30 mt-5">
                      Publish
                    </button>
                  </form>
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
export default AddProject
