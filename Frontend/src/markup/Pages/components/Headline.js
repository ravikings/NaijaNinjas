import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

const Headline = ({ headline, setResume, resume,isLoggedIn,user,owner }) => {
  return (
    <div id="resume_headline_bx" className=" job-bx bg-white m-b30">
      <div className="d-flex">
        <h5 className="m-b15">Resume Headline</h5>
        {
            isLoggedIn && (user.id === owner.id ) && <Link
            to={"#"}
            className="site-button add-btn button-sm"
            onClick={() => setResume(true)}
          >
            <i className="fa fa-pencil m-r5"></i> Edit
          </Link>
         }
      </div>
      <p className="m-b0">{headline}</p>

      <Modal
        show={resume}
        onHide={setResume}
        className="modal fade modal-bx-info editor"
      >
        <div className="modal-dialog my-0" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ResumeheadlineModalLongTitle">
                Resume Headline
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => setResume(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                It is the first thing recruiters notice in your profile. Write
                concisely what makes you unique and right person for the job you
                are looking for.
              </p>
              <form>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="Type Description"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="site-button"
                onClick={() => setResume(false)}
              >
                Cancel
              </button>
              <button type="button" className="site-button">
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Headline.propTypes = {
  headline: PropTypes.string.isRequired,
  setResume: PropTypes.func.isRequired,
  resume: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.any,
  owner: PropTypes.any,
};

export default Headline;
