/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { truncate } from "../../../../utils"

const ProjectCard = ({ item }) => {
  return (
    <div className="services-box cursor-pointer">
      <img
        src={
          (item.photos && item.photos.length > 0) 
            ? item.photos[0].image
            : "https://images.unsplash.com/photo-1426170042593-200f250dfdaf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg"
        }
      />
      <div className="services-title p-2">
        <h3>{item.title} </h3>
      </div>
    </div>
  )
}

export default ProjectCard
