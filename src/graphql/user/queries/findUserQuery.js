import gql from "graphql-tag";

export const findUserQuery = gql`
  query FindUserQuery($id: Float!) {
    findUser(id: $id) {
      id
      username
      email
      profilePictureUrl
      posts {
        id
        title
        description
        content
        author {
          id
          username
          email
        }
      }
    }
    me {
      id
    }
  }
`;
