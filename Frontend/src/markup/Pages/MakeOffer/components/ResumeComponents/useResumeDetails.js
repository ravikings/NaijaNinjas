import { useSelector } from "react-redux";

const useResumeDetails = () => {
  const { userResume } = useSelector((state) => state.authReducer);

  const id = userResume?.id;
  const author = userResume?.author;

  return {
    id,
    author,
  };
};

export default useResumeDetails;
