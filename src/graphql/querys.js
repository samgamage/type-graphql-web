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
