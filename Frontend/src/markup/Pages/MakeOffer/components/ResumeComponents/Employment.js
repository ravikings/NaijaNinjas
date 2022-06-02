import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Employment = ({ data, isLoggedIn, user, owner }) => {
  return (
    <div id='employment_bx' className='job-bx bg-white m-b30 '>
      <div className='d-flex'>
        <h5 className='m-b15'>Employment</h5>
      </div>
      {data?.length > 0 &&
        data.map((item) => (
          <div key={item.id}>
            <h6 className='font-14 m-b0'>{item?.designation}</h6>
            <p className='m-b0'>{item?.company}</p>
            <p className='m-b0'>
              {
                // Extract Month and year from startDate
                item?.startDate &&
                  item?.startDate.split("-")[0] +
                    "/" +
                    item?.startDate.split("-")[1]
              }{" "}
              -{" "}
              {item?.present === true
                ? "Present"
                : item?.endDate.split("-")[0] +
                  "/" +
                  item?.endDate.split("-")[1]}
            </p>
            <p className='m-b0'>{item?.description}</p>
          </div>
        ))}
    </div>
  );
};

Employment.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.any,
  owner: PropTypes.any,
};

export default Employment;
