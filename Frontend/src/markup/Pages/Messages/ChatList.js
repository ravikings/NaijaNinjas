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
import { useQuery } from "react-query";
import agent from "../../../api/agent";
import createRequest from "../../../utils/axios";
import SearchChat from "./SearchChat.js"
import Search from "./search";
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

function ChatList({ props, setUserDetails, userDetails, rowData, userRefetch,userData,setUserData }) {
  const classes = useStyles();
  const [params,setParams] = useState(useParams())
  const[searchText,setSearchText]  = useState()
  const[dat,setdat] = useState([])
  const [ chatListOn, setChatOn]  = useState(true)
  const SearchHandler = async (e) =>{
    setSearchText(e.target.value)
    const Data = await createRequest().get(`/api/v1/account/chat-search-profiles/?search=${searchText}`)
    console.log(Data.results,"Data")
    // console.log(rowData)
    // setUserData(Data)
    setdat(Data)

    // setUserDetails(Data.results)
    // console.log(searchText)
  }

  // const { data: rowData2, refetchi } = useQuery(
  //   ["chat-row-data", userDetails],
  //   () => agent.Chat.getAllConversation(dat?.data.results[0].author),
  //   {
  //     refetchOnWindowFocus: false, //turned off on window focus refetch option
  //     enabled: false, // turned off by default, manual refetch is needed
  //     onSuccess: (d) => {},
  //   }
  // )
  // // console.log(data,"data1")
  console.log(dat?.data,"dat")
  // console.log(dat?.data?.count,"dat")
  // console.log(userData,"userData")
  //   // .data?.results[0].author)
  // console.log(rowData2,"rowData2")

  // console.log(userDetails,"userDetails")
  // const [searchText, setSearchText] = useState()
  if(searchText && dat && dat?.data?.results){
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
          {/* <Search dat={dat} /> */}
          {searchText &&dat && dat?.data?.results && dat?.data?.count >0   ? dat.data.results.map((item,kx) => {
            return (
            <SearchChat user={item}/>
            )
          }):<div className="row">
          <div className="col-12 mt-4">
            <h6 className="text-muted text-center">No search Found</h6>
          </div>
        </div>}
        </div>
      </div>
    )
  }
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
          rowData && rowData.length > 0 && !searchText  ?
            rowData.map((user, key) => (
              <ChatListItem key={key} user={user} setUserDetails={setUserDetails}  userRefetch={userRefetch} selected={userDetails && userDetails.chat_room_id === user.chat_room_id} />
                // searchText && user.name.includes(searchText)?
            ))
            :
            <div className="row">
              <div className="col-12 mt-4">
                <h6 className="text-muted text-center">No Chat Found</h6>
              </div>
            </div>
            
        }
        {/* {searchText &&dat && dat?.data?.results ? dat.data.results.map((item,kx) => {
          return (
          <SearchChat user={item}/>
          )
        }):<div className="row">
        <div className="col-12 mt-4">
          <h6 className="text-muted text-center">No search Found</h6>
        </div>
      </div>} */}
      </div>
    </div>
  );
}

export default ChatList;
