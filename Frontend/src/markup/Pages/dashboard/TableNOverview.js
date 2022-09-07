import React, { useState } from "react";
import styles from "./dashboard.module.css";
import DoneIcon from "@mui/icons-material/Done";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import adobeIcon from "./assets/logo-xd.svg";
import ProgressBar from "react-bootstrap/ProgressBar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import atlassin from "./assets/logo-atlassian.svg";
import slack from "./assets/logo-slack.svg";
import spotify from "./assets/logo-spotify.svg";
import jira from "./assets/logo-jira.svg";
import invision from "./assets/logo-invision.svg";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "./progress.css";
const TableNOverview = () => {
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );
  return (
    <div className={styles.lastRow}>
      <div className="row">
        <div className="col-lg-8 mb-md-5 mb-sm-5">
          <div className={styles.lastRowLeft}>
            <div className={styles.lastRowLeftHero}>
              <div className={styles.lastRowLeftHeroWrapper}>
                <h6>Projects</h6>
                <p>
                  <DoneIcon />
                  <span>
                    <span style={{ fontWeight: "bold" }}>30 done </span> this
                    month
                  </span>
                </p>
              </div>
              <div className={styles.lastRowLeftHeroRight}>
                <MoreVertIcon onClick={openMenu} />
                {renderMenu}
              </div>
            </div>
            <div className={styles.table}>
              <div className={styles.tableInner}>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <div className={styles.th1}>COMPANIES</div>
                      </th>
                      <th>
                        <div className={styles.th2}>MEMBERS</div>
                      </th>
                      <th>
                        <div className={styles.th3}>budget</div>
                      </th>
                      <th>
                        <div className={styles.th3}>COMPLETION</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.td1}>
                        <div className={styles.tdWrapper}>
                          <div className={styles.tdWrapperInner}>
                            <div className={styles.avatar}>
                              <img src={adobeIcon} alt="" />
                            </div>
                            <span>Material Ui xd Version</span>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td2}>
                        <div className={styles.td2Inner}>
                          <div className={styles.td2InnerWrapper}>
                            <div className={styles.avatarRoot}>
                              <img
                                src={require("./assets/team-1.jpg")}
                                alt=""
                              />
                            </div>
                            <div className={styles.avatarRoot}>
                              <img
                                src={require("./assets/team-2.jpg")}
                                alt=""
                              />
                            </div>
                            <div className={styles.avatarRoot}>
                              <img
                                src={require("./assets/team-3.jpg")}
                                alt=""
                              />
                            </div>
                            <div className={styles.avatarRoot}>
                              <img
                                src={require("./assets/team-4.jpg")}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td3}>
                        <div className={styles.td3Inner}>
                          <span>$14,000</span>
                        </div>
                      </td>
                      <td className={styles.td4}>
                        <div className={styles.td4InnerProgress}>
                          <ProgressBar now={60} className="progress" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.td1}>
                        <div className={styles.tdWrapper}>
                          <div className={styles.tdWrapperInner}>
                            <div className={styles.avatar}>
                              <img src={atlassin} alt="" />
                            </div>
                            <span>Add Progress Track</span>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td2}>
                        <div className={styles.td2Inner}>
                          <div className={styles.td2InnerWrapper}>
                            <div className={styles.avatarRoot}>
                              <img
                                src={require("./assets/team-2.jpg")}
                                alt=""
                              />
                            </div>
                            <div className={styles.avatarRoot}>
                              <img
                                src={require("./assets/team-4.jpg")}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td3}>
                        <div className={styles.td3Inner}>
                          <span>$3,000</span>
                        </div>
                      </td>
                      <td className={styles.td4}>
                        <div className={styles.td4InnerProgress}>
                          <ProgressBar now={10} className="progress" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.td1}>
                        <div className={styles.tdWrapper}>
                          <div className={styles.tdWrapperInner}>
                            <div className={styles.avatar}>
                              <img src={slack} alt="" />
                            </div>
                            <span>Fix Platform Errors</span>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td2}>
                        <div className={styles.td2Inner}>
                          <div className={styles.td2InnerWrapper}>
                            <div className={styles.avatarRoot}>
                              <img
                                src={require("./assets/team-1.jpg")}
                                alt=""
                              />
                            </div>
                            <div className={styles.avatarRoot}>
                              <img
                                src={require("./assets/team-3.jpg")}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td3}>
                        <div className={styles.td3Inner}>
                          <span>Not Set</span>
                        </div>
                      </td>
                      <td className={styles.td4}>
                        <div className={styles.td4InnerProgress}>
                          <ProgressBar now={100} className="progress-bg" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.td1}>
                        <div className={styles.tdWrapper}>
                          <div className={styles.tdWrapperInner}>
                            <div className={styles.avatar}>
                              <img src={spotify} alt="" />
                            </div>
                            <span>Launch our Mobile App</span>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td2}>
                        <div className={styles.td2Inner}>
                          <div className={styles.td2InnerWrapper}>
                            <div className={styles.avatarRoot}>
                              <img
                                src={require("./assets/team-1.jpg")}
                                alt=""
                              />
                            </div>
                            <div className={styles.avatarRoot}>
                              <img
                                src={require("./assets/team-2.jpg")}
                                alt=""
                              />
                            </div>
                            <div className={styles.avatarRoot}>
                              <img
                                src={require("./assets/team-3.jpg")}
                                alt=""
                              />
                            </div>
                            <div className={styles.avatarRoot}>
                              <img
                                src={require("./assets/team-4.jpg")}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td3}>
                        <div className={styles.td3Inner}>
                          <span>$20,500</span>
                        </div>
                      </td>
                      <td className={styles.td4}>
                        <div className={styles.td4InnerProgress}>
                          <ProgressBar now={100} className="progress-bg" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.td1}>
                        <div className={styles.tdWrapper}>
                          <div className={styles.tdWrapperInner}>
                            <div className={styles.avatar}>
                              <img src={jira} alt="" />
                            </div>
                            <span>Add the new pricing page</span>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td2}>
                        <div className={styles.td2Inner}>
                          <div className={styles.td2InnerWrapper}>
                            <div className={styles.avatarRoot}>
                              <img
                                src={require("./assets/team-4.jpg")}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td3}>
                        <div className={styles.td3Inner}>
                          <span>$500</span>
                        </div>
                      </td>
                      <td className={styles.td4}>
                        <div className={styles.td4InnerProgress}>
                          <ProgressBar now={25} className="progress" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.td1}>
                        <div className={styles.tdWrapper}>
                          <div className={styles.tdWrapperInner}>
                            <div className={styles.avatar}>
                              <img src={invision} alt="" />
                            </div>
                            <span>Redesign New Online Shop</span>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td2}>
                        <div className={styles.td2Inner}>
                          <div className={styles.td2InnerWrapper}>
                            <div className={styles.avatarRoot}>
                              <img
                                src={require("./assets/team-1.jpg")}
                                alt=""
                              />
                            </div>
                            <div className={styles.avatarRoot}>
                              <img
                                src={require("./assets/team-4.jpg")}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td3}>
                        <div className={styles.td3Inner}>
                          <span>$2000</span>
                        </div>
                      </td>
                      <td className={styles.td4}>
                        <div className={styles.td4InnerProgress}>
                          <ProgressBar now={40} className="progress" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-md-5 mb-sm-5">
          <div className={styles.overview}>
            <div className={styles.overviewHero}>
              <h6>Orders Overview</h6>
              <div>
                <span>
                  <p className={styles.overviewHeroContent}>
                    <ArrowUpwardIcon />
                  </p>
                  <span>24% </span> this month
                </span>
              </div>
            </div>
            <div className={styles.overviewEnd}>
              <div className={styles.overviewEndWrapper}>
                <div className={styles.ovCircle}>
                  <NotificationsIcon />
                </div>
                <div className={styles.ovRightContent}>
                  <span>New Order #1832412</span>
                  <p>21 Dec 12 PM</p>
                </div>
              </div>
              <div className={styles.overviewEndWrapper}>
                <div className={`${styles.ovCircle} ${styles.bgOr}`}>
                  <InventoryIcon />
                </div>
                <div className={styles.ovRightContent}>
                  <span>$2400, Design changes</span>
                  <p>22 Dec 7:20 PM</p>
                </div>
              </div>
              <div className={styles.overviewEndWrapper}>
                <div className={`${styles.ovCircle} ${styles.bgBl}`}>
                  <ShoppingCartIcon />
                </div>
                <div className={styles.ovRightContent}>
                  <span>Server payments for April</span>
                  <p>21 Dec 9:34 PM</p>
                </div>
              </div>
              <div className={styles.overviewEndWrapper}>
                <div className={`${styles.ovCircle} ${styles.bgLgOr}`}>
                  <PaymentIcon />
                </div>
                <div className={styles.ovRightContent}>
                  <span>New card added for order #4395133</span>
                  <p>20 DEC 2:20 AM</p>
                </div>
              </div>
              <div className={styles.overviewEndWrapper}>
                <div className={`${styles.ovCircle} ${styles.bgPink}`}>
                  <VpnKeyIcon />
                </div>
                <div className={styles.ovRightContent}>
                  <span>New card added for order #4395133</span>
                  <p>18 DEC 4:54 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableNOverview;
