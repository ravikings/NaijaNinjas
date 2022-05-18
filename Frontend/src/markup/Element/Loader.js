import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <div className='loaderHome'>
      <ClipLoader color={"#2e55fa"} loading={true} size={150} />
    </div>
  );
};

export default Loader;
