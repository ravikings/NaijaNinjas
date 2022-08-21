import React from "react"
import { Link } from "react-router-dom"
import Header2 from "../../Layout/Header2"
import Footer from "../../Layout/Footer"
import ProfileSidebar from "../../Element/Profilesidebar"

function Transactions() {
  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <ProfileSidebar />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx table-job-bx clearfix">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Transaction History
                      </h5>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Type</th>
                          <th>Amount</th>
                          <th>Date</th>
                          <th>Payment Method</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="order-id text-primary">#123</td>
                          <td className="job-name">
                            <Link to={""}>Social Media Expert</Link>
                          </td>
                          <td className="amount text-primary">$99.00</td>
                          <td className="date">Dec 15,2018</td>
                          <td className="transfer">Paypal</td>
                          <td className="expired pending">Pending </td>
                        </tr>
                        <tr>
                          <td className="order-id text-primary">#456</td>
                          <td className="job-name">
                            <Link to={""}>Web Designer</Link>
                          </td>
                          <td className="amount text-primary">$199.00</td>
                          <td className="date">Nov 10,2018</td>
                          <td className="transfer">Bank Transfer</td>
                          <td className="expired pending">Pending</td>
                        </tr>
                        <tr>
                          <td className="order-id text-primary">#789</td>
                          <td className="job-name">
                            <Link to={""}>Finance Accountant</Link>
                          </td>
                          <td className="amount text-primary">$299.00</td>
                          <td className="date">Oct 5,2018</td>
                          <td className="transfer">Paypal</td>
                          <td className="expired pending">Pending </td>
                        </tr>
                        <tr>
                          <td className="order-id text-primary">#101</td>
                          <td className="job-name">
                            <Link to={""}>Social Media Expert</Link>
                          </td>
                          <td className="amount text-primary">$399.00</td>
                          <td className="date">Dec 15,2018</td>
                          <td className="transfer">Bank Transfer</td>
                          <td className="expired success">Successfull </td>
                        </tr>
                        <tr>
                          <td className="order-id text-primary">#112</td>
                          <td className="job-name">
                            <Link to={""}>Web Designer</Link>
                          </td>
                          <td className="amount text-primary">$499.00</td>
                          <td className="date">Nov 10,2018</td>
                          <td className="transfer">Paypal</td>
                          <td className="expired pending">Pending </td>
                        </tr>
                        <tr>
                          <td className="order-id text-primary">#987</td>
                          <td className="job-name">
                            <Link to={""}>Finance Accountant</Link>
                          </td>
                          <td className="amount text-primary">$599.00</td>
                          <td className="date">Oct 5,2018</td>
                          <td className="transfer">Bank Transfer</td>
                          <td className="expired success">Successfull </td>
                        </tr>
                        <tr>
                          <td className="order-id text-primary">#654</td>
                          <td className="job-name">
                            <Link to={""}>Social Media Expert</Link>
                          </td>
                          <td className="amount text-primary">$699.00</td>
                          <td className="date">Dec 15,2018</td>
                          <td className="transfer">Paypal</td>
                          <td className="expired success">Successfull </td>
                        </tr>
                        <tr>
                          <td className="order-id text-primary">#321</td>
                          <td className="job-name">
                            <Link to={""}>Web Designer</Link>
                          </td>
                          <td className="amount text-primary">$799.00</td>
                          <td className="date">Nov 10,2018</td>
                          <td className="transfer">Bank Transfer</td>
                          <td className="expired success">Successfull </td>
                        </tr>
                        <tr>
                          <td className="order-id text-primary">#569</td>
                          <td className="job-name">
                            <Link to={""}>Finance Accountant</Link>
                          </td>
                          <td className="amount text-primary">$899.00</td>
                          <td className="date">Oct 5,2018</td>
                          <td className="transfer">Paypal</td>
                          <td className="expired pending">Pending </td>
                        </tr>
                        <tr>
                          <td className="order-id text-primary">#563</td>
                          <td className="job-name">
                            <Link to={""}>Web Designer</Link>
                          </td>
                          <td className="amount text-primary">$999.00</td>
                          <td className="date">Nov 10,2018</td>
                          <td className="transfer">Bank Transfer</td>
                          <td className="expired success">Successfull </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="pagination-bx float-right">
                      <ul className="pagination">
                        <li className="previous">
                          <Link to={""}>
                            <i className="ti-arrow-left"></i> Prev
                          </Link>
                        </li>
                        <li className="active">
                          <Link to={""}>1</Link>
                        </li>
                        <li>
                          <Link to={""}>2</Link>
                        </li>
                        <li>
                          <Link to={""}>3</Link>
                        </li>
                        <li className="next">
                          <Link to={""}>
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
      </div>
      <Footer />
    </>
  )
}
export default Transactions
