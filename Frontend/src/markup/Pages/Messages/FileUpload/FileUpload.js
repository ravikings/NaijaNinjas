import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus } from '@fortawesome/free-solid-svg-icons'
// import './FileUpload.scss'
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import IconButton from '@mui/material/IconButton';
import "./upload.css"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import createRequest from '../../../../utils/axios';
const FileUpload = ({ files, setFiles, removeFile,RoomId,SenderId ,setChecked,checked}) => {

    const uploadHandler = (event) => {
        const file = event.target.files[0];
        if(!file) return;
        file.isUploading = true;
        setFiles([...files, file])
    }
    return (
        <>
            <div className="file-card">

                <div className="file-inputs">
                    <AttachFileIcon onClick={() => setChecked(!checked)} />
                        {/* <input hidden type="file" 
                        onChange={uploadHandler}
                        /> */}
                    
                    <IconButton  aria-label="upload picture" component="label" onClick={() =>{ setChecked(!checked)}}> 
                    </IconButton>
                </div>

            </div>
        </>
    )
}

export default FileUpload