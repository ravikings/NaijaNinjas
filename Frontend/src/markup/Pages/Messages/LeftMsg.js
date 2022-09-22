import React from "react";
import { Avatar, Grid } from "@material-ui/core";
import parse from 'html-react-parser'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ImagePreviewer } from "./PreviewFile";
import { axiosPrivateFileDownload } from "../../../utils/axios";
import { FileIcon, defaultStyles } from 'react-file-icon';

function LeftMsg({ props, item, data }) {
  const [open,setOpen] = React.useState(false)
  const [ progressFile,setProgressFile] = React.useState(0)
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
  if(item.attachment && item.attachment_type !== "PICTURE" ){
    return(
    <Grid
      style={{ padding: "10px 30px", display: "flex" }}
      container
      spacing={3}
    >
      <Grid item style={{ width: "70px" }}>
        <Avatar
          style={{ height: "50px", width: "50px" }}
          src={
            data[0].users_profile && data[0].users_profile[0]?.photo && data[0].users_profile[0]?.photo
          }
        />
      </Grid>
      <Grid item style={{ flex: 1, paddingLeft: 0 }}>
        <div className="talk-bubble-left tri-right left-in">
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
                <ArrowDownwardIcon sx={{color:"white"}}/>
              </button>
          </div>
        </div>
      </Grid>
    </Grid>
    )
  }else if(item.attachment !=null && item.attachment_type==="PICTURE"){
    return(
    <Grid
      style={{ padding: "10px 30px", display: "flex" }}
      container
      spacing={3}
    >
      <Grid item style={{ width: "70px" }}>
        <Avatar
          style={{ height: "50px", width: "50px" }}
          src={
            data[0].users_profile && data[0].users_profile[0]?.photo && data[0].users_profile[0]?.photo
          }
        />
      </Grid>
      <Grid item style={{ flex: 1, paddingLeft: 0 }}>
        <div className="left-msg " style={{ bgcolor:"white !important"}}>
          <div  style={{ backgroundColor:"inherit !important",padding:"0.5em",border:"2px black solid "}}>
          <img onClick={() => {
              setOpen(true)
              // downloadFile(item.id)
              }} width={"200px"} height={"200px"} className={""} src={item.attachment} alt={item.text}/>
          </div>
        </div>
      </Grid>
      <ImagePreviewer item={item} open={open} setOpen={setOpen}/>
    </Grid>
    )
  }
  return (
    <Grid
      style={{ padding: "10px 30px", display: "flex" }}
      container
      spacing={3}
    >
      <Grid item style={{ width: "70px" }}>
        <Avatar
          style={{ height: "50px", width: "50px" }}
          src={
            data[0].users_profile && data[0].users_profile[0]?.photo && data[0].users_profile[0]?.photo
          }
        />
      </Grid>
      <Grid item style={{ flex: 1, paddingLeft: 0 }}>
        <div className="talk-bubble-left tri-right left-in">
          <div className="talktext">
            <p>
            {parse(item.text)}
            </p>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default LeftMsg;
