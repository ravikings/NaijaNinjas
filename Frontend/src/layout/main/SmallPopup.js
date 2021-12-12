import React from 'react'

export default function SmallPopup() {
    return (
        <div>
                  {/* Make an Offer Popup
================================================== */}
      <div id="small-dialog" className="zoom-anim-dialog mfp-hide dialog-with-tabs">
        {/*Tabs */}
        <div className="sign-in-form">
          <ul className="popup-tabs-nav">
            <li><a href="#tab">Make an Offer</a></li>
          </ul>
          <div className="popup-tabs-container">
            {/* Tab */}
            <div className="popup-tab-content" id="tab">
              {/* Welcome Text */}
              <div className="welcome-text">
                <h3>Discuss your project with David</h3>
              </div>
              {/* Form */}
              <form method="post">
                <div className="input-with-icon-left">
                  <i className="icon-material-outline-account-circle" />
                  <input type="text" className="input-text with-border" name="name" id="name" placeholder="First and Last Name" />
                </div>
                <div className="input-with-icon-left">
                  <i className="icon-material-baseline-mail-outline" />
                  <input type="text" className="input-text with-border" name="emailaddress" id="emailaddress" placeholder="Email Address" />
                </div>
                <textarea name="textarea" cols={10} placeholder="Message" className="with-border" defaultValue={""} />
                <div className="uploadButton margin-top-25">
                  <input className="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload" multiple />
                  <label className="uploadButton-button ripple-effect" htmlFor="upload">Add Attachments</label>
                  <span className="uploadButton-file-name">Allowed file types: zip, pdf, png, jpg <br /> Max. files
                    size: 50 MB.</span>
                </div>
              </form>
              {/* Button */}
              <button className="button margin-top-35 full-width button-sliding-icon ripple-effect" type="submit">Make an
                Offer <i className="icon-material-outline-arrow-right-alt" /></button>
            </div>
            {/* Login */}
            <div className="popup-tab-content" id="loginn">
              {/* Welcome Text */}
              <div className="welcome-text">
                <h3>Discuss Your Project With Tom</h3>
              </div>
              {/* Form */}
              <form method="post" id="make-an-offer-form">
                <div className="input-with-icon-left">
                  <i className="icon-material-outline-account-circle" />
                  <input type="text" className="input-text with-border" name="name2" id="name2" placeholder="First and Last Name" required />
                </div>
                <div className="input-with-icon-left">
                  <i className="icon-material-baseline-mail-outline" />
                  <input type="text" className="input-text with-border" name="emailaddress2" id="emailaddress2" placeholder="Email Address" required />
                </div>
                <textarea name="textarea" cols={10} placeholder="Message" className="with-border" defaultValue={""} />
                <div className="uploadButton margin-top-25">
                  <input className="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload-cv" multiple />
                  <label className="uploadButton-button" htmlFor="upload-cv">Add Attachments</label>
                  <span className="uploadButton-file-name">Allowed file types: zip, pdf, png, jpg <br /> Max. files
                    size: 50 MB.</span>
                </div>
              </form>
              {/* Button */}
              <button className="button full-width button-sliding-icon ripple-effect" type="submit" form="make-an-offer-form">Make an Offer <i className="icon-material-outline-arrow-right-alt" /></button>
            </div>
          </div>
        </div>
      </div>
      {/* Make an Offer Popup / End */}
        </div>
    )
}
