import {MenuItem} from "@mui/material";
import {Status} from "../../../../domain/enums/Status";
import * as React from "react";

export function StatusComponent() {
  return <React.Fragment>
    <MenuItem
      value={Status.ENABLED.toString()}>Enabled</MenuItem>
    <MenuItem
      value={Status.DISABLED.toString()}>Disabled</MenuItem>
    <MenuItem
      value={Status.DELETED.toString()}>Deleted</MenuItem>
  </React.Fragment>;
}