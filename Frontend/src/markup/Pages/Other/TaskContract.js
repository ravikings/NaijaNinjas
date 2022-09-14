import React, { useState, useEffect } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import Header from "../../Layout/Header"
import Footer from "../../Layout/Footer"
import ClipLoader from "react-spinners/ClipLoader"

import createRequest from "../../../utils/axios"
import axios from "axios"
import "react-dropzone-uploader/dist/styles.css"
import Dropzone from "react-dropzone-uploader"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import baseUrl from "../../../utils/baseUrl"
import { useSelector } from "react-redux"

function TaskContract() {
  const axiosPrivate = useAxiosPrivate()
  const history = useHistory()
  const { userProfile } = useSelector((state) => state.authReducer)
  const [title, setTile] = useState("")
  const [description, setDescription] = useState("")
  const [attachFile, setAttachFile] = useState(null)
  const { state } = useLocation()
  console.log(state)
  // upload image start
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" }
  }

  // called every time a file's `status` changes
  // const handleChangeStatus = ({ meta, file }, status) => {
  //   setAttachFile(file)
  // }

  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "done") {
      console.log(meta, file)
      setAttachFile(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("author", userProfile?.author)
    formData.append("title", title)
    formData.append("body", description)
    formData.append("attachment", attachFile)
    //*  Task Timeline is static for now, we need to fix later.
    formData.append("task_timeline", state.timeline_id)
    formData.append("status", "CONTRACT")
    try {
      const res = await axiosPrivate.post(
        `${baseUrl.baseURL}api/v1/task/comment-timeline/`,
        formData
      )
      console.log(res)
      history.push(
        `/timeline/${state.timeline_page[0]}/${state.timeline_page[1]}`
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <div className="container">
          <div className="row">
            <div className="col-md-9  m-t40">
              <h1 className="contract-title">Propose new contract</h1>
              <form className="contract-form" onSubmit={handleSubmit}>
                {/* contract Client Requirements start */}
                <div className="container-data m-b20">
                  {/* contract Header start */}
                  <div class="contract-header">
                    <h2 class="mb-0">Contract details</h2>
                  </div>
                  {/* contract header end */}

                  {/* contract section start */}
                  <div className="contract-section">
                    <div className="form-group">
                      <label htmlFor="">Contract Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTile(e.target.value)}
                        name="ContractTitle"
                        placeholder="Contract Title"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group mb-10">
                      <label> Description </label>
                      <textarea
                        rows="5"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      ></textarea>
                      <span className="required-label">
                        <i className="fa fa-exclamation-circle mr-1"></i>{" "}
                        Description is required
                      </span>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <label>Attach File</label>
                      <Dropzone
                        getUploadParams={getUploadParams}
                        onChangeStatus={handleChangeStatus}
                        className="text-black"
                        accept="image/*,audio/*,video/*,.pdf,.doc,.docx,.webm"
                      />
                    </div>
                  </div>
                  {/* contract section start */}
                </div>
                {/* contract Client Requirements end */}

                {/* contract send button Start */}
                <div className="container-data m-b20">
                  {/* contract section start */}
                  <div className="contract-section col-md-7">
                    <button type="submit" className="site-button ml-4">
                      Send to Pro
                    </button>
                  </div>
                  {/* contract section start */}
                </div>
                {/* contract send button end */}
              </form>
            </div>
            <div className="col-md-3 m-t40">
              <div className="">
                <div className="ads-sidebar-heading">
                  <h4 className="panel-title">
                    <a>Saftey Tips </a>
                  </h4>
                </div>
                <div className="ads-sidebar-content">
                  <p className="lead">
                    Posting an ad on <a href="#">GigxNow</a> is free! However,
                    all ads must follow our rules:
                  </p>
                  <ol>
                    <li>Make sure you post in the correct category.</li>
                    <li>
                      Do not post the same ad more than once or repost an ad
                      within 48 hours.
                    </li>
                    <li>Do not upload pictures with watermarks.</li>
                    <li>
                      Do not post ads containing multiple items unless it's a
                      package deal.
                    </li>
                    <li>
                      Do not put your email or phone numbers in the title or
                      description.
                    </li>
                    <li>Make sure you post in the correct category.</li>
                    <li>
                      Do not post the same ad more than once or repost an ad
                      within 48 hours.
                    </li>
                    <li>Do not upload pictures with watermarks.</li>
                    <li>
                      Do not post ads containing multiple items unless it's a
                      package deal.
                    </li>
                  </ol>
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
export default TaskContract
