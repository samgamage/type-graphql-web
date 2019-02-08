import gql from "graphql-tag";

export const deletePostMutation = gql`
  mutation DeletePostMutation($postId: String!) {
    deletePost(postId: $postId) {
      ok
    }
  }
`;
