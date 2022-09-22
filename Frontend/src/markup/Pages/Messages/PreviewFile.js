import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import { IconButton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import UndoIcon from '@mui/icons-material/Undo';
import CircularProgress from '@mui/material/CircularProgress';
import { axiosPrivateFile } from '../../../utils/axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { width } from '@mui/system';
import { MdClose } from 'react-icons/md';
import LinearProgress from '@mui/material/LinearProgress';
import DownloadIcon from '@mui/icons-material/Download';
import { axiosPrivateFileDownload } from '../../../utils/axios';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "700px",
    height: "500px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function PreviewFile(props) {
    const { files,roomid,senderid,setFiles,refetch} = props;
    const [progressPer,setProgressPer] = React.useState(0)
    const sendFile = () => {
        const form = new FormData();
        form.append("sender",senderid)
        form.append("attachment",files.file)
        form.append("attachment_type",files.type)
        form.append("conversation_id",roomid)
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
                setFiles([])
                refetch()

            }
            console.log(res)}).catch((err) => {
            //handle error

            console.log(err.response.data);
        });

    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    React.useEffect(() => {
        if(files?.file){
            handleOpen()
        }else{
            handleClose()
        }
    }, [files]);
    return (
        <div>
        <div
            style={{display:"none "}}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <IconButton style={{left:"95%",top:"-10px"}} fontSize={30} onClick={handleClose}>
                <CloseIcon/>
            </IconButton>
            <Typography id="modal-modal-title" sx={{marginLeft:15}} variant="h6" component="h2">
                {files?.type==="PICTURE"?<img width={"200px !important"} height={"200px !important"} src={URL.createObjectURL(files?.file)} alt={"file name"} />:""}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 ,position:"relative",marginLeft:20}}>
                file.name
            </Typography>
            <IconButton>
                <UndoIcon/>
            </IconButton>
            <IconButton sx={{ position:"absolute",top:"30% !important" ,left:"60% !important"}} onClick={sendFile}>
                <SendIcon/>
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${progressPer}%`}</Typography>
            </Box>
            </Box>
            </Box>
        </div>
        </div>
    );
}
export function ImagePreviewer(props){
    const {item,open,setOpen} = props;
    const close  = () => setOpen(false)
    const onOpen = () => setOpen(true)
        function downloadFile(id,filename){
            const fileUrl = `https://zjoxobi1x6.execute-api.us-east-1.amazonaws.com/dev/ws/chat/message-file-download/${id}/`
            axiosPrivateFileDownload.get(`/ws/chat/message-file-download/${id}/`,{
            onDownloadProgress: (progressEvent) => {
            const progress = parseInt(Math.round(progressEvent.loaded * 100) / progressEvent.total)
            console.log(progressEvent)
            // setProgressFile(progress)
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
    return (
        <Modal
        open={open}
        close={close}
        sx={{display:"flex",paddingLeft:"30%",paddingBottom:"30%",paddingTop:"2%"}}
        >
            <Card sx={{ position:"relative"  ,width:"500px", height:"500px" ,padding:"15px" }}>
                <Button onClick={close} sx={{ position:"relative", float:"right"}}size="small"><MdClose fontSize={20}/></Button>
                <CardMedia
                    component="img"
                    height="140"
                    image={item.attachment}
                    alt={"file not supported"}
                    sx={{overflow:"hidden" ,width:"100%",height:"50%",}}
                />
                <CardContent>
                </CardContent>
                <CardActions>
                    <Button size="small" disabled sx={{color:"blue !important"}}>{item.file_name.split("/")[4]}</Button>
                    <Button size="small" sx={{position:"relative",left:"45%"}} onClick={() =>{
                        downloadFile(item.id,item.file_name)
                    }}>
                        <DownloadIcon/>
                    </Button>
                </CardActions>
                </Card>
            {/* <Box>
            <button onClick={close}>close</button>
            <img width={"200px"} height={"200px"} className={""} src={item.attachment} alt={item.text}/>
            </Box> */}
        </Modal>
    
    )
}