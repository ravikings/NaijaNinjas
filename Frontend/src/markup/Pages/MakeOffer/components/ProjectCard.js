import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { truncate } from "../../../../utils";

const ProjectCard = ({ item }) => {
  return (
  <div className="services-box cursor-pointer">
    <img src="https://images.unsplash.com/photo-1426170042593-200f250dfdaf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg"/>
    <div className="services-title p-2">
     
      <h3>This is my new Gigxnow Here igxnow Here </h3>

      
    </div>
   
  </div>
  );
};


export default ProjectCard;
