import React from "react"
import ContentLoader from "react-content-loader"

const Loader = () => (
  <ContentLoader
    foregroundColor="#2e55fa"
    // backgroundColor="#ef8629"
    width={"100%"}
    height={"100%"}
    viewBox="0 0 800 350"
  >
    <rect x="50" y="8" rx="4" ry="4" width="90%" height="25" />
    <rect x="50" y="50" rx="2" ry="2" width="90%" height="100%" />
    <rect x="50" y="230" rx="2" ry="2" width="90%" height="100%" />
    <rect x="50" y="230" rx="2" ry="2" width="90%" height="100%" />
  </ContentLoader>
)

export default Loader

// import React from "react";
// import ClipLoader from "react-spinners/ClipLoader";

// const Loader = () => {
//   return (
//     <div className='loaderHome'>
//       <ClipLoader color={"#2e55fa"} loading={true} size={150} />
//     </div>
//   );
// };

// export default Loader;
