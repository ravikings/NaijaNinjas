import React from "react";
import styles from "./dashboard.module.css";
import WeekendIcon from "@mui/icons-material/Weekend";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import StoreIcon from "@mui/icons-material/Store";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className="row">
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 mb-lg-5 mb-md-5 mb-sm-5 ">
          <Link to={"./"}>
            <div className={styles.heroBox}>
              <div className={styles.upper}>
                <div className={styles.upperWrapper}>
                  <div className={styles.upperLeft}>
                    <WeekendIcon />
                  </div>
                  <div className={styles.upperRight}>
                    <Link to={"./"}>
                      <span>Main Balance</span>
                      <h5>281</h5>
                    </Link>
                  </div>
                </div>
              </div>
              <hr />
              <div className={styles.bottom}>
                <Link to={"./"}>
                  <p>
                    <span>Click to Withdraw</span>
                  </p>
                </Link>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 mb-lg-5 mb-md-5 mb-sm-5">
          <div className={styles.heroBox}>
            <div className={styles.upper}>
              <div className={styles.upperWrapper}>
                <div className={`${styles.upperLeft} ${styles.bgBlue}`}>
                  <LeaderboardIcon />
                </div>
                <div className={styles.upperRight}>
                  <span>Invoice Amount</span>
                  <h5>2,300</h5>
                </div>
              </div>
            </div>
            <hr />
            <div className={styles.bottom}>
              <p>
                <span>+3%</span> than last week
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 mb-lg-5 mb-md-5 mb-sm-5">
          <div className={styles.heroBox}>
            <div className={styles.upper}>
              <div className={styles.upperWrapper}>
                <div className={`${styles.upperLeft} ${styles.bgGreen}`}>
                  <StoreIcon />
                </div>
                <div className={styles.upperRight}>
                  <span>Total Revenue</span>
                  <h5>34k</h5>
                </div>
              </div>
            </div>
            <hr />
            <div className={styles.bottom}>
              <p>
                <span>+1%</span> than yesterday
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 mb-lg-5 mb-md-5 mb-sm-5">
          <div className={styles.heroBox}>
            <div className={styles.upper}>
              <div className={styles.upperWrapper}>
                <div className={`${styles.upperLeft} ${styles.bgRed}`}>
                  <PersonAddIcon />
                </div>
                <div className={styles.upperRight}>
                  <span>Task completed</span>
                  <h5>+91</h5>
                </div>
              </div>
            </div>
            <hr />
            <div className={styles.bottom}>
              <p>Just Updated</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
