import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFileAlt, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
// import './FileItem.scss'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ClearIcon from '@mui/icons-material/Clear';
import "./upload.css"
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
const FileItem = ({ file, deleteFile }) => {
    return (
        <>
            <li
                className="file-item"
                key={file.name}>
                {/* <FontAwesomeIcon icon={faFileAlt} /> */}
                <IconButton sx={{position:"relative",top:"-9px"}} onClick={() => deleteFile(file.name)}>
                    <DeleteIcon sx={{position:"relative",top:"-9px"}}/>
                </IconButton>
                <p>{file.name}</p>
            </li>
        </>
    )
}

export default FileItem