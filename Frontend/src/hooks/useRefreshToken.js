import { useDispatch } from "react-redux";
import { authActionTypes } from "../markup/Pages/Auth/Redux/AuthActions";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const { accessToken } = useAuth();

  const refresh = () => {
    dispatch({ type: authActionTypes.GET_ACCESS_TOKEN });
    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;
