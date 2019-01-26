import { Badge, IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React from "react";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
});

const Nav = ({ children, classes }) => (
  <div className={classes.root}>
    <AppBar position="static" color="default" style={{ display: "flex", alignItems: "center" }}>
      <Toolbar style={{ width: "60%" }}>
        <Typography variant="h6" color="inherit">
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
        </Typography>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <IconButton color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
    {children}
  </div>
);

export default withStyles(styles)(Nav);
