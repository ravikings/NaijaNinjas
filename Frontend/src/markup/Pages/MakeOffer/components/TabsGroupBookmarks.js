import React, { useState } from "react"
import { Tab, Tabs } from "@material-ui/core"
import { useStyles } from "../MakeOfferStyles"
import { AboutMe, Gallery, Resume, Services } from "./"
import ProfileBookmark from "./ProfileBookmarks"
import TasksBookmark from "./TasksBookmark"

function TabsGroupBookmark({ data, resume }) {
  const classes = useStyles()

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const renderSelectedTab = () => {
    switch (value) {
      case 0:
        return <TasksBookmark />
      case 1:
        return <ProfileBookmark />
      default:
        return <Resume data={resume} />
    }
  }

  return (
    <div>
      <div
        className="d-flex justify-content-center"
        style={{ marginBottom: 20 }}
      >
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab className={classes.tab} label="Bookmark Tasks" />
          <Tab className={classes.tab} label="Bookmark Profiles" />
        </Tabs>
      </div>
      {renderSelectedTab()}
    </div>
  )
}

export default TabsGroupBookmark
