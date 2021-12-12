import React from 'react'

export default function Loginpop() {
    return (
        <div>
           
      {/* Sign In Popup
================================================== */}
      <div id="sign-in-dialog" className="zoom-anim-dialog mfp-hide dialog-with-tabs">
        {/*Tabs */}
        <div className="sign-in-form">
          <ul className="popup-tabs-nav">
            <li><a href="#login">Log In</a></li>
            <li><a href="#register">Register</a></li>
          </ul>
          <div className="popup-tabs-container">
            {/* Login */}
            <div className="popup-tab-content" id="login">
              {/* Welcome Text */}
              <div className="welcome-text">
                <h3>We're glad to see you again!</h3>
                <span>Don't have an account? <a href="#" className="register-tab">Sign Up!</a></span>
              </div>
              {/* Form */}
              <form method="post" id="login-form">
                <div className="input-with-icon-left">
                  <i className="icon-material-baseline-mail-outline" />
                  <input type="text" className="input-text with-border" name="emailaddress" id="emailaddress" placeholder="Email Address" required />
                </div>
                <div className="input-with-icon-left">
                  <i className="icon-material-outline-lock" />
                  <input type="password" className="input-text with-border" name="password" id="password" placeholder="Password" required />
                </div>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </form>
              {/* Button */}
              <button className="button full-width button-sliding-icon ripple-effect" type="submit" form="login-form">Log In <i className="icon-material-outline-arrow-right-alt" /></button>
              {/* Social Login */}
              <div className="social-login-separator"><span>or</span></div>
              <div className="social-login-buttons">
                <button className="facebook-login ripple-effect"><i className="icon-brand-facebook-f" /> Log In via Facebook</button>
                <button className="google-login ripple-effect"><i className="icon-brand-google-plus-g" /> Log In via Google+</button>
              </div>
            </div>
            {/* Register */}
            <div className="popup-tab-content" id="register">
              {/* Welcome Text */}
              <div className="welcome-text">
                <h3>Let's create your account!</h3>
              </div>
              {/* Account Type */}
              <div className="account-type">
                <div>
                  <input type="radio" name="account-type-radio" id="freelancer-radio" className="account-type-radio" defaultChecked />
                  <label htmlFor="freelancer-radio" className="ripple-effect-dark"><i className="icon-material-outline-account-circle" /> Task-Runner</label>
                </div>
                <div>
                  <input type="radio" name="account-type-radio" id="employer-radio" className="account-type-radio" />
                  <label htmlFor="employer-radio" className="ripple-effect-dark"><i className="icon-material-outline-business-center" /> Employer</label>
                </div>
              </div>
              {/* Form */}
              <form method="post" id="register-account-form">
                <div className="input-with-icon-left">
                  <i className="icon-material-baseline-mail-outline" />
                  <input type="text" className="input-text with-border" name="emailaddress-register" id="phoneno-register" placeholder="Phone number" required />
                </div>
                <div className="input-with-icon-left">
                  <i className="icon-material-baseline-mail-outline" />
                  <input type="text" className="input-text with-border" name="emailaddress-register" id="emailaddress-register" placeholder="Email Address" required />
                </div>
                <div className="input-with-icon-left" title="Should be at least 8 characters long" data-tippy-placement="bottom">
                  <i className="icon-material-outline-lock" />
                  <input type="password" className="input-text with-border" name="password-register" id="password-register" placeholder="Password" required />
                </div>
                <div className="input-with-icon-left">
                  <i className="icon-material-outline-lock" />
                  <input type="password" className="input-text with-border" name="password-repeat-register" id="password-repeat-register" placeholder="Repeat Password" required />
                </div>
              </form>
              {/* Button */}
              <button className="margin-top-10 button full-width button-sliding-icon ripple-effect" type="submit" form="register-account-form">Register <i className="icon-material-outline-arrow-right-alt" /></button>
              {/* Social Login */}
              <div className="social-login-separator"><span>or</span></div>
              <div className="social-login-buttons">
                <button className="facebook-login ripple-effect"><i className="icon-brand-facebook-f" /> Register via Facebook</button>
                <button className="google-login ripple-effect"><i className="icon-brand-google-plus-g" /> Register via Google+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sign In Popup / End */} 
        </div>
    )
}
