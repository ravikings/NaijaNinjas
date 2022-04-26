import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { truncate } from "../../../../utils";

const ServiceCard = ({ item }) => {
  return (
    <li className="col-lg-4 col-md-6">
      <div className="service-bx">
        <div className="service-display">
          <img
            src={require("./../../../../images/blog/grid/pic4.jpg")}
            alt="Services "
          />
        </div>
        <div className="service-details">
          <h5>
            <Link to={"/job-detail"}>{truncate(item.title,50)}</Link>
          </h5>

          <span>$400</span>

        </div>
      </div>
    </li>
  );
};

ServiceCard.propTypes = {
    item:PropTypes.object.isRequired
};

export default ServiceCard;
