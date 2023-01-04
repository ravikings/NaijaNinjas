import axios from "axios"
import baseURL from "./baseUrl"


export const BASE_URL = baseURL.baseURL


export default function createRequest() {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
  const token = localStorage.getItem("access_token");
  if (token) {
    headers.Authorization = `Token ${token}`
  }
  return axios.create({
    baseURL: BASE_URL,
    headers,

    withCredentials: true,
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
  })
}

export const createRequestWithoutBase = (url) => {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
  const token = localStorage.getItem("access_token");
  if (token) {
    headers.Authorization = `Token ${token}`
  }
  return axios.create({
    baseURL: url,
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
    Authorization: `Token ${localStorage.getItem("access_token")}`,
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
    Authorization: `Token ${localStorage.getItem("access_token")}`,
  },
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
})
