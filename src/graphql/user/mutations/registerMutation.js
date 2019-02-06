import gql from "graphql-tag";

export const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!, $username: String!) {
    register(data: { email: $email, password: $password, username: $username }) {
      ok
      error
    }
  }
`;
