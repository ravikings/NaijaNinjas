import axios from 'axios';

export default function createRequest() {
    return axios.create({
        baseURL: `/`,
        headers:{
            'Content-Type':'application/json',
            'Accept': "application/json",
        },
        withCredentials: true,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken'
    });
}



