import { Avatar, Badge, IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React from "react";
import { Link } from "react-router-dom";
import Container from "./Container";

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
  toolbar: {
    padding: 0,
  },
});

const Nav = ({ children, classes }) => (
  <div className={classes.root}>
    <AppBar position="static" color="default">
      <Container width="60%">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit">
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Blog
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
              <Avatar src="https://picsum.photos/400/500/?image=2" />
            </IconButton>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
    {children}
  </div>
);

export default withStyles(styles)(Nav);
