import { useSelector } from "react-redux";

const useAuth = () => {
  const user = useSelector((state) => state.authReducer);
  return user;
};

export default useAuth;
