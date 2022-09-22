import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFileAlt, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
// import './FileItem.scss'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ClearIcon from '@mui/icons-material/Clear';
import "./upload.css"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import {CustomError} from './CustomError';
import { FileIcon, defaultStyles } from 'react-file-icon';
import byteSize from "byte-size"
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        // backgroundColor:"blue",
        position:"relative",
        width:"150px",
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 800],
        
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
        },
}));
const FileItem = ({ file, deleteFile ,progressPer,clicked,setClicked,error}) => {
    return (
        <>
            <li
                className="file-item"
                key={file.name}>
                
                {/* <FontAwesomeIcon icon={faFileAlt} /> */}
                <IconButton sx={{position:"relative",top:"-9px"}} onClick={() => deleteFile(file.name)}>
                    <DeleteIcon sx={{position:"relative",top:"-9px",height:"fit-content",width:"fit-content"}}/>
                </IconButton>
                <div className={"file-icon"} style={{position:"relative",width:"30px",height:"30px",}}>
                <FileIcon extension={file.name.split('.')[1]} {...defaultStyles.docx} />
                </div>
                <div style={{position:"relative",width:"fit-content",height:"fit-content",display:"-ms-flexbox"}}>
                    <p style={{position:"relative",height:"20px",width:"200px",overflow:"hidden"}}>{file.name}</p>
                    {<p style={{position:"relative",top:"-10px"}}>{byteSize(file.size).value} {byteSize(file.size).unit} </p>}
                </div>
                <div style={{position:"relative",width:"fit-content",height:"fit-content" ,left:"50px"}}>
                {progressPer?<BorderLinearProgress variant="determinate" value={progressPer} />:""}
                {error?<CustomError/>:""}
                </div>
                {/* <LinearProgressWithLabel  value={progressPer}/> */}
            </li>
        </>
    )
}
function LinearProgressWithLabel(props) {
        return (
        <Box sx={{ color:"white",display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
                props.value,
            )}%`}</Typography>
            </Box>
        </Box>
        );
}
export  function LinearWithValueLabel() {
        const [progress, setProgress] = React.useState(10);
    
        React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
        }, []);
    
        return (
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} />
        </Box>
        );
}
export default FileItem