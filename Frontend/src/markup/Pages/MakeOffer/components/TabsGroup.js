import React, { useState } from "react";
import { Tab, Tabs } from "@material-ui/core";
import { useStyles } from "../MakeOfferStyles";
import {AboutMe,Gallery,Resume,Services} from './'


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
        return <Services />;
      case 2:
        return <Resume />;
      default:
        return <Gallery />;
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
          <Tab className={classes.tab} label="Services" />
          <Tab className={classes.tab} label="Resume" />
          <Tab className={classes.tab} label="Gallery" />
        </Tabs>
      </div>
      {renderSelectedTab()}
    </div>
  );
}

export default TabsGroup;
