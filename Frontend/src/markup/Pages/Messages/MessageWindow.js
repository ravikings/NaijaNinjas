import React, { useEffect, useCallback, useState, Fragment } from "react"
import { Avatar, Grid, TextField, withStyles } from "@material-ui/core"
import { useStyles } from "./messagesStyles"
import { Button } from "@material-ui/core"
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined"
import agent from "../../../api/agent"
import { useQuery } from "react-query"
import useWebSocket, { ReadyState } from "react-use-websocket"
import useAuth from "../../../hooks/useAuth"
import { toast } from "react-toastify"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TextEditor from "./TextEditor"
import createRequest from "../../../utils/axios"
import { useSelector } from "react-redux"
import MessageBox from "./MessageBox"
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
})(TextField)

function MessageWindow({ props, setUserDetails, userDetails, userRefetch ,rowData,params}) {
  const classes = useStyles()
  const auth = useAuth()
  const [userData, setUserData] = useState(null)
  const [ messages,setMessages] = useState()
  const { currentUser } = useSelector((state) => state.authReducer)
  // setting message room to current url room
  if(rowData && rowData.length > 0){
    rowData.map((user)=>{
      if(user.chat_room_id == params.id){
        // console.log(user.chat_room_id,"user+")
        setUserDetails(user)
        
      }
      // setUserDetails(user)
    })
  }
  const [socketUrl, setSocketUrl] = useState(
    `ws://8.tcp.ngrok.io:19259/ws/chat/room/${
      userDetails && userDetails.initiator.id
    }/${userDetails && userDetails.chat_room_id}/`
  )
  
  const [messageHistory, setMessageHistory] = useState([])
  const [textbox, setTextbox] = useState("")
  const { sendMessage, lastMessage, readyState, sendJsonMessage } =
    useWebSocket(socketUrl)
  
  const { data, refetch } = useQuery(
    ["chat-data", userDetails],
    () => agent.Chat.roomMessage(userDetails && userDetails.chat_room_id),
    {
      refetchOnWindowFocus: false, //turned off on window focus refetch option
      enabled: false, // turned off by default, manual refetch is needed
      onSuccess: (d) => {},
    }
  )
  const { data: removeData, refetch: removeRefetch } = useQuery(
    ["remove-conversation", userDetails],
    () =>
      agent.Chat.deleteRoom(
        auth.currentUser.pk,
        userDetails && userDetails.chat_room_id
      ),
    {
      refetchOnWindowFocus: false, //turned off on window focus refetch option
      enabled: false, // turned off by default, manual refetch is needed
      onSuccess: (d) => {
        console.log(d)
        if (d.message === "conversation delete") {
          userRefetch()
          refetch()
          setUserDetails("")
          toast.success("Conversation Removed")
        } else {
          toast.error("Failed to remove")
        }
      },
    }
  )

  useEffect(() => {
    refetch()
  }, [userDetails])
  useEffect(() => {
    if (userDetails) {
      document.getElementById("chat-middle").scrollTop =
        document.getElementById("chat-middle").scrollHeight
    }
  }, [data])
  useEffect(() => {
    setSocketUrl(
      `ws://8.tcp.ngrok.io:19259/ws/chat/room/${
        userDetails && userDetails.initiator.id
      }/${userDetails && userDetails.chat_room_id}/`
    )
    
  }, [userDetails])
  const handleClickSendMessage = () => {
    sendJsonMessage({ attachment: null, message: textbox, action: "message" })
  }
  const hitEnter = (e) => {
    if (textbox.trim() !== "") {
      if (e.keyCode === 13 && !e.shiftKey) {
        handleClickSendMessage()
        document.getElementById("messageBox").value = ""
        e.preventDefault()
      }
    } else {
      if (e.keyCode === 13) e.preventDefault()
    }
  }
  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage))
    }
    setTextbox("")
    refetch()
    if (userDetails) {
      document.querySelector("#messageBox").value = ""
      document.getElementById("chat-middle").scrollTop =
        document.getElementById("chat-middle").scrollHeight
    }
  }, [lastMessage, setMessageHistory])
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState]

  const handleRemoveConversation = () => {
    removeRefetch()
  }
  
  return (
    <>
  
      
      {userDetails? (
        <>
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
                  {userDetails &&
                  userDetails.receiver_profile &&
                  userDetails.receiver_profile[0].first_name
                    ? userDetails.receiver_profile[0].first_name +
                      " " +
                      userDetails.receiver_profile[0].last_name
                    : userDetails && userDetails.receiver.username }
                </div>
                {userDetails && (
                  <div
                    style={{
                      fontSize: 13,
                      marginRight: 22,
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleRemoveConversation()
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
                )}
              </div>
              <div
                id="chat-middle"
                style={{
                  overflowY: "auto",
                  overflowX: "hidden",
                  padding: "30px 0px",
                  height: "calc(100vh - 320px)",
                }}
              >
                {data && data.results.length> 0 ?
                  <MessageBox data={data?.results} auth={auth} />:"loading..."
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
              {userDetails ? (
                <div>
                  <CssTextField
                    style={{ marginRight: 15 }}
                    id="messageBox"
                    variant={"outlined"}
                    placeholder={"Your Message"}
                    onKeyUp={(e) => {
                      setTextbox(e.target.value)
                    }}
                    onKeyDown={(e) => hitEnter(e)}
                    fullWidth
                  />
                  <Button
                    className={classes.sendButton}
                    onClick={() => {
                      handleClickSendMessage()
                    }}
                    disabled={readyState !== ReadyState.OPEN}
                  >
                    
                      Send
                  </Button>
                  
                </div> 
              ) : (
                <CssTextField
                  style={{ marginRight: 15 }}
                  id="messageBox"
                  variant={"outlined"}
                  placeholder={"Your Message"}
                  onKeyUp={(e) => {
                    setTextbox(e.target.value)
                  }}
                  onKeyDown={(e) => hitEnter(e)}
                  fullWidth
                  hidden
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
              Try selecting a conversation.
            </h1>
          </div>
        </div>
      )}
    </>
  )
}

export default MessageWindow
