import axios from "axios";

const envUrl = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = `${envUrl}`;

const responseBody = (response) => response?.data;
const requests = {
  get: (url) => axios.get(url).then(responseBody),
  get: (url, request) => axios.get(url, request).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  del: (url) => axios.delete(url).then(responseBody),

};
// const Authentication = {
//   sendVerificationCode: (info) => requests.post(`/sendVerificationCode`, info),
//   signUpFirstStep: (info) => requests.post(`/signUpFirstStep`, info),
//   signUpFinalStep: (info) => requests.post(`/signUpFinalStep`, info),
//   googleLogin: (info) => requests.post(`/googleLogin`, info),
//   userlogin: (info) => requests.post(`/userlogin`, info),
// };
const Chat = {
  getAllConversation: (userId) => requests.get(`/ws/chat/conversations/${userId}`),
}
export default {
  Chat,
};
