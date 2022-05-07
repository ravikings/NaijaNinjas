import React,{useState , useEffect } from 'react';
import {Link,useHistory} from 'react-router-dom';
import createRequest from "../../utils/axios";

const widgetPost=[
	{ image: require('./../../images/blog/recent-blog/pic1.jpg'),
	  title : '11 Tips to Help You Get New Clients Through Cold Calling',
	},
	{ image: require('./../../images/blog/recent-blog/pic2.jpg'),
	  title : 'Do you have a job that the average person doesn’t even know exists?',
	},
	{ image: require('./../../images/blog/recent-blog/pic3.jpg'),
	  title : 'Using Banner Stands To Increase Trade Show Traffic',
	},
]
const dzPost=[
	{ image: require('./../../images/gallery/pic2.jpg'), },
	{ image: require('./../../images/gallery/pic1.jpg'), },
	{ image: require('./../../images/gallery/pic5.jpg'), },
	{ image: require('./../../images/gallery/pic7.jpg'), },
	{ image: require('./../../images/gallery/pic8.jpg'), },
	{ image: require('./../../images/gallery/pic9.jpg'), },
]

function Sidebar(){
	const history = useHistory();
	const [data,setData]= useState([])
	// geting data from api for fourm start
	const ForumData = () => {
		createRequest()
		  .get("forum/list/")
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
	},[data.length])
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
				<h6 className="widget-title style-1">Recent Questions</h6>
				<div className="widget-post-bx">
					{data.map((item,index)=>(	
						<div className="widget-post clearfix mt-2 mb-2" key={index}>
							
							<div className="dez-post-info">
								<div className="dez-post-header">
									<h6 className="post-title"><Link to={`/blog-details/${item.id}/${item.title}`}>Q: {item.title}</Link></h6>
								</div>
								<div className="dez-post-meta">
									<ul className="d-flex align-items-center">
										<li className="post-date"><i className="fa fa-calendar"></i>{item.time_created?.Created}</li>
										<li className="post-comment"><Link to={'#'}><i className="fa fa-comments-o"></i>{item.forum_comment.length}</Link> </li>
									</ul>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="widget widget_gallery gallery-grid-3">
				<h6 className="widget-title style-1">Our services</h6>
				<ul>
					{dzPost.map((item,index)=>(
						<li key={index}>
							<div className="dez-post-thum">
								<Link to={""} className="dez-img-overlay1 dez-img-effect zoom-slow">
									<img src={item.image} alt="" />
								</Link>
							</div>
						</li>
					))}	
					
				</ul>
			</div>
			<div className="widget widget_archive">
				<h6 className="widget-title style-1">Categories List</h6>
				<ul>
					<li><Link to={""}>aciform</Link></li>
					<li><Link to={""}>championship</Link></li>
					<li><Link to={""}>chastening</Link></li>
					<li><Link to={""}>clerkship</Link></li>
					<li><Link to={""}>disinclination</Link></li>
				</ul>
			</div>
			<div className="widget widget-newslatter">
				<h6 className="widget-title style-1">Newsletter</h6>
				<div className="news-box">
					<p>Enter your e-mail and subscribe to our newsletter.</p>
					<form className="dzSubscribe" action="script/mailchamp.php" method="post">
						<div className="dzSubscribeMsg"></div>
						<div className="input-group">
							<input name="dzEmail" required="required" type="email" className="form-control" placeholder="Your Email" />
							<button name="submit" value="Submit" type="submit" className="site-button btn-block">Subscribe Now</button>
						</div>
					</form>
				</div>
			</div>
		</aside>
	)
}

export default Sidebar;