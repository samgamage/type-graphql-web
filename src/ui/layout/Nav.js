import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
  },
};

const Nav = ({ children, classes }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            <Link to="/">Home</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default withStyles(styles)(Nav);
