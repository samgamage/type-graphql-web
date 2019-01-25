import gql from "graphql-tag";

export const homeQuery = gql`
  {
    posts {
      id
      title
      description
      content
      author {
        id
        username
      }
    }
    me {
      id
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
        id
      }
    }
  }
`;
