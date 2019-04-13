import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccountView from "./account";
import ConfirmUser from "./confirm-user";
import CreatePost from "./create-post";
import Home from "./home";
import Login from "./login";
import Logout from "./logout";
import PostView from "./post-view";
import ProfilePic from "./profile-pic";
import ProfileView from "./profile-view";
import Register from "./register";

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/posts/create" exact component={CreatePost} />
      <Route path="/posts/:id?" exact component={PostView} />
      <Route path="/users/:id?" exact component={ProfileView} />
      <Route path="/profile-pic" component={ProfilePic} />
      <Route path="/user/confirm/:token?" exact component={ConfirmUser} />
      <Route path="/user/account" exact component={AccountView} />
      <Route path="/logout" component={Logout} />
    </Switch>
  </Router>
);
