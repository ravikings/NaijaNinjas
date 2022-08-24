import React, { useState, useEffect } from "react"
import Modal from "react-bootstrap/Modal"
import { axiosPrivate } from "../../../../utils/axios"
import url from "../../../../utils/baseUrl"
import "react-image-lightbox/style.css"
import ProjectCard from "./ProjectCard"

function Gallery({ id }) {
  const [lgShow, setLgShow] = useState(false)
  const [modelItem, setModelItem] = useState({})
  const [projects, setProjects] = React.useState([])
  const allData = () => {
    axiosPrivate
      .get(`${url.baseURL}forum/list/?user_id=${id}`)
      .then((res) => {
        console.log(res.data.results)
        setProjects(res.data.results)
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
    allData()
  }, [])

  return (
    <div className="container project-data">
      <div className="row">
        {projects.length > 0 &&
          projects.map((item, index) => (
            <div
              onClick={() => {
                setLgShow(true)
                setModelItem(item)
              }}
              className="col-lg-4 col-sm-12 col-12 m-b20"
            >
              <ProjectCard key={index} item={item} />
            </div>
          ))}
      </div>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        backdropClassName="project-modal"
      >
        <Modal.Header className="project-modal-header" closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {modelItem.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            className="img-fluid"
            src={
              modelItem.attachment
                ? modelItem.attachment
                : require("./../../../../images/blog/grid/pic1.jpg")
            }
            alt=""
          />

          <div className="project-model-description p-2">
            {modelItem.body && (
              <div
                dangerouslySetInnerHTML={{
                  __html: modelItem.body,
                }}
              />
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Gallery
