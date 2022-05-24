import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { axiosPrivate } from "../utils/axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { authActionTypes } from "../markup/Pages/Auth/Redux/AuthActions";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { accessToken } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        console.log(config);
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          error?.response?.status === 403 ||
          (error?.response?.status === 401 && !prevRequest?.sent)
        ) {
          console.log("sendingAgain");
          prevRequest.sent = true;
          const newAccessToken = refresh();
          if (newAccessToken) {
            dispatch({
              type: authActionTypes.UPDATE_ACCESS_TOKEN,
              payload: newAccessToken,
            });
          }
          Cookies.set("access_token", newAccessToken, {
            expires: new Date(new Date().getTime() + 5 * 60 * 1000),
          });
          console.log("NewAccessToken", newAccessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
