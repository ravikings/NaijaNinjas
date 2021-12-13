import React from 'react'

export default function DashboardFooter() {
    return (
        <>
            <div className="dashboard-footer-spacer" />
          <div className="small-footer margin-top-15">
            <div className="small-footer-copyrights">
              © 2019 <strong>Hireo</strong>. All Rights Reserved.
            </div>
            <ul className="footer-social-links">
              <li>
                <a href="#" title="Facebook" data-tippy-placement="top">
                  <i className="icon-brand-facebook-f" />
                </a>
              </li>
              <li>
                <a href="#" title="Twitter" data-tippy-placement="top">
                  <i className="icon-brand-twitter" />
                </a>
              </li>
              <li>
                <a href="#" title="Google Plus" data-tippy-placement="top">
                  <i className="icon-brand-google-plus-g" />
                </a>
              </li>
              <li>
                <a href="#" title="LinkedIn" data-tippy-placement="top">
                  <i className="icon-brand-linkedin-in" />
                </a>
              </li>
            </ul>
            <div className="clearfix" />
          </div>
        </>
    )
}
