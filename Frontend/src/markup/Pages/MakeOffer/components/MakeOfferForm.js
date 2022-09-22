import React from "react"
import { Button, Divider, TextField } from "@material-ui/core"
import { Link, useHistory, useParams } from "react-router-dom"
import { useQuery } from "react-query";
import useAuth from "../../../../hooks/useAuth"
import SocialMedia from "./SocialMedia"
import { Skills } from "./ResumeComponents"
import Attachments from "./Attachments"
import agent from "../../../../api/agent";

function MakeOfferForm(props) {
  const auth = useAuth()
  const history = useHistory()

  const handleClick = (e) => {
    e.preventDefault();
    props.modal();
  };
  let { id } = useParams();
  const { data, refetch } = useQuery(["start-conversation", id], () => agent.Chat.startConversation(auth.currentUser.pk, id),
    {
      refetchOnWindowFocus: false,//turned off on window focus refetch option
      enabled: false, // turned off by default, manual refetch is needed
      onSuccess: (d) => {
        console.log(d);
        // history.push("/messages/")
        // i change this because of routers 
        history.push(`/messages/${auth.currentUser.pk}/${d.results[0].id}`)

      }
    }
  );

  return (
    <>
      {!auth.isAuthenticated ? (
        <aside>
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
        </aside>
      ) : (
        // <aside id="accordion1" className="sticky-top sidebar-filter bg-white"></aside>
        <aside
          className="project-widget sticky-top  sidebar-filter"
          id="bg-widget"
        >
          {/* Buyer Start */}
          <div className="text-center ">
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
                  onClick={() => {  refetch(); }}
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
          <Divider style={{ margin: "30px 0px" }} />

          <SocialMedia />

          <Divider style={{ margin: "30px 0px" }} />
          <Skills />
          <Divider style={{ margin: "30px 0px" }} />
          <Attachments />
        </aside>
      )}
    </>
  )
}

export default MakeOfferForm