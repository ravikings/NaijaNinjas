import React,{useEffect,useState} from 'react';
import $ from 'jquery';
import { Link} from 'react-router-dom';

const BlogPost=() =>{
  
useEffect(()=>{
	$(".share-buttons-icons a").each(function() {
        var buttonBG = $(this).attr("data-button-color");
            if(buttonBG !== undefined) {
              $(this).css('background-color',buttonBG);
            }
      });
},[])
return(
  <>
   <div className="clearfix" style={{marginTop:'100px'}} />

        {/* Header Container / End */}
        {/* Content
================================================== */}
        <div id="titlebar" className="gradient">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>Blog</h2>
                <span>Blog Post Page</span>
                {/* Breadcrumbs */}
                <nav id="breadcrumbs" className="dark">
                  <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Blog</a></li>
                    <li>Blog Post</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* Post Content */}
        <div className="container">
          <div className="row">
            {/* Inner Content */}
            <div className="col-xl-8 col-lg-8">
              {/* Blog Post */}
              <div className="blog-post single-post">
                {/* Blog Post Thumbnail */}
                <div className="blog-post-thumbnail">
                  <div className="blog-post-thumbnail-inner">
                    <span className="blog-item-tag">Tips</span>
                    <img src="images/blog-04.jpg" alt="" />
                  </div>
                </div>
                {/* Blog Post Content */}
                <div className="blog-post-content">
                  <h3 className="margin-bottom-10">5 Myths That Prevent Job Seekers from Overcoming Failure</h3>
                  <div className="blog-post-info-list margin-bottom-20">
                    <a href="#" className="blog-post-info">22 July 2019</a>
                    <a href="#" className="blog-post-info">5 Comments</a>
                  </div>
                  <p>Nam nisl lacus, dignissim ac tristique ut, scelerisque eu massa. Vestibulum ligula nunc, rutrum in malesuada vitae, tempus sed augue. Curabitur quis lectus quis augue dapibus facilisis. Vivamus tincidunt orci est, in vehicula nisi eleifend ut. Vestibulum sagittis varius orci vitae.</p>
                  <blockquote className="margin-top-20 margin-bottom-20">
                    Mauris aliquet ultricies ante, non faucibus ante gravida sed. Sed ultrices pellentesque purus, vulputate volutpat ipsum hendrerit sed neque sed sapien rutrum.
                  </blockquote>
                  <p>In ut odio libero, at vulputate urna. Nulla tristique mi a massa convallis cursus. Nulla eu mi magna. Etiam suscipit commodo gravida. Cras suscipit, quam vitae adipiscing faucibus, risus nibh laoreet odio, a porttitor metus eros ut enim. Morbi augue velit, tempus mattis dignissim nec, porta sed risus. Donec eget magna eu lorem tristique pellentesque eget eu dui. Fusce lacinia tempor malesuada. Ut lacus sapien, placerat a ornare nec, elementum sit amet felis. Maecenas pretium lorem hendrerit eros sagittis fermentum.</p>
                  <p>Phasellus enim magna, varius et commodo ut, ultricies vitae velit. Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo. In libero urna, venenatis sit amet ornare non, suscipit nec risus. Sed consequat justo non mauris pretium at tempor justo sodales. Quisque tincidunt laoreet malesuada. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer vitae ante enim. Fusce sed elit est. Suspendisse sit amet mauris in quam pretium faucibus et aliquam odio. </p>
                  {/* Share Buttons */}
                  <div className="share-buttons margin-top-25">
                    <div className="share-buttons-trigger"><i className="icon-feather-share-2" /></div>
                    <div className="share-buttons-content">
                      <span>Interesting? <strong>Share It!</strong></span>
                      <ul className="share-buttons-icons">
                        <li><a href="#" data-button-color="#3b5998" title="Share on Facebook" data-tippy-placement="top"><i className="icon-brand-facebook-f" /></a></li>
                        <li><a href="#" data-button-color="#1da1f2" title="Share on Twitter" data-tippy-placement="top"><i className="icon-brand-twitter" /></a></li>
                        <li><a href="#" data-button-color="#dd4b39" title="Share on Google Plus" data-tippy-placement="top"><i className="icon-brand-google-plus-g" /></a></li>
                        <li><a href="#" data-button-color="#0077b5" title="Share on LinkedIn" data-tippy-placement="top"><i className="icon-brand-linkedin-in" /></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Blog Post Content / End */}
              {/* Blog Nav */}
              <ul id="posts-nav" className="margin-top-0 margin-bottom-40">
                <li className="next-post">
                  <a href="#">
                    <span>Next Post</span>
                    <strong>16 Ridiculously Easy Ways to Find &amp; Keep a Remote Job</strong>
                  </a>
                </li>
                <li className="prev-post">
                  <a href="#">
                    <span>Previous Post</span>
                    <strong>11 Tips to Help You Get New Clients Through Cold Calling</strong>
                  </a>
                </li>
              </ul>
              {/* Related Posts */}
              <div className="row">
                {/* Headline */}
                <div className="col-xl-12">
                  <h3 className="margin-top-40 margin-bottom-35">Related Posts</h3>
                </div>
                {/* Blog Post Item */}
                <div className="col-xl-6">
                  <a href="pages-blog-post.html" className="blog-compact-item-container">
                    <div className="blog-compact-item">
                      <img src="images/blog-02a.jpg" alt="" />
                      <span className="blog-item-tag">Recruiting</span>
                      <div className="blog-compact-item-content">
                        <ul className="blog-post-tags">
                          <li>29 June 2019</li>
                        </ul>
                        <h3>How to "Woo" a Recruiter and Land Your Dream Job</h3>
                        <p>Appropriately empower dynamic leadership skills after business portals. Globally myocardinate interactive.</p>
                      </div>
                    </div>
                  </a>
                </div>
                {/* Blog post Item / End */}
                {/* Blog Post Item */}
                <div className="col-xl-6">
                  <a href="pages-blog-post.html" className="blog-compact-item-container">
                    <div className="blog-compact-item">
                      <img src="images/blog-03a.jpg" alt="" />
                      <span className="blog-item-tag">Marketing</span>
                      <div className="blog-compact-item-content">
                        <ul className="blog-post-tags">
                          <li>10 June 2019</li>
                        </ul>
                        <h3>11 Tips to Help You Get New Clients Through Cold Calling</h3>
                        <p>Compellingly embrace empowered e-business after user friendly intellectual capital. Interactively front-end.</p>
                      </div>
                    </div>
                  </a>
                </div>
                {/* Blog post Item / End */}
              </div>
              {/* Related Posts / End */}
              {/* Comments */}
              <div className="row">
                <div className="col-xl-12">
                  <section className="comments">
                    <h3 className="margin-top-45 margin-bottom-0">Comments <span className="comments-amount">(5)</span></h3>
                    <ul>
                      <li>
                        <div className="avatar"><img src="images/user-avatar-placeholder.png" alt="" /></div>
                        <div className="comment-content"><div className="arrow-comment" />
                          <div className="comment-by">Kathy Brown<span className="date">12th, June 2019</span>
                            <a href="#" className="reply"><i className="fa fa-reply" /> Reply</a>
                          </div>
                          <p>Morbi velit eros, sagittis in facilisis non, rhoncus et erat. Nam posuere tristique sem, eu ultricies tortor imperdiet vitae. Curabitur lacinia neque non metus</p>
                        </div>
                        <ul>
                          <li>
                            <div className="avatar"><img src="images/user-avatar-placeholder.png" alt="" /></div>
                            <div className="comment-content"><div className="arrow-comment" />
                              <div className="comment-by">Tom Smith<span className="date">12th, June 2019</span>
                                <a href="#" className="reply"><i className="fa fa-reply" /> Reply</a>
                              </div>
                              <p>Rrhoncus et erat. Nam posuere tristique sem, eu ultricies tortor imperdiet vitae. Curabitur lacinia neque.</p>
                            </div>
                          </li>
                          <li>
                            <div className="avatar"><img src="images/user-avatar-placeholder.png" alt="" /></div>
                            <div className="comment-content"><div className="arrow-comment" />
                              <div className="comment-by">Kathy Brown<span className="date">12th, June 2019</span>
                                <a href="#" className="reply"><i className="fa fa-reply" /> Reply</a>
                              </div>
                              <p>Nam posuere tristique sem, eu ultricies tortor.</p>
                            </div>
                            <ul>
                              <li>
                                <div className="avatar"><img src="images/user-avatar-placeholder.png" alt="" /></div>
                                <div className="comment-content"><div className="arrow-comment" />
                                  <div className="comment-by">John Doe<span className="date">12th, June 2019</span>
                                    <a href="#" className="reply"><i className="fa fa-reply" /> Reply</a>
                                  </div>
                                  <p>Great template!</p>
                                </div>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <div className="avatar"><img src="images/user-avatar-placeholder.png" alt="" /> </div>
                        <div className="comment-content"><div className="arrow-comment" />
                          <div className="comment-by">John Doe<span className="date">15th, May 2015</span>
                            <a href="#" className="reply"><i className="fa fa-reply" /> Reply</a>
                          </div>
                          <p>Commodo est luctus eget. Proin in nunc laoreet justo volutpat blandit enim. Sem felis, ullamcorper vel aliquam non, varius eget justo. Duis quis nunc tellus sollicitudin mauris.</p>
                        </div>
                      </li>
                    </ul>
                  </section>
                </div>
              </div>
              {/* Comments / End */}
              {/* Leava a Comment */}
              <div className="row">
                <div className="col-xl-12">
                  <h3 className="margin-top-35 margin-bottom-30">Add Comment</h3>
                  {/* Form */}
                  <form method="post" id="add-comment">
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="input-with-icon-left no-border">
                          <i className="icon-material-outline-account-circle" />
                          <input type="text" className="input-text" name="commentname" id="namecomment" placeholder="Name" required />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="input-with-icon-left no-border">
                          <i className="icon-material-baseline-mail-outline" />
                          <input type="text" className="input-text" name="emailaddress" id="emailaddress" placeholder="Email Address" required />
                        </div>
                      </div>
                    </div>
                    <textarea name="comment-content" cols={30} rows={5} placeholder="Comment" defaultValue={""} />
                  </form>
                  {/* Button */}
                  <button className="button button-sliding-icon ripple-effect margin-bottom-40" type="submit" form="add-comment">Add Comment <i className="icon-material-outline-arrow-right-alt" /></button>
                </div>
              </div>
              {/* Leava a Comment / End */}
            </div>
            {/* Inner Content / End */}
            <div className="col-xl-4 col-lg-4 content-left-offset">
              <div className="sidebar-container">
                {/* Location */}
                <div className="sidebar-widget margin-bottom-40">
                  <div className="input-with-icon">
                    <input id="autocomplete-input" type="text" placeholder="Search" />
                    <i className="icon-material-outline-search" />
                  </div>
                </div>
                {/* Widget */}
                <div className="sidebar-widget">
                  <h3>Trending Posts</h3>
                  <ul className="widget-tabs">
                    {/* Post #1 */}
                    <li>
                      <a href="#" className="widget-content active">
                        <img src="images/blog-02a.jpg" alt="" />
                        <div className="widget-text">
                          <h5>How to "Woo" a Recruiter and Land Your Dream Job</h5>
                          <span>29 June 2019</span>
                        </div>
                      </a>
                    </li>
                    {/* Post #2 */}
                    <li>
                      <a href="#" className="widget-content">
                        <img src="images/blog-07a.jpg" alt="" />
                        <div className="widget-text">
                          <h5>What It Really Takes to Make $100k Before You Turn 30</h5>
                          <span>3 June 2019</span>
                        </div>
                      </a>
                    </li>
                    {/* Post #3 */}
                    <li>
                      <a href="#" className="widget-content">
                        <img src="images/blog-04a.jpg" alt="" />
                        <div className="widget-text">
                          <h5>5 Myths That Prevent Job Seekers from Overcoming Failure</h5>
                          <span>5 June 2019</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Widget / End*/}
                {/* Widget */}
                <div className="sidebar-widget">
                  <h3>Social Profiles</h3>
                  <div className="freelancer-socials margin-top-25">
                    <ul>
                      <li><a href="#" title="Dribbble" data-tippy-placement="top"><i className="icon-brand-dribbble" /></a></li>
                      <li><a href="#" title="Twitter" data-tippy-placement="top"><i className="icon-brand-twitter" /></a></li>
                      <li><a href="#" title="Behance" data-tippy-placement="top"><i className="icon-brand-behance" /></a></li>
                      <li><a href="#" title="GitHub" data-tippy-placement="top"><i className="icon-brand-github" /></a></li>
                    </ul>
                  </div>
                </div>
                {/* Widget */}
                <div className="sidebar-widget">
                  <h3>Tags</h3>
                  <div className="task-tags">
                    <a href="#"><span>employer</span></a>
                    <a href="#"><span>recruiting</span></a>
                    <a href="#"><span>work</span></a>
                    <a href="#"><span>salary</span></a>
                    <a href="#"><span>tips</span></a>
                    <a href="#"><span>income</span></a>
                    <a href="#"><span>application</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Spacer */}
        <div className="padding-top-40" />
        {/* Spacer */}

        </>
    )

}

export default BlogPost
