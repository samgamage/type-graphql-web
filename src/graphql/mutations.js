import gql from "graphql-tag";

export const deletePostMutation = gql`
  mutation DeletePostMutation($postId: Float!) {
    deletePost(postId: $postId) {
      ok
    }
  }
`;
export const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
    }
  }
`;
