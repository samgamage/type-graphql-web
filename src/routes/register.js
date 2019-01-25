import gql from "graphql-tag";
import React, { Component } from "react";
import { graphql } from "react-apollo";
import Nav from "../ui/layout/Nav";

class Register extends Component {
  state = {
    email: "",
    password: "",
    username: "",
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async () => {
    const { email, password, username } = this.state;

    const response = await this.props.mutate({
      variables: { email, password, username },
    });

    console.log(response);
  };

  render() {
    const { email, password, username } = this.state;
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
        <div>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={this.onChange}
          />
        </div>
        <button onClick={this.handleSubmit}>submit</button>
      </Nav>
    );
  }
}

const registerMutation = gql`
  mutation RegisterMutation(
    $email: String!
    $password: String!
    $username: String!
  ) {
    register(
      data: { email: $email, password: $password, username: $username }
    ) {
      ok
      error
    }
  }
`;

export default graphql(registerMutation)(Register);