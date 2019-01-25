import gql from "graphql-tag";

export const postsQuery = gql`
  {
    posts {
      id
      title
      content
      published
      author {
        username
        email
      }
    }
  }
`;
