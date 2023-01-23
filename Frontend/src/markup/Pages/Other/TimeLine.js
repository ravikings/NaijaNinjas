import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Divider
} from "@material-ui/core";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import React, { useEffect, useState } from "react";
import TimelineFeedback from "../MakeOffer/components/TimelineFeedback";
import "../../../css/TimeLine.css";
import Rating from "@mui/material/Rating";
import {
  InputLabel,
  // TextareaAutosize,
  //   TextField,
  Typography,
} from "@mui/material";
import {
  Button,
  Form,
  // FormGroup, InputGroup
} from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import createRequest, { axiosPrivate } from "../../../utils/axios";
import baseUrl from "../../../utils/baseUrl";
import Header2 from "../../Layout/Header2";
import Footer from "../../Layout/Footer";
import ProfileSidebar from "../../Element/Profilesidebar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../../markup/Element/Loader";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { toast } from "react-toastify";
// 35 / 67

function TimeLine() {
  const userID = localStorage.getItem("userID");
  const [displayFormName, IsDisplayFormName] = useState("");
  const { userProfile } = useSelector((state) => state.authReducer);
  const [timeline_id, setTimeline_id] = useState("");
  // Milestone
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [milestoneAttach, setMilestoneAttach] = useState(null);

  // Delivery
  const [deliveryTitle, setDeliveryTitle] = useState("Service Delivered!");
  const [deliveryDes, setDeliveryDes] = useState("");
  const [deliveryAttach, setDeliveryAttach] = useState(null);

  const [reviewDes, setReviewDes] = useState("");
  const [budget, setBudget] = useState(false);
  const [time, setTime] = useState(false);
  const [rateValue, setRateValue] = useState(0);
  const { taskID, taskOwner } = useParams();
  const [loading, setLoading] = useState(false);
  const [timelineComment, setTimelineComment] = useState([]);
  const [error, setError] = useState("");
  const [author, setAuthor] = useState("");
  const [task_owner, setTask_owner] = useState("");
  const [task, setTask] = useState("");
  const [timelineStatus, settimelineStatus] = useState("");
  const [clientReview, setclientReview] = useState({});
  const [proReview, setproReview] = useState({});

  useEffect(() => {
    getTimeLineData();
  }, []);

  const getTimeLineData = () => {
    setLoading(true);
    axiosPrivate
      .get(`api/v1/task/get-timeline/${taskID}/${taskOwner}`)
      .then((res) => {
        const { timeline_comment, id, author, task_owner, status, task, client_reviews, pro_reviews
        } =
          res.data;
        setTimelineComment(timeline_comment);
        setLoading(false);
        setTimeline_id(id);
        settimelineStatus(status);
        setAuthor(author);
        setTask(task);
        setTask_owner(task_owner);
        setclientReview(client_reviews);
        setproReview(pro_reviews);
        //toast.success("Good to see you, welcome back!");
      })
      .catch((e) => {
        setLoading(false);
        setError(e.response?.data?.message || "Something went wrong");
        if (e.response?.status === 400) {
          console.log(e?.response?.data?.non_field_errors[0]);
        } else {
          console.log("Unknown Error");
        }
      });
  };
  const onClickOpenForm = (e, formName) => {
    e.preventDefault();
    IsDisplayFormName(formName);
  };
  const onClickCoseForm = (e) => {
    e.preventDefault();
    addDelivery();
  };
  const addMileStone = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("status", "PROGRESS");
    formdata.append("author", userProfile?.author);
    formdata.append("title", title);
    formdata.append("body", des);
    formdata.append("task_timeline", timeline_id);
    formdata.append("attachement", milestoneAttach);
    axiosPrivate
      .post(`${baseUrl.baseURL}api/v1/task/comment-timeline/`, formdata)
      .then(
        (response) => {
          console.log("the response is ", response);
          IsDisplayFormName("");
          setTitle("");
          setDes("");
          setMilestoneAttach(null);
          toast.success("Milestone Added Successfully");
          getTimeLineData();
        },
        (error) => {
          console.log({ error });
        }
      );
  };

  const addDelivery = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("status", "DELIVERED");
    formdata.append("author", userProfile?.author);
    formdata.append("title", deliveryTitle);
    formdata.append("body", deliveryDes);
    formdata.append("task_timeline", timeline_id);
    formdata.append("attachement", deliveryAttach);
    axiosPrivate
      .post(`${baseUrl.baseURL}api/v1/task/comment-timeline/`, formdata)
      .then(
        (response) => {
          console.log("the response is ", response);
          IsDisplayFormName("");
          setDeliveryTitle("");
          setDeliveryDes("");
          setDeliveryAttach(null);
          toast.success("Service Delivered Successfully");
          getTimeLineData();
        },
        (error) => {
          console.log({ error });
        }
      );
  };

  const addRequestRevision = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("status", "REVISION");
    formdata.append("author", userProfile?.author);
    formdata.append("body", deliveryDes);
    formdata.append("task_timeline", timeline_id);
    formdata.append("attachement", deliveryAttach);
    axiosPrivate
      .post(`${baseUrl.baseURL}api/v1/task/comment-timeline/`, formdata)
      .then(
        (response) => {
          IsDisplayFormName("");
          setDeliveryTitle("");
          setDeliveryDes("");
          setDeliveryAttach(null);
          toast.success("We apologize for any inconvenience, revison request inprogress.");
          getTimeLineData();
        },
        (error) => {
          console.log({ error });
        }
      );
  };

  const approveOrder = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("status", "APPROVED");
    formdata.append("task", timelineComment.id)
    formdata.append("task_owner", task_owner);
    axiosPrivate
      .post(
        `${baseUrl.baseURL}api/v1/task/approve-delivery/${e.target.id}`,
        formdata
      )
      .then(
        (response) => {
          setDeliveryAttach(null);
          toast.success("Thank you! order completed");
          // } else {
          //   toast.success("we are sorry for the inconvenience, Pro will get back ASAP!")
          // }
          getTimeLineData();
          console.log("the response is ", response);
        },
        (error) => {
          toast.error("sorry! service not available");
          console.log({ error });
        }
      );
  };

  const addReview = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("body", reviewDes);
    formdata.append("rating", rateValue);
    formdata.append("on_budget", budget === "Yes" ? true : false);
    formdata.append("on_time", time === "Yes" ? true : false);
    formdata.append("author", userProfile?.author);
    formdata.append("task", task);
    formdata.append("profile", task_owner);
    // formdata.append("profile", "");
    // axiosPrivate({
    //   method: "POST",
    //   url: `${baseUrl.baseURL}api/v1/account/client-review/`,
    //   data: formdata,
    //   headers: {
    //     Authorization: token,
    //   },
    // })
    axiosPrivate
      .post(`${baseUrl.baseURL}api/v1/account/client-review/`, formdata)
      .then(
        (response) => {
          IsDisplayFormName("");
          setReviewDes("");
          setBudget(false);
          setTime(false);
          setRateValue(0);
          toast.success("Thank you for your review, and making us better!");
          getTimeLineData();
        },
        (error) => {
          console.log({ error });
        }
      );
  };

  const downloadFile = async (e, item) => {
    e.preventDefault();
    console.log(item.id);
    console.log(item.id);
    console.log("item.id");
    // await axios({
    //   url:
    //     `${baseUrl.baseURL}api/v1/task/comment-timeline/${item.id}/file_download/`,
    //   method: "GET",
    //   responseType: "file"
    // }).then(response => {
    //   console.log(response);
    //   const url = window.URL.createObjectURL(new Blob([response.data]));
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.setAttribute("download", "file.png");
    //   document.body.appendChild(link);
    //   link.click();
    // });
  };
  // createRequest
  //   .get(`/api/v1/task/comment-timeline/${item.id}/file_download/`, responseType: "fil")
  //   .then(
  //     (response) => {
  //       console.log("the response is ", response)
  //     },
  //     (error) => {
  //       console.log({ error })
  //     }
  //   )
  // }

  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "done") {
      setDeliveryAttach(file);
    }
  };
  const handleMilestoneAttach = ({ meta, file }, status) => {
    if (status === "done") {
      setMilestoneAttach(file);
    }
  };

  const formCloseButton = () => {

  }

  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <ProfileSidebar />
                <div className="col-xl-9 col-lg-8 m-b30 timeline">
                  <div className="job-bx browse-job clearfix">
                    <div className="job-bx-title  clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Milestone Timeline
                      </h5>
                    </div>
                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <div className="text-center">
                        <h3 className="text-danger">{error}</h3>
                      </div>
                    ) : (
                      <form onSubmit={onClickCoseForm}>
                        {/* <div className="container mt-5 mb-5"> */}
                        <div className="container-fluid">
                          <div className="row">
                            <div className="uk-container uk-padding w-100">
                              <div className="uk-timeline">
                                {timelineComment.length > 0 &&
                                  timelineComment?.map((item, index) => (
                                    <div className="uk-timeline-item">
                                      <div className="uk-timeline-icon">
                                        <span
                                          className={`uk-badge ${item.status === "CONTRACT"
                                            ?  "btn-primary"
                                            : item.status === "PROGRESS"
                                              ? "btn-success"
                                              : item.status === "REVISION"
                                                ? "btn-warning"
                                                : "btn-danger"
                                            } `}
                                        >
                                          <span
                                            uk-icon={
                                              item.status === "CONTRACT"
                                                ? "clock"
                                                : item.status === "REVISION"
                                                  ? "clock"
                                                  : "check"
                                            }
                                          ></span>
                                        </span>
                                      </div>
                                      <div className="uk-timeline-content">
                                        <div className="uk-card uk-card-default uk-margin-medium-bottom uk-overflow-auto">
                                          <div className="uk-card-header">
                                            <div
                                              className="uk-grid-small uk-flex-middle d-flex flex-row"
                                              uk-grid
                                            >
                                              <h6 className="uk-card-title">
                                                <time datetime="2020-07-08">
                                                  {item.time_created.Updated
                                                    ? item.time_created.Updated
                                                    : item.time_created.Created}
                                                </time>
                                              </h6>
                                              <span
                                                className={`uk-label 
                                            ${item.status === "CONTRACT"
                                                    ? "uk-label"
                                                    : item.status === "PROGRESS"
                                                      ? "uk-label-success"
                                                      : item.status === "REVISION"
                                                        ? "uk-label-warning"
                                                        : "uk-label-danger"
                                                  }
                                             uk-margin-auto-left`}
                                              >
                                                {item.status}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="uk-card-body">
                                            <h6>{item.title}</h6>
                                            <p>{item.body}</p>
                                            <p
                                              onClick={(event) =>
                                                downloadFile(event, item)
                                              }
                                            >
                                              Attachment
                                              <span>
                                                {item?.attachment && (
                                                  <FileDownloadIcon
                                                    color="primary"
                                                    sx={{ fontSize: 30 }}
                                                    onClick={() =>
                                                      console.log(
                                                        "helllo file icon"
                                                      )
                                                    }
                                                  />
                                                )}
                                              </span>
                                            </p>
                                          </div>
                                          {item.status === "APPROVED" ? "" :
                                            item.status === "DELIVERED" &&
                                              author === userProfile?.author ? (
                                              <div className="container my-3 bg-light">
                                                <div className="col-md-12 text-center">
                                                  <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    id={item.id}
                                                    onClick={approveOrder}
                                                  >
                                                    Approve{" "}
                                                  </button>
                                                  <span>{"  "}</span>
                                                  <button
                                                    type="button"
                                                    className="btn btn-warning"
                                                    onClick={(e) =>
                                                      onClickOpenForm(
                                                        e,
                                                        "revision"
                                                      )
                                                    }
                                                  >
                                                    {" "}
                                                    Request revision{" "}
                                                  </button>
                                                </div>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                {timelineComment.length > 0 && (
                                  <div className="uk-timeline-item">
                                    <div className="uk-timeline-content">
                                      <div className="d-flex flex-row align-items-baseline">
                                        {/* <div className="mr-2"> */}
                                        <div className="container-fluid">
                                          <button
                                            type="button"
                                            class="btn btn-link"
                                          >
                                            <span
                                              class="uk-margin-small-right"
                                              uk-icon="triangle-down"
                                            ></span>
                                            Load More
                                          </button>
                                        </div>
                                        {timelineStatus === "APPROVED" ? "" : timelineStatus !== "DELIVERED" &&
                                          task_owner === userProfile?.author ? (
                                          <>
                                            <div className="mr-2">
                                              <button
                                                className="btn btn-success"
                                                onClick={(e) =>
                                                  onClickOpenForm(
                                                    e,
                                                    "milestone"
                                                  )
                                                }
                                              >
                                                Add Milestone
                                              </button>
                                            </div>
                                            <div className="mr-2">
                                              <button
                                                className="btn btn-danger"
                                                onClick={(e) =>
                                                  onClickOpenForm(e, "deliver")
                                                }
                                              >
                                                Deliver Service
                                              </button>
                                            </div>
                                          </>
                                        ) : (
                                          ""
                                        )}
                                        {clientReview ? "" : timelineStatus === "APPROVED" &&
                                          author === userProfile?.author ? (
                                          <div className="mr-2">
                                            <button
                                              className="btn btn-info"
                                              onClick={(e) =>
                                                onClickOpenForm(e, "review")
                                              }
                                            >
                                              Add Review
                                            </button>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Divider style={{ margin: "30px 0px" }} />
                        {console.log("im getting clientReview", clientReview)}
                        {clientReview ? <div className="card">
                          <div style={{ marginTop: 5 }}>
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
                              <h5 style={{ fontWeight: 400, margin: "0px 10px" }}>
                                Work Feedback
                              </h5>
                            </div>
                            <div className="container-fluid">
                              <TimelineFeedback data={clientReview} review={"client"} />
                            </div>
                            <div className="card-body">
                              <div className="col-md-12 text-center container-fluid">
                                {author === userProfile?.author ?
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    id={"1"}
                                    onClick={(e) =>
                                      onClickOpenForm(e, "review")
                                    }
                                  >
                                    Update review{" "}
                                  </button>
                                  : ""}
                                <span>{"  "}</span>
                                {clientReview && task_owner === parseInt(userID) ?
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={(e) =>
                                      onClickOpenForm(
                                        e,
                                        "pro-review"
                                      )
                                    }
                                  >
                                    {" "}
                                    Add review{" "}
                                  </button>
                                  : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                          : ""}
                        {proReview ?
                          <div className="card">
                            <div style={{ marginTop: 5 }}>
                              <div className="container-fluid">
                                <TimelineFeedback data={proReview} review={"professional"} />
                              </div>
                              <div className="card-body">
                                <a href="#" class="btn btn-primary">Update review</a>
                              </div>
                            </div>
                          </div>
                          : ""}
                        {displayFormName === "revision" && (
                          //<div className="container mt-5 mb-5 ml-20">
                          <div className="container-fluid">
                            <h3>Request Order revison</h3>
                            <Form onSubmit={addRequestRevision}>
                              <div>
                                <div className="form-group">
                                  <label>Description:</label>
                                  <textarea
                                    id="description"
                                    required
                                    value={deliveryDes}
                                    onChange={(e) =>
                                      setDeliveryDes(e.target.value)
                                    }
                                    placeholder="Enter description"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="m-b20">
                                <label>Deliverables:</label>
                                <Dropzone
                                  getUploadParams={getUploadParams}
                                  onChangeStatus={handleChangeStatus}
                                  accept="image/*"
                                />
                              </div>
                              <Button type="submit">Deliver Service</Button>
                            </Form>
                          </div>
                        )}
                        {displayFormName === "deliver" && (
                          <div className="container-fluid">
                            <h4>Add delivery information</h4>
                            <Form onSubmit={addDelivery}>
                              <div>
                                <div className="form-group">
                                  <label>Description:</label>
                                  <textarea
                                    id="description"
                                    required
                                    value={deliveryDes}
                                    onChange={(e) =>
                                      setDeliveryDes(e.target.value)
                                    }
                                    placeholder="Enter description"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="m-b20">
                                <label>Deliverables:</label>
                                <Dropzone
                                  getUploadParams={getUploadParams}
                                  onChangeStatus={handleChangeStatus}
                                  accept="image/*"
                                />
                              </div>
                              <Button type="submit">Deliver Service</Button>
                            </Form>
                          </div>
                        )}
                        {displayFormName === "review" && (
                          <div>
                            <div className="card">
                              <div class="card-header">
                                Leave a Review for this project
                              </div>
                              <div className="card-body">
                                <Form onSubmit={addReview}>
                                  <div>
                                    <FormControl>
                                      <FormLabel id="demo-row-radio-buttons-group-label">
                                        Was this delivered on budget?
                                      </FormLabel>
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                      >
                                        <FormControlLabel
                                          value="Yes"
                                          control={
                                            <Radio
                                              onChange={(e) =>
                                                setBudget(e.target.value)
                                              }
                                            />
                                          }
                                          label="Yes"
                                        />
                                        <FormControlLabel
                                          value="No"
                                          control={
                                            <Radio
                                              onChange={(e) =>
                                                setBudget(e.target.value)
                                              }
                                            />
                                          }
                                          label="No"
                                        />
                                      </RadioGroup>
                                    </FormControl>
                                  </div>
                                  <div>
                                    <FormControl>
                                      <FormLabel id="demo-row-radio-buttons-group-label">
                                        Was this delivered on time?
                                      </FormLabel>
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                      >
                                        <FormControlLabel
                                          value="Yes"
                                          control={
                                            <Radio
                                              onChange={(e) =>
                                                setTime(e.target.value)
                                              }
                                            />
                                          }
                                          label="Yes"
                                        />
                                        <FormControlLabel
                                          value="No"
                                          control={
                                            <Radio
                                              onChange={(e) =>
                                                setTime(e.target.value)
                                              }
                                            />
                                          }
                                          label="No"
                                        />
                                      </RadioGroup>
                                    </FormControl>
                                  </div>
                                  <div>
                                    <Typography component={InputLabel}>
                                      Your Rating
                                    </Typography>
                                    <Rating
                                      name="simple-controlled"
                                      value={rateValue}
                                      onChange={(event, newValue) => {
                                        setRateValue(newValue);
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <div className="form-group">
                                      <label>Description:</label>
                                      <textarea
                                        id="description"
                                        value={reviewDes}
                                        onChange={(e) =>
                                          setReviewDes(e.target.value)
                                        }
                                        placeholder="Enter description"
                                        className="form-control"
                                      />
                                    </div>
                                  </div>
                                  <Button type="submit">Leave a review</Button>
                                  <button
                                    className="btn btn-danger ml-2"
                                    onClick={() => onClickCoseForm()}
                                  >
                                    Cancel
                                  </button>
                                </Form>
                              </div>
                            </div>
                          </div>
                        )}
                        {displayFormName === "pro-review" && (
                          <div>
                            <div className="card">
                              <div class="card-header">
                                Leave a Review for client
                              </div>
                              <div className="card-body">
                                <Form onSubmit={addReview}>
                                  <div>
                                    <FormControl>
                                      <FormLabel id="demo-row-radio-buttons-group-label">
                                        Was this delivered on budget?
                                      </FormLabel>
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                      >
                                        <FormControlLabel
                                          value="Yes"
                                          control={
                                            <Radio
                                              onChange={(e) =>
                                                setBudget(e.target.value)
                                              }
                                            />
                                          }
                                          label="Yes"
                                        />
                                        <FormControlLabel
                                          value="No"
                                          control={
                                            <Radio
                                              onChange={(e) =>
                                                setBudget(e.target.value)
                                              }
                                            />
                                          }
                                          label="No"
                                        />
                                      </RadioGroup>
                                    </FormControl>
                                  </div>
                                  <div>
                                    <FormControl>
                                      <FormLabel id="demo-row-radio-buttons-group-label">
                                        Was this delivered on time?
                                      </FormLabel>
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                      >
                                        <FormControlLabel
                                          value="Yes"
                                          control={
                                            <Radio
                                              onChange={(e) =>
                                                setTime(e.target.value)
                                              }
                                            />
                                          }
                                          label="Yes"
                                        />
                                        <FormControlLabel
                                          value="No"
                                          control={
                                            <Radio
                                              onChange={(e) =>
                                                setTime(e.target.value)
                                              }
                                            />
                                          }
                                          label="No"
                                        />
                                      </RadioGroup>
                                    </FormControl>
                                  </div>
                                  <div>
                                    <Typography component={InputLabel}>
                                      Your Rating
                                    </Typography>
                                    <Rating
                                      name="simple-controlled"
                                      value={rateValue}
                                      onChange={(event, newValue) => {
                                        setRateValue(newValue);
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <div className="form-group">
                                      <label>Description:</label>
                                      <textarea
                                        id="description"
                                        value={reviewDes}
                                        onChange={(e) =>
                                          setReviewDes(e.target.value)
                                        }
                                        placeholder="Enter description"
                                        className="form-control"
                                      />
                                    </div>
                                  </div>
                                  <Button type="submit">Leave a review</Button>
                                  <button
                                    className="btn btn-danger ml-2"
                                    onClick={() => formCloseButton()}
                                  >
                                    Cancel
                                  </button>
                                </Form>
                              </div>
                            </div>
                          </div>
                        )}
                        {displayFormName === "milestone" && (
                          <div className="container mt-5 mb-5">
                            <form className="px-4 py-3">
                              <h3>Add Milestone</h3>
                              <div className="form-group">
                                <label for="title">Title</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="title"
                                  placeholder="Enter title"
                                  onChange={(e) => setTitle(e.target.value)}
                                  value={title}
                                />
                              </div>
                              <div className="form-group">
                                <label for="exampleDropdownFormPassword1">
                                  Description
                                </label>
                                <textarea
                                  className="form-control"
                                  //   required
                                  onChange={(e) => setDes(e.target.value)}
                                  placeholder="Enter description"
                                  rows="5"
                                >
                                  {des}
                                </textarea>
                              </div>

                              <div className="m-b20">
                                <label>Attachment:</label>
                                <Dropzone
                                  getUploadParams={getUploadParams}
                                  onChangeStatus={handleMilestoneAttach}
                                  accept="image/*"
                                />
                              </div>

                              <button
                                className="btn btn-primary"
                                onClick={(e) => addMileStone(e)}
                              >
                                Add
                              </button>
                              <button
                                className="btn btn-danger ml-2"
                                onClick={() => onClickCoseForm()}
                              >
                                Cancel
                              </button>
                            </form>
                          </div>
                        )}
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TimeLine;
