import React from "react"
import { Divider, Grid } from "@material-ui/core"

function HourlyRate(props) {
  return (
    <div className="sticky-top" style={{ marginTop: 30 }}>
      <Grid
        style={{ fontSize: 18, textAlign: "center" }}
        container
        direction={"row"}
        justifyContent={"space-around"}
      >
        <Grid item>
          <div style={{ color: "black", fontWeight: "bold" }}>$35</div>
          <div>Hourly Rate</div>
        </Grid>
        <Grid item>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item>
          <div style={{ color: "black", fontWeight: "bold" }}>53</div>
          <div>Jobs Done</div>
        </Grid>
        <Grid item>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item>
          <div style={{ color: "black", fontWeight: "bold" }}>22</div>
          <div>Response Time</div>
        </Grid>
      </Grid>
    </div>
  )
}

export default HourlyRate
