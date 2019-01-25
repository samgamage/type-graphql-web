import gql from "graphql-tag";
import React, { Component } from "react";
import { graphql } from "react-apollo";
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

  handleSubmit = async () => {
    const { email, password } = this.state;

    const response = await this.props.mutate({
      variables: { email, password },
    });

    console.log(response);
  };

  render() {
    const { email, password } = this.state;
    return (
      <Nav>
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
        <button onClick={this.handleSubmit}>submit</button>
      </Nav>
    );
  }
}

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      error
    }
  }
`;

export default graphql(loginMutation)(Login);
