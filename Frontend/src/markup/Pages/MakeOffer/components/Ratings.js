import React from "react";
import Rating from "@material-ui/lab/Rating";

function Ratings(props) {
  return (
    <div style={{ paddingTop: 5 }}>
      <Rating name="read-only" value={4} readOnly />
    </div>
  );
}

export default Ratings;
