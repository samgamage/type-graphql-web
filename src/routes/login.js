import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { loginMutation } from "../graphql/mutations";
import Nav from "../ui/layout/Nav";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Nav>
        <Mutation mutation={loginMutation}>
          {(login) => (
            <div>
              <div>
                <input
                  placeholder="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                />
              </div>
              <div>
                <input
                  placeholder="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  login({ variables: { email, password } });
                }}
              >
                submit
              </button>
            </div>
          )}
        </Mutation>
      </Nav>
    );
  }
}

export default Login;
