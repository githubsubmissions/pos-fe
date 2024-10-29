import {Drawer} from "../appbar/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {mainListItems, secondaryListItems} from "./SideBarItems";
import * as React from "react";
import {Copyright} from "../../components/reusable/copyright/Copyright";
import ListItemButton from "@mui/material/ListItemButton";
import {Link} from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import {LogoutOutlined} from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";

export function SideBar(props: { open: boolean, onClick: () => void }) {
  return <Drawer variant="permanent" open={props.open}>
    <Toolbar
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        px: [1],
      }}
    >
      <IconButton onClick={props.onClick}>
        <ChevronLeftIcon />
      </IconButton>
    </Toolbar>
    <Divider />
    <List component="nav">
      {mainListItems}
      <Divider sx={{my: 1}} />
      {secondaryListItems}
      <Divider sx={{my: 1}} />
      <ListItemButton component={Link} to="/logout">
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>

    <Divider sx={{my: 1}} />

    <Copyright sx={{pt: 4}} />
  </Drawer>;
}