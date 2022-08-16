import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Accordion, Button, Card, Form } from "react-bootstrap"
import Slider from "react-rangeslider"

function CandidatesSidebar() {
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
         
        </Accordion>
      </aside>
      <button type="submit" className="site-button btn-block">
        Search
      </button>
    </div>
  )
}
export default CandidatesSidebar
