import React from "react";
import { graphql } from "react-apollo";
import { logoutMutation } from "../graphql/mutations";
import { client } from "../index";

class Logout extends React.PureComponent {
  async componentDidMount() {
    const { mutate, history } = this.props;
    await mutate();
    await client.resetStore();
    history.push("/login");
  }

  render() {
    return null;
  }
}

export default graphql(logoutMutation)(Logout);
