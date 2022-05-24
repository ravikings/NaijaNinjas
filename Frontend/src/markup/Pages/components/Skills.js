import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import useUpdateResume from "../MakeOffer/components/ResumeComponents/useUpdateResume";

const Skills = ({
  setKeyskill,
  skills,
  setResumeDetails,
  keyskill,
  isLoggedIn,
  user,
  owner,
}) => {
  const [updatedSkills, setUpdatedSkills] = React.useState(skills);
  const reqUpdateResume = useUpdateResume();
  const handleSubmit = async () => {
    await reqUpdateResume.callAPI({
      body: { skills: updatedSkills },
      setResumeDetails,
    });
    // const { loading, isResumeUpdate } = reqUpdateResume;
    setKeyskill(false);
  };
  return (
    <div id='key_skills_bx' className='job-bx bg-white m-b30'>
      <div className='d-flex'>
        <h5 className='m-b15'>Key Skills</h5>
        {isLoggedIn && user.id === owner.id && (
          <Link
            to={"#"}
            data-toggle='modal'
            data-target='#keyskills'
            onClick={() => setKeyskill(true)}
            className='site-button add-btn button-sm'
          >
            <i className='fa fa-pencil m-r5'></i> Edit
          </Link>
        )}
      </div>
      <div className='job-time mr-auto'>
        {skills &&
          skills.split(",").map((skill, index) => (
            <Link
              className='mr-2'
              to={""}
              key={index}
              onClick={(e) => e.preventDefault()}
            >
              <span>{skill}</span>
            </Link>
          ))}
      </div>

      <Modal
        show={keyskill}
        onHide={setKeyskill}
        className='modal fade modal-bx-info editor'
      >
        <div className='modal-dialog my-0' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='KeyskillsModalLongTitle'>
                Key Skills
              </h5>
              <button
                type='button'
                className='close'
                onClick={() => setKeyskill(false)}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <p>
                It is the first thing recruiters notice in your profile. Write
                concisely what makes you unique and right person for the job you
                are looking for.
                <br />
                <b>Note: Skills should be comma separated.</b>
              </p>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className='row'>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group'>
                      <input
                        type='text'
                        className='form-control tags_input'
                        value={updatedSkills}
                        onChange={(e) => setUpdatedSkills(e.target.value)}
                        placeholder='Separate with comma'
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='site-button'
                onClick={() => setKeyskill(false)}
              >
                Cancel
              </button>
              <button
                type='button'
                className='site-button'
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Skills;
