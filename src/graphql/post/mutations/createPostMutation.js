import gql from "graphql-tag";

export const createPostMutation = gql`
  mutation CreatePostMutation($title: String!, $description: String!, $content: String!) {
    createPost(data: { title: $title, description: $description, content: $content }) {
      ok
      error
      post {
        id
        title
        description
        content
        author {
          id
          username
        }
      }
    }
  }
`;
