import { Avatar, Badge, CircularProgress, IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { meQuery } from "../../graphql/querys";
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
      <Query query={meQuery}>
        {({ data, error, loading }) => {
          if (loading) {
            return (
              <Container>
                <CircularProgress color="secondary" />
              </Container>
            );
          }
          if (error) {
            return (
              <div>
                Error!
                {error.message}
              </div>
            );
          }
          return (
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
                    <Avatar src={data.me.profilePictureUrl} />
                  </IconButton>
                </div>
              </Toolbar>
            </Container>
          );
        }}
      </Query>
    </AppBar>
    {children}
  </div>
);

export default withStyles(styles)(Nav);
