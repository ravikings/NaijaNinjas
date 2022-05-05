import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Header2 from "../../Layout/Header2";
import Footer from "../../Layout/Footer";
import ProfileSidebar from "../../Element/Profilesidebar";
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import createRequest from "../../../utils/axios";
import SingleInputField from "./SingleInputField";
import {toast} from "react-toastify";
import {Autocomplete} from "@material-ui/lab";
import {styled, TextField} from "@material-ui/core";

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'none',
    },
    '& .MuiInput-underline:after': {
        border: 'none',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none',
            boxShadow: '0 0 10px 0 rgb(0 24 128 / 10%) !important',
        },
        '&:hover fieldset': {
            border: 'none',
        },
        '&.Mui-focused fieldset': {
            border: 'none',
        },
    },
});

function Jobprofile() {

    const {currentUser} = useSelector((state) => state.authReducer);
    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {
        if (currentUser) {
           // getUserDetails();
        }
    }, [currentUser])

    const getUserDetails = (values) => {
        createRequest().get(`/api/v1/account/profile/${currentUser?.pk}/`).then(({data}) => {
            console.log(data)
            setUserDetails(data)
        }).catch(e => {
            toast.error(e.response?.data?.message || "Unknown Error");
            console.log(e)
        })
    }

    const editUserDetails = (values) => {
        createRequest().post(`/api/v1/account/profile/${currentUser?.pk}/`, values).then(({data}) => {
            console.log(data)
        }).catch(e => {
            toast.error(e.response?.data?.message || "Unknown Error");
            console.log(e)
        })
    }


    const initialValues = {
        first_name: userDetails?.first_name || '',
        last_name: '',
        title: '',
        language: '',
        salary: '',
        country: '',
        address: '',
        postcode: '',
        sector: '',
        department: '',
        description: '',
        state: '',
        city: '',
        local_goverment_zone: '',
        author: currentUser?.pk,
    };

    const formik = useFormik({
        initialValues,
        //validationSchema: validationSchema,
        onSubmit: (values) => {
            editUserDetails(values)
            console.log(values);
        },
        enableReinitialize: true
    });

    return (
        <>
            <Header2/>
            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full bg-white browse-job p-t50 p-b20">
                        <div className="container">
                            <div className="row">
                                <ProfileSidebar active={"Profile"}/>
                                <div className="col-xl-9 col-lg-8 m-b30">
                                    <div className="job-bx job-profile">
                                        <div className="job-bx-title clearfix">
                                            <h5 className="font-weight-700 pull-left text-uppercase">
                                                Basic Information
                                            </h5>
                                            <Link
                                                to={"./"}
                                                className="site-button right-arrow button-sm float-right"
                                            >
                                                Back
                                            </Link>
                                        </div>
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className="row m-b30">
                                                <SingleInputField formik={formik} title='First name:' id={'first_name'}/>
                                                <SingleInputField formik={formik} title='Last name:' id={'last_name'}/>
                                                <SingleInputField formik={formik} title='Title:' id={'title'}/>
                                                <SingleInputField formik={formik} title='Language:' id={'language'}/>
                                                <SingleInputField formik={formik} title='Salary($):' id={'salary'}/>
                                                <SingleInputField formik={formik} title='Sector:' id={'sector'}/>

                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label>Sector:</label>
                                                        <Autocomplete
                                                            fullWidth
                                                            freeSolo
                                                            options={['abcd,', 'efg']}
                                                            renderInput={(params) =>
                                                                <CssTextField {...params} variant='outlined'/>}/>
                                                    </div>
                                                </div>


                                                <SingleInputField formik={formik} title='Department:'
                                                                  id={'department'}/>

                                                <div className="col-lg-12 col-md-12">
                                                    <div className="form-group">
                                                        <label>Description:</label>
                                                        <textarea id='description'
                                                                  value={formik.values['description']}
                                                                  onChange={formik.handleChange}
                                                                  className="form-control"></textarea>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="job-bx-title clearfix">
                                                <h5 className="font-weight-700 pull-left text-uppercase">
                                                    Contact Information
                                                </h5>
                                            </div>
                                            <div className="row">
                                                <SingleInputField formik={formik} title='Country:' id={'country'}/>
                                                <SingleInputField formik={formik} title='State:' id={'state'}/>
                                                <SingleInputField formik={formik} title='Postcode:' id={'postcode'}/>
                                                <SingleInputField formik={formik} title='City:' id={'city'}/>
                                                <SingleInputField formik={formik} title='Address:' id={'address'}/>
                                                <SingleInputField formik={formik} title='Local government zone:'
                                                                  id={'local_goverment_zone'}/>
                                            </div>
                                            <button type='submit' className="site-button m-b30">
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
            <Footer/>
        </>
    );
}

export default Jobprofile;
