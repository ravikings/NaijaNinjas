import React from "react";
import { Link } from "react-router-dom";

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
  return (
    <div className="container">
      <ul className="sp10 grid portfolio-box">
        {photos.map((item, index) => (
          <li
            className="card-container grid-items"
            key={index}
          >
            <div className="dez-box ">
              <div className="dez-media dez-img-overlay1 dez-img-effect ">
                <Link to={"#"}>
                  {" "}
                  <img src={item.url} alt="" />{" "}
                </Link>
                <div className="overlay-bx">
                  <div className="overlay-icon">
                    <a
                      className="mfp-link"
                      title="Image Title Come Here"
                      href="images/gallery/masonry/img6.jpg"
                    >
                      {" "}
                      <i className="ti-fullscreen"></i>{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    
    </div>
  );
}

export default Gallery;
