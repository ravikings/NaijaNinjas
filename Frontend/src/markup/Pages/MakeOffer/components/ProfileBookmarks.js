import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Modal } from "react-bootstrap"
import createRequest, {
  createRequestWithoutBase,
} from "../../../../utils/axios"
import { toast } from "react-toastify"

const jobAlert = [
  { title: "Social Media Expert", date: "December 15,2018" },
  { title: "Web Designer", date: "November 10,2018" },
  { title: "Finance Accountant", date: "October 5,2018" },
  { title: "Social Media Expert", date: "December 15,2018" },
  { title: "Web Designer", date: "November 10,2018" },
  { title: "Finance Accountant", date: "October 5,2018" },
  { title: "Social Media Expert", date: "December 15,2018" },
  { title: "Web Designer", date: "November 10,2018" },
  { title: "Finance Accountant", date: "October 5,2018" },
  { title: "Social Media Expert", date: "December 15,2018" },
]

function ProfileBookmark() {
  const [bookmarks, setBookmarks] = useState(null)
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)
  const [page, setPage] = useState(0)
  const [count, setCount] = useState(0)

  const getBookmarks = async () => {
    try {
      const response = await createRequest().get(
        "/api/v1/account/dashboard-profile-bookmarks/"
      )
      setBookmarks(response.data.results)
      response.data.next && setNext(response.data.next)
      response.data.previous && setPrevious(response.data.previous)
      const pgs = Math.ceil(response.data.count / 10)
      response.data.count && setCount(pgs)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBookmarks()
  }, [])

  const paginateBookmarks = async (e, req, forNext) => {
    //  try {
    //    const response = await createRequestWithoutBase(url).get()
    //    console.log(response)
    //    setBookmarks(response.data.results)
    //    response.data.next && setNext(response.data.next)
    //    response.data.previous && setPrevious(response.data.previous)
    //    setTotalSaved(response.data.count)
    //  } catch (error) {
    //    console.log(error)
    //  }
    if (!req) {
      return e.preventDefault()
    }

    e.preventDefault()
    console.log("cliked")
    try {
      const { data } = await createRequestWithoutBase().get(req)
      if (forNext) {
        console.log("next Called")
        // checkOnline(userNext);
      } else {
        //checkOnline(userPrevious);
      }
      if (data.results) {
        setBookmarks(data.results)
        data.previous ? setPrevious(data.previous) : setPrevious(null)
        data.next ? setNext(data.next) : setNext(null)
        if (forNext) {
          setPage(page + 1)
        } else {
          setPage(page - 1)
        }
        console.log(data, "new data")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <>
      <div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 m-b30">
            <div className=" save-job browse-job table-job-bx clearfix">
              <ul className="post-job-bx mt-5">
                {bookmarks ? (
                  bookmarks.map((item, index) => (
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

                              <div>
                                <i className="fa fa-money money"></i>
                                <span className="ml-1">
                                  {/* {item.salary} */}$ 500,000
                                </span>
                              </div>

                              <ul>
                                <li>
                                  <i className="fa fa-map-marker "></i>
                                  {item.location}{" "}
                                  {item.city && ", " + item.city}{" "}
                                  {item.city && item.country}
                                </li>
                                <li>
                                  <i className="fa fa-usd"></i> Full Time
                                </li>
                                <li>
                                  <i className="fa fa-clock-o"></i> Published 11
                                  months ago
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
                          </div>
                          <label
                            className="like-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              e.preventDefault()
                              console.log(item.author)
                            }}
                          >
                            <i
                              className="bi bi-trash "
                              style={{ color: "red" }}
                            ></i>
                            {/* <span className="checkmark"></span> */}
                          </label>
                        </div>
                      </Link>
                    </li>
                  ))
                ) : (
                  <div className="text-center">
                    <h4>No Bookmarks</h4>
                  </div>
                )}
              </ul>

              {/* Pagination */}

              {bookmarks && count && (
                <div className="pagination-bx float-right">
                  <ul className="pagination ">
                    <li className="previous mx-2">
                      <Link
                        to={""}
                        className={
                          !previous ? "disabledCursor item-link" : "item-link"
                        }
                        onClick={(e) =>
                          previous
                            ? paginateBookmarks(e, previous)
                            : paginateBookmarks(e)
                        }
                      >
                        <i className="ti-arrow-left"></i> Prev
                      </Link>
                    </li>
                    {Array.from(Array(count), (e, i) => {
                      return (
                        <li
                          key={i}
                          className={
                            i === page ? "activeNumber dots " : "notActive dots"
                          }
                        >
                          <Link to="" onClick={(e) => paginateBookmarks(e)}>
                            {i + 1}
                          </Link>
                        </li>
                      )
                    })}
                    <li className="next mx-2">
                      <Link
                        to={""}
                        className={
                          !next ? "disabledCursor item-link" : "item-link"
                        }
                        onClick={(e) =>
                          next
                            ? paginateBookmarks(e, next, "forNext")
                            : paginateBookmarks(e)
                        }
                      >
                        Next <i className="ti-arrow-right"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="page-content ">
        <div className="content-block">
          <div className="section-full   p-b20">
            
          </div>
        </div>
      </div> */}
    </>
  )
}

export default ProfileBookmark
