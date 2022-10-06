import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const Header = (props) => {
  return (
    <AppBar position="fixed" style={{ background: "#0072E5" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Weather App
        </Typography>
        {props.children}
      </Toolbar>
    </AppBar>
  );
};
