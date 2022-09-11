import axios from 'axios'
import React, { useState } from 'react'
import FileItem from './FileItem.js'
import { Button, IconButton } from "@material-ui/core"
import CssTextField from "../MessageWindow"
import { useStyles } from ".././messagesStyles.js"
import createRequest from '../../../../utils/axios.js'
import "./upload.css"
// const hitEnter = (e) => {
//     if (textbox.trim() !== "") {
//         if (e.keyCode === 13 && !e.shiftKey) {
//             handleClickSendMessage()
//             document.getElementById("messageBox").value = ""
//             e.preventDefault()
//         }
//         } else {
//             if (e.keyCode === 13) e.preventDefault()
//         }
// }
const FileList = ({ files, removeFile ,SenderId,RoomId}) => {
    const classes = useStyles()
    const [textbox, setTextbox] = useState("")
    // const handleClickSendMessage = () => {
    //     sendJsonMessage({ attachment: null, message: textbox, action: "message" })
    // }
    // const hitEnter = (e) => {
    //     if (textbox.trim() !== "") {
    //         if (e.keyCode === 13 && !e.shiftKey) {
    //             handleClickSendMessage()
    //             document.getElementById("messageBox").value = ""
    //             e.preventDefault()
    //         }
    //     } else {
    //         if (e.keyCode === 13) e.preventDefault()
    //     }
    // }
    console.log(SenderId,RoomId)
    const deleteFileHandler = (_name) => {
        removeFile(_name)
    }
    const handleClickSendMessage = async () =>{
        await createRequest().post(`/ws/chat/chat_file_upload/${SenderId}/${files[0]}/${RoomId}`).then((res) =>{
            console.log(res)
        })
    }
    
    return (
        <ul className="file-list">
            {
                files &&
                files.map(f => (<FileItem
                    key={f.name}
                    file={f}
                    deleteFile={deleteFileHandler} />))
            }
            <Button
                    className={classes.sendButtonFile}
                    // sx={{position:"relative",height:"30px"}}
                    onClick={() => {
                        handleClickSendMessage()
                    }}
                    // disabled={readyState !== ReadyState.OPEN}
                    >
                    Send
            </Button>
        </ul>
    )
}

export default FileList