import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
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

function ChatList({ props, setUserDetails, userDetails, rowData, userRefetch }) {
  const classes = useStyles();
  const [params,setParams] = useState(useParams())
  const[searchText,setSearchText]  = useState()
  const SearchHandler = async (e) =>{
    setSearchText(e.target.value)
    // console.log(searchText)
  }
  console.log(userDetails,"userDetails")
  return (
    <div>
      <div style={{ padding: "22px 30px", borderBottom: "1px solid #ccc" }}>
        <CssTextField
          size={"small"}
          classes={{ root: classes.search }}
          fullWidth
          variant={"outlined"}
          placeholder={"Search"}
          onChange={SearchHandler}
          value={searchText} 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" >
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
        {
          rowData && rowData.length > 0 ?
            rowData.map((user, key) => (
              <ChatListItem key={key} user={user} setUserDetails={setUserDetails}  userRefetch={userRefetch} selected={userDetails && userDetails.chat_room_id === params.userId} />
                // searchText && user.name.includes(searchText)?
            ))
            :
            <div className="row">
              <div className="col-12 mt-4">
                <h6 className="text-muted text-center">No Chat Found</h6>
              </div>
            </div>
        }
      </div>
    </div>
  );
}

export default ChatList;
