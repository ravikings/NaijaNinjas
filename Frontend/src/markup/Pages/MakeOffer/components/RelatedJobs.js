import React from "react";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";

import logo from "../../../../images/logo/icon1.png";
import { Link } from "react-router-dom";

const postBox = [
  { image: logo },
  { image: logo },
  { image: logo },
  { image: logo },
];

function RelatedJobs(props) {
  const dummyText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Mauris eget nulla eu nunc efficitur tincidunt.
  Nulla euismod, urna eu aliquet aliquet,
  nisi nunc ultricies nisi, euismod ornare nisl nunc euismod nisl.
  Mauris eget nulla eu nunc efficitur tincidunt.`;
  return (
    <div style={{ marginTop: 40 }}>
      <div
        style={{
          background: "#F2F2F2",
          height: 60,
          paddingLeft: 30,
          display: "flex",
          alignItems: "center",
        }}
      >
        <ThumbUpAltOutlinedIcon style={{ color: "#3f51b5" }} />
        <h5 style={{ fontWeight: 400, margin: "0px 10px" }}>Related Jobs</h5>
      </div>
      <div>
        {/* <SingleFeedback />

        <SingleFeedback />
        <SingleFeedback /> */}
        <ul className='post-job-bx mt-4'>
          {postBox.map((item, index) => (
            <li key={index}>
              <div className='post-bx'>
                <div className='d-flex m-b30'>
                  <div className='job-post-company'>
                    <Link to={""}>
                      <span>
                        <img alt='' src={item.image} />
                      </span>
                    </Link>
                  </div>
                  <div className='job-post-info'>
                    <h4>
                      <Link to={"/make-offer"}>
                        Digital Marketing Executive
                      </Link>
                    </h4>
                    <ul>
                      <li>
                        <i className='fa fa-map-marker'></i> Sacramento,
                        California
                      </li>
                      <li>
                        <i className='fa fa-bookmark-o'></i> Full Time
                      </li>
                      <li>
                        <i className='fa fa-clock-o'></i> Published 11 months
                        ago
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='d-flex'>
                  <div className='job-time mr-auto align-self-center'>
                    <p className='h-100'>
                      {dummyText.substring(0, 150)} ...{"  "}
                      <Link to={"/make-offer"} className='text-primary'>
                        See more
                      </Link>
                    </p>

                    {/* <Link to={""}>
                                <span>Full Time</span>
                              </Link> */}
                  </div>
                  <div className='salary-bx d-flex flex-column'>
                    <span>$1200 - $ 2500</span>
                    {/* <small class='text-muted'>Per hour</small> */}

                    <p className='text-muted text-capitalize'>per month</p>
                    <Link to={"/make-offer"}>
                      <button className='site-button btn-block '>
                        Bid Now
                      </button>
                    </Link>
                  </div>
                </div>
                <label className='like-btn'>
                  <input type='checkbox' />
                  <span className='checkmark'></span>
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Link to={"/browse-job-filter-list"} className='mt-4'>
        <button className='site-button btn-block mt-4 '>See more...</button>
      </Link>
    </div>
  );
}

export default RelatedJobs;
