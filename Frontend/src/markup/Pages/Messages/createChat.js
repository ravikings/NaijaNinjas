import React,{useState} from 'react'
import { ProgressBar } from 'react-bootstrap';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth';
// import { useHistory } from 'react-router-dom';

import createRequest from '../../../utils/axios';
const CreateChat = () => {
    const auth = useAuth()
    const history = useHistory()
    const [id, setId] = useState()
    const params = useParams();
    const [ data ,setData ] = useState()
    // Starting chatted with user 
    async function getChatReq(){
        var founded = false
        if(params && auth){
            createRequest().get(`/ws/chat/start/${auth.currentUser.pk}/${params.id}/`).then((res) =>{
                console.log(res.data,"starting chat")
                history.replace(`/messages/${auth.currentUser.pk}/${res?.data?.id}`)

        })
    }}
    // console.log(params)
    getChatReq()
    return (
        <ProgressBar/>
    )
}

export default CreateChat