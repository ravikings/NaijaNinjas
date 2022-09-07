import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Header2 from "../../Layout/Header2";
import Footer from "../../Layout/Footer";
import ContactPage from "./ContractPage";
import { Alert, Modal } from "react-bootstrap";
import ProfileSidebar from "../../Element/Profilesidebar";
import DeleteIcon from "@material-ui/icons/Delete";
import createRequest, { axiosPrivate } from "../../../utils/axios";
import axios from "axios";
import moment from "moment";
import logo from "../../../images/logo/icon1.png";
import Ratings from "../MakeOffer/components/Ratings";
import { Button, IconButton } from "@material-ui/core";
import TimeLine from "./TimeLine";
import PaymentPage from "./PaymentPage";
import baseUrl from "../../../utils/baseUrl";

const postBox = [
  { image: logo },
  { image: logo },
  { image: logo },
  { image: logo },
  { image: logo },
  { image: logo },
];

function CompanyManageBids() {
  const location = useLocation();
  const [company, setCompany] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(null);
  const { id, title } = useParams();
  const [owner, setOwner] = useState("");
  const [data, setData] = useState([]);
  const taskId = location?.pathname?.split("/")[2];
  const [displayPage, setDisplayPage] = useState("");
  const [errorMes, setErrorMes] = useState("");

  const allData = () => {
    setLoading(true);
    createRequest()
      .get(`api/v1/task/task-bidding/?task=${id}`)
      .then((res) => {
        setTotalCount(res?.data?.count);
        setData(res.data.results);

        setLoading(false);
      })
      .catch((e) => {
        if (e.response?.status === 400) {
          console.log(e?.response?.data?.non_field_errors[0]);
        } else {
          console.log("Unknown Error");
        }
      });
  };
  useEffect(() => {
    allData();
  }, []);
  let token = `Bearer ` + localStorage.getItem("access_token");
  const displayPaymentPage = (item) => {
    //​ /api​/v1​/task​/approve-bid​/?id=${fid}&&task_id=${taskId} Method=get/post
    setLoading(true);

    axiosPrivate({
      method: "POST",
      url: `${baseUrl.baseURL}api/v1/task/approve-bid/?id=${item.id}&&task_id=${taskId}`,
      headers: {
        Authorization: token,
      },
    }).then(
      (response) => {
        console.log("the response is ", response);
        if (response.status === 201) {
          setLoading(false);
          setDisplayPage("contact");
        }
      },
      (error) => {
        console.log(error);
        setErrorMes("Something went wrong");
        setTimeout(() => {
          setErrorMes("");
        }, 2000);
      }
    );
  };
  const timeLinePage = (item) => {
    if (item) {
      setOwner(item.bidder_profile);
    }
    setDisplayPage("timeLine");
  };
  // const paymentPage = () => {
  //   setDisplayPage("payment");
  // };
  // const bidsPage = () => {
  //   setDisplayPage("");
  // };
  const dummyText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Mauris eget nulla eu nunc efficitur tincidunt.
    Nulla euismod, urna eu aliquet aliquet,
    nisi nunc ultricies nisi, euismod ornare nisl nunc euismod nisl.
    Mauris eget nulla eu nunc efficitur tincidunt.`;

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

                {displayPage === "" && (
                  <div className="col-xl-9 col-lg-8 m-b30">
                    <div className="job-bx browse-job clearfix">
                      <div className="job-bx-title  clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Manage Bids
                        </h5>
                        <div className="float-right">
                          <span className="select-title">
                            Sort by freshness
                          </span>
                          <select className="custom-btn">
                            <option>All</option>
                            <option>None</option>
                            <option>Read</option>
                            <option>Unread</option>
                            <option>Starred</option>
                            <option>Unstarred</option>
                          </select>
                        </div>
                      </div>
                      {errorMes && (
                        <Alert variant={"danger"} className="text-center mt-5">
                          {errorMes}
                        </Alert>
                      )}
                      <ul className="post-job-bx">
                        {data.length === 0
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
                                            src={item.bidder_info.photo}
                                          />
                                        </span>
                                      </Link>
                                    </div>
                                    <div className="job-post-info">
                                      <h4>
                                        <Link to={"/make-offer"}>
                                          {`${item.bidder_info[0].first_name} ${item.bidder_info[0].last_name}`}
                                        </Link>
                                      </h4>
                                      <Ratings />
                                      <div className="mt-3">
                                        {item.bid_approve_status ? (
                                          <Button
                                            style={{
                                              backgroundColor: "#2e55fa",
                                              color: "white",
                                            }}
                                            variant="outlined"
                                            startIcon={
                                              <i className="fa fa-check"></i>
                                            }
                                            onClick={() => timeLinePage(item)}
                                          >
                                            Show timeline
                                          </Button>
                                        ) : (
                                          <Button
                                            style={{
                                              backgroundColor: "#2e55fa",
                                              color: "white",
                                            }}
                                            variant="outlined"
                                            startIcon={
                                              <i className="fa fa-check"></i>
                                            }
                                            onClick={() =>
                                              displayPaymentPage(item)
                                            }
                                          >
                                            Accept offer
                                          </Button>
                                        )}

                                        <Button
                                          style={{
                                            backgroundColor: "#333333",
                                            color: "white",
                                          }}
                                          className="ml-2"
                                          variant="outlined"
                                          startIcon={
                                            <i className="fa fa-envelope"></i>
                                          }
                                        >
                                          Send message
                                        </Button>
                                        <IconButton
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
                                        </IconButton>
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
                                            {item.delivery_date
                                              ? moment(
                                                  item.delivery_date
                                                ).format("DD-MM-YYYY hh:mm:ss")
                                              : "0"}
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

                      {data.length === 0 ? (
                        ""
                      ) : (
                        <div className="pagination-bx m-t30 float-right">
                          <ul className="pagination">
                            <li className="previous">
                              <Link to={""}>
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
                              <Link to={""}>
                                Next <i className="ti-arrow-right"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}

                      <Modal
                        show={company}
                        onHide={setCompany}
                        className="modal fade modal-bx-info"
                      >
                        <div className="modal-dialog my-0" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <div className="logo-img">
                                <img
                                  alt=""
                                  src={require("../../../images/logo/icon2.png")}
                                />
                              </div>
                              <h5 className="modal-title">Company Name</h5>
                              <button
                                type="button"
                                className="close"
                                onClick={() => setCompany(false)}
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <ul>
                                <li>
                                  <strong>Job Title :</strong>
                                  <p> Web Developer – PHP, HTML, CSS </p>
                                </li>
                                <li>
                                  <strong>Experience :</strong>
                                  <p>5 Year 3 Months</p>
                                </li>
                                <li>
                                  <strong>Deseription :</strong>
                                  <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry has been
                                    the industry's standard dummy text ever
                                    since.
                                  </p>
                                </li>
                              </ul>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setCompany(false)}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </div>
                )}
                {displayPage === "timeLine" && (
                  <TimeLine id={taskId} task_owner={owner} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default CompanyManageBids;
