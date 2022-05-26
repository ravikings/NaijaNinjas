import axios from "axios";
import Cookies from "js-cookie";

export default function createRequest() {
  return axios.create({
    baseURL: `https://zjoxobi1x6.execute-api.us-east-1.amazonaws.com/dev/`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    withCredentials: true,
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
  });
}

export const axiosPrivate = axios.create({
  baseURL: "https://zjoxobi1x6.execute-api.us-east-1.amazonaws.com/dev/",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
