import { Link } from "react-router-dom";
import Header2 from "../../Layout/Header2";
import Footer from "../../Layout/Footer";
import ProfileSidebar from "../../Element/Profilesidebar";
import createRequest from "../../../utils/axios";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ClipLoader from "react-spinners/ClipLoader"


function Jobsappliedjob() {

  const [taskAssigned, settaskAssigned] = useState([])
  const [loading, setLoading] = React.useState(false)
  const id = localStorage.getItem("userID");

  const { userProfile, userStatus, currentUser } = useSelector(
    (state) => state.authReducer
  )

  const getAssignTask = () => {

    setLoading(true)
    createRequest().get(
      `/api/v1/task/get-assigned-task/${id}`
    ).then((res) => {
      settaskAssigned(res.data);
      setLoading(false)
    }).catch((e) => {
      settaskAssigned("");
      console.log(e)
    })
  }

  useEffect(() => {
    getAssignTask()
  }, [])

  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <ProfileSidebar active={"Applied Jobs"} />
                <div className="col-xl-9 col-lg-8 m-b30 browse-job">
                  <div className="job-bx-title  clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase">
                      {`${taskAssigned.length} Task Assinged`}
                    </h5>
                    <div className="float-right">
                      <span className="select-title">Sort by freshness</span>
                      <select className="custom-btn">
                        <option>Last 2 Months</option>
                        <option>Last Months</option>
                        <option>Last Weeks</option>
                        <option>Last 3 Days</option>
                      </select>
                    </div>
                  </div>
                  <ul className="post-job-bx browse-job">
                    {loading ? (
                      <div className="loader">
                        <ClipLoader color={"#2e55fa"} loading={true} size={150} />
                      </div>
                    ) : taskAssigned.length > 0 ? taskAssigned.map((item, index) => (
                      <li key={index}>
                        <div className="post-bx">
                          <div className="job-post-info m-a0">
                            <h4>
                              <Link to={"/timeline/" + `${item?.task.id}` + "/" + `${id}`} target="_blank">{item?.task?.title}</Link>
                            </h4>
                            <ul>
                              <li>
                                <Link to={"/company-profile"}>
                                  {`${item?.payment_author?.first_name} ${item?.payment_author.username}`}
                                </Link>
                              </li>
                              <li>
                                <i className="fa fa-money"></i> {item?.offer}
                              </li>
                            </ul>
                            <div className="job-time m-t15 m-b10">
                              <Link to={""} className="mr-1">
                                <span>PHP</span>
                              </Link>
                              <Link to={""} className="mr-1">
                                <span>Angular</span>
                              </Link>
                              <Link to={""} className="mr-1">
                                <span>Bootstrap</span>
                              </Link>
                              <Link to={""} className="mr-1">
                                <span>Wordpress</span>
                              </Link>
                            </div>
                            <div className="posted-info clearfix">
                              <p className="m-tb0 text-primary float-left">
                                <span className="text-black m-r10">
                                  Delivery Date:
                                </span>{" "}
                                {item?.delivery_date}
                              </p>
                              <Link
                                to={"/timeline/" + `${item?.task.id}` + "/" + `${id}`}
                                target="_blank"
                                className="site-button button-sm float-right"
                              >
                                Update Progress
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    )) : (
                      <div className="col-lg-12 col-sm-12 col-12 m-b20">
                        <div className="alert alert-secondary" role="alert">
                          No Services Found
                        </div>
                      </div>
                    )}
                  </ul>
                  <div className="pagination-bx m-t30">
                    <ul className="pagination">
                      <li className="previous">
                        <Link to={" "}>
                          <i className="ti-arrow-left"></i> Prev
                        </Link>
                      </li>
                      <li className="active">
                        <Link to={" "}>1</Link>
                      </li>
                      <li>
                        <Link to={" "}>2</Link>
                      </li>
                      <li>
                        <Link to={" "}>3</Link>
                      </li>
                      <li className="next">
                        <Link to={" "}>
                          Next <i className="ti-arrow-right"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Jobsappliedjob;
