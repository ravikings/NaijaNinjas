import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
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
import { useSelector } from "react-redux"
const postBlog = [
  { title: "PHP Web Developer" },
  { title: "Software Developer" },
  { title: "Branch Credit Manager" },
]

function UpdateProject() {
  var { id } = useParams()
  const history = useHistory()
  let token = `Bearer ` + localStorage.getItem("access_token")
  let userId = parseInt(localStorage.getItem("userID"))
  const [title, setTitle] = useState("")
  const [detailsValue, setDetailsValue] = useState("")
  const [attachFile, setAttachFile] = useState([])
  const { currentUser } = useSelector((state) => state.authReducer)

  // upload image start
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" }
  }

  const allData = () => {
    axiosPrivate
      .get(`${url.baseURL}api/v1/account/projects/?user_id=${currentUser?.pk}`)
      .then((res) => {
        const data = res.data.results
        data.filter((item) => {
          console.log(item)
          if (item.id === parseInt(id)) {
            setTitle(item.title)
            setDetailsValue(item.description)
            console.log("UpdateProject", item)
          }
        })
      })
      .catch((e) => {
        if (e.response?.status === 400) {
          console.log(e?.response?.data?.non_field_errors[0])
        } else {
          console.log("Unknown Error")
        }
      })
  }

  useEffect(() => {
    if (id) {
      allData()
    }
  }, [id])

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
  const updateProject = (e) => {
    e.preventDefault()

    var formdata = new FormData()
    formdata.append("id", parseInt(id))
    formdata.append("title", e.target[0].value)
    formdata.append("description", detailsValue)
    formdata.append("author", userId)
    attachFile.forEach((file) => {
      formdata.append("image", file)
    })
    axiosPrivate
      .post(`${url.baseURL}/api/v1/account/project-create/`, formdata)
      .then(
        (response) => {
          console.log("the response is ", response)

          history.push(`/user-projects`)
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
                      Update Project
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
                  <form onSubmit={updateProject} enctype="multipart/form-data">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Project Title</label>
                          <input
                            type="text"
                            name="QuestionTitle"
                            className="form-control"
                            placeholder="Enter Project Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                      Update
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
export default UpdateProject
