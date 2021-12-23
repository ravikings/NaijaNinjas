import React from "react";
import { Chip, Grid } from "@material-ui/core";

function Skills(props) {
  return (
    <div>
      <div style={{ fontSize: 20, color: "#333", marginBottom: 15 }}>
        Skills
      </div>
      <Grid container spacing={1}>
        <Grid item>
          <Chip
            style={{ background: "rgba(42,65,232,.07)", color: "#2a41e8" }}
            label={"iOS"}
          />
        </Grid>

        <Grid item>
          <Chip
            style={{ background: "rgba(42,65,232,.07)", color: "#2a41e8" }}
            label={"Android"}
          />
        </Grid>
        <Grid item>
          <Chip
            style={{ background: "rgba(42,65,232,.07)", color: "#2a41e8" }}
            label={"Python"}
          />
        </Grid>
        <Grid item>
          <Chip
            style={{ background: "rgba(42,65,232,.07)", color: "#2a41e8" }}
            label={"Flask"}
          />
        </Grid>
        <Grid item>
          <Chip
            style={{ background: "rgba(42,65,232,.07)", color: "#2a41e8" }}
            label={"NodeJS"}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Skills;
