import axios from "axios"
import Cookies from "js-cookie"

export const BASE_URL =
  "https://zjoxobi1x6.execute-api.us-east-1.amazonaws.com/dev"
//const BASE_URL = "/";

export default function createRequest() {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
  if (Cookies.get("access_token")) {
    headers.Authorization = `Bearer ${Cookies.get("access_token")}`
  }
  return axios.create({
    baseURL: BASE_URL,
    headers,

    withCredentials: true,
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
  })
}

export const sendImage = (image, userID, author) => {
  const formData = new FormData()
  formData.append("photo", image)
  return axios.put(
    `${BASE_URL}${userID}/`,
    {
      formData,
      author,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )
}
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
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  },
  withCredentials: true,
})
