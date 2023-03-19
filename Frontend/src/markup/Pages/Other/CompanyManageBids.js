import React, { useState, useEffect } from "react"
import { Link, useHistory, useLocation, useParams } from "react-router-dom"
import Header2 from "../../Layout/Header2"
import Footer from "../../Layout/Footer"
import ContactPage from "./ContractPage"
import { Alert, Modal } from "react-bootstrap"
import ProfileSidebar from "../../Element/Profilesidebar"
import DeleteIcon from "@material-ui/icons/Delete"
import createRequest, { axiosPrivate } from "../../../utils/axios"
import axios from "axios"
import moment from "moment"
import logo from "../../../images/logo/icon1.png"
import Ratings from "../MakeOffer/components/Ratings"
import { Button, IconButton } from "@material-ui/core"
import TimeLine from "./TimeLine"
import PaymentPage from "./PaymentPageOld"
import baseUrl from "../../../utils/baseUrl"
import TestPayment from "./TestPayment"
import { toast } from "react-toastify"



function CompanyManageBids() {
  const location = useLocation()
  const [company, setCompany] = useState(false)
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(null)
  const { id, title } = useParams()
  const [owner, setOwner] = useState("")
  const [data, setData] = useState([])
  const taskId = location?.pathname?.split("/")[2]
  const [displayPage, setDisplayPage] = useState("")
  const [errorMes, setErrorMes] = useState("")
  const params = useParams()
  const history = useHistory()

  const allData = () => {
    setLoading(true)
    createRequest()
      .get(`api/v1/task/task-bidding/?task=${id}`)
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
        setLoading(false)
      })
  }
  useEffect(() => {
    allData()
  }, [])
  let token = `Token ` + localStorage.getItem("access_token")
  const displayPaymentPage = (item) => {
    //​ /api​/v1​/task​/approve-bid​/?id=${fid}&&task_id=${taskId} Method=get/post
    // setLoading(true)
    // return console.log(item, "item")
    history.push({
      pathname: `/manage-bids/${id}/${title}/confirm/${item?.id}`,
      state: { item },
    })
    // axiosPrivate({
    //   method: "POST",
    //   url: `${baseUrl.baseURL}api/v1/task/approve-bid/?id=${item.id}&&task_id=${taskId}`,
    //   headers: {
    //     Authorization: token,
    //   },
    // })
    // axiosPrivate
    //   .post(
    //     `${baseUrl.baseURL}api/v1/task/approve-bid/?id=${item.id}&&task_id=${taskId}`
    //   )
    //   .then(
    //     (response) => {
    //       console.log("the response is ", response)
    //       if (response.status === 201) {
    //         setLoading(false)
    //         setDisplayPage("contact")
    //       }
    //     },
    //     (error) => {
    //       console.log(error)
    //       setErrorMes("Something went wrong")
    //       setTimeout(() => {
    //         setErrorMes("")
    //       }, 2000)
    //     }
    //   )
  }
  const timeLinePage = (item) => {
    if (item) {
      setOwner(item.bidder_profile)
    }
    setDisplayPage("timeLine")
  }
  // const paymentPage = () => {
  //   setDisplayPage("payment");
  // };
  // const bidsPage = () => {
  //   setDisplayPage("");
  // };

  const rejectBid = (id) => {
    if (id) {
      setLoading(true)
      createRequest()
        .get(`/api/v1/task/reject-bid/${id}/`)
        .then((res) => {
          setLoading(false)
          toast.info(res.data.message)
        })
        .catch((e) => {
          console.log(e)
          setLoading(false)
        })
    }
  }

  return (
    <>
      <Header2 />

      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <ProfileSidebar showManageProp={true} active={"Manage jobs"} />
                {displayPage === "contact" && (
                  <ContactPage nextPage={timeLinePage} />
                )}
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx browse-job clearfix">
                    <div className="job-bx-title  clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Manage Bids
                      </h5>
                      {/* <div className="float-right">
                        <span className="select-title">Sort by freshness</span>
                        <select className="custom-btn">
                          <option>All</option>
                          <option>None</option>
                          <option>Read</option>
                          <option>Unread</option>
                          <option>Starred</option>
                          <option>Unstarred</option>
                        </select>
                      </div> */}
                    </div>
                    <ul className="post-job-bx">
                      {data?.length === 0
                        ? "Your task have no bids at the moment, kindly check by soon, Thank you!"
                        : data.map((item, index) => (
                          <li key={index}>
                            <div className="post-bx">
                              <div className="d-flex m-b30">
                                <div className="job-post-company">
                                  <Link to={""}>
                                    <span style={{ borderRadius: "50%" }}>
                                      <img
                                        alt=""
                                        src={item.bidder_info[0].photo}
                                      />
                                    </span>
                                  </Link>
                                </div>
                                <div className="job-post-info">
                                  <h4>
                                    <Link
                                      to={"#"}
                                      onClick={(e) => {
                                        e.preventDefault()
                                      }}
                                    >
                                      {`${item.bidder_info[0].first_name} ${item.bidder_info[0].last_name}`}
                                    </Link>
                                  </h4>
                                  <Ratings />
                                  <h6>{item.description}</h6>
                                  <div className="mt-3">
                                    {item.bid_approve_status === 'true' || "True" && item.payment_submitted === false ? (
                                      <><Button
                                        style={{
                                          backgroundColor: "#2e55fa",
                                          color: "white",
                                        }}
                                        onClick={() => displayPaymentPage(item)}
                                        variant="outlined"
                                        startIcon={<i className="fa fa-check"></i>}
                                      >
                                        Make payment
                                      </Button></>
                                    ) :
                                    item.bid_approve_status === 'true' || "True" ? (
                                      <><Button
                                        style={{
                                          backgroundColor: "#2e55fa",
                                          color: "white",
                                        }}
                                        onClick={() => history.push(
                                          `/timeline/${item.task}/${item.bidder_info[0].author}`
                                        )}
                                        variant="outlined"
                                        startIcon={<i className="fa fa-check"></i>}
                                      >
                                        Show Timeline
                                      </Button><Button
                                        style={{
                                          backgroundColor: "#333333",
                                          color: "white",
                                        }}
                                        className="ml-2"
                                        variant="outlined"
                                        startIcon={<i className="fas fa-info-circle"></i>}
                                      >
                                          {item.task_status[0]?.status}
                                        </Button></>
                                    ) : (
                                      <>
                                        {item.bid_approve_status === "reject" || "Reject" ? (<Button disabled style={{
                                          backgroundColor: "#E4A11B",
                                          color: "black",
                                        }}> Rejected</Button>) : (
                                          <><Button
                                            style={{
                                              backgroundColor: "#2e55fa",
                                              color: "white",
                                            }}
                                            onClick={() => displayPaymentPage(item)}
                                            variant="outlined"
                                            startIcon={<i className="fa fa-check"></i>}
                                          >
                                            Accept offer
                                          </Button><Button
                                            className="ml-2"
                                            style={{
                                              backgroundColor: "#E4A11B",
                                              color: "black",
                                            }}
                                            onClick={() => rejectBid(item.id)}
                                          >Reject offer</Button></>
                                        )}</>
                                    )}
                                    {/* <Button
                                      style={{
                                        backgroundColor: "#333333",
                                        color: "white",
                                      }}
                                      className="ml-2"
                                      variant="outlined"
                                      startIcon={
                                        <i className="fas fa-info-circle"></i>
                                      }
                                    >
                                      {item.task_status[0]?.status} 
                                    </Button> */}
                                    {/* <IconButton
                                      className="ml-2"
                                      style={{
                                        backgroundColor: "#eeeeee",
                                        borderRadius: "10px",
                                        height: "40px",
                                        width: "40px",
                                      }}
                                      aria-label="delete"
                                      size="large"
                                    >
                                      <i className="fa fa-trash"></i>
                                    </IconButton> */}
                                  </div>
                                </div>
                                <div className="rates">
                                  <ul className="dashboard-task-info bid-info">
                                    <li>
                                      <strong>${item.offer}</strong>
                                      <span>Fixed Price</span>
                                    </li>
                                    <li>
                                      <strong>
                                        {item.task_delivery_date
                                          ? item.task_delivery_date
                                          : " "}
                                      </strong>
                                      <span>Delivery Time</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
export default CompanyManageBids
