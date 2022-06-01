import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../../Layout/Header2";
import Footer from "../../Layout/Footer";
import ProfileSidebar from "../../Element/Profilesidebar";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import createRequest from "../../../utils/axios";
import SingleInputField from "./SingleInputField";
import { toast } from "react-toastify";
import { Autocomplete } from "@material-ui/lab";
import { styled, TextField } from "@material-ui/core";
import { sectors } from "../../../helper/sectors";
import { makeStyles } from "@material-ui/core/styles";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { authActionTypes, setProfileData } from "../Auth/Redux/AuthActions";
import Loader from "../../Element/Loader";

const useStyles = makeStyles({
  root: {
    height: "13px",
  },
});

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "none",
  },
  "& .MuiInput-underline:after": {
    border: "none",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
      boxShadow: "0 0 10px 0 rgb(0 24 128 / 10%) !important",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
});

function Jobprofile() {
  const classes = useStyles();
  const { currentUser, userProfile, loading } = useSelector(
    (state) => state.authReducer
  );
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    console.log(userDetails, "sended");
  }, [userDetails]);

  useEffect(() => {
    if (currentUser && !userProfile && !userDetails) {
      console.log(userProfile, "sended");
      console.log("sended user");
      getUserDetails();
    }

    return () => {
      console.log("unmount sended");
    };
  }, [currentUser && !userDetails]);

  useEffect(() => {
    if (userDetails && !userProfile) {
      console.log("sended details");
      dispatch({
        type: authActionTypes.USER_PROFILE,
        payload: userDetails,
      });
    }
  }, [userDetails]);

  const getUserDetails = () => {
    console.log("sended");
    createRequest()
      .get(`/api/v1/account/user-profile/${currentUser?.pk}/`)
      .then(({ data }) => {
        setUserDetails(data);
      })
      .catch((e) => {
        toast.error(e.response?.data?.message || "Unknown Error");
        console.log(e);
      });
  };

  const editUserDetails = (values) => {
    axiosPrivate
      .patch(`/api/v1/account/user-profile/${userDetails?.id}/`, values)
      .then(({ data }) => {
        toast.success("Profile updated successfully");
        getUserDetails();
      })
      .catch((e) => {
        toast.error(e.response?.data?.message || "Unknown Error");
      });
  };

  const initialValues = {
    first_name: userDetails?.first_name || "",
    last_name: userDetails?.last_name || "",
    title: userDetails?.title || "",
    language: userDetails?.language || "",
    salary: userDetails?.salary || "",
    country: userDetails?.country || "",
    address: userDetails?.address || "",
    postcode: userDetails?.postcode || "",
    sector: userDetails?.sector || "",
    department: userDetails?.department || "",
    description: userDetails?.description || "",
    state: userDetails?.state || "",
    city: userDetails?.city || "",
    local_goverment_zone: userDetails?.local_goverment_zone || "",
    author: currentUser?.pk,
  };

  const formik = useFormik({
    initialValues,
    //validationSchema: validationSchema,
    onSubmit: (values) => {
      editUserDetails(values);
    },
    enableReinitialize: true,
  });

  return (
    <>
      <Header2 />
      {userProfile ? (
        <div className='page-content bg-white'>
          <div className='content-block'>
            <div className='section-full bg-white browse-job p-t50 p-b20'>
              <div className='container'>
                <div className='row'>
                  {userProfile && (
                    <ProfileSidebar
                      author={userProfile?.author}
                      userID={userDetails?.id}
                      active={"Profile"}
                    />
                  )}
                  <div className='col-xl-9 col-lg-8 m-b30'>
                    <div className='job-bx job-profile'>
                      <div className='job-bx-title clearfix'>
                        <h5 className='font-weight-700 pull-left text-uppercase'>
                          Basic Information
                        </h5>
                        <Link
                          to={"./"}
                          className='site-button right-arrow button-sm float-right'
                        >
                          Back
                        </Link>
                      </div>
                      <form onSubmit={formik.handleSubmit}>
                        <div className='row m-b30'>
                          <SingleInputField
                            formik={formik}
                            title='First name:'
                            id={"first_name"}
                          />
                          <SingleInputField
                            formik={formik}
                            title='Last name:'
                            id={"last_name"}
                          />
                          <SingleInputField
                            formik={formik}
                            title='Title:'
                            id={"title"}
                          />
                          <SingleInputField
                            formik={formik}
                            title='Language:'
                            id={"language"}
                          />
                          <SingleInputField
                            formik={formik}
                            title='Salary($):'
                            id={"salary"}
                          />

                          <div className='col-lg-6 col-md-6' />

                          <div className='col-lg-6 col-md-6'>
                            <div className='form-group'>
                              <label>Sector:</label>
                              <Autocomplete
                                fullWidth
                                freeSolo
                                autoSelect
                                classes={{ input: classes.root }}
                                value={formik.values.sector}
                                onChange={(e, value) => {
                                  formik.setFieldValue("sector", value);
                                }}
                                options={Object.keys(sectors)}
                                renderInput={(params) => (
                                  <CssTextField
                                    {...params}
                                    variant='outlined'
                                  />
                                )}
                              />
                            </div>
                          </div>

                          <div className='col-lg-6 col-md-6'>
                            <div className='form-group'>
                              <label>Sector:</label>
                              <Autocomplete
                                fullWidth
                                freeSolo
                                autoSelect
                                classes={{ input: classes.root }}
                                value={formik.values.department}
                                onChange={(e, value) => {
                                  formik.setFieldValue("department", value);
                                }}
                                options={
                                  sectors[formik.values.sector]
                                    ? sectors[formik.values.sector]
                                    : []
                                }
                                renderInput={(params) => (
                                  <CssTextField
                                    {...params}
                                    variant='outlined'
                                  />
                                )}
                              />
                            </div>
                          </div>

                          <div className='col-lg-12 col-md-12'>
                            <div className='form-group'>
                              <label>Description:</label>
                              <textarea
                                id='description'
                                value={formik.values["description"]}
                                onChange={formik.handleChange}
                                className='form-control'
                              />
                            </div>
                          </div>
                        </div>

                        <div className='job-bx-title clearfix'>
                          <h5 className='font-weight-700 pull-left text-uppercase'>
                            Contact Information
                          </h5>
                        </div>
                        <div className='row'>
                          <SingleInputField
                            formik={formik}
                            title='Country:'
                            id={"country"}
                          />
                          <SingleInputField
                            formik={formik}
                            title='State:'
                            id={"state"}
                          />
                          <SingleInputField
                            formik={formik}
                            title='Postcode:'
                            id={"postcode"}
                          />
                          <SingleInputField
                            formik={formik}
                            title='City:'
                            id={"city"}
                          />
                          <SingleInputField
                            formik={formik}
                            title='Address:'
                            id={"address"}
                          />
                          <SingleInputField
                            formik={formik}
                            title='Local government zone:'
                            id={"local_goverment_zone"}
                          />
                        </div>
                        <button type='submit' className='site-button m-b30'>
                          Save Setting
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <Footer />
    </>
  );
}

export default Jobprofile;
