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
