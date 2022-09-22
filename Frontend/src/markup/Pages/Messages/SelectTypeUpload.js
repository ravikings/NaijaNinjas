import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import DescriptionIcon from '@mui/icons-material/Description';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import AudioFileIcon from '@mui/icons-material/AudioFile';
// import { blue } from '@material-ui/core/colors';
import { useState } from 'react';
import Chip from '@mui/material/Chip';
import Slide from '@mui/material/Slide';
// import { IconButton } from '@materi/core';
import IconButton from "@mui/material/IconButton"
// import { axiosPrivate } from '../../../utils/axios';
import { Axios } from 'axios';
import createRequest, { axiosPrivate ,axiosPrivateFile} from '../../../utils/axios';
export default function SelectTypeOfUpload(props) {
    // const { roomId,senderId} = props;
    const { checked ,setChecked,files,setFiles} = props;
    
    // const [files,setFiles] = useState([])
    // const [Ft , setFT] = useState()
    const uploadHandler = (event,type) => {
        const file = event.target.files[0];
        // console.log(file)
        setFiles({type,file})
        setChecked(false)
        event.target.value = "" 
    }
    return (
        <Slide direction="up" in={checked}>
        <List
        sx={{
            position:"absolute",
            width: '100%',
            padding:"30px",
            top:"35%",
            // paddingLeft:"30px",
            maxWidth: 360,
            bgcolor: 'inherit',
        }}
        >
        <ListItem sx={{":hover":{
            ".MuiChip-root.MuiChip-filled":{
                backgroundColor:"black !important"
            }
        }}}>
            <ListItemAvatar>

            <Avatar sx={{bgcolor:"#dd42f5 !important"}}>
            <IconButton sx={{backgroundColor:"inherit !important" , color:" white !important", ":hover":{
                color:"white !important"
            }}} aria-label="upload picture" component="label" onChange={(e) => {
                uploadHandler(e,"PICTURE")
                }}>
                <input hidden accept="image/*" type="file"    />
                <ImageIcon />
            </IconButton>
            </Avatar>
            </ListItemAvatar>
            <Chip sx={{bgcolor:"inherit", color:"white"}} label="photo" />
        </ListItem>
        <ListItem sx={{":hover":{
            ".MuiChip-root.MuiChip-filled":{
                backgroundColor:"black !important"
            }
        }}}>
            <ListItemAvatar>
            <Avatar sx={{bgcolor:"#2c387e !important" }}>
            <IconButton sx={{backgroundColor:"inherit !important" , color:" white !important", ":hover":{
                color:"white !important"
            }}} aria-label="upload picture" component="label" onChange={(e) => { uploadHandler(e,"FILE") }}>
                <input hidden type="file"    />
                <DescriptionIcon/>
                </IconButton>
            </Avatar>
            </ListItemAvatar>
            <Chip sx={{bgcolor:"inherit", color:"white"}} label="file" />
        </ListItem>
        {/* <Divider variant="inset" component="li" /> */}
        <ListItem sx={{":hover":{
            ".MuiChip-root.MuiChip-filled":{
                backgroundColor:"black !important"
            }
        }}}>
            <ListItemAvatar>
            <Avatar sx={{bgcolor:"#ec0e67ba !important"}}>
            <IconButton sx={{backgroundColor:"inherit !important" , color:" white !important", ":hover":{
                color:"white !important"
            }}} aria-label="upload picture" component="label" onChange={(e) => { uploadHandler(e,"AUDIO")}}>
                <input hidden accept="audio/*" type="file"    />
                <AudioFileIcon />
                </IconButton>
            </Avatar>
            </ListItemAvatar>
            <Chip sx={{bgcolor:"inherit", color:"white"}} label="audio" />

        </ListItem>
        <ListItem sx={{":hover":{
            ".MuiChip-root.MuiChip-filled":{
                backgroundColor:"black !important"
            }
        }}}>
            <ListItemAvatar>
            
            <Avatar sx={{bgcolor:"#3d08ff !important"}}>
            <IconButton
            sx={{backgroundColor:"inherit !important" , color:" white !important", ":hover":{
                color:"white !important"
            }}} aria-label="upload picture" component="label"
            onClick={(e) =>{ uploadHandler(e,"VIDEO") }}>
                <input hidden accept="video/*" type="file"    />
                <VideoFileIcon/>
                </IconButton>
            </Avatar>
            </ListItemAvatar>
            <Chip sx={{backgroundColor:"inherit" ,color:"white" ,}} label="video" />
        </ListItem>
        </List>
        </Slide>
    );
}
