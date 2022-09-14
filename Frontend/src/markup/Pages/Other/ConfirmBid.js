import React, { useState, useEffect } from "react"
import { Link, useParams, useHistory, useLocation } from "react-router-dom"
import Header from "../../Layout/Header"
import Footer from "../../Layout/Footer"
import ClipLoader from "react-spinners/ClipLoader"
import { Badge, Modal } from "react-bootstrap"
import { Divider } from "@material-ui/core"
import createRequest from "../../../utils/axios"
import axios from "axios"
import "react-dropzone-uploader/dist/styles.css"
import Dropzone from "react-dropzone-uploader"
import url from "../../../utils/baseUrl"
import swal from "sweetalert"
import { useDispatch } from "react-redux"
import { authActionTypes } from "../Auth/Redux/AuthActions"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import useAuth from "../../../hooks/useAuth"
import "bootstrap-icons/font/bootstrap-icons.css"
import baseUrl from "../../../utils/baseUrl"
import PaymentPage from "./PaymentPage"
import { Payment } from "@mui/icons-material"

function ConfirmBid() {
  // const axiosPrivate = useAxiosPrivate()
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()
  const taskId = location?.pathname?.split("/")[2]
  const auth = useAuth()
  const [freelancerAmount, setFreelancerAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [gigxFee, setGigxFee] = useState(null)
  const [salesTax, setSalesTax] = useState(0)
  const [clientAmount, setClientAmount] = useState(0)
  const [cover, setCover] = useState("")
  const [deliveryTime, setDeliveryTime] = useState("")
  const [date, setDate] = useState("")
  const [attachment, setAttachment] = useState(null)
  const [attachmentVal, setAttachmentVal] = useState(null)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [attachFile, setAttachFile] = useState(null)
  const [payment, setPayment] = useState(false)
  const [email, setEmail] = useState("")
  const [reference, setReference] = useState("")
  const [timeline_id, setTimeline_id] = useState("")
  const [taskID, setTaskID] = useState("")
  const [taskOwner, setTaskOwner] = useState("")
  const axiosPrivate = useAxiosPrivate()

  let { id, bidId } = useParams()
  console.log("BID ID", bidId)

  const [data, setData] = useState([])

  useEffect(() => {
    if (location.state.item) {
      console.log(location.state.item, "location.state.item")
      const date = location.state.item.delivery_date.split("T")[0]
      setDate(date)
      setCover(location.state.item.description)
      setClientAmount(location.state.item.offer)
      setReference(location.state.item.transaction_id)
      ClientTexCalculator(location.state.item.offer)
      setImage(location.state.item.attachment)

      setTaskID(location.state.item.task)
      setTaskOwner(location.state.item.bidder_info[0].author)
      console.log(location.state.item.offer)
    }
  }, [location.state.item])

  // useEffect(() => {
  //   if (clientAmount) {
  //   }
  // }, [clientAmount])

  useEffect(() => {
    if (freelancerAmount) {
      FreelancerTexCalculator(freelancerAmount)
    }
  }, [freelancerAmount])

  const ClientTexCalculator = (e) => {
    setClientAmount(e)
    let fee = (e * 1.5) / 100
    let salesTax = (e * 7.5) / 100
    setSalesTax(salesTax)
    setGigxFee(fee)
    setTotalAmount(e + fee + salesTax)
  }

  const FreelancerTexCalculator = (e) => {
    let x = parseFloat(e)
    setFreelancerAmount(x)
    let fee = (20 / 100) * x
    if (fee >= 0) {
      setGigxFee(fee.toFixed(1))
    } else {
      setGigxFee(0)
    }
    // setClientAmount(parseFloat(x + fee))
  }

  // Make payment
  const makePayment = () => {
    //​ /api​/v1​/task​/approve-bid​/?id=${fid}&&task_id=${taskId} Method=get/post
    // setLoading(true)

    axiosPrivate
      .post(
        `${baseUrl.baseURL}api/v1/task/approve-bid/?id=${bidId}&&task_id=${taskId}`
      )
      .then(
        (response) => {
          console.log("the response is ", response)
          console.log(response.data.id)
          setTimeline_id(response.data.id)
          setPayment(true)
          setEmail(response.data.payment_email)
        },
        (error) => {
          console.log(error)
        }
      )
  }
  useEffect(() => {
    console.log("timeline_id", timeline_id)
  }, [timeline_id])

  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <div className="container">
          <div className="row">
            <div className="col-md-9  m-t40">
              <h1 className="contract-title">Approve Proposal</h1>
              <form
                className="contract-form"
                onSubmit={() => console.log("Submit")}
              >
                {/* contract Client Requirements start */}
                <div className="container-data m-b20">
                  {/* contract Header start */}
                  <div class="contract-header">
                    <h2 class="mb-0">Job Details details</h2>
                  </div>
                  {/* contract header end */}

                  {/* contract section start */}
                  <div className="contract-section">
                    <div class="contract-client-name">
                      <h6 class="break">{data?.title}</h6>
                      <div className="mt-3 mb-4">{data?.description}</div>
                      <Divider />
                      <h4 className="panel-title mt-3">Skills and expertise</h4>

                      <div className="d-flex">
                        {data?.tags?.split(",")?.map((e) => (
                          <Badge>{e}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* contract section start */}
                </div>
                {/* contract Client Requirements end */}
                {/* Delivery date section start */}
                <div className="container-data m-b20">
                  {/* contract Header start */}
                  <div class="contract-header">
                    <h2 class="mb-0">Delivery Time</h2>
                  </div>
                  {/* contract header end */}
                  {/* contract section start */}
                  <div className="contract-section">
                    <div class="contract-client-name">
                      <div className="row contract-amount ">
                        <div className="col-md-6 ">
                          <p className="fw7 mt-3">
                            How much time it will take to you to complete this
                            task (in days)
                          </p>
                        </div>
                        <div className="col-md-6">
                          <div className="input-group">
                            {date && (
                              <p className="border-left-0 border p-2 mt-2 fw8 ">
                                {date}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* contract section start */}
                </div>
                {/* Delivery date section end */}
                {/* contract Details Start */}
                <div className="container-data m-b20">
                  {/* contract Header start */}
                  <div class="contract-header">
                    <h2 class="mb-0">Cover Letter </h2>
                  </div>
                  {/* contract header end */}

                  {/* contract section start */}
                  <div className="form-group mb-10">
                    <p className="p-4">{cover}</p>
                  </div>
                  {/* contract section start */}
                </div>
                {/* contract Details end */}

                <div className="container-data m-b20">
                  {/* contract Header start */}
                  <div class="contract-header">
                    <h2 class="mb-0">Attachment </h2>
                  </div>
                  {/* contract header end */}

                  {/* contract section start */}
                  <div className="form-group mb-10">
                    <img src={image} alt="" width={"100%"} />
                    <p class="ml-1">{attachmentVal}</p>
                  </div>

                  {/* contract section start */}
                </div>

                {/* contract Price Start */}
                <div className="container-data m-b20">
                  {/* contract Header start */}
                  <div class="contract-header">
                    <h2 class="mb-0">Contract Amount</h2>
                  </div>
                  {/* contract header end */}

                  {/* contract section start */}
                  <div className="contract-section col-md-7">
                    <div className="row contract-amount mb-4">
                      <div className="col-md-6 ">
                        <strong>Bid</strong>
                        <div className="p-0 contract-amount-caption">
                          Total amount the client will see
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-group">
                          <h6 className="mt-3">
                            <strong> $ {clientAmount}</strong>
                          </h6>
                        </div>
                      </div>
                    </div>

                    <div className="row contract-amount mb-4">
                      <div className="col-md-6 ">
                        <strong>Service Fee</strong>
                      </div>
                      <div className="col-md-6 ">
                        <h6>
                          <strong> $ {gigxFee}</strong>
                        </h6>
                      </div>
                    </div>

                    <div className="row contract-amount mb-4">
                      <div className="col-md-6 ">
                        <strong>Sales Tax</strong>
                      </div>
                      <div className="col-md-6 ">
                        <h6>
                          <strong> $ {salesTax}</strong>
                        </h6>
                      </div>
                    </div>

                    <div className="row contract-amount m-t30">
                      <div className="col-md-6 ">
                        <strong>Total Amount</strong>
                        <div className="p-0 contract-amount-caption">
                          The estimated amount you'll receive after service fees
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h6>
                          <strong> $ {totalAmount.toFixed(2)}</strong>
                        </h6>
                      </div>
                    </div>
                  </div>
                  {/* contract section start */}
                </div>
                {/* contract price end */}

                {/* contract send button Start */}
                <div className="container-data m-b20">
                  {/* contract section start */}
                  <div className="contract-section col-md-7">
                    <button
                      type="button"
                      className="btn btn-outline-primary ml-4"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={makePayment}
                      className="site-button ml-4"
                    >
                      Make Payment
                    </button>
                  </div>
                  {/* contract section start */}
                </div>
                {/* contract send button end */}
              </form>
            </div>
            <div className="col-md-3 m-t40">
              <div className="">
                <div className="ads-sidebar-heading">
                  <h4 className="panel-title">
                    <a>Saftey Tips </a>
                  </h4>
                </div>
                <div className="ads-sidebar-content">
                  <p className="lead">
                    Posting an ad on <a href="#">GigxNow</a> is free! However,
                    all ads must follow our rules:
                  </p>
                  <ol>
                    <li>Make sure you post in the correct category.</li>
                    <li>
                      Do not post the same ad more than once or repost an ad
                      within 48 hours.
                    </li>
                    <li>Do not upload pictures with watermarks.</li>
                    <li>
                      Do not post ads containing multiple items unless it's a
                      package deal.
                    </li>
                    <li>
                      Do not put your email or phone numbers in the title or
                      description.
                    </li>
                    <li>Make sure you post in the correct category.</li>
                    <li>
                      Do not post the same ad more than once or repost an ad
                      within 48 hours.
                    </li>
                    <li>Do not upload pictures with watermarks.</li>
                    <li>
                      Do not post ads containing multiple items unless it's a
                      package deal.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaymentPage
        start={payment}
        reference={reference}
        amount={totalAmount}
        email={email}
        timeline_id={timeline_id}
        timeline_page={
          [
            taskID,
            taskOwner
          ]
        }
        stop={() => {
          setPayment(false)
        }}
      />
      {/* <Modal show={false}></Modal> */}

      <Footer />
    </>
  )
}
export default ConfirmBid
