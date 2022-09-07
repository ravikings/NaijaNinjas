import React, { useState } from "react"
import { Link } from "react-router-dom"
import Header2 from "../../Layout/Header2"
import Footer from "../../Layout/Footer"
import { Modal } from "react-bootstrap"
import ProfileSidebar from "../../Element/Profilesidebar"
import TabsGroupBookmark from "../MakeOffer/components/TabsGroupBookmarks"

const jobAlert = [
  { title: "Social Media Expert", date: "December 15,2018" },
  { title: "Web Designer", date: "November 10,2018" },
  { title: "Finance Accountant", date: "October 5,2018" },
  { title: "Social Media Expert", date: "December 15,2018" },
  { title: "Web Designer", date: "November 10,2018" },
  { title: "Finance Accountant", date: "October 5,2018" },
  { title: "Social Media Expert", date: "December 15,2018" },
  { title: "Web Designer", date: "November 10,2018" },
  { title: "Finance Accountant", date: "October 5,2018" },
  { title: "Social Media Expert", date: "December 15,2018" },
]

function Jobsavedjobs() {
  const [company, SetCompany] = useState(false)
  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <ProfileSidebar active={"Saved Jobs"} />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx save-job browse-job table-job-bx clearfix">
                    <TabsGroupBookmark />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Jobsavedjobs
