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
export const createPostMutation = gql`
  mutation CreatePostMutation(
    $title: String!
    $description: String!
    $content: String!
  ) {
    createPost(
      data: { title: $title, description: $description, content: $content }
    ) {
      ok
      error
      post {
        id
        title
        description
        content
        author {
          username
        }
      }
    }
  }
`;
export const registerMutation = gql`
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
