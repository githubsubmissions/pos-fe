import React, {useContext, useEffect, useState} from "react";
import {AppBar} from "./AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import {PasswordTwoTone} from "@mui/icons-material";
import './CustomAppBar.css';
import SalesContext from "../../../domain/contexts/sales/SalesContext";

export function CustomAppBar(props: { open: boolean, onClick: () => void, onPasswordChangeClick: () => void }) {
  const {onClick, onPasswordChangeClick} = props;

  const salesContext = useContext(SalesContext);
  const [lowStocks, setLowStock] = useState<string>('');

  useEffect(() => {
    const getLowStock = () => {
      const lowStocks = salesContext.state.products
        .filter(product => product.trackStock)
        .filter(product => product.stock <= product.minStockLevel)
        .map(item => item.name).join(', ');
      setLowStock(lowStocks);
    };

    // Call the function to set the initial state
    getLowStock();

    // Optionally, set up a subscription or polling here if the data updates in real-time
    // Cleanup function if you set up a subscription or polling
    return () => {
      // Cleanup code if needed
    };
  }, [salesContext.state.products]);

  return (
    <AppBar position="absolute" open={props.open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={onClick}
          sx={{
            marginRight: "36px",
            ...(props.open && {display: "none"}),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h5" color="inherit" noWrap sx={{flexGrow: 1}}>
          Dashboard
        </Typography>
        {lowStocks && (
          <div className="scrolling-message">
            <span>Low Stock: {lowStocks}</span>
          </div>
        )}
        <div style={{display: 'flex', alignItems: 'center'}}>
          <IconButton color="inherit">
            <Badge color="secondary">
              <PersonIcon />
            </Badge>
          </IconButton>
          {localStorage.getItem('email')?.toUpperCase()}
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={onPasswordChangeClick}>
            <Badge badgeContent={1} color="secondary">
              <PasswordTwoTone />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
