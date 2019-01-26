import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { registerMutation } from "../graphql/mutations";
import Nav from "../ui/layout/Nav";

class Register extends Component {
  state = {
    email: "",
    username: "",
    password: "",
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password, username } = this.state;
    return (
      <Nav>
        <Mutation
          mutation={registerMutation}
          update={({
            data: {
              register: { ok, error },
            },
          }) => {
            if (error) {
              console.error(error);
            }
            if (ok) {
              this.props.history.push("/");
            }
          }}
        >
          {(register) => (
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
                  placeholder="username"
                  type="text"
                  name="username"
                  value={username}
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
                  register({ variables: { email, password, username } });

                  // const { ok } = data.register;
                  // if (ok) {
                  //   this.props.history.push("/");
                  // }
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

export default Register;
