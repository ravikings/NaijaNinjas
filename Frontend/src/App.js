import React, { useEffect } from "react";
import Markup from "./markup/Markup";
import "./css/plugins.css";
import "./css/style.css";
import "./css/templete.css";
import "./css/skin/skin-1.css";
import "./css/custom.css";
import "./plugins/slick/slick.min.css";
import "./plugins/slick/slick-theme.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./markup/Pages/Auth/Redux/AuthActions";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer);
  let times = 0;

  useEffect(() => {
    console.log(user);
    console.log(++times);
  }, [user]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return (
    <div className='App'>
        {user.loading ? (
          <div className='loaderHome'>
            <ClipLoader color={"#2e55fa"} loading={true} size={150} />
          </div>
        ) : (
          <>
            <Markup />
            <ToastContainer />
          </>
        )}
      {/* <Markup />
      <ToastContainer /> */}
    </div>
  );
}

export default App;
