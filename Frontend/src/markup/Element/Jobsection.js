import axios from "axios"
import React, { useEffect, useState } from "react"
import { Badge } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import createRequest, {
  BASE_URL,
  createRequestWithoutBase,
} from "../../utils/axios"
import Loader from "./Loader"

function Jobsection() {
  const [tasks, setTasks] = useState(null)
  const [loading, setLoading] = useState(false)
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)
  const { isAuthenticated } = useSelector((state) => state.authReducer)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const allData = async (page = 1) => {
      setLoading(true)
      try {
        const res = await createRequest().get(
          `api/v1/task/task/?page=${page}`,
          {
            signal: controller.signal,
          }
        )
        isMounted && setTasks(res.data.results)
        isMounted && setLoading(false)
        isMounted && res.data.next && setNext(res.data.next)
        isMounted && res.data.previous && setPrevious(res.data.previous)
      } catch (error) {
        console.log(error)
        isMounted && setLoading(false)
      }
    }
    allData()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const paginateTasks = async (e, req) => {
    if (!req) {
      return e.preventDefault()
    }

    e.preventDefault()
    console.log("cliked")
    try {
      const { data } = await createRequestWithoutBase().get(req)

      if (data.results) {
        // Scroll to specific element when pagination is clicked
        const element = document.getElementById("scroll-to-element")
        element.scrollIntoView({ behavior: "smooth" })

        setTasks(data.results)
        data.previous ? setPrevious(data.previous) : setPrevious(null)
        data.next ? setNext(data.next) : setNext(null)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  const handleBookmark = async (id) => {
    if (!isAuthenticated) {
      toast.error("You need to login to bookmark a task")
    }
    try {
      const { data } = await createRequest().post(
        `/api/v1/task/task-bookmark/${id}/`
      )
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong")
    }
  }
  return (
    <div
      className="section-full bg-white content-inner-2"
      id="scroll-to-element"
    >
      <div className="container">
        <div className="d-flex job-title-bx section-head">
          <div className="mr-auto">
            <h2 className="m-b5">Recent Jobs</h2>
            <h6 className="fw4 m-b0">Recently Added Jobs</h6>
          </div>
          <div className="align-self-end">
            <Link to={"/browse-job"} className="site-button button-sm">
              Browse All Jobs <i className="fa fa-long-arrow-right"></i>
            </Link>
          </div>
        </div>
        {loading ? (
          <>
            <Loader />
          </>
        ) : (
          <div className="row">
            <div className="col-lg-9">
              <ul className="post-job-bx browse-job">
                {tasks?.map((data, index) => (
                  <li key={index}>
                    <div className="post-bx">
                      <div className="d-flex m-b30">
                        <div className="job-post-company">
                          <Link to={""}>
                            <span>
                              <img alt="" src={data.attachment} />
                            </span>
                          </Link>
                        </div>
                        <div className="job-post-info">
                          <h4>
                            <Link
                              to={`/make-offer-task/${data?.id}/${data?.title}`}
                              onClick={(e) => e.stopPropagation()}
                              target="_blank"
                            >
                              {data?.title}
                            </Link>
                          </h4>
                          <ul>
                            <li>
                              <i className="fa fa-map-marker"></i>{" "}
                              {data?.location}
                            </li>
                            <li>
                              <i className="fa fa-bookmark-o"></i>{" "}
                              {data?.category}
                            </li>
                            <li>
                              <i className="fa fa-clock-o"></i> Published{" "}
                              {data?.created || data?.updated}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="job-time mr-auto align-self-center">
                          <p className="h-100">
                            {data?.description?.substring(0, 150)} ...{"  "}
                            <Link
                              to={`/make-offer-task/${data?.id}/${data?.title}`}
                              className="text-primary"
                              onClick={(e) => e.stopPropagation()}
                              target="_blank"
                            >
                              See more
                            </Link>
                          </p>
                          <div className="d-flex badge-div ">
                            {data?.tags?.split(",")?.map((e, index) => (
                              <Badge key={index}>{e}</Badge>
                            ))}
                          </div>
                          {/* <Link to={""}>
                                <span>Full Time</span>
                              </Link> */}
                        </div>

                        <div className="salary-bx d-flex flex-column text-center">
                          <span>
                            $ {data?.minimum_salary} - $ {data?.maximum_salary}
                          </span>
                          {/* <small class='text-muted'>Per hour</small> */}

                          <p className="text-muted text-capitalize">
                            per assignment
                          </p>
                          <Link
                            to={`/make-offer-task/${data?.id}/${data?.title}`}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                          >
                            <button className="site-button btn-block ">
                              Show Interest
                            </button>
                          </Link>
                        </div>
                      </div>
                      <label className="like-btn">
                        <input
                          type="checkbox"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleBookmark(data.id)
                          }}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
              {!loading && (
                <div className="m-t30">
                  <div className="d-flex">
                    <Link
                      className={`site-button button-sm mr-auto ${
                        previous ? "" : "invisible"
                      }
                    `}
                      to={"#"}
                      onClick={(e) => paginateTasks(e, previous)}
                    >
                      <i className="ti-arrow-left"></i> Prev
                    </Link>
                    <Link
                      className="site-button button-sm"
                      to={"#"}
                      onClick={(e) => paginateTasks(e, next)}
                    >
                      Next <i className="ti-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="col-lg-3">
              <div className="sticky-top">
                <div className="candidates-are-sys m-b30">
                  <div className="candidates-bx">
                    <div className="testimonial-pic radius">
                      <img
                        src={require("./../../images/testimonials/pic3.jpg")}
                        alt=""
                        width="100"
                        height="100"
                      />
                    </div>
                    <div className="testimonial-text">
                      <p>
                        I just got a job that I applied for via careerfy! I used
                        the site all the time during my job hunt.
                      </p>
                    </div>
                    <div className="testimonial-detail">
                      {" "}
                      <strong className="testimonial-name">
                        Richard Anderson
                      </strong>{" "}
                      <span className="testimonial-position">Nevada, USA</span>{" "}
                    </div>
                  </div>
                </div>
                <div className="quote-bx">
                  <div className="quote-info">
                    <h4>Make a Difference with Your Online Resume!</h4>
                    <p>
                      Your resume in minutes with JobBoard resume assistant is
                      ready!
                    </p>
                    <Link to={"/register"} className="site-button">
                      Create an Account
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Jobsection
