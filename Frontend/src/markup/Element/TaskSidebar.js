import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Accordion, Button, Card, Form } from "react-bootstrap"
import Slider from "react-rangeslider"

function TaskSidebar() {
  const [value, setValue] = useState(0)
  const [sector, setSector] = useState("")
  return (
    <div className="col-xl-3 col-lg-4 col-md-5 m-b30">
      <aside id="accordion1" className="sticky-top sidebar-filter bg-white">
        <Accordion defaultActiveKey="0">
          <h6 className="title">
            <i className="fa fa-sliders m-r5"></i> Refined By{" "}
            <Link to={"#"} className="font-12 float-right">
              Reset All
            </Link>
          </h6>

          <Accordion.Toggle as={Card} eventKey="1">
            <div className="acod-head">
              <h6 className="acod-title">
                <Link
                  data-toggle="collapse"
                  href="#experience"
                  className="collapsed"
                >
                  Experience
                </Link>
              </h6>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <div id="experience" className="acod-body collapse show">
              <div className="acod-content">
                <div className="custom-control custom-radio">
                  <input
                    className="custom-control-input"
                    id="one-years"
                    type="radio"
                    name="radio-years"
                  />
                  <label className="custom-control-label" htmlFor="one-years">
                    0-1 Years
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    className="custom-control-input"
                    id="two-years"
                    type="radio"
                    name="radio-years"
                  />
                  <label className="custom-control-label" htmlFor="two-years">
                    1-2 Years
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    className="custom-control-input"
                    id="three-years"
                    type="radio"
                    name="radio-years"
                  />
                  <label className="custom-control-label" htmlFor="three-years">
                    2-3 Years
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    className="custom-control-input"
                    id="four-years"
                    type="radio"
                    name="radio-years"
                  />
                  <label className="custom-control-label" htmlFor="four-years">
                    3-4 Years
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    className="custom-control-input"
                    id="five-years"
                    type="radio"
                    name="radio-years"
                  />
                  <label className="custom-control-label" htmlFor="five-years">
                    4-5 Years
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    className="custom-control-input"
                    id="five-years"
                    type="radio"
                    name="radio-years"
                  />
                  <label className="custom-control-label" htmlFor="five-years">
                    More than 5 Years
                  </label>
                </div>
              </div>
            </div>
          </Accordion.Collapse>

          <Accordion.Toggle as={Card} eventKey="2">
            <div className="acod-head">
              <h6 className="acod-title">
                <Link
                  data-toggle="collapse"
                  href="#salary"
                  className="collapsed"
                >
                  Salary
                </Link>
              </h6>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <div className="px-3">
              <Slider
                min={0}
                max={100}
                value={value}
                onChange={(value) => setValue(value)}
              />
              <h4 className="value">{value && "$" + value}</h4>
            </div>
          </Accordion.Collapse>
          <Accordion.Toggle as={Card} eventKey="3">
            <div className="acod-head">
              <h6 className="acod-title">
                <Link
                  data-toggle="collapse"
                  href="#job-function"
                  className="collapsed"
                >
                  Sector
                </Link>
              </h6>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <div className="px-4">
              <div className="form-group">
                <Form.Control
                  as="select"
                  custom
                  className="select-btn"
                  onChange={(e) => setSector(e.target.value)}
                >
                  <option value={""}>Select Sector</option>
                  <option>Home Improvement</option>
                  <option>Wellness</option>
                  <option>Pets</option>
                  <option>Business</option>
                  <option>Events</option>
                  <option>Lessons</option>
                  <option>Crafts</option>
                  <option>Design and Web</option>
                  <option>Legal</option>
                  <option>Personal</option>
                  <option>Photography</option>
                  <option>Repair and Technical Support</option>
                </Form.Control>
              </div>
            </div>
          </Accordion.Collapse>
        </Accordion>
        <button type="submit" className="site-button btn-block">
          Search
        </button>
      </aside>
    </div>
  )
}
export default TaskSidebar
