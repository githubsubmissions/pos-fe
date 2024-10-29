import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {toast} from "react-toastify";
import {IconButton} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";

const Error = () => {
  useEffect(() => {
    toast.error("Well that was embarrassing :) 😊 .. for you", {position: "top-center"});
  }, []);

  return (
    <React.Fragment>
      <IconButton component={Link} to="/sales" color="primary" size="large">
        <ArrowBack />
      </IconButton>
    </React.Fragment>
  );
};

export default Error;
