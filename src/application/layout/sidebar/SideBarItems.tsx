import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {Link} from "react-router-dom";
import routes, {Route} from "../RoutesList";
import {toast} from "react-toastify";

export const mainListItems = (
  <React.Fragment>
    {routes.map((route: Route) => (
      <ListItemButton
        key={route.path}
        component={Link}
        to={route.path}
        onClick={() => toast.info(route.toast)}
      >
        <ListItemIcon>
          {route.icon}
        </ListItemIcon>
        <ListItemText primary={route.name} />
      </ListItemButton>
    ))}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
  </React.Fragment>
);
