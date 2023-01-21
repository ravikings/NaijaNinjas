import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../../Layout/Header"
import Footer from "../../Layout/Footer"
import PageTitle from "../../Layout/PageTitle"
import Jobfindbox from "../../Element/Jobfindbox"
import Pagination from "react-js-pagination"
import Accordsidebar from "../../Element/Accordsidebar"
import createRequest from "../../../utils/axios"
import ClipLoader from "react-spinners/ClipLoader"
//Images
import logo from "../../../images/logo/icon1.png"
import { Badge } from "react-bootstrap"
import { toast } from "react-toastify"
import TaskSidebar from "../../Element/TaskSidebar"
var bnr = require("../../../images/banner/bnr1.jpg")

function Browsejobfilterlist() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [totalCount, setTotalCount] = useState(null)
  const [activePage, SetActivePage] = useState(1)
  const allData = async (page = 1) => {
    setLoading(true)
    await createRequest()
      .get(`api/v1/task/task/?page=${page}`)
      .then((res) => {
        setTotalCount(res?.data?.count)
        setData(res.data.results)

        setLoading(false)
      })
      .catch((e) => {
        if (e.response?.status === 400) {
          console.log(e?.response?.data?.non_field_errors[0])
        } else {
          console.log("Unknown Error")
        }
      })
  }
  const handleFilter = async (query) => {
    window.scrollTo(0, 0)
    setLoading(true)
    await createRequest()
      .get(`/api/v1/task/search-task/?${query}`)
      .then((res) => {
        setTotalCount(res?.data?.count)
        setData(res.data.results)

        setLoading(false)
      })
      .catch((e) => {
        if (e.response?.status === 400) {
          console.log(e?.response?.data?.non_field_errors[0])
        } else {
          console.log("Unknown Error")
        }
      })
  }
  useEffect(() => {
    allData()
  }, [])

  const handleBookmark = async (id) => {
    try {
      const { data } = await createRequest().post(
        `/api/v1/task/task-bookmark/${id}/`
      )
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong")
    }
  }

  // paginate function start
  const Paginate = (page) => {
    SetActivePage(page)
    allData(page)
    window.scrollTo(0, 0)
  }
  // paginate function end

  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <Jobfindbox style={{ marginTop: "80px" }} />
        <div className="content-block">
          <div className="section-full browse-job p-b50">
            <div className="container">
              <div className="row">
                <TaskSidebar handleFilter={handleFilter} />
                {!loading ? (
                  <div className="col-xl-9 col-lg-8 col-md-7">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        {data?.length} Tasks Found
                      </h5>
                    </div>
                    <ul className="post-job-bx">
                      {data?.map((data, index) => (
                        <li key={index}>
                          <div className="post-bx">
                            <div className="d-flex m-b30">
                              <div className="job-post-company">
                                <Link to={""}>
                                  <span>
                                    <img alt="" src={logo} />
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
                                  {data?.description?.substring(0, 150)} ...
                                  {"  "}
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
                                  {data?.tags?.split(",")?.map((e) => (
                                    <Badge>{e}</Badge>
                                  ))}
                                </div>
                                {/* <Link to={""}>
                                <span>Full Time</span>
                              </Link> */}
                              </div>

                              <div className="salary-bx d-flex flex-column text-center">
                                <span>
                                  $ {data?.minimum_salary} - ${" "}
                                  {data?.maximum_salary}
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
                                  <button className="site-button btn-block" >
                                    Show Interest
                                  </button>
                                </Link>
                              </div>
                            </div>
                            {/* <label className="like-btn">
                              <input
                                type="checkbox"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleBookmark(data.id)
                                }}
                              />
                              <span className="checkmark"></span>
                            </label> */}
                          </div>
                        </li>
                      ))}
                    </ul>
                    {/* pagination place start */}
                    <div className="mx-auto text-center m-t30">
                      {totalCount >= 10 ? (
                        <Pagination
                          activePage={activePage}
                          itemsCountPerPage={10}
                          totalItemsCount={totalCount}
                          pageRangeDisplayed={5}
                          onChange={Paginate.bind(this)}
                          prevPageText="⇐ Prev"
                          nextPageText="Next ⇒"
                          firstPageText="◀"
                          lastPageText="▶"
                        />
                      ) : null}
                    </div>

                    {/* pagination place end */}
                  </div>
                ) : (
                  <div className="loader mx-auto">
                    <ClipLoader color={"#2e55fa"} loading={true} size={150} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Browsejobfilterlist
