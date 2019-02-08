import { Button, Form, Input, message } from "antd";
import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import { loginMutation } from "../graphql/user/mutations/loginMutation";
import Container from "../ui/layout/Container";
import Nav from "../ui/layout/Nav";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting...");
  };

  render() {
    const { email, password } = this.state;
    return (
      <Nav>
        <Mutation mutation={loginMutation}>
          {(login, { loading }) => (
            <Container width="20%">
              <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                  <Input
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={this.handleChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    name="password"
                    onChange={this.handleChange}
                  />
                </Form.Item>
                <Button
                  type="primary"
                  onClick={async (e) => {
                    e.preventDefault();
                    const response = await login({
                      variables: { email, password },
                    });
                    if (response.data.login.ok) {
                      this.props.history.push("/");
                      message.success("Logged in");
                    }
                  }}
                  loading={loading}
                >
                  Login
                </Button>
              </Form>
              <div>
                {/* eslint-disable-next-line */}
                Don't have an account? <Link to="/register">Sign up.</Link>
              </div>
            </Container>
          )}
        </Mutation>
      </Nav>
    );
  }
}

export default Login;
