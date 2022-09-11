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
    async function createChatReq(){
    }
    const [ data ,setData ] = useState()
    // Starting chatted with user 
    async function getChatReq(){
        var founded = false
        if(params && auth){
            console.log(auth?.currentUser.pk)
            createRequest().get(`/ws/chat/conversations/${auth?.currentUser?.pk}`).then((res) => {
                res.data.map((user, key) =>{
                    if(params.id == user.receiver.id){
                        console.log(user,"user chat already existed")
                        founded=true
                        history.replace(`/messages/${auth.currentUser.pk}/${user.chat_room_id}`)
                    }
                })
                
            }).catch((err) => console.log(err))
            if(!founded){
                createRequest().get(`/ws/chat/start/${auth.currentUser.pk}/${params.id}/`).then((res) =>{
                console.log(res.data,"starting chat")
                history.replace(`/messages/${auth.currentUser.pk}/${res?.data?.id}`)
                // history.replace(`/messages/${auth.currentUser.pk}/${res.data.chat_room_id}`)
                  // return <Redirect to={`/messages/${auth.currentUser.pk}/${res.data.id}`}/>
                })
            }
            // if(params.author_id){

        // }

        }
    
    }
    console.log(params)
    getChatReq()
    // async function getChatReq(){
    //     createRequest().get(`/ws/chat/start/${auth.currentUser.pk}/${params.id}/`).then((res) =>{
    //         console.log(res.data)
    //         setId(res.data.id)
    //         // return <Redirect to={`/messages/${auth.currentUser.pk}/${res.data.id}`}/>
    //     })

    // }
    // getChatReq();
    return (
        <ProgressBar/>
    )
}

export default CreateChat