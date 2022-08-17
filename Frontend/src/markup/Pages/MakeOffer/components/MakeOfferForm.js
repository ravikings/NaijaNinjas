import React from "react";
import { Button, TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

import useAuth from "../../../../hooks/useAuth";

function MakeOfferForm(props) {
  const auth = useAuth();
  const history = useHistory();
  console.log(auth.currentUser);
  const handleClick = (e) => {
    e.preventDefault();
    props.modal();
  };
  return (
    <>
      {!auth.isAuthenticated ? (
        <div>
          <h5 style={{ textAlign: "center" }}>
            Discuss your project with David
          </h5>
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
          <p className="text-secondary text-center pb-3">
            Doesn't have an account?{" "}
            <Link
              to={"/signup"}
              onClick={(e) => handleClick(e)}
              className="text-primary"
            >
              Sign Up
            </Link>
          </p>
        </div>
      ) : (
        <div className="project-widget" id="bg-widget">
          {/* Buyer Start */}
          <div className="text-center">
            {/* <h3 className="project-widget-title">About Buyer</h3> */}
            <a href="#">
              <img
                src="https://themebing.com/wp/prolancer/wp-content/uploads/2021/04/pexels-mentatdgt-1138903-150x150.jpg"
                className="mb-3 rounded-circle img-thumbnail"
                alt=""
              />{" "}
            </a>
            <a href="#" target="_blank">
              <h4>{auth.currentUser.username}</h4>
            </a>

            <ul className="list-inline mt-2 mb-2 badges">
              <li className="list-inline-item">
                <button
                  onClick={() => history.push("/messages")}
                  className="site-button"
                >
                  Contact Me
                </button>
              </li>
              <li className="list-inline-item">
                <button
                  onClick={() =>
                    history.push(`/send-contract/${auth.currentUser.pk}`)
                  }
                  className="site-button"
                  id="gray-button"
                >
                  Get a Quote
                </button>
              </li>
            </ul>

            <ul class="list-unstyled mt-4 meta">
              <li class="text-left">
                Location:<b class="float-right">Germany</b>
              </li>
              <li class="text-left">
                Departments:<b class="float-right">Graphich Designing</b>
              </li>
              <li class="text-left">
                No. of Task Completed:<b class="float-right">11</b>
              </li>
            </ul>
          </div>
          {/* Buyer end */}
        </div>
      )}
    </>
  );
}

export default MakeOfferForm;
