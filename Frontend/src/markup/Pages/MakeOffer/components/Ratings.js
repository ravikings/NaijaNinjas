import React from "react";
import Rating from "@material-ui/lab/Rating";

function Ratings(props) {
  
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          background: "#febe42",
          color: "white",
          padding: "2px 7px",
          marginRight: 8,
          borderRadius: 4,
          fontWeight: 700,
        }}
      >
        5.0
      </div>
      <Rating
        style={{ color: "#febe42" }}
        name="read-only"
        value={4}
        readOnly
      />
    </div>
  );
}

export default Ratings;
