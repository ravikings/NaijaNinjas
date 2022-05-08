import React from "react";

function AboutMe(props) {
  return (
    <div className="mt-4" >
      <div>
        <p>{props.data}</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
          iure nesciunt possimus? Alias blanditiis consequatur doloribus, enim
          esse libero nam officiis omnis reiciendis. Distinctio ea esse eum
          itaque, nesciunt sequi! Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Deleniti enim exercitationem non tempore. Amet
          consectetur, eius exercitationem facilis harum hic in labore laborum
          laudantium natus numquam odio omnis quae quo quod reiciendis similique
          sit, totam ullam unde. Ab, natus velit?
        </p>
      </div>
      {/* <div className='actions'>
        <button className='site-button'>
          {" "}
          <i className='fa fa-comments-o  mr-2'></i> Message
        </button>
        <button className='site-button btn-outlined ml-4'>
          <i className='fa fa-phone mr-2'></i> Request a Call
        </button>
      </div> */}
    </div>
  );
}

export default AboutMe;
