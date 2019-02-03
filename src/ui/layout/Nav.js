import {
  Avatar,
  Button,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  withStyles,
} from "@material-ui/core";
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
  popper: {
    zIndex: 1,
  },
});

class Nav extends React.Component {
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState((state) => ({ open: !state.open }));
  };

  handleClose = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { children, classes } = this.props;
    const { open } = this.state;
    return (
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
                    {me ? (
                      <>
                        <Link to="/posts/create">
                          <Button variant="contained" className={classes.button}>
                            Create Post
                          </Button>
                        </Link>
                        <IconButton color="inherit">
                          <NotificationsIcon />
                        </IconButton>
                        <IconButton
                          color="inherit"
                          buttonRef={(node) => {
                            this.anchorEl = node;
                          }}
                          aria-owns={open ? "menu-list-grow" : undefined}
                          aria-haspopup="true"
                          onClick={this.handleToggle}
                        >
                          <Avatar src={me.profilePictureUrl} />
                        </IconButton>
                        <Popper
                          open={open}
                          anchorEl={this.anchorEl}
                          className={classes.popper}
                          transition
                          disablePortal
                        >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              id="menu-list-grow"
                              style={{
                                transformOrigin:
                                  placement === "bottom" ? "center top" : "center bottom",
                              }}
                            >
                              <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                  <MenuList>
                                    <Link to={`/users/${me.id}`}>
                                      <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    </Link>
                                    <Link to="/user/account">
                                      <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                    </Link>
                                    <Link to="/logout">
                                      <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                                    </Link>
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                      </>
                    ) : (
                      <>
                        <Link to="/login">
                          <Button variant="contained" className={classes.button}>
                            Login
                          </Button>
                        </Link>
                      </>
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
  }
}

export default withStyles(styles)(Nav);
