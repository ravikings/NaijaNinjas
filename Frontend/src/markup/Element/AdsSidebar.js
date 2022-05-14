import React,{useState , useEffect } from 'react';
import {Link,useHistory} from 'react-router-dom';
import createRequest from "../../utils/axios";
import { Accordion,Card } from 'react-bootstrap';

function AdsSidebar(){
	const history = useHistory();
	const [data,setData]= useState([])
	// geting data from api for fourm start
	const ForumData = () => {
		createRequest()
		  .get("/forum/recent/")
		  .then((res) => {
				
				setData(res.data.results)
			
			
		
		  })
		  .catch((e) => {
			if (e.response?.status === 400) {
			console.log(e?.response?.data?.non_field_errors[0]);
			} else {
			  console.log("Unknown Error");
			}
		  });
	  };
	const SearchBar=(e)=>{
		e.preventDefault();
		
		history.push(`/search/${e.target[0].value}`);
	}
	// geting data from api for fourm end
	// effect start
	useEffect(()=>{
		ForumData()
	},[])
	// effect end
	return(
		<aside  className="side-bar">
			<div className="widget">
				<h6 className="widget-title style-1">Search</h6>
				<div className="search-bx style-1">
					<form role="search" onSubmit={SearchBar}>
						<div className="input-group">
							<input name="text" className="form-control" placeholder="Enter your keywords..." type="text" />
							<span className="input-group-btn">
								<button type="submit" className="fa fa-search text-primary"></button>
							</span> 
						</div>
					</form>
				</div>
			</div>
			<div className="widget recent-posts-entry">
				<h6 className="widget-title style-1">Filter Ads</h6>
				<div >
				<Accordion defaultActiveKey="0" >
				
					
						<Accordion.Toggle as={Card} eventKey="0">
							<div className="acod-head">
								<h6 className="acod-title"> 
									<Link data-toggle="collapse" to="#companies">Cateogry</Link>
								</h6>	
							</div>
						</Accordion.Toggle>
						
						<Accordion.Collapse eventKey="0">
							<div id="companies" className="acod-body collapse show">
								<div className="acod-content">
									<div className="custom-control custom-checkbox">
										<input className="custom-control-input" id="companies1" type="checkbox" name="checkbox-companies" />
										<label className="custom-control-label" htmlFor="companies1">Job Mirror Consultancy <span>(50)</span> </label>
									</div>
									<div className="custom-control custom-checkbox">
										<input className="custom-control-input" id="companies2" type="checkbox" name="checkbox-companies" />
										<label className="custom-control-label" htmlFor="companies2">Engineering Group <span>(80)</span> </label>
									</div>
									<div className="custom-control custom-checkbox">
										<input className="custom-control-input" id="companies3" type="checkbox" name="checkbox-companies" />
										<label className="custom-control-label" htmlFor="companies3">Electric Co. <span>(235)</span> </label>
									</div>
									<div className="custom-control custom-checkbox">
										<input className="custom-control-input" id="companies4" type="checkbox" name="checkbox-companies" />
										<label className="custom-control-label" htmlFor="companies4">Telecom industry <span>(568)</span></label>
									</div>
									<div className="custom-control custom-checkbox">
										<input className="custom-control-input" id="companies5" type="checkbox" name="checkbox-companies" />
										<label className="custom-control-label" htmlFor="companies5">Safety/ Health <span>(798)</span></label>
									</div>
								</div>
							</div>
						</Accordion.Collapse>
						
						<Accordion.Toggle as={Card} eventKey="1">
							<div className="acod-head">
								<h6 className="acod-title"> 
									<a data-toggle="collapse"  href="javascript:void(0)" className="collapsed" >
										Price 
									</a>
								</h6>
							</div>
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="1">
							<div id="salary" className="acod-body collapse show">
								<div className="acod-content">
									<div className="custom-control custom-radio">
										<input className="custom-control-input" id="salary-op1" type="radio" name="radio-currency" />
										<label className="custom-control-label" htmlFor="salary-op1">50$-100$ <span> (120)</span> </label>
									</div>
									<div className="custom-control custom-radio">
										<input className="custom-control-input" id="salary-op2" type="radio" name="radio-currency" />
										<label className="custom-control-label" htmlFor="salary-op2">100$-200$ <span>(300)</span> </label>
									</div>
									<div className="custom-control custom-radio">
										<input className="custom-control-input" id="salary-op3" type="radio" name="radio-currency" />
										<label className="custom-control-label" htmlFor="salary-op3">200$-300$ <span>(235)</span> </label>
									</div>
									
								</div>
							</div>
						</Accordion.Collapse>
						
					
				
						
				</Accordion>
				</div>
			</div>
		
		</aside>
	)
}

export default AdsSidebar;