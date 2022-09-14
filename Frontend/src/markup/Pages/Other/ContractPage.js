import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";

import { useDropzone } from "react-dropzone";
import { usePaystackPayment } from "react-paystack";
import "../../../css/TimeLine.css";
import { axiosPrivate } from "../../../utils/axios";
import baseUrl from "../../../utils/baseUrl";

function ContractPage(props) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const config = {
    reference: new Date().getTime().toString(),
    email: "user@example.com",
    amount: 1000,
    publicKey: "pk_test_b4198537c6f3c50f8fc0fccaebf4d0aae311d411",
  };
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [title, setTitle] = useState("");
  const [payChecked, setPayChecked] = useState(true);
  let token = `Bearer ` + localStorage.getItem("access_token");
  let useId = localStorage.getItem("userID");

  const handleChange = (event) => {
    // event.preventDefault();
    setPayChecked(event.target.checked);
  };
  const initializePayment = usePaystackPayment(config);
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference.transaction);

    axiosPrivate({
      method: "GET",
      url: `${baseUrl.baseURL}api/v1/payment/callback/?trxref=${reference.transaction}`,
      // data: formdata,
      headers: {
        Authorization: token,
      },
    }).then(
      (response) => {
        console.log("the response is ", response);
        timeLine();
      },
      (error) => {
        console.log({ error });
      }
    );
  };
  const timeLine = () => {
    var formdatas = new FormData();
    formdatas.append("status", "CONTRACT");
    formdatas.append("title", title);
    formdatas.append("delivery_date", new Date());
    formdatas.append("body", des);
    formdatas.append("author", useId);
    // formdatas.append("attachment", attachment);
    axiosPrivate({
      method: "POST",
      url: `${baseUrl.baseURL}api/v1/task/comment-timeline/`,
      data: formdatas,
      headers: {
        Authorization: token,
      },
    }).then(
      (response) => {
        console.log("the response is ", response);
      },
      (error) => {
        console.log({ error });
      }
    );
    props.nextPage();
  };
  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
    alert("payment cancel");
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!payChecked) {
      alert("Please read the Terms and Conditions");
    } else {
      initializePayment(onSuccess, onClose);
    }
  };

  const [freelancerAmount, setFreelancerAmount] = useState(1000);
  const [gigxFee, setGigxFee] = useState(5);
  const [clientAmount, setClientAmount] = useState(800);

  const ClientTexCalculator = (e) => {
    setClientAmount(e);
    let fee = (e * 20) / 100;
    setGigxFee(fee);
    setFreelancerAmount(e - fee);
  };
  useEffect(() => {
    FreelancerTexCalculator();
    ClientTexCalculator();
  }, [freelancerAmount, clientAmount]);

  const FreelancerTexCalculator = (e) => {
    let x = parseFloat(e);

    setFreelancerAmount(x);
    let fee = (20 / 100) * x;
    if (fee >= 0) {
      setGigxFee(fee.toFixed(1));
    } else {
      setGigxFee(0);
    }

    setClientAmount(parseFloat(x + fee));
  };
  const checkLab = () => {
    return (
      <React.Fragment>
        I agree to these <a href="#">Terms and Conditions</a>
      </React.Fragment>
    );
  };
  return (
    <>
      <div className="col-xl-9 col-lg-8 m-b30">
        <div className="job-bx browse-job clearfix">
          <div className="job-bx-title  clearfix">
            <h5 className="font-weight-700 pull-left text-uppercase">
              New Contract
            </h5>
          </div>
          <form onSubmit={onSubmit}>
            <div className="container-data m-b20">
              <div class="contract-header " style={{ paddingLeft: "15px" }}>
                <h2 class="mb-0">Contract Name*</h2>
              </div>

              <div className="form-group mb-10">
                <input
                  className="form-control box-shadow-none"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  rows="5"
                />
              </div>
            </div>

            <div className="container-data m-b20">
              <div class="contract-header" style={{ paddingLeft: "15px" }}>
                <h2 class="mb-0"> Client's Email Address*</h2>
              </div>

              <div className="form-group mb-10">
                <input
                  className="form-control box-shadow-none"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  rows="5"
                />
              </div>
            </div>
            <div className="container-data m-b20">
              <div class="contract-header" style={{ paddingLeft: "15px" }}>
                <h2 class="mb-0">Contract Title</h2>
              </div>

              <div className="form-group mb-10">
                <input
                  className="form-control box-shadow-none"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter contract title"
                  rows="5"
                />
              </div>
            </div>
            <div className="container-data m-b20">
              <div class="contract-header" style={{ paddingLeft: "15px" }}>
                <h2 class="mb-0">Description</h2>
              </div>

              <div className="form-group mb-10">
                <textarea
                  className="form-control box-shadow-none"
                  onChange={(e) => setDes(e.target.value)}
                  placeholder="Enter client's description"
                  rows="5"
                  value={des}
                >
                  {des}
                </textarea>
              </div>
            </div>

            <div className="container-data m-b20 p-10">
              <div class="contract-header " style={{ paddingLeft: "15px" }}>
                <h2 class="mb-0">Attach File*</h2>
              </div>

              <div className="form-group mb-10 p-5">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        color: "gray",
                        fontSize: 20,
                      }}
                    >
                      Drag files or Click to Browse
                    </p>
                  )}
                </div>
              </div>
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
                  <div className="col-md-6 pl-4">
                    <span>
                      <i className="fa fa-dollar mr-4"></i>
                    </span>
                    <span>1000</span>
                    {/* <span>{gigxFee}</span> */}
                  </div>
                </div>

                <div className="row contract-amount mb-4">
                  <div className="col-md-6 ">
                    <strong>GigX Now Service Fee</strong>
                  </div>
                  <div className="col-md-6 pl-4">
                    <span>
                      <i className="fa fa-dollar mr-4"></i>
                    </span>
                    <span>10</span>
                    {/* <span>{gigxFee}</span> */}
                  </div>
                </div>

                <div className="row contract-amount mb-4">
                  <div className="col-md-6 ">
                    <strong>You'll Receive</strong>
                    <div className="p-0 contract-amount-caption">
                      The estimated amount you'll receive after service fees
                    </div>
                  </div>
                  <div className="col-md-6 pl-4">
                    <span>
                      <i className="fa fa-dollar mr-4"></i>
                    </span>
                    <span>800</span>
                    {/* <span>{gigxFee}</span> */}
                  </div>
                </div>
              </div>
              {/* contract section start */}
            </div>
            {/* contract price end */}

            <div className="mb-3">
              {/* <label htmlFor="checkbox">
                I agree to these <a href="#">Terms and Conditions</a>.
              </label> */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={payChecked}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                    // id="checkbox"
                    // color="#2e55fa"
                  />
                }
                label={checkLab()}
              />
            </div>

            <button
              type="submit"
              className="site-button m-b30"
              // disabled={!payChecked}
            >
              Make Payment
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ContractPage;
