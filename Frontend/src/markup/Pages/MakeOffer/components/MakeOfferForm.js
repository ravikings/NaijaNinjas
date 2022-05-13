import React from "react";
import { Button, TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

function MakeOfferForm(props) {
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    props.modal();
  };
  return (
    <div>
      <h5 style={{ textAlign: "center" }}>Discuss your project with David</h5>
      <TextField
        variant={"outlined"}
        placeholder={"First and Last Name"}
        fullWidth
        style={{ marginTop: 20 }}
      />
      <TextField
        style={{ marginTop: 20 }}
        variant={"outlined"}
        placeholder={"Email Address"}
        fullWidth
      />
      <TextField
        variant={"outlined"}
        multiline
        rows={4}
        placeholder={"Message"}
        fullWidth
        style={{ marginTop: 20 }}
      />
      <Button
        style={{ marginTop: 20 }}
        fullWidth
        variant={"contained"}
        color={"primary"}
        onClick={() => history.push("/messages")}
      >
        Make an Offer
      </Button>
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

export default MakeOfferForm;
