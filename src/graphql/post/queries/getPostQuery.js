import gql from "graphql-tag";

export const getPostQuery = gql`
  query GetPostQuery($id: Float!) {
    getPost(id: $id) {
      id
      title
      description
      content
      author {
        id
        username
        profilePictureUrl
      }
    }
    me {
      id
    }
  }
`;
