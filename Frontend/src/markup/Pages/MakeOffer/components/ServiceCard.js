import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { truncate } from "../../../../utils";

const ServiceCard = ({ item }) => {
  return (
  <div className="services-box">
    <img src="https://images.unsplash.com/photo-1426170042593-200f250dfdaf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg"/>
    <div className="services-title p-2">
      <Link to={"/job-detail"}>
      <h3>This is my new Gigxnow Here igxnow Here </h3>

      </Link>
    </div>
    <div className="services-caption">
      <span className="mr-1">From</span> <b>$5000</b>
    </div>
    <div className="services-caption">
      <span><i className="fa fa-clock-o mr-1"></i> 3 day delivery</span>
    </div>
  </div>
  );
};

ServiceCard.propTypes = {
    item:PropTypes.object.isRequired
};

export default ServiceCard;
