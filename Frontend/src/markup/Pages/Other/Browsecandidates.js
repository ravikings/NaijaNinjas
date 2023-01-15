import React, { useState, useEffect } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import Header from "../../Layout/Header"
import Footer from "../../Layout/Footer"
import PageTitle from "../../Layout/PageTitle"
import Jobfindbox from "../../Element/Jobfindbox"
import Pagination from "react-js-pagination"
import Accordsidebar from "../../Element/Accordsidebar"
import createRequest from "../../../utils/axios"
import ClipLoader from "react-spinners/ClipLoader"
import { useDispatch, useSelector } from "react-redux"
//Images
import logo from "../../../images/logo/icon1.png"
import { Badge } from "react-bootstrap"
import { toast } from "react-toastify"
import CandidatesSidebar from "../../Element/CandidatesSidebar"
import queryString from "query-string"

var bnr = require("../../../images/banner/bnr1.jpg")

function BrowseCandidates() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [totalCount, setTotalCount] = useState(null)
  const [activePage, SetActivePage] = useState(1)
  const [checkBookmark, setCheckBookmark] = useState({})
  const { currentUser, userProfile } = useSelector(
    (state) => state.authReducer
  )
  const userID = localStorage.getItem("userID");

  const { title, sector } = queryString.parse(window.location.search)
  const allData = async () => {
    setLoading(true)
    var params
    if (title && sector) {
      params = {
        search: title,
        sector: sector,
      }
    }
    if (title && !sector) {
      params = {
        search: title,
      }
    }
    if (!title && sector) {
      params = {
        sector: sector,
      }
    }
    if (!title && !sector) {
      params = {}
    }

    try {
      const res = await createRequest().get("/api/v1/account/search/", {
        params,
      })
      //   data.next ? setNext(data.next) : setNext(null)
      //   data.previous ? setPrevious(data.previous) : setPrevious(null)
      //   const pgs = Math.ceil(data.count / 10)
      //   data.count && setCount(pgs)
      //   setKeyLoad(false)
      //   console.log(data, "data")
      setTotalCount(res?.data?.count)
      setData(res.data.results)
      setLoading(false)
    } catch (e) {
      if (e.response?.status === 400) {
        console.log(e?.response?.data?.non_field_errors[0])
      } else {
        console.log("Unknown Error")
      }
    }
  }
  useEffect(() => {
    allData()
  }, [])

  // useEffect(() => {
  //   console.log("use effect");
  //   console.log(data);
  // }, [data])

  const handleFilter = async (params) => {
    window.scrollTo(0, 0)
    setLoading(true)

    try {
      const res = await createRequest().get(`/api/v1/account/search/?${params}`)
      //   data.next ? setNext(data.next) : setNext(null)
      //   data.previous ? setPrevious(data.previous) : setPrevious(null)
      //   const pgs = Math.ceil(data.count / 10)
      //   data.count && setCount(pgs)
      //   setKeyLoad(false)
      //   console.log(data, "data")
      setTotalCount(res?.data?.count)
      setData(res.data.results)
      setLoading(false)
    } catch (e) {
      if (e.response?.status === 400) {
        console.log(e?.response?.data?.non_field_errors[0])
      } else {
        console.log("Unknown Error")
      }
    }
  }

  const handleBookmark = async (id, index) => {
    const record = data[index].bookmarks
    if (record.includes(id)) {
      let index = record.indexOf(id);
      record.splice(index, 1)
      checkBookmark[index]=false;
    } else {
      record.push(id);
      checkBookmark[index]=true;
    }
    data[index].bookmarks = record
    console.log("heeeeh")
    console.log(data[index].bookmarks)
    console.log(index, data)
    try {
      const { data } = await createRequest().post(
        `/api/v1/profile-bookmark/${id}/`
      )
      //toast.success(data.message)
    } catch (error) {
      //toast.error(error.response.data.message || "Service not available")
    }
    //allData()
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
                <CandidatesSidebar handleFilter={handleFilter} />
                {!loading ? (
                  <div className="col-xl-9 col-lg-8 col-md-7">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        {totalCount} Professionals Found
                      </h5>
                    </div>
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
                                      <span className="ml-1">
                                        {(`" "`, item.salary)}
                                      </span>
                                    </div>
                                  )}

                                  <ul>
                                    <li>
                                      <i className="fa fa-map-marker "></i>{" "}
                                      {item.location}{" "}
                                      {item.city && ", " + item.city}{" "}
                                      {item.city && item.country}
                                    </li>
                                    <li>
                                      <i className="fa fa-usd"></i> Full Time
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
                              {currentUser ? (
                                <label className="like-btn">
                                  {item.bookmarks.includes(parseInt(userID)) ? setCheckBookmark[index] = true  : setCheckBookmark[index] = false}
                                  <input
                                    type="checkbox"
                                    checked={checkBookmark[index]}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleBookmark(item.author, index)
                                    }}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              ) : ""}
                            </div>
                          </Link>
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
export default BrowseCandidates
