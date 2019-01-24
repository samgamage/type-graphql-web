import gql from "graphql-tag";
import React, { Component } from "react";
import { graphql } from "react-apollo";
import Layout from "../layout";

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
      <Layout>
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
      </Layout>
    );
  }
}

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

export default graphql(loginMutation)(Login);
