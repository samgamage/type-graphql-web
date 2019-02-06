import React from "react";
import { graphql } from "react-apollo";
import { confirmUserMutation } from "../graphql/user/mutations/confirmUserMutaiton";

class ConfirmUser extends React.PureComponent {
  componentDidMount() {
    const {
      match: {
        params: { token },
      },
      mutate,
      history,
    } = this.props;

    const response = mutate({ variables: { token } });

    if (response) {
      history.push("/login");
    }
  }

  render() {
    return null;
  }
}

export default graphql(confirmUserMutation)(ConfirmUser);
