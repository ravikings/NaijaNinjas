import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://zjoxobi1x6.execute-api.us-east-1.amazonaws.com/dev";
// const BASE_URL = "/";

export default function createRequest() {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    withCredentials: true,
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
  });
}

export const sendImage = (image, userID, author) => {
  const formData = new FormData();
  formData.append("photo", image);
  return axios.put(
    `https://zjoxobi1x6.execute-api.us-east-1.amazonaws.com/dev/api/v1/account/user-profile/${userID}/`,
    {
      formData,
      author,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
export const axiosPrivateImage = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type":
      "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  },
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  },
  withCredentials: true,
});
