import React, { useState } from "react";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import useResumeDetails from "./useResumeDetails";

const useUpdateResume = () => {
  const axiosPrivate = useAxiosPrivate();
  const resumeDetails = useResumeDetails();
  const [loading, setLoading] = useState(false);
  const [isResumeUpdate, setIsResumeUpdate] = useState(false);
  const callAPI = async ({ body, setResumeDetails }) => {
    const controller = new AbortController();
    setLoading(true);
    try {
      const { data } = await axiosPrivate.put(
        `/api/v1/account/resume/${resumeDetails.id}/`,
        {
          ...body,
          author: resumeDetails.author,
        },
        { signal: controller.signal }
      );

      setResumeDetails(data);
      setIsResumeUpdate(true);
      toast.success(`Resume updated successfully`);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoading(false);
      setIsResumeUpdate(false);
    }
  };
  return {
    loading,
    isResumeUpdate,
    callAPI,
  };
};

export default useUpdateResume;
