import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Accordion,Card } from 'react-bootstrap';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import ClipLoader from "react-spinners/ClipLoader";
import Select from 'react-select'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import createRequest from "../../../utils/axios";
import axios from 'axios'
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import TagsInput from '../components/TagsInput';


function PostAds(){
	const [detailsValue,setDetailsValue]= useState();
	const [loading, setLoading] = useState(false);
	const [attachFile,setAttachFile]= useState(null);

// handle tag end
	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' }
	  ]
	// upload image start
	const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

	// called every time a file's `status` changes
	const handleChangeStatus = ({ meta, file }, status) => {
		setAttachFile(file);
		}
	
    const selectedTags = tags => {
      console.log(tags);
    };
		
	// single data fatch end
	return(
		<>
			<Header />
			<div className="page-content bg-white">
			  <div className="container">
				  <div className="row">
					  
				  <div className="col-md-8">
				<div className="post-ads-block">
				<div className="post-ads-title col-md-12">
					<h1>Post Your Ad</h1>
					</div>		
                <div className="col-md-12 m-t90">
				<p className="lead">Posting an ad on <a className="text-primary" href="#">GigxNow</a> is free! However, all ads must follow our rules:</p>
				<form className="submit-form">

				<div className="col-md-12 col-lg-12 col-xs-12 col-sm-12">
        <label className="control-label">Project Title <small>Enter a short title for your project</small></label>
        <input className="form-control" placeholder="Brand new honda civic 2017 for sale" type="text" />
      </div>

	  <div className="row">
        {/* Category  */}
        <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
          <label className="control-label">Category <small>Select suitable category for your ad</small></label>
        <Select options={options} />
        </div>
        {/* Price  */}
        <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
          <label className="control-label">Price<small>USD only</small></label>
          <input className="form-control" placeholder="eg $350" type="text" />
        </div>
      </div>

	  <div className="row">
        <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <label className="control-label">Photos for your ad <small>Please add images of your ad. (350x450)</small></label>
		  <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
     
      accept="image/*"
    />
        </div>
      </div>
	  {/* add Description start */}
	  <div className="row">
    <div className="col-md-12 col-lg-12 col-xs-12  col-sm-12">
        <label className="control-label">Ad Description <small>Enter long description for your project</small></label>
       
		<ReactQuill value={detailsValue}
                  onChange={(e)=>{setDetailsValue(e)}} style={{height:'200px', paddingBottom:'70px'}} />
									
    </div>
</div>
	  {/* add Description end */}
	  {/* add tag start */}
	  <div className="row">
    <div className="col-md-12 col-lg-12 col-xs-12  col-sm-12 post-ads-tag">
        <label className="control-label">Ad Tags </label>
     
        <TagsInput selectedTags={selectedTags}  tags={[]}/>
    </div>
</div>
	  {/* add tag end */}
	  {/* ad type start */}
	  <div className="row">
        <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <label className="control-label">Type Of Ad<small>want to buy or sale</small></label>
          <div className="skin-minimal">
		  <div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="adtype" id="inlineRadio1" defaultValue="sell" />
          <label className="form-check-label" htmlFor="inlineRadio1">I want to sell</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="adtype" id="inlineRadio2" defaultValue="buy" />
          <label className="form-check-label" htmlFor="inlineRadio2">I want to buy</label>
        </div>
       
      </div>
		
          </div>
        </div>
      </div>
	  {/* ad type end */}
	  {/* ad Condition start */}
	  <div className="row">
        <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12">
		<label className="control-label">Condition<small>Item Condition</small></label>
          <div className="skin-minimal">
		  <div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="condition" id="inlineRadio1" defaultValue="new" />
          <label className="form-check-label" htmlFor="inlineRadio1">New</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="condition" id="inlineRadio2" defaultValue="used" />
          <label className="form-check-label" htmlFor="inlineRadio2">Used</label>
        </div>
       
      </div>
		
          </div>
        </div>
      </div>
	  {/* ad Condition end */}
	  {/* ad client info start */}
	  <div className="row">
        <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
          <label className="control-label">Your Name</label>
          <input className="form-control" placeholder="eg John Doe" type="text" />
        </div>
        <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
          <label className="control-label">Your Email ID<small>where you receive your emails</small></label>
          <input className="form-control" placeholder="contact@scriptsbundle.com" type="text" />
        </div>
      </div>

	  <div className="row">
        <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
          <label className="control-label">Mobile Number<small>number for conformation</small></label>
          <input className="form-control" placeholder="eg +92-0321-123-456-789" type="text" />
        </div>
        <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
          <label className="control-label">Address<small>your permanent address</small></label>
          <input className="form-control" placeholder="eg House no 8 Streent no 2 New York" type="text" />
        </div>
      </div>
	  {/* ad client info end */}
	  {/* Select Package Start */}
    <div className="select-package">
        <div className="no-padding col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <h3 className="margin-bottom-20">Select Package</h3>
          <Accordion >
				
					{/* row start */}
        <Accordion.Toggle as={Card} eventKey="0" className="package-accordion-header mb-1">
          <div className="acod-head">
            <h6 className="acod-title"> 
            Free Listing 
            </h6>	
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
        <div className="row">
            <div className="col-md-9 col-sm-9 col-xs-12">
             
              <p>Lorem ipsum dolor sit amet, non odio tincidunt ut ante, lorem a euismod suspendisse vel, sed quam nulla mauris iaculis.m dolor sit amet, non odio tincidunt ut ante, lorem a euismod suspendisse vel, sed quam nulla mauris iaculis</p>
            </div>
            {/* end col */}
            <div className="m-t10 col-md-3 col-sm-3 col-xs-12">
              <div className="pricing-list-price text-center">
                <h4>$0.00</h4>
                <a href="#submit" className="btn btn-primary btn-sm btn-block">Select</a>
              </div>
            </div>
            {/* end col */}
          </div>
        </Accordion.Collapse>
        {/* Row End */}
					{/* row start */}
        <Accordion.Toggle as={Card} eventKey="1" className="package-accordion-header mb-1">
          <div className="acod-head">
            <h6 className="acod-title"> 
            Premium Listing 
            </h6>	
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
        <div className="row">
            <div className="col-md-9 col-sm-9 col-xs-12">
             
              <p>Lorem ipsum dolor sit amet, non odio tincidunt ut ante, lorem a euismod suspendisse vel, sed quam nulla mauris iaculis.m dolor sit amet, non odio tincidunt ut ante, lorem a euismod suspendisse vel, sed quam nulla mauris iaculis</p>
            </div>
            {/* end col */}
            <div className="m-t10 col-md-3 col-sm-3 col-xs-12">
              <div className="pricing-list-price text-center">
                <h4>$10.00</h4>
                <a href="#submit" className="btn btn-primary btn-sm btn-block">Select</a>
              </div>
            </div>
            {/* end col */}
          </div>
        </Accordion.Collapse>
        {/* Row End */}
					{/* row start */}
        <Accordion.Toggle as={Card} eventKey="2" className="package-accordion-header mb-1">
          <div className="acod-head">
            <h6 className="acod-title"> 
            Business Listing
            </h6>	
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="2">
        <div className="row">
            <div className="col-md-9 col-sm-9 col-xs-12">
             
              <p>Lorem ipsum dolor sit amet, non odio tincidunt ut ante, lorem a euismod suspendisse vel, sed quam nulla mauris iaculis.m dolor sit amet, non odio tincidunt ut ante, lorem a euismod suspendisse vel, sed quam nulla mauris iaculis</p>
            </div>
            {/* end col */}
            <div className="m-t10 col-md-3 col-sm-3 col-xs-12">
              <div className="pricing-list-price text-center">
                <h4>$40.00</h4>
                <a href="#submit" className="btn btn-primary btn-sm btn-block">Select</a>
              </div>
            </div>
            {/* end col */}
          </div>
        </Accordion.Collapse>
        {/* Row End */}
    
        
      
    
        
    </Accordion>
       
         
        </div>
      </div>
    
	  {/* Select Package end */}
	   {/* payment start */}
     <div className="row">
        <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12">
		<label className="control-label">Make Your Ad Featured<small>What is featured ad</small></label>
          <div className="skin-minimal">
		  <div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="payment" id="inlineRadio1" defaultValue="new" />
          <label className="form-check-label" htmlFor="inlineRadio1"> Direct Bank Transfer</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="payment" id="inlineRadio1" defaultValue="new" />
          <label className="form-check-label" htmlFor="inlineRadio1">  Cheque Payment</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="payment" id="inlineRadio1" defaultValue="new" />
          <label className="form-check-label" htmlFor="inlineRadio1"> Paypal</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="payment" id="inlineRadio1" defaultValue="new" />
          <label className="form-check-label" htmlFor="inlineRadio1">  Credit Card</label>
        </div>
       
       
      </div>
		
          </div>
        </div>
      </div>
	  {/* payment end */}
    <button class="btn btn-primary pull-right">Publish My Ad</button>
				</form>
				</div>

				</div>
				  </div>
				  <div className="col-md-4">
				  <div className="">
        <div className="ads-sidebar-heading">
          <h4 className="panel-title"><a>Saftey Tips </a></h4>
        </div>
        <div className="ads-sidebar-content">
          <p className="lead">Posting an ad on <a href="#">GigxNow</a> is free! However, all ads must follow our rules:
          </p>
          <ol>
            <li>Make sure you post in the correct category.</li>
            <li>Do not post the same ad more than once or repost an ad within 48 hours.</li>
            <li>Do not upload pictures with watermarks.</li>
            <li>Do not post ads containing multiple items unless it's a package deal.</li>
            <li>Do not put your email or phone numbers in the title or description.</li>
            <li>Make sure you post in the correct category.</li>
            <li>Do not post the same ad more than once or repost an ad within 48 hours.</li>
            <li>Do not upload pictures with watermarks.</li>
            <li>Do not post ads containing multiple items unless it's a package deal.</li>
          </ol>
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
export default PostAds;