import gql from "graphql-tag";

export const getPostQuery = gql`
  query GetPostQuery($id: String!) {
    getPost(id: $id) {
      id
      title
      description
      createdAt
      content
      author {
        id
        username
        profile {
          profilePictureUrl
        }
      }
    }
  }
`;
