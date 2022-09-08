import React from "react"
import PersonIcon from "@mui/icons-material/Person"
import SingleFeedback from "./SingleFeedback"
import { Divider } from "@material-ui/core"
import { Link } from "react-router-dom"

function RelatedProfile(props) {
  const data = [
    {
      author: 1,
      bookmarks: [],
      city: "Staten Island",
      country: null,
      department: null,
      description: ' Perc Endo Approach"',
      first_name: "Clay",
      id: 19,
      language: null,
      last_name: "Dytham",
      local_goverment_zone: null,
      location: "Abilene",
      photo: null,
      postcode: "79605",
      salary: null,
      sector: null,
      state: "Texas",
      status: true,
      title: "Dr",
    },
  ]
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
        <PersonIcon style={{ color: "#3f51b5" }} />
        <h5 style={{ fontWeight: 400, margin: "0px 10px" }}>
          Related Profiles
        </h5>
      </div>
      <div className="col-xl-12 col-lg-12 col-md-12">
        <div className="job-bx-title clearfix"></div>
        <ul className="post-job-bx">
          {data?.map((item, index) => (
            <li key={index} className="cursor-pointer">
              <Link
                to={`/make-offer/${item.author}`}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
              >
                <div className="post-bx">
                  <div className="d-flex m-b30">
                    <div className="job-post-company">
                      <Link
                        to={`/make-offer/${item.author}`}
                        onClick={(e) => e.stopPropagation()}
                        target={"_blank"}
                      >
                        <span>
                          <img alt="" src={item.image} />
                        </span>
                      </Link>
                    </div>
                    <div className="job-post-info">
                      <h4>
                        <Link
                          to={{
                            pathname: `/make-offer/${item.author}`,
                            state: {
                              id: item.author,
                            },
                          }}
                          onClick={(e) => e.stopPropagation()}
                          target={"_blank"}
                        >
                          {item.first_name} {item.last_name}
                        </Link>
                      </h4>

                      {item?.status ? (
                        <div className="d-flex mb-1">
                          <i
                            className="fa fa-check-circle circle align-self-center"
                            aria-hidden="true"
                          ></i>

                          <span className="  ml-1">Online Now</span>
                        </div>
                      ) : (
                        <></>
                      )}
                      {item.salary && (
                        <div>
                          <i className="fa fa-money money"></i>
                          <span className="ml-1">{(`" "`, item.salary)}</span>
                        </div>
                      )}

                      <ul>
                        <li>
                          <i className="fa fa-map-marker "></i> {item.location}{" "}
                          {item.city && ", " + item.city}{" "}
                          {item.city && item.country}
                        </li>
                        <li>
                          <i className="fa fa-usd"></i> Full Time
                        </li>
                        <li>
                          <i className="fa fa-clock-o"></i> Published 11 months
                          ago
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div style={{ width: "65px" }}></div>
                    <div className="job-time mr-4">
                      <span>{item.description}</span>
                    </div>
                    {item.salary && (
                      <div className="salary-bx">
                        <span>{item.salary}</span>
                      </div>
                    )}

                    <div className="salary-bx">
                      {console.log(item, "item")}
                      <Link
                        to={{
                          pathname: `/make-offer/${item.author}`,
                          state: {
                            id: item.author,
                          },
                        }}
                        onClick={(e) => e.stopPropagation()}
                        target={"_blank"}
                      >
                        <button className="site-button btn-block">
                          View Profile
                        </button>
                        {/* <Button variant='primary' size='md'>
                                    <b className='fw8'>View Profile</b>
                                  </Button> */}
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RelatedProfile
