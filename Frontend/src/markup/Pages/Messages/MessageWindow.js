import React, { useEffect, useCallback, useState, Fragment } from "react";
import { Avatar, Grid, TextField, withStyles } from "@material-ui/core";
import { useStyles } from "./messagesStyles";
import LeftMsg from "./LeftMsg";
import RightMsg from "./RightMsg";
import { Button } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import agent from "../../../api/agent";
import { useQuery } from "react-query";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import useAuth from "../../../hooks/useAuth";
import { toast } from 'react-toastify'

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

function MessageWindow({ props, setUserDetails, userDetails, userRefetch }) {
  const classes = useStyles();
  const auth = useAuth();
  const [socketUrl, setSocketUrl] = useState(`ws://4.tcp.ngrok.io:16901/ws/chat/room/${userDetails && userDetails.initiator.id}/${userDetails && userDetails.chat_room_id}/`);
  const [messageHistory, setMessageHistory] = useState([]);
  const [textbox, setTextbox] = useState('');
  const { sendMessage, lastMessage, readyState, sendJsonMessage } = useWebSocket(socketUrl);
  const { data, refetch } = useQuery(["chat-data", userDetails], () => agent.Chat.roomMessage(userDetails && userDetails.chat_room_id),
    {
      refetchOnWindowFocus: false,//turned off on window focus refetch option
      enabled: false, // turned off by default, manual refetch is needed
      onSuccess: (d) => {
      }
    }
  );
  const { data: removeData, refetch: removeRefetch } = useQuery(["remove-conversation", userDetails], () => agent.Chat.deleteRoom(userDetails && userDetails.chat_room_id),
    {
      refetchOnWindowFocus: false,//turned off on window focus refetch option
      enabled: false, // turned off by default, manual refetch is needed
      onSuccess: (d) => {
        console.log(d);
        if (d.message === 'conversation delete') {
          userRefetch();
          refetch();
          setUserDetails('');
          toast.success('Conversation Removed');
        } else {
          toast.error('Failed to remove');

        }
      }
    }
  );

  useEffect(() => {
    refetch();
  }, [userDetails])
  useEffect(() => {
    document.getElementById('chat-middle').scrollTop = document.getElementById('chat-middle').scrollHeight;
  }, [data])
  useEffect(() => {
    setSocketUrl(`ws://4.tcp.ngrok.io:16901/ws/chat/room/${userDetails && userDetails.initiator.id}/${userDetails && userDetails.chat_room_id}/`);
  }, [userDetails])
  const handleClickSendMessage = () => {
    sendJsonMessage({ "attachment": null, "message": textbox, "action": "message" });
  };
  const hitEnter = (e) => {
    if (textbox.trim() !== '') {
      if (e.keyCode === 13 && !e.shiftKey) {
        handleClickSendMessage();
        document.getElementById('messageBox').value='';
        e.preventDefault();
      }
    } else {
      if (e.keyCode === 13)
        e.preventDefault();
    }

  }
  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
    setTextbox('');
    document.querySelector('#messageBox').value = '';
    refetch();
    document.getElementById('chat-middle').scrollTop = document.getElementById('chat-middle').scrollHeight;
  }, [lastMessage, setMessageHistory]);
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const handleRemoveConversation = () => {
    removeRefetch();

  }

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
          {
            userDetails &&
            <div
              style={{
                fontSize: 13,
                marginRight: 22,
                display: "flex",
                alignItems: "center",
                cursor: 'pointer'
              }}
              onClick={() => { handleRemoveConversation() }}
            >
              <DeleteOutlinedIcon
                style={{
                  fontSize: 20,
                  marginRight: 5,
                }}
              />
              <div>Delete Conversation</div>
            </div>
          }

        </div>
        <div
          id='chat-middle'
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            padding: "30px 0px",
            height: "calc(100vh - 320px)",
          }}
        >
          {
            data && data.message_set && data.message_set.length > 0 ?
              data.message_set.map((item, k) => (
                auth.currentUser.pk === item.sender ?
                  <RightMsg item={item} data={data} />
                  :
                  <LeftMsg item={item} data={data} />
              ))
              :
              ''
          }
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
          id='messageBox'
          variant={"outlined"}
          placeholder={"Your Message"}
          onKeyUp={(e) => { setTextbox(e.target.value); }}
          onKeyDown={(e)=>hitEnter(e)}
          fullWidth
        />
        <Button className={classes.sendButton}
          onClick={() => { handleClickSendMessage(); }}
          disabled={readyState !== ReadyState.OPEN}
        >Send</Button>
      </div>
    </div>
  );
}

export default MessageWindow;
