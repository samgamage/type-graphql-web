import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ children }) => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/posts/create">Create Post</Link>
        </li>
      </ul>
      {children}
    </div>
  );
};

export default Nav;
