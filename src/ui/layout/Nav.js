import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Container from "./Container";

class Nav extends React.Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    open: "",
  };

  render() {
    const { children } = this.props;
    // const { open } = this.state;
    return (
      <div>
        {/* <Query query={meQuery}>
          {({ data: { me }, error, loading }) => {
            if (loading) {
              return (
                <div>
                  loading
                  {open}
                </div>
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
            return ( */}
        <Container width="62%">
          <Menu mode="horizontal" style={{ lineHeight: "64px" }}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/register">Register</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          </Menu>
        </Container>

        {/* }}
        </Query> */}
        {children}
      </div>
    );
  }
}

export default Nav;
