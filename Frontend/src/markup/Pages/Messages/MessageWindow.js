import React, { useEffect, useCallback, useState, Fragment,useRef } from "react"
import { Avatar, Grid, TextField, withStyles,Input } from "@material-ui/core"
import { useStyles } from "./messagesStyles"
import { Button } from "@material-ui/core"
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined"
import agent from "../../../api/agent"
import { useQuery } from "react-query"
import useWebSocket, { ReadyState } from "react-use-websocket"
import useAuth from "../../../hooks/useAuth"
import { toast } from "react-toastify"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TextEditor, { HeaderTextEditor } from "./TextEditor"
import createRequest from "../../../utils/axios"
import { useSelector } from "react-redux"
import FileUpload from "./FileUpload/FileUpload.js"
import FileList from "./FileUpload/FileList.js"
import MessageBox from "./MessageBox"
import "./message.css"
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import {Emoji} from "./TextEditor.js"
import { IconButton } from "@mui/material"
import SelectTypeOfUpload from "./SelectTypeUpload"
import PreviewFile from "./PreviewFile"
export const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "1px solid black",
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
    `ws://4.tcp.ngrok.io:13948/ws/chat/room/${
      userDetails && userDetails.initiator.id
    }/${userDetails && userDetails.chat_room_id}/`
  )
  
  const [messageHistory, setMessageHistory] = useState([])
  const [textbox, setTextbox] = useState("")
  // files state 
  const [files, setFiles] = useState([])
  // remove file function 
  const removeFile = (filename) => {
    setFiles([])
    // setFiles(files.file.filter(file => file.name !== filename))
  }
  const { sendMessage, lastMessage, readyState, sendJsonMessage } =
    useWebSocket(socketUrl)
  
  const { data, refetch } = useQuery(
    ["chat-data", userDetails],
    () => agent.Chat.roomMessage(userDetails && userDetails.chat_room_id),
    {
      refetchOnWindowFocus: false, //turned off on window focus refetch option
      enabled: false, // turned off by default, manual refetch is needed
      onSuccess: (d) => {
        console.log(d,"d")
      },
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
      `ws://4.tcp.ngrok.io:13948/ws/chat/room/${
        userDetails && userDetails.initiator.id
      }/${userDetails && userDetails.chat_room_id}/`
    )
    
  }, [userDetails])
  const handleClickSendMessage = () => {
    sendJsonMessage({  attachment:null ,message: textbox, action: "message" })
  }
  const hitEnter = (e) => {
    var html = e.target.innerHTML; 
    // const Text = JSON.stringify(html)
    if (e.keyCode === 13 && !e.shiftKey) {
          handleClickSendMessage()
          // setting content empty when sends 
          //previous one 
          // document.getElementById("messageBox").contents = ""
          // current one 
          e.target.innerHTML = ""

          // document.getElementById("messageBox").value = ""
          e.preventDefault()
    }
    if (e.keyCode === 13) e.preventDefault()
    // if (textbox.trim() !== "") {
    //   if (e.keyCode === 13 && !e.shiftKey) {
    //     handleClickSendMessage()
    //     document.getElementById("messageBox").value = ""
    //     e.preventDefault()
    //   }
    // } else {
    //   if (e.keyCode === 13) e.preventDefault()
    // }
  }
  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage))
    }
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
  const [ checked,setChecked] = React.useState(false);
  const inputRef = useRef()
  const [cursorPosition,setCursorPosition] = useState()
  const [openEmoji, setOpenEmoji] = React.useState(false);
  useEffect(() => {
    // console.log(inputRef?.current)
    if(inputRef?.current){
      inputRef.current.selectionEnd = cursorPosition
    }
  }, [cursorPosition])
  console.log(textbox)
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
                  userDetails.receiver_profile[0]?.first_name
                    ? userDetails.receiver_profile[0]?.first_name +
                      " " +
                      userDetails.receiver_profile[0]?.last_name
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
            <PreviewFile senderid={auth?.currentUser?.pk}  roomid={params?.id} files={files} setFiles={setFiles}  refetch={refetch}/>
            <HeaderTextEditor inputRef={inputRef}/>
            <SelectTypeOfUpload checked={checked} setChecked={setChecked} files={files} setFiles={setFiles}/>
            <FileList files={files} removeFile={removeFile}  SenderId={data?.results[0].initiator.id} RoomId={data?.results[0].id}  setFiles={setFiles}  refetch={refetch}/>
            {openEmoji?<Emoji textbox={textbox} setTextbox={setTextbox} cursorPosition={cursorPosition} setCursorPosition={setCursorPosition} inputRef={inputRef}/>:""}
            <div
              style={{
                borderTop: "1px solid #ccc",
                display: "flex",
                justifyContent: "space-between",
                padding: 30,
              }}
              >
              {userDetails ? (
                <> 
                  {/* <input type="file" onClick={}/> */}
                  <div className="sidebar-btn">
                    <EmojiEmotionsIcon onClick={() => setOpenEmoji(!openEmoji)} />
                    <FileUpload files={files} setFiles={setFiles} removeFile={removeFile} setChecked={setChecked} checked={checked} />
                  </div>
                  {/*
                  <CssTextField
                    style={{ marginRight: 15 }}
                    id="messageBox"
                    ref={inputRef}
                    variant={"outlined"}
                    placeholder={"Your Message"}
                    // onKeyUp={(e) => {
                      //   setTextbox(e.target.value)
                      // }}
                      onChange={(e) => setTextbox(e.target.value)}
                      value={textbox}
                      onKeyDown={(e) => hitEnter(e)}
                      fullWidth
                    /> */}
                  {/* <TextEditor/> */}
                  <div
                    style={{ resize:"none","overflow":"auto","border":"0px",marginRight: 15 ,outline:"none",position:"relative",top:"10px",width:"100%",padding:"15px",paddingLeft:"3%",height:"100%"}}
                    id="messageBox"
                    ref={inputRef}
                    variant={"outlined"}
                    placeholder={"Your Message"}
                    data-placeholder = {"Your Message"}
                    // onKeyUp={(e) => {
                    //   setTextbox(e.target.value)
                    // }}
                    onInput={(e) => {
                      console.log(e.target,"value")
                      var html = e.target.innerHTML; 
                      // const Text = JSON.stringify(html)
                      setTextbox(html)
                    }}
                    // onChange={(e) => {
                    //   console.log(e)
                    //   setTextbox(e.target.value)}}
                    // value={textbox}
                    contentEditable
                    onKeyDown={(e) => hitEnter(e.target)}
                    // resize={"none"}
                    // fullWidth
                    // hidden
                    
                    />
                  <Button
                    className={classes.sendButton}
                    onClick={() => {
                      handleClickSendMessage()
                    }}
                    fontSize={12}
                    sx={{position:"relative",height:"50px !important",top:"10px"}}
                    disabled={readyState !== ReadyState.OPEN}
                  >
                    
                      Send
                  </Button>
                  
                </> 
              ) : (
                <div
                    style={{ resize:"none","overflow":"auto","border":"0px",marginRight: 15 ,outline:"none",position:"relative",top:"10px",width:"100%",padding:"15px",height:"100%"}}
                    id="messageBox"
                    ref={inputRef}
                    variant={"outlined"}
                    placeholder={"Your Message"}
                    data-placeholder = {"Your Message"}
                    // onKeyUp={(e) => {
                    //   setTextbox(e.target.value)
                    // }}
                    onInput={(e) => {
                      console.log(e.target,"value")
                      var html = e.target.innerHTML; 
                      const Text = JSON.stringify(html)
                      setTextbox(Text)
                    }}
                    // onChange={(e) => {
                    //   console.log(e)
                    //   setTextbox(e.target.value)}}
                    // value={textbox}
                    contentEditable
                    onKeyDown={(e) => hitEnter(e)}
                    // resize={"none"}
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
