import React, { useState, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import Header2 from "../../Layout/Header2"
import Footer from "../../Layout/Footer"
import { Form } from "react-bootstrap"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import ProfileSidebar from "../../Element/Profilesidebar"
import axios from "axios"
import ClipLoader from "react-spinners/ClipLoader"
import baseURL from "../../../utils/baseUrl"
import { axiosPrivate, BASE_URL } from "../../../utils/axios"
import { useSelector } from "react-redux"

function UpdateServices() {
  var { id } = useParams()
  const history = useHistory()

  let token = `Token ` + localStorage.getItem("access_token")
  let userId = parseInt(localStorage.getItem("userID"))
  const [data, setData] = useState([])
  const [attachFile, setAttachFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const { currentUser } = useSelector((state) => state.authReducer)

  const handleChange = (e, noName) => {
    if (noName) {
      return setData({ ...data, [noName]: e })
    }
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const formData = () => {
    setLoading(true)
    // axios({
    // 	method: 'GET',
    // 	url: `${baseURL}api/v1/account/service-dashboard/${id}`,

    // })
    axiosPrivate
      .get(
        `${BASE_URL}/api/v1/account/professional-services/?user_id=${currentUser?.pk}`
      )
      .then((res) => {
        let data = res?.data?.results?.filter(
          (item) => item.id === parseInt(id)
        )
        data.length > 0 && setData(data[0])
        data.length > 0 && setAttachFile(data[0].service_image)
        console.log(data)
        // setDetailsValue(res?.data?.description)
        // setAttachFile(res?.data?.image)
        // setTitle(res?.data?.title)
        // setAmount(res?.data?.amount)
        // setLocation(res?.data?.location)
        // setTag(res?.data?.tag)
        // setDeliveryMethod(res?.data?.delivery_method)
        setLoading(false)
      })
      .catch((e) => {
        console.log(e)
        if (e.response?.status === 400) {
          console.log(e?.response?.data?.non_field_errors[0])
        } else {
          console.log("Unknown Error")
        }
      })
  }
  const addData = (e) => {
    e.preventDefault()
    setLoading(true)
    var formdata = new FormData()
    formdata.append("title", data.title)
    formdata.append("description", data.description)
    formdata.append("amount", data.amount)
    formdata.append("location", data.location)
    formdata.append("tag", data.tag)
    formdata.append("delivery_method", data.delivery_method)
    if (attachFile != null) {
      formdata.append("image", attachFile)
    }

    formdata.append("author", currentUser?.pk)
    // axios({
    //   method: "POST",
    //   url: `${baseURL}api/v1/account/service-dashboard/`,
    //   data: formdata,
    //   headers: {
    //     Authorization: token,
    //   },
    // })
    axiosPrivate
      .put(`${BASE_URL}/api/v1/account/service-dashboard/${id}/`, formdata)
      .then(
        (response) => {
          if (response.status === 200) {
            setLoading(false)
            history.push("/user-services")
          }
          console.log(response)
        },
        (error) => {
          console.log(error)
        }
      )
  }
  useEffect(() => {
    if (currentUser?.pk && id) {
      formData()
    }
  }, [currentUser])
  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <ProfileSidebar active={"services"} />
                {!loading ? (
                  <div className="col-xl-9 col-lg-8 m-b30 browse-job">
                    <div className="job-bx-title  clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Update Service
                      </h5>
                      <div className="float-right">
                        <Link
                          to={"/user-services"}
                          className="site-button right-arrow button-sm float-right"
                        >
                          Back
                        </Link>
                      </div>
                    </div>
                    <form onSubmit={addData} enctype="multipart/form-data">
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Service Title</label>
                            <input
                              type="text"
                              name="title"
                              className="form-control"
                              placeholder="Enter  Title"
                              value={data.title || ""}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Services Tags</label>
                            <input
                              type="text"
                              name="tag"
                              className="form-control tags_input"
                              value={data.tag || ""}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Service Price</label>
                            <input
                              type="text"
                              name="amount"
                              className="form-control tags_input"
                              value={data.amount || ""}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Service Location</label>
                            <input
                              type="text"
                              name="location"
                              className="form-control tags_input"
                              value={data.location || ""}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Delivery Method</label>
                            <Form.Control
                              as="select"
                              custom
                              name="delivery_method"
                              className="custom-select"
                              defaultValue={data.delivery_method || ""}
                              onChange={handleChange}
                              required
                            >
                              <option value="method 1">Method 1</option>
                              <option value="method 2">Method 2</option>
                            </Form.Control>
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Description:</label>
                            <ReactQuill
                              value={data.description || ""}
                              onChange={(e) => handleChange(e, "description")}
                              style={{
                                height: "200px",
                                paddingBottom: "70px",
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Upload Picture</label>
                            <div className="custom-file  p-5">
                              <p className="m-a0">
                                <i className="fa fa-upload"></i>
                                Upload File
                              </p>
                              <input
                                type="file"
                                className="site-button form-control"
                                id="customFile"
                                name="service_image"
                                onChange={(e) =>
                                  setAttachFile(e.target.files[0])
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="site-button m-b30 m-t20">
                        Update
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="loader">
                    <ClipLoader color={"#2e55fa"} loading={true} size={150} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default UpdateServices
