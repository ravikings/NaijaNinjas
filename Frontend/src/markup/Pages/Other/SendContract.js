import React,{useState,useEffect} from 'react';
import {Link,useParams,useHistory} from 'react-router-dom';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import ClipLoader from "react-spinners/ClipLoader";
import { Badge } from "react-bootstrap";
import { Divider } from "@material-ui/core";
import createRequest from "../../../utils/axios";
import axios from 'axios'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import url from '../../../utils/baseUrl';
import swal from 'sweetalert';

function SendContract(){
	const history = useHistory();

	let token = `Bearer ` + localStorage.getItem("access_token");
	var userId = parseInt(localStorage.getItem("userID"));
	const [freelancerAmount, setFreelancerAmount] = useState(0);
	const [gigxFee, setGigxFee] = useState(0);
	const [clientAmount, setClientAmount] = useState(0);
	const [cover, setCover] = useState("");
	const [loading, setLoading] = useState(false);
	const [attachFile,setAttachFile]= useState(null);
	let { id} = useParams();
	
	const [data, setData] = useState([]);
  
	const allData = async () => {
		  setLoading(true);
		  await createRequest()
			.get(`api/v1/task/task/${id}/`)
			.then((res) => {
			 console.log(res)
		 setData(res.data)
		
			   setLoading(false);
			})
			.catch((e) => {
			  if (e.response?.status === 400) {
			  console.log(e?.response?.data?.non_field_errors[0]);
			  } else {
				console.log("Unknown Error");
			  }
			});
		}
	  useEffect(()=>{
		allData();
	  },[])
  
	// upload image start
	const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

	// called every time a file's `status` changes
	const handleChangeStatus = ({ meta, file }, status) => {
		setAttachFile(file);
		}
	
		
		const ClientTexCalculator=(e)=>{
			setClientAmount(e)
			let fee=(e*20)/100
			setGigxFee(fee);
			setFreelancerAmount(e-fee);
		}

		const FreelancerTexCalculator=(e)=>{
			let x=parseFloat(e);
			
			setFreelancerAmount(x)
			let fee=(20/100)*x
			if(fee>=0){

				setGigxFee(fee.toFixed(1));
			}
			else{
				setGigxFee(0)
			}
			
			setClientAmount(parseFloat(x+fee));
		}
		// effect end
	// single data fatch end
	// badding task start
	const addBadding=(e)=>{
		
		e.preventDefault();
		var formdata = new FormData();
		formdata.append("description",cover);
		formdata.append("offer", clientAmount);
		formdata.append("task",id);
		formdata.append("bidder",userId);
	
		axios({
			method: 'POST',
			url: `${url.baseURL}api/v1/task/task-bidding/`,
			data: formdata,
			headers: {
	  
			  Authorization: token,
	  
			},
		  })

			.then((response) => {
				
			  swal("Thank You", "Thank you for filling out your information!", "success");
			  setInterval(()=>{
					history.push('/')
			  },3000)

			  if(response.statusText =="Created"){
				
				
				
			  }
			  //console.log(response.data);
			}, (error) => {
			  console.log(error);
			
			});
	}
	// badding task end
	return(
		<>
			<Header />
			<div className="page-content bg-white">
				
				<div className="container">
				<div className="row">
				<div className="col-md-9  m-t40">
						<h1 className="contract-title">Submit Parposal</h1>
						<form className="contract-form" onSubmit={addBadding}>
						{/* contract Client Requirements start */}
						<div className="container-data m-b20">
						{/* contract Header start */}
						<div class="contract-header">
							<h2 class="mb-0">Job Details details</h2>
							</div>
						{/* contract header end */}

						{/* contract section start */}
						<div className="contract-section">
						<div class="contract-client-name">
                            
						 <h6 class="break">{data?.title}</h6>
                         <div className="mt-3 mb-4">
                           {data?.description}
						    </div>
                         <Divider />
                         <h4  className="panel-title mt-3">Skills and expertise</h4>

                         <div className='d-flex'>
						 {data?.tags?.split(',')?.map((e)=>(

								<Badge>{e}</Badge>
								))}
                              </div>
						 </div>
						
						
						
					
						</div>
						{/* contract section start */}
					</div>
					{/* contract Client Requirements end */}
                    	{/* contract Details Start */}
						<div className="container-data m-b20">
						{/* contract Header start */}
						<div class="contract-header">
							<h2 class="mb-0">Cover Latter </h2>
							</div>
						{/* contract header end */}

						{/* contract section start */}
						<div className="form-group mb-10">
							<label className="pl-4">  Cover Latter    </label> 
		        <textarea  rows="5" onChange={(e)=>setCover(e.target.value)} className="form-control" required>
					{cover}
			  </textarea> 					
	  <span className="required-label"><i className="fa fa-exclamation-circle mr-1"></i> Cover Latter  is required</span>
	  </div>
	  {/* <div className="col-lg-12 col-md-12">
		  <label>Attach File</label>
		  <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      className="text-black"
      accept="image/*,audio/*,video/*,.pdf,.doc,.docx,.webm"
    />
	  </div>  */}
						{/* contract section start */}
					</div>
					{/* contract Details end */}


					{/* contract Price Start */}
						<div className="container-data m-b20">
						{/* contract Header start */}
						<div class="contract-header">
							<h2 class="mb-0">Contract Amount</h2>
							</div>
						{/* contract header end */}

						{/* contract section start */}
						<div className="contract-section col-md-7">
						<div className="row contract-amount mb-4">
						<div className="col-md-6 ">
								<strong>Bid</strong>
								<div className="p-0 contract-amount-caption">Total amount the client will see</div>
							</div>
						<div className="col-md-6">
						<div className="input-group">
          <span className="input-group-prepend">
            <div className="input-group-text bg-transparent border-right-0"><i className="fa fa-dollar" /></div>
          </span>
          <input className="form-control py-2 border-left-0 border" value={clientAmount} onChange={(e)=>ClientTexCalculator(e.target.value)} type="number" step="step=0.01" min="0" defaultValue="0.00"  />
        
        </div>
							</div>
						</div>


						<div className="row contract-amount mb-4">
						<div className="col-md-6 ">
								<strong>GigX Now Service Fee</strong>
								
							</div>
						<div className="col-md-6 pl-4">
						     <span><i className="fa fa-dollar mr-4"></i></span><span>{gigxFee}</span>
							</div>
						</div>
						
						<div className="row contract-amount m-t30">
						<div className="col-md-6 ">
								<strong>You'll Receive</strong>
								<div className="p-0 contract-amount-caption">The estimated amount you'll receive after service fees</div>
							</div>
						<div className="col-md-6">
						<div className="input-group">
          <span className="input-group-prepend">
            <div className="input-group-text bg-transparent border-right-0"><i className="fa fa-dollar" /></div>
          </span>
          <input className="form-control py-2 border-left-0 border" value={freelancerAmount} onChange={(e)=>FreelancerTexCalculator(e.target.value)} type="number" step="step=0.01" min="0" defaultValue="0.00"  />
        
        </div>
							</div>
						</div>
						</div>
						{/* contract section start */}
					</div>
					{/* contract price end */}
				

					{/* contract send button Start */}
						<div className="container-data m-b20">
						
						{/* contract section start */}
						<div className="contract-section col-md-7">
						<button type="button" className="btn btn-outline-primary ml-4">Cancel</button>
						<button type="submit" className="site-button ml-4">Send to Client</button>
						</div>
						{/* contract section start */}
					</div>
					{/* contract send button end */}
					</form>
					</div>
					<div className="col-md-3 m-t40">
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
export default SendContract;