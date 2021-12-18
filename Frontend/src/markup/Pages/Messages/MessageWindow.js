import React from "react";
import { Avatar, Grid, TextField, withStyles } from "@material-ui/core";
import { useStyles } from "./messagesStyles";
import LeftMsg from "./LeftMsg";
import RightMsg from "./RightMsg";
import { Button } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
  },
})(TextField);

function MessageWindow(props) {
  const classes = useStyles();
  return (
    <div
      style={{
        overflowY: "auto",
        overflowX: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            borderBottom: "1px solid #ccc",
            height: 85,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 16,
              marginLeft: 22,
              color: "#333333",
              fontWeight: 600,
            }}
          >
            Kasun Chandika
          </div>
          <div
            style={{
              fontSize: 13,
              marginRight: 22,
              display: "flex",
              alignItems: "center",
            }}
          >
            <DeleteOutlinedIcon
              style={{
                fontSize: 20,
                marginRight: 5,
              }}
            />
            <div>Delete Conversation</div>
          </div>
        </div>
        <div
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            padding: "30px 0px",
          }}
        >
          <LeftMsg />
          <RightMsg />
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid #ccc",
          display: "flex",
          justifyContent: "space-between",
          padding: 30,
        }}
      >
        <CssTextField
          style={{ marginRight: 15 }}
          variant={"outlined"}
          placeholder={"Your Message"}
          fullWidth
        />
        <Button className={classes.sendButton}>Send</Button>
      </div>
    </div>
  );
}

export default MessageWindow;
