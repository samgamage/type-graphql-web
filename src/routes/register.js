import { Button, Form, Input, message } from "antd";
import React from "react";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import { registerMutation } from "../graphql/user/mutations/registerMutation";
import Container from "../ui/layout/Container";
import Nav from "../ui/layout/Nav";

class Register extends React.Component {
  state = {
    email: "",
    username: "",
    password: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password, username } = this.state;
    return (
      <Nav>
        <Mutation mutation={registerMutation}>
          {(register, { loading }) => (
            <Container width="20%">
              <Form>
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
                    placeholder="Username"
                    value={username}
                    name="username"
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
                    const response = await register({ variables: { email, password, username } });
                    if (response.data.register.ok) {
                      message.success("Confirmation email sent. Please check your email.");
                    }
                  }}
                  loading={loading}
                >
                  Register
                </Button>
              </Form>
              <div>
                {/* eslint-disable-next-line */}
                Already have an account? <Link to="/login">Log in.</Link>
              </div>
            </Container>
          )}
        </Mutation>
      </Nav>
    );
  }
}

export default Register;
