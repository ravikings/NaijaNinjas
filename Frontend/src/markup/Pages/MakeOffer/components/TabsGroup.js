import React, { useState } from "react";
import AboutMe from "./AboutMe";
import { Tab, Tabs } from "@material-ui/core";
import Photos from "./Photos";
import Videos from "./Videos";
import Resume from "./Resume";
import { useStyles } from "../MakeOfferStyles";

function TabsGroup(props) {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderSelectedTab = () => {
    switch (value) {
      case 0:
        return <AboutMe />;
      case 1:
        return <Photos />;
      case 2:
        return <Videos />;
      default:
        return <Resume />;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab className={classes.tab} label="About Me" />
          <Tab className={classes.tab} label="Photos" />
          <Tab className={classes.tab} label="Videos" />
          <Tab className={classes.tab} label="Resume" />
        </Tabs>
      </div>
      {renderSelectedTab()}
    </div>
  );
}

export default TabsGroup;
