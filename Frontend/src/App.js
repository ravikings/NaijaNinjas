import React, { useEffect } from "react"
import Markup from "./markup/Markup"
import "./css/plugins.css"
import "./css/style.css"
import "./css/templete.css"
import "./css/skin/skin-1.css"
import "./css/custom.css"
import "./plugins/slick/slick.min.css"
import "./plugins/slick/slick-theme.min.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useDispatch, useSelector } from "react-redux"
import {
  authActionTypes,
  getUserStatus,
  verifyToken,
} from "./markup/Pages/Auth/Redux/AuthActions"
import Cookies from "js-cookie"
import useAxiosPrivate from "./hooks/useAxiosPrivate"
import Loader from "./markup/Element/Loader"
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

function App() {
  //const refreshToken = Cookies.get("refresh_token")
  const refreshToken = localStorage.getItem("access_token")
  const mfaVerifyToken = localStorage.getItem("mfa")
  const axiosPrivate = useAxiosPrivate()
  const dispatch = useDispatch()
  const { loading, isVerified, currentUser } = useSelector(
    (state) => state.authReducer
  )

  useEffect(() => {
    if (mfaVerifyToken) {
      dispatch(verifyToken(refreshToken))
    }
  }, [])

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BBNwjsZ0MdlII5dBdb9_KIrYFYXUptgWXNsv4O8pyPpVvUA7UJ1cku5296fwpwDgzVruObK_H9suJ9OsnQgL1_A",
      });
      console.log("Token Gen", token);
      // Send this token  to server ( db)
      localStorage.setItem("fcm_token", token)
      console.log("Token Gen saved");
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    // Req user for notification permission
    requestPermission();
  }, []);

  useEffect(() => {
    let isMounted = true
    // const controller = new AbortController()

    const getUser = async () => {
      dispatch({ type: authActionTypes.GETTING_CURRENT_USER })
      try {
        // const { data } = await axiosPrivate.get("/dj-rest-auth/user/", {
        //   signal: controller.signal,
        // })
        const data = localStorage.getItem("userData");
        isMounted &&
          dispatch({ type: authActionTypes.GET_CURRENT_SUCCESS, user: data })
        dispatch(getUserStatus(data.pk))
      } catch (e) {
        dispatch({ type: authActionTypes.GET_CURRENT_FAILED })
        console.log(e, "userData")
      }
    }

    if (isVerified) {
      getUser()
    }
  }, [isVerified])

  return (
    <div className="App">
      {/* {loading ? (
        <Loader />
      ) : (
        <>
          <Markup />
          <ToastContainer />
        </>
      )} */}
      <Markup />
      <ToastContainer />
    </div>
  )
}

export default App
