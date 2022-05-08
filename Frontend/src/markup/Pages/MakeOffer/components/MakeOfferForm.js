import React from "react";
import { Button, TextField, Input, Select, MenuItem } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

function MakeOfferForm(props) {
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const [durationType, setDurationType] = React.useState("Days");

  const handleChange = (event) => {
    setDurationType(event.target.value);
  };

  return (
    <div
      style={{ backgroundColor: "#eee", padding: "15px", borderRadius: "10px" }}
    >
      <h5 style={{ textAlign: "center" }}>Bid On this Job!</h5>
      <div className='p-4'>
        <TextField
          variant={"outlined"}
          label={"Set Your minimal Rate"}
          style={{ width: "100%", marginTop: 20 }}
          type={"number"}
          placeholder={"Enter your bid"}
          fullWidth
        />

        <div className='qtyBtns mt-3'>
          <div>
            Set Your <b>Delivery time</b>
          </div>
          <div className='d-flex justify-content-around align-items-center'>
            <div className='qtyDiv'>
              <div
                className='value-button'
                id='decrease'
                onClick={() => {
                  setValue(value - 1);
                }}
                value='Decrease Value'
              >
                -
              </div>
              <input
                type='number'
                id='number'
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <div
                className='value-button '
                id='increase'
                onClick={() => {
                  setValue(value + 1);
                }}
                value='Increase Value'
              >
                +
              </div>
            </div>

            <Select
              labelId='demo-simple-select-label'
              style={{
                backgroundColor: "white",
                width: "100%",
                height: "50px",
                borderRadius: "10px",
              }}
              className='w-50 text-center'
              id='demo-simple-select'
              value={durationType}
              onChange={handleChange}
            >
              <MenuItem value={"Days"} selected>
                Days
              </MenuItem>
              <MenuItem value={"Hours"}>Hours</MenuItem>
            </Select>
          </div>
        </div>

        <button
          onClick={() => history.push("/messages")}
          className='site-button btn-block mt-5 '
        >
          Place Your Bid
        </button>
      </div>
      <hr />
      <p className='text-secondary text-center'>
        Doesn't have an account?{" "}
        <Link to={"/signup"} className='text-primary'>
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default MakeOfferForm;
