import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreatePost from "./create-post";
import Home from "./home";
import Login from "./login";
import PostView from "./post-view";
import Register from "./register";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/posts/create" exact component={CreatePost} />
      <Route path="/posts/:id?" exact component={PostView} />
    </Switch>
  </BrowserRouter>
);
