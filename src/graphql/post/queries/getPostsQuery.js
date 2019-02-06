import gql from "graphql-tag";

export const getPostsQuery = gql`
  query GetPostsQuery {
    posts {
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
