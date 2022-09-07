import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
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
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import createRequest, { axiosPrivate } from "../../../utils/axios";
import baseUrl from "../../../utils/baseUrl";

function TimeLine(props) {
  const [displayFormName, IsDisplayFormName] = useState("");
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [reviewDes, setReviewDes] = useState("");
  const [budget, setBudget] = useState(false);
  const [time, setTime] = useState(false);
  const [rateValue, setRateValue] = useState(0);

  let token = `Bearer ` + localStorage.getItem("access_token");
  let userId = localStorage.getItem("userID");
  useEffect(() => {
    getTimeLineData();
  }, []);
  const getTimeLineData = () => {
    createRequest()
      .get(`api/v1/task/get-timeline/${props.id}/${props.task_owner}`)
      .then((res) => {
        console.log("res", res);
      })
      .catch((e) => {
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
    IsDisplayFormName("");
  };
  const addMileStone = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("status", "CONTRACT");
    formdata.append("title", title);
    // IsDisplayFormName("");
    axiosPrivate({
      method: "POST",
      url: `${baseUrl.baseURL}api/v1/account/client-review/`,
      data: formdata,
      headers: {
        Authorization: token,
      },
    }).then(
      (response) => {
        console.log("the response is ", response);
        IsDisplayFormName("");
        setTitle("");
      },
      (error) => {
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
    formdata.append("author", userId);
    // formdata.append("profile", "");
    axiosPrivate({
      method: "POST",
      url: `${baseUrl.baseURL}api/v1/account/client-review/`,
      data: formdata,
      headers: {
        Authorization: token,
      },
    }).then(
      (response) => {
        console.log("the response is ", response);
        IsDisplayFormName("");
        setReviewDes("");
        setBudget(false);
        setTime(false);
        setRateValue(0);
      },
      (error) => {
        console.log({ error });
      }
    );
  };

  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(file);
  };
  return (
    <>
      <div className="col-xl-9 col-lg-8 m-b30 timeline">
        <div className="job-bx browse-job clearfix">
          <div className="job-bx-title  clearfix">
            <h5 className="font-weight-700 pull-left text-uppercase">
              Milestone Timeline
            </h5>
          </div>
          <form onSubmit={onClickCoseForm}>
            <div className="container mt-5 mb-5">
              <div className="row">
                <div className="uk-container uk-padding">
                  <div className="uk-timeline">
                    <div className="uk-timeline-item">
                      <div className="uk-timeline-icon">
                        <div className="uk-badge">
                          <span uk-icon="check"></span>
                        </div>
                      </div>
                      <div className="uk-timeline-content">
                        <div className="uk-card uk-card-default uk-margin-medium-bottom uk-overflow-auto">
                          <div className="uk-card-header">
                            <div
                              className="uk-grid-small uk-flex-middle d-flex flex-row"
                              uk-grid
                            >
                              <h3 className="uk-card-title">
                                <time datetime="2020-07-08">July 8</time>
                              </h3>
                              <span className="uk-label uk-label-success uk-margin-auto-left">
                                Feature
                              </span>
                            </div>
                          </div>
                          <div className="uk-card-body">
                            <p className="uk-text-success">
                              Fully responsive timeline you can add to your
                              UIkit 3 project
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="uk-timeline-item">
                      <div className="uk-timeline-icon">
                        <span className="uk-badge">
                          <span uk-icon="check"></span>
                        </span>
                      </div>
                      <div className="uk-timeline-content">
                        <div className="uk-card uk-card-default uk-margin-medium-bottom uk-overflow-auto">
                          <div className="uk-card-header">
                            <div
                              className="uk-grid-small uk-flex-middle d-flex flex-row"
                              uk-grid
                            >
                              <h3 className="uk-card-title">
                                <time datetime="2020-07-07">July 7</time>
                              </h3>
                              <span className="uk-label uk-label-warning uk-margin-auto-left">
                                Test
                              </span>
                            </div>
                          </div>
                          <div className="uk-card-body">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt.
                            </p>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt.
                            </p>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="uk-timeline-item">
                      <div className="uk-timeline-icon">
                        <span className="uk-badge btn-warning">
                          <span uk-icon="clock"></span>
                        </span>
                      </div>
                      <div className="uk-timeline-content">
                        <div className="uk-card uk-card-default uk-margin-medium-bottom uk-overflow-auto">
                          <div className="uk-card-header">
                            <div
                              className="uk-grid-small uk-flex-middle d-flex flex-row"
                              uk-grid
                            >
                              <h3 className="uk-card-title">
                                <time datetime="2020-07-06">July 6</time>
                              </h3>
                              <span className="uk-label uk-label-danger uk-margin-auto-left">
                                Fix
                              </span>
                            </div>
                          </div>
                          <div className="uk-card-body">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt.
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-baseline">
                          <div className="mr-2">
                            <button type="button" class="btn btn-link">
                              <span
                                class="uk-margin-small-right"
                                uk-icon="triangle-down"
                              ></span>
                              Load More
                            </button>
                          </div>
                          {/* {displayFormName === "" && ( */}
                          <div className="mr-2">
                            <button
                              className="btn btn-primary"
                              onClick={(e) => onClickOpenForm(e, "milestone")}
                            >
                              Add Milestone
                            </button>
                          </div>
                          {/* )} */}
                          {/* {displayFormName === "" && (
                            <div className="mr-2">
                              <button
                                className="btn btn-warning"
                                onClick={(e) => onClickOpenForm(e, "comment")}
                              >
                                Add Comment
                              </button>
                            </div>
                          )} */}
                          <div className="mr-2">
                            <button
                              className="btn btn-info"
                              onClick={(e) => onClickOpenForm(e, "review")}
                            >
                              Add Review
                            </button>
                          </div>
                          <div className="mr-2">
                            <button
                              className="btn btn-success"
                              onClick={(e) => onClickOpenForm(e, "deliver")}
                            >
                              Deliver Service
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {displayFormName === "deliver" && (
              <div className="container mt-5 mb-5 ml-20">
                <h3>Deliver Service</h3>
                <Form onSubmit={onClickCoseForm}>
                  <div>
                    {/* <FormControl
                      style={{ marginBottom: "2rem", marginTop: "1rem" }}
                    >
                      <FormLabel id="commentDescription">Comment</FormLabel>
                      <TextareaAutosize
                        aria-labelledby="commentDescription"
                        minRows={3}
                        style={{ width: 250 }}
                      />
                    </FormControl> */}
                    <div className="form-group">
                      <label>Description:</label>
                      <textarea
                        id="description"
                        // value={formik.values["description"]}
                        // onChange={formik.handleChange}
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
              <div className="container mt-5 mb-5 ml-20">
                <h3>Leave a Review</h3>
                <p>
                  Rate Peter Valentín for the project Simple Chrome Extension
                </p>
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
                              onChange={(e) => setBudget(e.target.value)}
                            />
                          }
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={
                            <Radio
                              onChange={(e) => setBudget(e.target.value)}
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
                            <Radio onChange={(e) => setTime(e.target.value)} />
                          }
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={
                            <Radio onChange={(e) => setTime(e.target.value)} />
                          }
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div>
                    <Typography component={InputLabel}>Your Rating</Typography>
                    <Rating
                      name="simple-controlled"
                      // value={rateValue}
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
                        // value={reviewDes}
                        onChange={(e) => setReviewDes(e.target.value)}
                        placeholder="Enter description"
                        className="form-control"
                      />
                    </div>
                    {/* <FormControl
                      style={{ marginBottom: "2rem", marginTop: "1rem" }}
                    >
                      <FormLabel id="description">Description</FormLabel>
                      <TextareaAutosize
                        aria-labelledby="description"
                        minRows={3}
                        style={{ width: 250 }}
                      />
                    </FormControl> */}
                  </div>
                  <Button type="submit">Leave a review</Button>
                </Form>
              </div>
            )}
            {displayFormName === "milestone" && (
              <div className="container mt-5 mb-5">
                <form className="px-4 py-3">
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
        </div>
      </div>
    </>
  );
}

export default TimeLine;
