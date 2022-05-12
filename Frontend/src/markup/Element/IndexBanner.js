import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Alert, Card, Form } from "react-bootstrap";
import { toast } from "react-toastify";

var bnr1 = require("./../../images/main-slider/slide2.jpg");

const style = {
  margin: "0 auto",
  position: "absolute",
  top: "125px",
  right: "25px",
};

function IndexBanner() {
  const [title, setTitle] = React.useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.error("Please enter title.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    history.push({
      pathname: "/browse-candidates",
      state: {
        title: title,
      },
    });
  };

  useEffect(() => {
    var i = 0;
    // Placeholder Animation Start
    var inputSelector = document.querySelectorAll("input, textarea");
    for (i = 0; i < inputSelector.length; i++) {
      inputSelector[i].addEventListener("focus", function (event) {
        return this.parentElement.parentElement.classList.add("focused");
      });
    }
    for (i = 0; i < inputSelector.length; i++) {
      inputSelector[i].addEventListener("blur", function (event) {
        var inputValue = this.value;
        if (inputValue === "") {
          this.parentElement.parentElement.classList.remove("filled");
          this.parentElement.parentElement.classList.remove("focused");
        } else {
          this.parentElement.parentElement.classList.add("filled");
        }
      });
    }
    // Placeholder Animation End
  }, []);

  return (
    <>
      <div
        className='dez-bnr-inr dez-bnr-inr-md'
        style={{ backgroundImage: "url(" + bnr1 + ")" }}
      >
        <div className='container'>
          <div className='dez-bnr-inr-entry align-m'>
            <div className='find-job-bx'>
              <Link to={"/browse-job"} className='site-button button-sm'>
                Find Jobs, Employment & Career Opportunities
              </Link>
              <h2>
                Search Between More Then <br />{" "}
                <span className='text-primary'>50,000</span> Open Jobs.
              </h2>
              <form className='dezPlaceAni'>
                <div className='row'>
                  <div className='col-lg-6 col-md-6'>
                    <div className='form-group'>
                      <label>Job Title, Keywords, or Phrase</label>
                      <div className='input-group'>
                        <input
                          type='text'
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className='form-control'
                          placeholder=''
                        />
                        <div className='input-group-append'>
                          <span className='input-group-text'>
                            <i className='fa fa-search'></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4 col-md-6'>
                    <div className='form-group'>
                      <Form.Control as='select' custom className='select-btn'>
                        <option>Select Sector</option>
                        <option>Construction</option>
                        <option>Corodinator</option>
                        <option>Employer</option>
                        <option>Financial Career</option>
                        <option>Information Technology</option>
                        <option>Marketing</option>
                        <option>Quality check</option>
                        <option>Real Estate</option>
                        <option>Sales</option>
                        <option>Supporting</option>
                        <option>Teaching</option>
                      </Form.Control>
                    </div>
                  </div>
                  <div className='col-lg-2 col-md-6'>
                    <button
                      onClick={handleSubmit}
                      className='site-button btn-block'
                    >
                      Find Job
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div style={style}>
        <Card >
          {/* <Card.Img
            variant='top'
            src='https://image-placeholder.com/images/actual-size/75x75.png'
            style={{ height: "50px", width: "100px"}}
          /> */}
          <Card.Body>
            
            <Card.Title>Reach your target customers</Card.Title>
            <Card.Text>
            marketing expert for anyone!. 
            </Card.Text>
            <button className='site-button btn-block' variant='primary'>
              Post Ads for Free!
            </button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
export default IndexBanner;
