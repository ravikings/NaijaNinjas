import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal,Form} from "react-bootstrap";

const ForumAnwser = ({item , key}) => {
  return (
    <div className="container">
    <div className="row mt-4 mb-4">
    <hr />
    <div className="col-md-2">
      <div className="row">
        <div className="col-md-12 col-sm-6 col-6">
        <div className="caption-box">
        <div class="count-box">{item?.total_info?.total_comments }</div>
        <span class="caption-label">Anwser</span>
      </div>
        </div>
        <div className="col-md-12 col-sm-6 col-6 mt-2">
        <div className="caption-box anwser-box">
        <div className="count-box">
        {item?.total_info?.total_votes}
        {/* {item?.forum_comment.reduce((accumulator, object) => {
  return accumulator + object.total_votes;
}, 0)}        */}
          
</div>
      
        <span className="caption-label">Votes</span>
      </div>
        </div>
      </div>
    </div>
    <div className="col-md-10">
      <Link className="question-mark" to={`/blog-details/${item.id}/${item.title}`}>Q: {item.title}</Link>
    <div className="simple-anwser" dangerouslySetInnerHTML={{__html:item.body.slice(0,358)}}>
   

    </div>
   
    <div className="dez-post-meta mt-2">
													<ul className="d-flex align-items-center">
														<li className="post-comment"><i className="fa fa-user-o"></i>Ask By {item?.author_name[0]?.first_name +" "+item?.author_name[0]?.last_name} </li>
														<li className="post-date"><i className="fa fa-calendar"></i>{item.time_created?.Created}</li>
													</ul>
												</div>
    
    </div>
  </div>
  </div>
  )
}



export default ForumAnwser;
