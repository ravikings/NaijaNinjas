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
import agent from "../../../api/agent";
import { useQuery } from "react-query";
import createRequest from "../../../utils/axios";

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
  const [userData, setUserData] = useState(null);

  const getOnlineState = async () => {
    try {
      const { data } = await createRequest().get(
        `/api/v1/account/user-profile/${localStorage.getItem("userID")}/`
      )
      const status = data.user_set_status === false ? true : false
      setUserData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOnlineState()
  }, [])

  const { data: rowData, refetch } = useQuery(["chat-row-data", userData], () => agent.Chat.getAllConversation(userData.author),
    {
      refetchOnWindowFocus: false,//turned off on window focus refetch option
      enabled: false, // turned off by default, manual refetch is needed
      onSuccess: (d) => {
        console.log(d);

      }
    }
  );

  useEffect(() => {
    refetch();
  }, [userData])
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
        {
          rowData && rowData.length > 0 ?
            rowData.map((user, key) => (
              <ChatListItem key={key} user={user} />
            ))
            :
            <div className="row">
              <div className="col-12 mt-4">
                <h6 className="text-muted text-center">No Chat Found</h6>
              </div>
            </div>
        }
        {/* // <ChatListItem selected={true} />
        // <ChatListItem />
        // <ChatListItem />
        // <ChatListItem />
        // <ChatListItem />
        // <ChatListItem />
        // <ChatListItem /> */}
      </div>
    </div>
  );
}

export default ChatList;
