import React, { useState, useEffect } from "react"
import Modal from "react-bootstrap/Modal"
import { axiosPrivate } from "../../../../utils/axios"
import url from "../../../../utils/baseUrl"
import "react-image-lightbox/style.css"
import ProjectCard from "./ProjectCard"
import Carousel from "react-bootstrap/Carousel"
import ClipLoader from "react-spinners/ClipLoader"

function Gallery({ id }) {
  const [lgShow, setLgShow] = useState(false)
  const [viewData, setViewData] = useState([])
  const [company, setCompany] = useState(false)
  const [modelItem, setModelItem] = useState({})
  const [projects, setProjects] = React.useState([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  const allData = () => {
    setLoading(true)
    axiosPrivate
      .get(`${url.baseURL}api/v1/account/projects/?user_id=${id}`)
      .then((res) => {
        console.log(res.data.results)
        setProjects(res.data.results)
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
        if (e.response?.status === 400) {
          console.log(e?.response?.data?.non_field_errors[0])
        } else {
          console.log("Unknown Error")
        }
      })
  }

  useEffect(() => {
    allData()
  }, [])

  return (
    <div className="project-data">
      <div className="row">
        {loading ? (
          <div className="loader">
            <ClipLoader color={"#2e55fa"} loading={true} size={150} />
          </div>
        ) : projects.length > 0 ? (
          projects.map((item, index) => (
            <div
              onClick={(e) => {
                setViewData(item)
                setCompany(true)
              }}
              className="col-lg-4 col-sm-12 col-12 m-b20"
            >
              <ProjectCard key={index} item={item} />
            </div>
          ))
        ) : (
          <div className="col-lg-12 col-sm-12 col-12 m-b20">
            <div className="alert alert-secondary" role="alert">
              No Projects Found
            </div>
          </div>
        )}
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
                <img
                  alt=""
                  src={require("../../../../images/logo/icon2.png")}
                />
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
              <Carousel activeIndex={index} onSelect={handleSelect}>
                {viewData?.photos?.map((item, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={item.image}
                      alt="First slide"
                    />
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
                  <strong>Deseription :</strong>
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
    </div>
  )
}

export default Gallery
