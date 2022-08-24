import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { truncate } from "../../../../utils"

const ServiceCard = ({ item }) => {
  return (
    <div className="services-box">
      <img src={item.image} height={"200px"} alt={item.title} />
      <div className="services-title p-2">
        <Link to={"/job-detail"}>
          <h3>{item.title} </h3>
        </Link>
      </div>
      <div className="services-caption">
        <span className="mr-1">From</span> <b>${item.amount}</b>
      </div>
      <div className="services-caption">
        <span>
          <i className="fa fa-clock-o mr-1"></i> 3 day delivery
        </span>
      </div>
    </div>
  )
}

ServiceCard.propTypes = {
  item: PropTypes.object.isRequired,
}

export default ServiceCard
