import { Avatar, Button, IconButton, withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
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
  button: {
    margin: "0 0.5rem 0 0.5rem",
  },
});

const Nav = ({ children, classes }) => (
  <div className={classes.root}>
    <AppBar position="static" color="inherit">
      <Query query={meQuery}>
        {({ data: { me }, error, loading }) => {
          if (loading) {
            return <Toolbar className={classes.toolbar} />;
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
                {me && (
                  <Link to="/posts/create">
                    <Button variant="contained" className={classes.button}>
                      Create Post
                    </Button>
                  </Link>
                )}
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
                {me && (
                  <IconButton color="inherit">
                    <Avatar src={me.profilePictureUrl} />
                  </IconButton>
                )}
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
