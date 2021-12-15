import React from "react";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import SingleFeedback from "./SingleFeedback";
import { Divider } from "@material-ui/core";

function Feedback(props) {
  return (
    <div style={{ marginTop: 40 }}>
      <div
        style={{
          background: "#F2F2F2",
          height: 60,
          paddingLeft: 30,
          display: "flex",
          alignItems: "center",
        }}
      >
        <ThumbUpAltOutlinedIcon style={{ color: "#3f51b5" }} />
        <h5 style={{ fontWeight: 400, margin: "0px 10px" }}>
          Work History and Feedback
        </h5>
      </div>
      <div>
        <SingleFeedback />

        <SingleFeedback />
        <SingleFeedback />
      </div>
    </div>
  );
}

export default Feedback;
