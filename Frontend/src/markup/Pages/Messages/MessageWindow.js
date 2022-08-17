import React, { useEffect, useCallback, useState } from "react";
import { Avatar, Grid, TextField, withStyles } from "@material-ui/core";
import { useStyles } from "./messagesStyles";
import LeftMsg from "./LeftMsg";
import RightMsg from "./RightMsg";
import { Button } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import agent from "../../../api/agent";
import { useQuery } from "react-query";
import useWebSocket, { ReadyState } from 'react-use-websocket';

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

function MessageWindow({ props, setUserDetails, userDetails }) {
  const classes = useStyles();
  const [socketUrl, setSocketUrl] = useState(`ws://8.tcp.ngrok.io:10343/ws/chat/room/`);
  const [messageHistory, setMessageHistory] = useState([]);
  const [textbox, setTextbox] = useState('');
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  const { data, refetch } = useQuery(["chat-data", userDetails], () => agent.Chat.roomMessage(userDetails.chat_room_id),
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
  }, [userDetails])
  useEffect(() => {
    setSocketUrl(`ws://8.tcp.ngrok.io:10343/ws/chat/room/${userDetails && userDetails.initiator.id}/${userDetails && userDetails.chat_room_id}`);
    console.log('hit');
  }, [userDetails])

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);
  const handleClickSendMessage = useCallback(() => {
    if (textbox !== '') {
      sendMessage(textbox)
      setTextbox('');
    }
  }, []);
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  console.log(`The WebSocket is currently ${connectionStatus}`);
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
            {userDetails && userDetails.receiver_profile && userDetails.receiver_profile[0].first_name ? userDetails.receiver_profile[0].first_name + ' ' + userDetails.receiver_profile[0].last_name : userDetails && userDetails.receiver.username}
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
            height: "calc(100vh - 320px)",
          }}
        >
          {
            data && data.length > 0 ?
              data.map((item, k) => (
                <LeftMsg />
              )) :
              ''
          }

          {/* <LeftMsg />
          <RightMsg />
          <LeftMsg />
          <RightMsg /> */}
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
          onChange={(e) => setTextbox(e.target.value)}
          fullWidth
        />
        <Button className={classes.sendButton}
          onClick={handleClickSendMessage}
          disabled={readyState !== ReadyState.OPEN}
        >Send</Button>
      </div>
    </div>
  );
}

export default MessageWindow;
