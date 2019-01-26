import gql from "graphql-tag";

export const postsQuery = gql`
  {
    posts {
      id
      title
      description
      content
      author {
        username
      }
    }
  }
`;

export const getPostQuery = gql`
  query GetPostQuery($id: Float!) {
    getPost(id: $id) {
      id
      title
      description
      content
      author {
        username
      }
    }
  }
`;
