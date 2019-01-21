import React from "react";
import { Link } from "react-router-dom";

export default ({ children }) => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      {children}
    </div>
  );
};
