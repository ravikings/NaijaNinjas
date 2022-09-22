import React from "react";
import { Avatar, Grid } from "@material-ui/core";
// import PictureDisplay from "./PictureDisplay";
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { ImagePreviewer } from "./PreviewFile";
import parse from 'html-react-parser'
import JsFileDownloader from 'js-file-downloader';
// import downloadFile from "./download.js"
import FileDisplay from "./FileDisplay";
import { axiosPrivateFileDownload } from "../../../utils/axios";
import { FileIcon, defaultStyles } from 'react-file-icon';
import CircularProgress from '@mui/material/CircularProgress';
function RightMsg({ props, item,data }) {
  const linkRef = React.useRef()
  console.log(data);
  console.log(item.attachment)
  const [open,setOpen] = React.useState(false)
  const [ progressFile,setProgressFile] = React.useState(0)
  console.log(item)
  function downloadFile(id,filename){
    const fileUrl = `https://zjoxobi1x6.execute-api.us-east-1.amazonaws.com/dev/ws/chat/message-file-download/${id}/`
    axiosPrivateFileDownload.get(`/ws/chat/message-file-download/${id}/`,{
    onDownloadProgress: (progressEvent) => {
      const progress = parseInt(Math.round(progressEvent.loaded * 100) / progressEvent.total)
      console.log(progressEvent)
      setProgressFile(progress)
      console.log(progress)
    },
    }).then((response) => {
      // create file link in browser's memory
      const href = window.URL.createObjectURL(new Blob([response.data]));
  
      // create "a" HTLM element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', filename?.split("/")[4]); //or any other extension
      document.body.appendChild(link);
      link.click();
  
      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(fileUrl);
    }).catch((err) =>{
      console.log(err)
    })
  }
  if(item.attachment !=null && item.attachment_type==="PICTURE"){
    return (
    <div>
      <Grid
        justifyContent={"flex-end"}
        style={{ padding: "10px 30px", display: "flex" }}
        container
        spacing={3}
      >
        <Grid item style={{  paddingRight: 0 }}>
          <div  style={{ backgroundColor:"none !important",padding:"0.5em",border:"2px blue solid "}}>
            <div  style={{padding:"2px !important", backgroundColor:"2px solid blue !important"}}>
            <img onClick={() => {
              setOpen(true)
              // downloadFile(item.id,item.file_name)
              }} width={"200px"} height={"200px"} className={""} src={item.attachment} alt={"file not supported"}/>
            </div>
          </div>
        </Grid>
        <ImagePreviewer item={item} open={open} setOpen={setOpen}/>
        {/* <FileDisplay item={item} /> */}
        <Grid>
          
        
        </Grid>
        <Grid item style={{ width: "70px" }}>
            <Avatar
              style={{ height: "50px", width: "50px" }}
              src={
                data[0]?.users_profile[1]? data[0]?.users_profile[1]?.photo:''
              }/>
        </Grid>
      </Grid>
    </div>
  )}else if(item.attachment){
    console.log(item.file_name)
    return (
      <div>
      <Grid
          justifyContent={"flex-end"}
          style={{ padding: "10px 30px", display: "flex" }}
          container
          spacing={3}
      >
          <Grid item style={{  paddingRight: 0 }}>
          <div className="talk-bubble-right tri-right right-in">
              <div className="talktext" style={{position:"relative",display:"flex",height:"fit-conttent",width:"fit-content", maxWidth:"300px",gap:"10px",overflow:"hidden"}}>
              {/* <InsertDriveFileIcon/> */}
              <div style={{ position:"relative",width:"30px",height:"30px"}}>
              <FileIcon extension={item.file_name.split("/")[4].split('.')[1]} {...defaultStyles.docx} />
              </div>
              <p style={{overflow:"hidden"}}>
                  {/* {item.attachment.split("?")[0]} */}
                  {item.file_name.split("/")[4]}
              </p>
              <div></div>
              <button className={"download-btn"}  width={"20px"} onClick={ () => downloadFile(item.id,item.file_name)}>
                {progressFile>0?<CircularProgress variant="determinate" value={progressFile}/>:""}
                <ArrowDownwardIcon/>
              </button>

              {/* <FileDisplay item={item} /> */}
              </div>
          </div>
          </Grid>
          <Grid item style={{ width: "70px" }}>
          <Avatar
              style={{ height: "50px", width: "50px" }}
              src={
              data.users_profile && data.users_profile[0].photo && data.users_profile[0].photo
              }
          />
          </Grid>
      </Grid>
      </div>
  )
  }
  return (
    <div>
      <Grid
        justifyContent={"flex-end"}
        style={{ padding: "10px 30px", display: "flex" }}
        container
        spacing={3}
      >
        <Grid item style={{  paddingRight: 0 }}>
          <div className="talk-bubble-right tri-right right-in">
            <div className="talktext">
              <p>
              {parse(item.text)}
              </p>
            </div>
          </div>
        </Grid>
        <Grid item style={{ width: "70px" }}>
          <Avatar
            style={{ height: "50px", width: "50px" }}
            src={
              data[0]?.users_profile[1]? data[0]?.users_profile[1]?.photo:''
            }
          />
        </Grid>
      </Grid>
    </div>
  );
  
}
export default RightMsg;
