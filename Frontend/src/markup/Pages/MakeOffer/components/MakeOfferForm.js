import React from "react";
import { Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function MakeOfferForm(props) {
  const history = useHistory();
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
    </div>
  );
}

export default MakeOfferForm;
