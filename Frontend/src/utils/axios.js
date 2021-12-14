import axios from 'axios';

export default function createRequest() {
    const idToken = localStorage.getItem('idToken');
    return axios.create({
        baseURL: `http://127.0.0.1:8000/`,
        headers:{
            'Access-Control-Allow-Credentials':"*"
        },
        withCredentials: true
    });
}
