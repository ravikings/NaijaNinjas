import React from "react";
import {
  Avatar,
  Grid,
  InputAdornment,
  TextField,
  withStyles,
} from "@material-ui/core";
import { useStyles } from "./messagesStyles";
import ChatListItem from "./ChatListItem";
import SearchIcon from "@material-ui/icons/Search";

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

function ChatList(props) {
  const classes = useStyles();
  return (
    <div>
      <div style={{ padding: "22px 30px", borderBottom: "1px solid #ccc" }}>
        <CssTextField
          size={"small"}
          classes={{ root: classes.search }}
          fullWidth
          variant={"outlined"}
          placeholder={"Search"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "calc(100vh - 220px)",
        }}
      >
        <ChatListItem />
        <ChatListItem selected={true} />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
      </div>
    </div>
  );
}

export default ChatList;
