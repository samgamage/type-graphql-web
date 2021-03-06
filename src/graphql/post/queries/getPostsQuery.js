import gql from "graphql-tag";

export const getPostsQuery = gql`
  query GetPostsQuery {
    posts {
      id
      title
      description
      createdAt
      author {
        id
        username
        profile {
          profilePictureUrl
        }
      }
    }
    me {
      id
    }
  }
`;
