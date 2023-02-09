import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../../Layout/Header"
import Footer from "../../Layout/Footer"
import CountUp from "react-countup"
import IndexBanner from "../../Element/IndexBanner"
import Jobcategories from "../../Element/Jobcategories"
import Featureblog from "../../Element/Featureblog"
import Jobsection from "../../Element/Jobsection"
import Owltestimonial from "../../Element/Owlblog1"
import { Button, Card } from "react-bootstrap"
import "../../../landingpage/css/style.css"
import logo from "../../../landingpage/imgs/logo.png"
import herobgright from "../../../landingpage/imgs/hero-bg-right.png"
import marketicon1 from "../../../landingpage/imgs/market-icon-1.png"
import marketicon2 from "../../../landingpage/imgs/market-icon-2.png"
import marketicon3 from "../../../landingpage/imgs/market-icon-3.png"
import aboutus from "../../../landingpage/imgs/about-us.png"
import abouticon from "../../../landingpage/imgs/about-icon.png"
import category1 from "../../../landingpage/imgs/category-1.png"
import category2 from "../../../landingpage/imgs/category-2.png"
import category3 from "../../../landingpage/imgs/category-3.png"
import appImage from "../../../landingpage/imgs/app.png"
import testimonialvector from "../../../landingpage/imgs/testimonial-vector.png"
import newslettervector from "../../../landingpage/imgs/newsletter.png"
import phonelogo from "../../../landingpage/imgs/phone.png"
import maillogo from "../../../landingpage/imgs/mail.png"

//Images
// var bnr2 = require("../../../images/background/bg4.jpg")
var bnr3 = require("../../../landingpage/imgs/logo.png")

function Landingpage() {
  const myArray = [
    "Home Improvement",
    "Wellness Expert",
    "Business Professionals",
    "Events Planners",
    "Lessons",
    "Crafts",
    "Virtual Assistant",
    "Design And Web",
    "Legal Professionals",
    "Personal Coach",
    "Photography",
    "Repair And Technical Support"
  ]
  const [text, setText] = useState("Element 1");
  let i = 0;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setText(myArray[i]);
      i = (i + 1) % myArray.length;
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className="page-wraper">
      <Header />
      <div className="wrapper">
        <div className="header fixed-top">
          <div className="content">
            <nav className="navbar navbar-expand-lg navbar-light px-0">
              <a className="navbar-brand" href="#"><img src={logo} className="logo" /></a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto align-items-center">
                  <li className="nav-item active">
                    <a className="nav-link px-0" href="#">Home </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link px-0" href="#">Tasks </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link px-0" href="#">Marketplace</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link px-0" href="#">Forum </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link btn btn-signup text-white">Sign Up | Log In</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div className="hero-section">
          <div className="content">
            <div className="data">
              <div className="img mb-block"><img src={herobgright} className="w-100" /></div>
              {console.log(myArray)}
              <div className="heading">Search and Hire More <span> Than 50k </span>{text}.</div>
              <div className="text">Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.</div>
              <div className="form">
                <form action="#">
                  <div className="form-group mb-2">
                    <i className="fa fa-search search-icon"></i> &nbsp;&nbsp;&nbsp;
                    <input type="text" placeholder="Job Title, Keywords, or Phrase" className="search" name="search" required />
                    <select name="sector" id="">
                      <option value="0">Select Sector</option>
                      <option value="1">Sector 1</option>
                      <option value="2">Sector 2</option>
                    </select>
                    <button type="submit" className="btn btn-submit" id="">Find Job</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="marketplace-section">
          <div className="content">
            <div className="row m-auto w-100 justify-content-between">
              <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                <div className="heading">A Reliable <span> Marketplace</span> for Pros</div>
                <div className="text">Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.</div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="row m-auto w-100 align-items-center">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="posted-card">
                      <div className="icon"><img src={marketicon1} /></div>
                      <div className="detail">
                        <div className="amount">4500+</div>
                        <div className="title">Tasks Posted</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="posted-card mb-70">
                      <div className="icon"><img src={marketicon2} /></div>
                      <div className="detail">
                        <div className="amount">1800+</div>
                        <div className="title">Job Posted</div>
                      </div>
                    </div>
                    <div className="posted-card">
                      <div className="icon"><img src={marketicon3} /></div>
                      <div className="detail">
                        <div className="amount">1500+</div>
                        <div className="title">Freelancers</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="row m-auto w-100 justify-content-between align-items-end">
              <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                <div className="img"><img src={aboutus} className="w-100" /></div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="title">About Us</div>
                <div className="heading">Welcome To <span> Correct</span> Hustle</div>
                <div className="text">Lorem ipsum dolor sit amet. Qui dolorem eius et cumque qui voluptas sint quo recusandae ratione! Qui quibusdam odio est reprehenderit laborum qui corporis ipsa aut libero corrupti? <br /> Sit modi unde eum dolor fuga a magnam facilis nam odio enim qui maiores quaerat sed consequatur voluptatem rem enim alias. Ad voluptas excepturi et autem adipisci sit voluptatem quas non cupiditate deserunt. </div>
                <div className="row m-auto w-100 my-4">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-6 pl-0 mt-3">
                    <div><img src={abouticon} /> &nbsp; Qui quibusdam odio est repr</div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-6 mt-3">
                    <div><img src={abouticon} /> &nbsp; magnam facilis namen </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-6 pl-0 my-3">
                    <div><img src={abouticon} /> &nbsp; fuga a magnam odio est repr</div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-6 my-3">
                    <div><img src={abouticon} /> &nbsp; voluptatem nos namen </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="categories-section"> */}
        <div className="section-full job-categories content-inner-2 bg-white">
          <div className="container">
            <Jobcategories />
          </div>
          {/* <div className="content">
              <div className="title text-center">Popular Categories</div>
              <div className="heading text-center">20+ Categories <span> Waiting </span> For You</div>
              <div className="owl-slider">
                <div id="carousel" className="owl-carousel">
                  <div className="item">
                    <div className="card">
                      <div className="img"><img src={category1} className="w-100"/></div>
                      <div className="card-heading">Design, Art and Media</div>
                      <div className="card-text">Lorem ipsum dolor sit amet. Qui dolorem eius et cumque qui voluptas sint quo recusandae ratione! Qui quibusdam odio </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="card">
                      <div className="img"><img src={category2} className="w-100"/></div>
                      <div className="card-heading">Education Training</div>
                      <div className="card-text">Lorem ipsum dolor sit amet. Qui dolorem eius et cumque qui voluptas sint quo recusandae ratione! Qui quibusdam odio </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="card">
                      <div className="img"><img src={category3} className="w-100"/></div>
                      <div className="card-heading">Accounting And Finance</div>
                      <div className="card-text">Lorem ipsum dolor sit amet. Qui dolorem eius et cumque qui voluptas sint quo recusandae ratione! Qui quibusdam odio </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="card">
                      <div className="img"><img src={category1} className="w-100"/></div>
                      <div className="card-heading">Design, Art and Media</div>
                      <div className="card-text">Lorem ipsum dolor sit amet. Qui dolorem eius et cumque qui voluptas sint quo recusandae ratione! Qui quibusdam odio </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="card">
                      <div className="img"><img src={category2} className="w-100"/></div>
                      <div className="card-heading">Education Training</div>
                      <div className="card-text">Lorem ipsum dolor sit amet. Qui dolorem eius et cumque qui voluptas sint quo recusandae ratione! Qui quibusdam odio </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="card">
                      <div className="img"><img src={category3}className="w-100"/></div>
                      <div className="card-heading">Accounting And Finance</div>
                      <div className="card-text">Lorem ipsum dolor sit amet. Qui dolorem eius et cumque qui voluptas sint quo recusandae ratione! Qui quibusdam odio </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="card">
                      <div className="img"><img src={category1} className="w-100"/></div>
                      <div className="card-heading">Design, Art and Media</div>
                      <div className="card-text">Lorem ipsum dolor sit amet. Qui dolorem eius et cumque qui voluptas sint quo recusandae ratione! Qui quibusdam odio </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="card">
                      <div className="img"><img src={category2} className="w-100"/></div>
                      <div className="card-heading">Education Training</div>
                      <div className="card-text">Lorem ipsum dolor sit amet. Qui dolorem eius et cumque qui voluptas sint quo recusandae ratione! Qui quibusdam odio </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="card">
                      <div className="img"><img src={category3} className="w-100"/></div>
                      <div className="card-heading">Accounting And Finance</div>
                      <div className="card-text">Lorem ipsum dolor sit amet. Qui dolorem eius et cumque qui voluptas sint quo recusandae ratione! Qui quibusdam odio </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="button text-center"><a href="#" className="btn btn-view">View More</a></div>
            </div> */}
        </div>
        <div className="app-section">
          <div className="content">
            <div className="row m-auto w-100 justify-content-center align-items-center mb-fd-cr">
              <div className="col-lg-4 col-ms-4 col-sm-12 col-12">
                <div className="title">Get the app.</div>
                <div className="heading">Get things done.</div>
                <div className="text">Compare prices, read reviews and book top-rated home pros — all in one free app.</div>
                <div className="button">
                  {/* <!-- App Store button --> */}
                  <a href="#" className="market-btn apple-btn" role="button">
                    <span className="market-button-subtitle">Download on the</span>
                    <span className="market-button-title">App Store</span>
                  </a>
                  {/* <!-- Google Play button --> */}
                  <a href="#" className="market-btn google-btn ml-4" role="button">
                    <span className="market-button-subtitle">Download on the</span>
                    <span className="market-button-title">Google Play</span>
                  </a>
                </div>
              </div>
              <div className="col-lg-4 col-ms-4 col-sm-12 col-12">
                <div className="img"><img src={appImage} className="w-75" /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial-section">
          <div className="content">
            <div className="title text-center">Reviews</div>
            <div className="heading text-center"> What People <span> Think </span>About Us</div>
            <Owltestimonial />
            {/* <div className="owl-slider">
                <div id="carousel1" className="owl-carousel">
                  <div className="item">
                    <div className="testimonial-card">
                      <div className="dataa">
                        <div className="img"><img src={testimonialvector} className="testimonial-vector"/></div>
                        <div className="card-text">Lorem ipsum dolor sit amet. Qui dolorem eius et cumque qui voluptas sint quo recusandae ratione! Qui quibusdam odio est reprehenderit laborum qui corporis ipsa aut libero corrupti? atione! Qui quibus</div>
                        <div className="card-rating">
                          <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                        </div>
                      </div>
                    </div>
                    <div className="writer">
                      <div className="img"><img src={testimonialvector}/></div>
                      <div>
                        <div className="name">Mary Jane</div>
                        <div className="designation">Manager</div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="testimonial-card">
                      <div className="dataa">
                        <div className="img"><img src={testimonialvector} className="testimonial-vector"/></div>
                        <div className="card-text">Lorem ipsum dolor sit amet. Qui dolorem eius et cumque qui voluptas sint quo recusandae ratione! Qui quibusdam odio est reprehenderit laborum qui corporis ipsa aut libero corrupti? atione! Qui quibus</div>
                        <div className="card-rating">
                          <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                        </div>
                      </div>
                    </div>
                    <div className="writer">
                      <div className="img"><img src={testimonialvector}/></div>
                      <div>
                        <div className="name">Mary Jane</div>
                        <div className="designation">Manager</div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="testimonial-card">
                      <div className="dataa">
                        <div className="img"><img src={testimonialvector} className="testimonial-vector"/></div>
                        <div className="card-text">Lorem ipsum dolor sit amet. Qui dolorem eius et cumque qui voluptas sint quo recusandae ratione! Qui quibusdam odio est reprehenderit laborum qui corporis ipsa aut libero corrupti? atione! Qui quibus</div>
                        <div className="card-rating">
                          <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                        </div>
                      </div>
                    </div>
                    <div className="writer">
                      <div className="img"><img src={testimonialvector}/></div>
                      <div>
                        <div className="name">Mary Jane</div>
                        <div className="designation">Manager</div>
                      </div>
                    </div>
                  </div> 
                </div>
              </div>*/}
          </div>
        </div>
        <div className="newsletter-section">
          <div className="content">
            <div className="row w-100 m-auto justify-content-between align-items-end mb-fd-cr">
              <div className="col-lg-6 col-md-6 col-12 col-sm-12">
                <div className="heading">Sign Up For Newsletter</div>
                <div className="text">Subscribe to our newsletter to get latest news and updates</div>
                <div className="subscribe_now">
                  <form className="subscribe_form">
                    <div className="input-group">
                      <input type="text" className="form-control" name="email" placeholder="Enter your email" />
                      <span className="input-group-btn">
                        <button className="btn btn-default" type="button">subscribe</button>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-12 col-sm-12">
                <div className="img"><img src={newslettervector} className="w-100" /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-section">
          <div className="content">
            <div className="top-section">
              <div className="row m-auto w-100">
                <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                  <div className="footer-logo"><img src={logo} /></div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                  <div className="footer-links pl-3">
                    <div className="footer-link-heading">Quick Links</div>
                    <ul>
                      <li><a href="#">About</a></li>
                      <li><a href="#">Career Services</a></li>
                      <li><a href="#">Contact</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                  <div className="footer-links">
                    <div className="footer-link-heading">Information</div>
                    <ul>
                      <li><a href="#">FAQ</a></li>
                      <li><a href="#">Blog</a></li>
                      <li><a href="#">Support</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                  <div className="footer-links">
                    <div className="footer-link-heading">Information</div>
                    <ul>
                      <li><img src={phonelogo} /> &nbsp; <a href="#">(203) 245-9812</a></li>
                      <li><img src={maillogo} /> &nbsp; <a href="#">info@corrrecthustle.com</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Landingpage
