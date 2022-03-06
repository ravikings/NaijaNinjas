import React from "react";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
function Attachments(props) {
  return (
    <div>
      <div style={{ fontSize: 20, color: "#333", marginBottom: 15 }}>
        Attachments
      </div>
      <div className="attachments-container">
        <a href="#" className="attachment-box ripple-effect">
          <span>Cover Letter</span>
          <i>PDF</i>
        </a>
        <a href="#" className="attachment-box ripple-effect">
          <span>Contract</span>
          <i>DOCX</i>
        </a>
      </div>
    </div>
  );
}

export default Attachments;
