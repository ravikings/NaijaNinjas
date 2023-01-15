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

function App() {
  //const refreshToken = Cookies.get("refresh_token")
  const refreshToken = localStorage.getItem("access_token")
  const axiosPrivate = useAxiosPrivate()
  const dispatch = useDispatch()
  const { loading, isVerified, currentUser } = useSelector(
    (state) => state.authReducer
  )

  useEffect(() => {
    if (refreshToken) {
      dispatch(verifyToken(refreshToken))
    }
  }, [])

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
