import React,{useState,useEffect} from 'react'
import DashboardFooter from '../../layout/dashboard/DashboardFooter'
import {  NavLink } from 'react-router-dom';
import Slider from 'react-rangeslider'
import $ from 'jquery';
export default function Setting() {
    const [volume,setVolume]=useState(0);

  
    useEffect(()=>{
    
        Slider.bind();
            var readURL = function(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
    
                    reader.onload = function (e) {
                        $('.profile-pic').attr('src', e.target.result);
                    };
            
                    reader.readAsDataURL(input.files[0]);
                }
            };
           
            $(".file-upload").on('change', function(){
                readURL(this);
            });
            
            $(".upload-button").on('click', function() {
               $(".file-upload").click();
            });
      

            // keyword start
            $(".keywords-container").each(function() {

                var keywordInput = $(this).find(".keyword-input");
                var keywordsList = $(this).find(".keywords-list");
        
                // adding keyword
                function addKeyword() {
                    var $newKeyword = $("<span class='keyword'><span class='keyword-remove'></span><span class='keyword-text'>"+ keywordInput.val() +"</span></span>");
                    keywordsList.append($newKeyword).trigger('resizeContainer');
                    keywordInput.val("");
                }
        
                // add via enter key
                keywordInput.on('keyup', function(e){
                    if((e.keyCode == 13) && (keywordInput.val()!=="")){
                        addKeyword();
                    }
                });
        
                // add via button
                $('.keyword-input-button').on('click', function(){ 
                    if((keywordInput.val()!=="")){
                        addKeyword();
                    }
                });
        
                // removing keyword
                $(document).on("click",".keyword-remove", function(){
                    $(this).parent().addClass('keyword-removed');
        
                    function removeFromMarkup(){
                      $(".keyword-removed").remove();
                    }
                    setTimeout(removeFromMarkup, 500);
                    keywordsList.css({'height':'auto'}).height();
                });
        
        
                // animating container height
                keywordsList.on('resizeContainer', function(){
                    var heightnow = $(this).height();
                    var heightfull = $(this).css({'max-height':'auto', 'height':'auto'}).height();
        
                    $(this).css({ 'height' : heightnow }).animate({ 'height': heightfull }, 200);
                });
        
                $(window).on('resize', function() {
                    keywordsList.css({'height':'auto'}).height();
                });
        
                // Auto Height for keywords that are pre-added
                $(window).on('load', function() {
                    var keywordCount = $('.keywords-list').children("span").length;
        
                    // Enables scrollbar if more than 3 items
                    if (keywordCount > 0) {
                        keywordsList.css({'height':'auto'}).height();
                
                    } 
                });
        
            });
        
        
            // keyword end
    },[])
      // slider rage start
      const handleOnChange = (value) => {
        console.log(value)
        setVolume(value)
       
      }
    return (
        <>
         <div className="dashboard-content-container" data-simplebar>
        <div className="dashboard-content-inner">
          {/* Market Place Headline */}
          <div className="dashboard-headline">
            <h3>Settings</h3>
            {/* Breadcrumbs */}
            <nav id="breadcrumbs" className="dark">
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Market Place</a></li>
                <li>Settings</li>
              </ul>
            </nav>
          </div>
          {/* Row */}
          <div className="row">
            {/* Market Place Box */}
            <div className="col-xl-12">
              <div className="dashboard-box margin-top-0">
                {/* Headline */}
                <div className="headline">
                  <h3><i className="icon-material-outline-account-circle" /> My Account</h3>
                </div>
                <div className="content with-padding padding-bottom-0">
                  <div className="row">
                    <div className="col-auto">
                      <div className="avatar-wrapper" data-tippy-placement="bottom" title="Change Avatar">
                        <img className="profile-pic" src="images/user-avatar-placeholder.png" alt="" />
                        <div className="upload-button" />
                        <input className="file-upload" type="file" accept="image/*" />
                      </div>
                    </div>
                    <div className="col">
                      <div className="row">
                        <div className="col-xl-6">
                          <div className="submit-field">
                            <h5>First Name</h5>
                            <input type="text" className="with-border" defaultValue="Tom" />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="submit-field">
                            <h5>Last Name</h5>
                            <input type="text" className="with-border" defaultValue="Smith" />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          {/* Account Type */}
                          <div className="submit-field">
                            <h5>Account Type</h5>
                            <div className="account-type">
                              <div>
                                <input type="radio" name="account-type-radio" id="freelancer-radio" className="account-type-radio" defaultChecked />
                                <label htmlFor="freelancer-radio" className="ripple-effect-dark"><i className="icon-material-outline-account-circle" /> Task-Runner</label>
                              </div>
                              <div>
                                <input type="radio" name="account-type-radio" id="employer-radio" className="account-type-radio" />
                                <label htmlFor="employer-radio" className="ripple-effect-dark"><i className="icon-material-outline-business-center" /> Employer</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="submit-field">
                            <h5>Email</h5>
                            <input type="text" className="with-border" defaultValue="tom@example.com" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Market Place Box */}
            <div className="col-xl-12">
              <div className="dashboard-box">
                {/* Headline */}
                <div className="headline">
                  <h3><i className="icon-material-outline-face" /> My Profile</h3>
                </div>
                <div className="content">
                  <ul className="fields-ul">
                    <li>
                      <div className="row">
                        <div className="col-xl-4">
                          <div className="submit-field">
                            <div className="bidding-widget">
                              {/* Headline */}
                              <span className="bidding-detail">Set your <strong>minimal hourly rate</strong></span>
                              {/* Slider */}
                              <div className="bidding-value margin-bottom-10">${volume}</div>
                              <Slider
        value={volume}
        orientation="horizontal"
        onChange={e => handleOnChange(e)}
        max={150}
        min={0}
        className="range-slider"
      />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4">
                          <div className="submit-field">
                            <h5>Skills <i className="help-icon" data-tippy-placement="right" title="Add up to 10 skills" /></h5>
                            {/* Skills List */}
                            <div className="keywords-container">
                              <div className="keyword-input-container">
                                <input type="text" className="keyword-input with-border" placeholder="e.g. Angular, Laravel" />
                                <button className="keyword-input-button ripple-effect"><i className="icon-material-outline-add" /></button>
                              </div>
                              <div className="keywords-list">
                                <span className="keyword"><span className="keyword-remove" /><span className="keyword-text">Angular</span></span>
                                <span className="keyword"><span className="keyword-remove" /><span className="keyword-text">Vue JS</span></span>
                                <span className="keyword"><span className="keyword-remove" /><span className="keyword-text">iOS</span></span>
                                <span className="keyword"><span className="keyword-remove" /><span className="keyword-text">Android</span></span>
                                <span className="keyword"><span className="keyword-remove" /><span className="keyword-text">Laravel</span></span>
                              </div>
                              <div className="clearfix" />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4">
                          <div className="submit-field">
                            <h5>Attachments</h5>
                            {/* Attachments */}
                            <div className="attachments-container margin-top-0 margin-bottom-0">
                              <div className="attachment-box ripple-effect">
                                <span>Cover Letter</span>
                                <i>PDF</i>
                                <button className="remove-attachment" data-tippy-placement="top" title="Remove" />
                              </div>
                              <div className="attachment-box ripple-effect">
                                <span>Contract</span>
                                <i>DOCX</i>
                                <button className="remove-attachment" data-tippy-placement="top" title="Remove" />
                              </div>
                            </div>
                            <div className="clearfix" />
                            {/* Upload Button */}
                            <div className="uploadButton margin-top-0">
                              <input className="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload" multiple />
                              <label className="uploadButton-button ripple-effect" htmlFor="upload">Upload Files</label>
                              <span className="uploadButton-file-name">Maximum file size: 10 MB</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div className="col-xl-6">
                          <div className="submit-field">
                            <h5>Tagline</h5>
                            <input type="text" className="with-border" defaultValue="iOS Expert + Node Dev" />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="submit-field">
                            <h5>Nationality</h5>
                            <select className="my-cat with-border" data-size={7} title="Select Job Type" data-live-search="true">
                              <option value="AR">Argentina</option>
                              <option value="AM">Armenia</option>
                              <option value="AW">Aruba</option>
                              <option value="AU">Australia</option>
                              <option value="AT">Austria</option>
                              <option value="AZ">Azerbaijan</option>
                              <option value="BS">Bahamas</option>
                              <option value="BH">Bahrain</option>
                              <option value="BD">Bangladesh</option>
                              <option value="BB">Barbados</option>
                              <option value="BY">Belarus</option>
                              <option value="BE">Belgium</option>
                              <option value="BZ">Belize</option>
                              <option value="BJ">Benin</option>
                              <option value="BM">Bermuda</option>
                              <option value="BT">Bhutan</option>
                              <option value="BG">Bulgaria</option>
                              <option value="BF">Burkina Faso</option>
                              <option value="BI">Burundi</option>
                              <option value="KH">Cambodia</option>
                              <option value="CM">Cameroon</option>
                              <option value="CA">Canada</option>
                              <option value="CV">Cape Verde</option>
                              <option value="KY">Cayman Islands</option>
                              <option value="CO">Colombia</option>
                              <option value="KM">Comoros</option>
                              <option value="CG">Congo</option>
                              <option value="CK">Cook Islands</option>
                              <option value="CR">Costa Rica</option>
                              <option value="CI">Côte d'Ivoire</option>
                              <option value="HR">Croatia</option>
                              <option value="CU">Cuba</option>
                              <option value="CW">Curaçao</option>
                              <option value="CY">Cyprus</option>
                              <option value="CZ">Czech Republic</option>
                              <option value="DK">Denmark</option>
                              <option value="DJ">Djibouti</option>
                              <option value="DM">Dominica</option>
                              <option value="DO">Dominican Republic</option>
                              <option value="EC">Ecuador</option>
                              <option value="EG">Egypt</option>
                              <option value="GP">Guadeloupe</option>
                              <option value="GU">Guam</option>
                              <option value="GT">Guatemala</option>
                              <option value="GG">Guernsey</option>
                              <option value="GN">Guinea</option>
                              <option value="GW">Guinea-Bissau</option>
                              <option value="GY">Guyana</option>
                              <option value="HT">Haiti</option>
                              <option value="HN">Honduras</option>
                              <option value="HK">Hong Kong</option>
                              <option value="HU">Hungary</option>
                              <option value="IS">Iceland</option>
                              <option value="IN">India</option>
                              <option value="ID">Indonesia</option>
                              <option value="NO">Norway</option>
                              <option value="OM">Oman</option>
                              <option value="PK">Pakistan</option>
                              <option value="PW">Palau</option>
                              <option value="PA">Panama</option>
                              <option value="PG">Papua New Guinea</option>
                              <option value="PY">Paraguay</option>
                              <option value="PE">Peru</option>
                              <option value="PH">Philippines</option>
                              <option value="PN">Pitcairn</option>
                              <option value="PL">Poland</option>
                              <option value="PT">Portugal</option>
                              <option value="PR">Puerto Rico</option>
                              <option value="QA">Qatar</option>
                              <option value="RE">Réunion</option>
                              <option value="RO">Romania</option>
                              <option value="RU">Russian Federation</option>
                              <option value="RW">Rwanda</option>
                              <option value="SZ">Swaziland</option>
                              <option value="SE">Sweden</option>
                              <option value="CH">Switzerland</option>
                              <option value="TR">Turkey</option>
                              <option value="TM">Turkmenistan</option>
                              <option value="TV">Tuvalu</option>
                              <option value="UG">Uganda</option>
                              <option value="UA">Ukraine</option>
                              <option value="GB">United Kingdom</option>
                              <option value="US" selected>United States</option>
                              <option value="UY">Uruguay</option>
                              <option value="UZ">Uzbekistan</option>
                              <option value="YE">Yemen</option>
                              <option value="ZM">Zambia</option>
                              <option value="ZW">Zimbabwe</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-xl-12">
                          <div className="submit-field">
                            <h5>Introduce Yourself</h5>
                            <textarea cols={30} rows={5} className="with-border" defaultValue={"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment."} />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Market Place Box */}
            <div className="col-xl-12">
              <div id="test1" className="dashboard-box">
                {/* Headline */}
                <div className="headline">
                  <h3><i className="icon-material-outline-lock" /> Password &amp; Security</h3>
                </div>
                <div className="content with-padding">
                  <div className="row">
                    <div className="col-xl-4">
                      <div className="submit-field">
                        <h5>Current Password</h5>
                        <input type="password" className="with-border" />
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="submit-field">
                        <h5>New Password</h5>
                        <input type="password" className="with-border" />
                      </div>
                    </div>
                    <div className="col-xl-4">
                      <div className="submit-field">
                        <h5>Repeat New Password</h5>
                        <input type="password" className="with-border" />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="checkbox">
                        <input type="checkbox" id="two-step" defaultChecked />
                        <label htmlFor="two-step"><span className="checkbox-icon" /> <span className="pr-4">Enable Two-Step Verification via Email</span></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Button */}
            <div className="col-xl-12">
              <a href="#" className="button ripple-effect big margin-top-30">Save Changes</a>
            </div>
          </div>
          {/* Row / End */}
          {/* Footer */}
          <DashboardFooter />
          {/* Footer / End */}
        </div>
      </div>
        </>
    )
}
