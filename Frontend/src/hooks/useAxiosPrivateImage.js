import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { axiosPrivateImage } from "../utils/axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { authActionTypes } from "../markup/Pages/Auth/Redux/AuthActions";

const useAxiosPrivateImage = () => {
  const refresh = useRefreshToken();
  const { accessToken } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const requestIntercept = axiosPrivateImage.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Token ${accessToken}`;
        }
        console.log(config.headers["Authorization"]);
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivateImage.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        console.log(prevRequest, "PrevRequest");
        if (
          error?.response?.status === 401 ||
          (error?.response?.status === 401 && !prevRequest?.sent)
        ) {
          console.log("sendingAgain");
          prevRequest.sent = true;
          const newAccessToken = refresh();

          Cookies.set("access_token", newAccessToken, {
            expires: new Date(new Date().getTime() + 5 * 60 * 1000),
          });
          dispatch({
            type: authActionTypes.UPDATE_ACCESS_TOKEN,
            payload: newAccessToken,
          });
          console.log("NewAccessToken", newAccessToken);
          prevRequest.headers["Authorization"] = `Token ${newAccessToken}`;
          return axiosPrivateImage(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateImage.interceptors.request.eject(requestIntercept);
      axiosPrivateImage.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return axiosPrivateImage;
};

export default useAxiosPrivateImage;
