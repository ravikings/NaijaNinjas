import axios from "axios";
import Cookies from "js-cookie";

export default function createRequest() {
  return axios.create({
    baseURL: `/`,
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
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  },
  withCredentials: true,
});
