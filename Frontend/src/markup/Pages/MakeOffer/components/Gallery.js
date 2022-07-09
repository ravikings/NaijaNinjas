import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import 'react-image-lightbox/style.css';
import ProjectCard from "./ProjectCard";

const photos = [
  {
    url: require("./../../../../images/blog/grid/pic1.jpg"),
  },
  {
    url: require("./../../../../images/blog/grid/pic2.jpg"),
  },
  {
    url: require("./../../../../images/blog/grid/pic3.jpg"),
  },
  {
    url: require("./../../../../images/blog/grid/pic4.jpg"),
  },
  {
    url: require("./../../../../images/blog/grid/pic5.jpg"),
  },
  {
    url: require("./../../../../images/blog/grid/pic3.jpg"),
  },
  {
    url: require("./../../../../images/blog/grid/pic5.jpg"),
  },
  {
    url: require("./../../../../images/blog/grid/pic4.jpg"),
  },
];

function Gallery(props) {

 
  const [lgShow, setLgShow] = useState(false);




  return (
    <div className="container project-data">
     
  
 
      <div className="row">
      {photos.map((e)=>(
      <div   onClick={() => setLgShow(true)} className="col-lg-4 col-sm-12 col-12 m-b20">
      <ProjectCard/>
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
    <Modal.Header  className="project-modal-header" closeButton>
      <Modal.Title id="example-modal-sizes-title-lg">
        Project Title
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <img className="img-fluid" src="https://images.unsplash.com/photo-1426170042593-200f250dfdaf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg"/>
    

    <div className="project-model-description p-2">
     <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis numquam, quibusdam ipsam deserunt maiores voluptate blanditiis. Dolorum facere nobis voluptatem quasi, saepe quia! Eligendi, explicabo quam error modi perspiciatis architecto?</p>
     <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis numquam, quibusdam ipsam deserunt maiores voluptate blanditiis. Dolorum facere nobis voluptatem quasi, saepe quia! Eligendi, explicabo quam error modi perspiciatis architecto?</p>
    </div>
      
  
    </Modal.Body>
  </Modal>
     
    </div>
  );
}

export default Gallery;
