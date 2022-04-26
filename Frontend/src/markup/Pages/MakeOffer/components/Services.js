import React from "react";
import ServiceCard from "./ServiceCard";
// var bnr = require("./../../images/banner/bnr1.jpg");

const postBox = [
  { title: "This is a short description of the services 1" },
  { title: "This is a short description of the services 2 this continue from here" },
  { title: "This is a short description of the services 3" },
  { title: "This is a short description of the services 4" },
  { title: "Digital Marketing Executive" },
];

function Services(props) {
  return (
    <div>
      <ul className="row">
        {postBox.map((item, index) => (
          <ServiceCard {...{ item }} key={index} />
        ))}
      </ul>
    </div>
  );
}

export default Services;
