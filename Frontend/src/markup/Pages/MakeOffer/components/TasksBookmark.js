import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Modal, Pagination } from "react-bootstrap"
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

function TasksBookmark() {
  const [modal, setModal] = useState(false)
  const [modalObj, setModalObj] = useState({})
  const [bookmarks, setBookmarks] = useState(null)
  const [totalSaved, setTotalSaved] = useState(0)
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)
  const [page, setPage] = useState(0)
  const [count, setCount] = useState(0)

  const getBookmarks = async () => {
    try {
      const response = await createRequest().get(
        "/api/v1/task/dashboard-task-bookmarks/"
      )
      setBookmarks(response.data.results)
      response.data.next && setNext(response.data.next)
      response.data.previous && setPrevious(response.data.previous)
      const pgs = Math.ceil(response.data.count / 10)
      response.data.count && setCount(pgs)
      setTotalSaved(response.data.count)
    } catch (error) {
      console.log(error)
    }
  }

  const paginateBookmarks = async (e, req, forNext) => {
    if (!req) {
      return e.preventDefault()
    }

    e.preventDefault()
    console.log("cliked")
    try {
      const { data } = await createRequestWithoutBase().get(req)

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

  useEffect(() => {
    getBookmarks()
  }, [])
  return (
    <>
      <div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 m-b30">
            <div className=" save-job browse-job table-job-bx clearfix">
              <div className="job-bx-title clearfix">
                <h5 className="font-weight-700 pull-left text-uppercase">
                  {totalSaved > 0
                    ? `${totalSaved} Saved Jobs`
                    : "No Saved Jobs"}
                </h5>
                {/* <div className="float-right">
                  <span className="select-title">Sort by freshness</span>
                  <select className="custom-btn">
                    <option>Last 2 Months</option>
                    <option>Last Months</option>
                    <option>Last Weeks</option>
                    <option>Last 3 Days</option>
                  </select>
                </div> */}
              </div>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Premium jobs</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {bookmarks &&
                    bookmarks.map((item, index) => (
                      <tr key={index}>
                        <td className="job-post-company">
                          <Link
                            to={`/make-offer-task/${item?.id}/${item?.title}`}
                          >
                            <span>
                              {item?.attachment && (
                                <img alt="" src={item?.attachment} />
                              )}
                            </span>
                          </Link>
                        </td>
                        <td className="job-name">
                          <Link
                            to={`/make-offer-task/${item?.id}/${item?.title}`}
                          >
                            {item.title}
                          </Link>
                        </td>
                        <td className="criterias text-primary">
                          <Link to={"/company-profile"}>{item.department}</Link>
                        </td>
                        <td className="date">
                          {item.updated && item.updated.split("T")[0]}
                        </td>
                        <td className="date">{item.post_status}</td>
                        <td className="job-links">
                          <Link
                            to={"#"}
                            onClick={() => {
                              setModalObj(item)
                              setModal(true)
                            }}
                          >
                            <i className="fa fa-eye"></i>
                          </Link>
                          <Link to={"#"}>
                            <i className="ti-trash"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

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

              {/* <div className="pagination-bx float-right">
                <ul className="pagination">
                  <li className="previous">
                    <Link
                      to={"#"}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        paginateBookmarks(previous)
                      }}
                    >
                      <i className="ti-arrow-left"></i> Prev
                    </Link>
                  </li>
                  <li className="active">
                    <Link to={""}>1</Link>
                  </li>
                  <li>
                    <Link to={""}>2</Link>
                  </li>
                  <li>
                    <Link to={""}>3</Link>
                  </li>
                  <li className="next">
                    <Link
                      to={"#"}
                      onClick={() => {
                        paginateBookmarks(next)
                      }}
                    >
                      Next <i className="ti-arrow-right"></i>
                    </Link>
                  </li>
                </ul>
              </div> */}
            </div>

            <Modal
              show={modal}
              onHide={setModal}
              className=" modal fade modal-bx-info"
            >
              <div className="modal-dialog  my-0 w-100" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="logo-img">
                      {/* <img
                              alt=""
                              src={require("../../../images/logo/icon2.png")}
                            /> */}
                    </div>
                    <h5 className="modal-title">Company Name</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setModal(false)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <ul>
                      <li>
                        <strong>Job Title :</strong>
                        <p> {modalObj?.title} </p>
                      </li>
                      <li>
                        <strong>Department :</strong>
                        <p>{modalObj?.department}</p>
                      </li>
                      <li>
                        <strong>Post Status :</strong>
                        <p>{modalObj?.post_status}</p>
                      </li>
                      <li>
                        <strong>Description :</strong>
                        <p>{modalObj?.description}</p>
                      </li>
                    </ul>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
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

export default TasksBookmark
