import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Accordion, Button, Card, Form } from "react-bootstrap"
import Slider from "react-rangeslider"

function CandidatesSidebar({ handleFilter }) {
  const [value, setValue] = useState(0)
  const [sector, setSector] = useState("")
  const [filter, setFilter] = useState({})

  const handleChange = (e, noName) => {
    if (noName) {
      setFilter({ ...filter, [noName]: e })
    } else {
      setFilter({ ...filter, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async () => {
    // Converet object key value pairs to query string
    const queryString = Object.keys(filter)
      .map((key) => key + "=" + filter[key])
      .join("&")
    if (queryString) {
      handleFilter(queryString)
    } else {
      console.log("Nhe chla")
    }
    console.log(queryString)
  }

  return (
    <div className="col-xl-3 col-lg-4 col-md-5 m-b30">
      <aside id="accordion1" className="sticky-top sidebar-filter bg-white">
        <Accordion>
          <h6 className="title">
            <i className="fa fa-sliders m-r5"></i> Refined By{" "}
            <Link
              to={"#"}
              className="font-12 float-right"
              onClick={() => setFilter({})}
            >
              Reset All
            </Link>
          </h6>

          <Accordion.Toggle as={Card} eventKey="0">
            <div className="acod-head">
              <h6 className="acod-title">
                <Link
                  data-toggle="collapse"
                  href="#location"
                  className="collapsed"
                >
                  Location
                </Link>
              </h6>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <div id="location" className="acod-body collapse show">
              <div className="acod-content">
                <div>
                  <input
                    type={"text"}
                    value={filter.location || ""}
                    onChange={handleChange}
                    name={"location"}
                    className="form-control"
                    id="location"
                    placeholder="Location"
                  />
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
                max={1000}
                value={filter.salary}
                onChange={(e) => handleChange(e, "salary")}
              />
              <h4 className="value">
                <input
                  type={"number"}
                  value={filter.salary > 0 ? filter.salary : 0}
                  onChange={(e) => handleChange(e.target.value, "salary")}
                  name={"salary"}
                  className="form-control"
                  id="salary"
                  placeholder="Salary"
                />
              </h4>
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
                  name={"sector"}
                  value={filter.sector || ""}
                  onChange={handleChange}
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
        <button
          type="submit"
          className="site-button btn-block"
          onClick={handleSubmit}
        >
          Search
        </button>
      </aside>
    </div>
  )
}
export default CandidatesSidebar
