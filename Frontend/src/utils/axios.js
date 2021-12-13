import axios from 'axios';

export default function createRequest() {
    const idToken = localStorage.getItem('idToken');
    return axios.create({
        baseURL: `/api`,
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });
}
