import React from "react";
import { Grid, TextField as MaterialTextField } from "@material-ui/core";

function TextField({ xs = 12, ...props }) {
  return (
    <Grid item xs={xs}>
      <MaterialTextField variant="outlined" fullWidth {...props} />
    </Grid>
  );
}

export default TextField;
