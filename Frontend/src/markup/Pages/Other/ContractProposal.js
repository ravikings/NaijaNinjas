import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import ClipLoader from "react-spinners/ClipLoader";

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import createRequest from "../../../utils/axios";
import axios from 'axios'



function ContractProposal(){

	const [freelancerAmount, setFreelancerAmount] = useState(0);
	const [gigxFee, setGigxFee] = useState(0);
	const [clientAmount, setClientAmount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [attachFile,setAttachFile]= useState(null);

	// upload image start
	const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

	// called every time a file's `status` changes
	const handleChangeStatus = ({ meta, file }, status) => {
		setAttachFile(file);
		}
	
		useEffect(()=>{
			
		  
		
		},[])
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
	return(
		<>
			<Header />
			<div className="page-content bg-white">
				
				<div className="container">
					<div >
						<h1 className="contract-title">Propose new contract</h1>
						<form className="contract-form">
						{/* contract Client Requirements start */}
						<div className="container-data m-b20">
						{/* contract Header start */}
						<div class="contract-header">
							<h2 class="mb-0">Contract details</h2>
							</div>
						{/* contract header end */}

						{/* contract section start */}
						<div className="contract-section">
						<div class="contract-client-name"><label class="up-label">Client</label>
						 <p class="break">Abdul Rabiu</p>
						 </div>
						
							<div className="form-group">
								<label htmlFor="">Contract Title</label>
								<input type="text" name="ContractTitle" placeholder="Contract Title" className="form-control" required />
							</div>
							<div className="form-group mb-10">
							<label>  Description    </label> 
		        <textarea  rows="5" className="form-control" required>
			  </textarea> 					
	  <span className="required-label"><i className="fa fa-exclamation-circle mr-1"></i> Description is required</span>
	  </div>
	  <div className="form-group">
		  <label>Attach File</label>
		  <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
     
      accept="image/*,audio/*,video/*,.pdf,.doc,.docx,.webm"
    />
	  </div> 
					
						</div>
						{/* contract section start */}
					</div>
					{/* contract Client Requirements end */}
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
						<button type="button" className="site-button ml-4">Send to Client</button>
						</div>
						{/* contract section start */}
					</div>
					{/* contract send button end */}
					</form>
					</div>
				</div>
			</div>	
			 
			<Footer />
		</>	
	)			
}
export default ContractProposal;