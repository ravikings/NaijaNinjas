import React from "react";
import { Button, TextField, Input, Select, MenuItem } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Alert } from "react-bootstrap";

const BiddingFormSchema = Yup.object().shape({
  introduction: Yup.string()
    .required("Required")
    .min(10, "Must be 10 characters or more"),
});

const initialValues = {
  introduction: "",
};

function MakeOfferFormTask(props) {
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const [durationType, setDurationType] = React.useState("Days");
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (event) => {
    setDurationType(event.target.value);
  };

  const handleSubmit = (values) => {
    console.log(values);
    setSubmitted(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    props.modal();
  };

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
      }}
    >
      <div style={{ backgroundColor: "#f0f0f0" }} className='w-100 p-2'>
        <h5 style={{ textAlign: "center" }}>Can you get tasks done? </h5>
      </div>
      <div className='p-4'>
        {submitted ? (
          <Alert variant={"success"} className='text-center p-4'>
            <div>
              <i
                class='fa fa-check'
                aria-hidden='true'
                style={{
                  color: "#00a65a",
                  fontSize: "88px",
                }}
              ></i>
            </div>
            Thanks for Showing Your Interest! client has been notified
          </Alert>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={BiddingFormSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {(formik) => {
              const { errors, touched, isValid, dirty } = formik;
              return (
                <Form>
                  <Field
                    variant={"outlined"}
                    multiline
                    name='introduction'
                    as={TextField}
                    rows={4}
                    placeholder={"Profesionals with introduction note, earn more!"}
                    className={
                      errors.password && touched.password
                        ? "input-error form-control border-danger"
                        : "form-control"
                    }
                    label={"kindly introduce yourself"}
                    fullWidth
                    style={{ marginTop: 20 }}
                  />
                  <ErrorMessage
                    name='introduction'
                    component='span'
                    className='error text-danger'
                  />
                  <button
                    type='submit'
                    className={
                      !(dirty && isValid)
                        ? "disabled-btn site-button  btn-block mt-5"
                        : "site-button btn-block mt-5"
                    }
                    disabled={!(dirty && isValid)}
                  >
                    {submitted
                      ? "Thanks for showing your Interest."
                      : "Show Your Interest"}
                  </button>
                </Form>
              );
            }}
          </Formik>
        )}
      </div>
      <hr />
      <p className='text-secondary text-center pb-3'>
        Doesn't have an account?{" "}
        <Link
          to={"/signup"}
          onClick={(e) => handleClick(e)}
          className='text-primary'
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default MakeOfferFormTask;
