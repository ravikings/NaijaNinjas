import React, { useEffect, useCallback, useState, Fragment } from "react"
import Header from "../../Layout/Header"
import "../../../css/text-ediitor.css"
import { useStyles } from "./messagesStyles"
import { Grid, Hidden } from "@material-ui/core"
import ChatList from "./ChatList"
import MessageWindow from "./MessageWindow"
import Header2 from "../../Layout/Header2"
import Footer from "../../Layout/Footer"
import agent from "../../../api/agent"
import { useQuery } from "react-query"
import createRequest from "../../../utils/axios"
import useAuth from "../../../hooks/useAuth"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
function MessagesPage(props) {
  // Current User =>

  const classes = useStyles()
  const [userDetails, setUserDetails] = useState(null)
  const [userData, setUserData] = useState(null)
  const auth = useAuth()
  const { currentUser } = useSelector((state) => state.authReducer)
  const params = useParams()
  const getOnlineState = async () => {
    try {
      const { data } = await createRequest().get(
        `/api/v1/account/user-profile/${currentUser?.pk}/`
      )
      const status = data.user_set_status === false ? true : false
      setUserData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOnlineState()
  }, [])

  const { data: rowData, refetch } = useQuery(
    ["chat-row-data", userData],
    () => agent.Chat.getAllConversation(userData.author),
    {
      refetchOnWindowFocus: false, //turned off on window focus refetch option
      enabled: false, // turned off by default, manual refetch is needed
      onSuccess: (d) => {},
    }
  )
  console.log(userData?.author,"rOW")
  useEffect(() => {
    refetch()
  }, [userData])
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexFlow: "column",
      }}
    >
      <Header2 />
      <div className={classes.main}>
        <div className="job-bx" style={{ padding: 0 }}>
          <Grid container style={{}}>
            <Hidden smDown>
              <Grid item style={{ borderRight: "1px solid #ccc" }}>
                {rowData && (
                  <ChatList
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                    rowData={rowData}
                    userData={userData}
                    setUserData={setUserData}
                    userRefetch={refetch}
                  />
                )}
              </Grid>
            </Hidden>
            <Grid item xs={true}>
              <MessageWindow
                userDetails={userDetails}
                setUserDetails={setUserDetails}
                userRefetch={refetch}
                rowData={rowData}
                params={params}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MessagesPage
