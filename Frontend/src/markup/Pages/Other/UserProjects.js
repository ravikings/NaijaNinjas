import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import Header2 from "../../Layout/Header2"
import Footer from "../../Layout/Footer"
import axios from "axios"
import ProfileSidebar from "../../Element/Profilesidebar"
import { Modal } from "react-bootstrap"
import ClipLoader from "react-spinners/ClipLoader"
import baseURL from "../../../utils/baseUrl"
import url from "../../../utils/baseUrl"
import Carousel from "react-bootstrap/Carousel"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import { useSelector } from "react-redux"
import { BASE_URL } from "../../../utils/axios"
function UserProjects() {
  const [data, setData] = useState([])
  const [viewData, setViewData] = useState([])
  const [company, setCompany] = useState(false)
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const axiosPrivate = useAxiosPrivate()
  const { currentUser } = useSelector((state) => state.authReducer)
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  const allData = () => {
    setLoading(true)
    axiosPrivate
      .get(`${url.baseURL}api/v1/account/projects/?user_id=${currentUser?.pk}`)
      .then((res) => {
        setData(res.data.results)
        setLoading(false)
      })
      .catch((e) => {
        if (e.response?.status === 400) {
          console.log(e?.response?.data?.non_field_errors[0])
        } else {
          console.log("Unknown Error")
        }
      })
  }

  // Delete Project
  // delete item start
  const deleteProject = (item) => {
    // axios({
    //   method: "DELETE",
    //   url: `${baseURL}api/v1/account/service-dashboard/${e}`,

    //   headers: {
    //     Authorization: token,
    //   } }),
    console.log(item)
    axiosPrivate.post(`${BASE_URL}/api/v1/delete-project/${item.id}/`).then(
      (response) => {
        allData()
      },
      (error) => {
        console.log(error)
      }
    )
  }

  // delete Image
  const deleteImage = (item) => {
    console.log(item)
    axiosPrivate
      .delete(`${BASE_URL}/api/v1/account/delete-project-image/${item.id}/`)
      .then(
        (response) => {
          allData()
          setCompany(false)
        },
        (error) => {
          console.log(error)
        }
      )
  }
  // delete item end
  useEffect(() => {
    if (currentUser?.pk) {
      allData()
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
                <ProfileSidebar active={"My Projects"} />
                <div className="col-xl-9 col-lg-8 m-b30 browse-job">
                  <div className="job-bx clearfix">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Projects
                      </h5>
                      <Link
                        to={"/add-projects"}
                        className="site-button  button-md float-right"
                      >
                        Add Project
                      </Link>
                    </div>
                    {!loading ? (
                      <>
                        <ul className="post-job-bx browse-job-grid post-resume row">
                          {data.length > 0 ? (
                            data?.map((item, index) => (
                              <li className="col-lg-6 col-md-6" key={index}>
                                <div className="post-bx">
                                  <div className="d-flex m-b20">
                                    <div className="job-post-info">
                                      <img
                                        src={
                                          item?.photos.length > 0 &&
                                          item?.photos?.[0].image
                                        }
                                        alt=""
                                        height={"150px"}
                                        width={"150px"}
                                      />

                                      <h5 className="m-b0">
                                        <Link
                                          to={"#"}
                                          onClick={(e) => {
                                            e.preventDefault()
                                            setViewData(item)
                                            setCompany(true)
                                          }}
                                        >
                                          {item.title}
                                        </Link>
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="service-tag m-t15 m-b10">
                                    {item?.tag?.split(",")?.map((e) => (
                                      <Link to={"#"} className="mr-1">
                                        <span>{e}</span>
                                      </Link>
                                    ))}
                                  </div>
                                  {/* <Link to={"/files/pdf-sample.pdf"} target="blank" className="job-links">
															<i className="fa fa-pencil"></i>
														</Link> */}
                                  <button
                                    onClick={() => deleteProject(item)}
                                    className="btn rounded btn-danger float-right mr-2"
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                  <Link
                                    to={`/update-projects/${item.id}`}
                                    className="btn rounded btn-primary float-right mr-2"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </Link>
                                  <button
                                    onClick={() => {
                                      setViewData(item)
                                      setCompany(true)
                                    }}
                                    className="btn rounded btn-info float-right mr-2"
                                  >
                                    <i className="fa fa-eye"></i>
                                  </button>
                                </div>
                              </li>
                            ))
                          ) : (
                            <div className="col-lg-12 col-md-12">
                              <div className="post-bx">
                                <div className="d-flex m-b20 justify-content-center">
                                  <div className="job-post-info">
                                    <h1 className="m-b0">No Projects Found</h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </ul>
                      </>
                    ) : (
                      <div className="loader">
                        <ClipLoader
                          color={"#2e55fa"}
                          loading={true}
                          size={150}
                        />
                      </div>
                    )}
                    {data.length > 0 && (
                      <div className="pagination-bx float-right">
                        <ul className="pagination">
                          <li className="previous">
                            <Link to={"#"}>
                              <i className="ti-arrow-left"></i> Prev
                            </Link>
                          </li>
                          <li className="active">
                            <Link to={"#"}>1</Link>
                          </li>
                          <li>
                            <Link to={"#"}>2</Link>
                          </li>
                          <li>
                            <Link to={"#"}>3</Link>
                          </li>
                          <li className="next">
                            <Link to={"#"}>
                              Next <i className="ti-arrow-right"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={company}
        onHide={setCompany}
        className="modal fade modal-bx-info"
      >
        <div className="" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="logo-img">
                <img alt="" src={require("../../../images/logo/icon2.png")} />
              </div>
              <h5 className="modal-title">Project Details</h5>

              <button
                type="button"
                className="close"
                onClick={() => setCompany(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* ============================================= */}
              <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                className="carousel slide"
                data-ride="carousel"
                interval={4000}
                indicators={false}
              >
                {viewData?.photos?.map((item, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={item.image}
                      alt="First slide"
                    />
                    <button
                      onClick={() => deleteImage(item)}
                      className="btn rounded btn-danger mt-2 w-100"
                    >
                      <i className="fa fa-trash"> Delete Image</i>
                    </button>
                  </Carousel.Item>
                ))}
              </Carousel>
              {/* ============================================= */}
              <ul>
                <li>
                  <strong>Project Title :</strong>
                  <p> {viewData?.title} </p>
                </li>

                <li>
                  <strong>Description :</strong>
                  <p
                    dangerouslySetInnerHTML={{ __html: viewData?.description }}
                  />
                </li>
              </ul>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setCompany(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Footer />
    </>
  )
}
export default UserProjects
