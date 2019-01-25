import gql from "graphql-tag";

export const deletePostMutation = gql`
  mutation DeletePostMutation($postId: Float!) {
    deletePost(postId: $postId) {
      ok
    }
  }
`;
