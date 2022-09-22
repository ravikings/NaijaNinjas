import React, { useState } from 'react'
import FileItem from './FileItem.js'
import { Button, IconButton } from "@material-ui/core"
import { useStyles } from ".././messagesStyles.js"
import { axiosPrivateFile } from '../../../../utils/axios';
import "./upload.css"
import LinearProgress from '@mui/material/LinearProgress';
const FileList = ({ files, removeFile ,SenderId,RoomId,setFiles,refetch}) => {
    const classes = useStyles()
    const [error,setError] = useState()
    const [progressPer,setProgressPer] = React.useState()
    const sendFile = () => {
        const form = new FormData();
        form.append("sender",SenderId)
        form.append("attachment",files.file)
        form.append("attachment_type",files.type)
        form.append("conversation_id",RoomId)
        // console log for all entries of formdata 
        // for (var key of form.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }
        // console.log(files)

        axiosPrivateFile.post("/ws/chat/chat_file_upload/",form,{onUploadProgress: (progressEvent) => {
            setProgressPer(parseInt(Math.round(progressEvent.loaded * 100) / progressEvent.total))
            console.log(progressEvent)
        }}).then((res) => {
            if(res.status === 201  || res.status === 200){
                // alert("sent")
                setTimeout(()=>{
                    setFiles([])
                    setProgressPer(undefined)
                    refetch()
                    
                },5000)

            }
            console.log(res)}).catch((err) => {
            //handle error
            setError(err.response.data)
            console.log(err.response.data);
        });

    }
    const deleteFileHandler = (_name) => {
        removeFile(_name)
    }
    const [clicked , setClicked] = useState(false)
    if(files?.file){
        return (
            <ul className={"file-list"}>
                <FileItem key={files.file.name} file={files.file} deleteFile={deleteFileHandler} type={files.type} progressPer={progressPer} clicked={clicked} setClicked={setClicked} error={error}/>
                <Button
                        className={classes.sendButtonFile}
                        sx={{position:"absolute !important ",height:"30px",left:"65%" }}
                        onClick={() => {
                            setClicked(true)
                            sendFile()
                        }}
                        >
                        Send
                </Button>
                
            </ul>
        )
    }
    return ""
}

export default FileList