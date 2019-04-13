import gql from "graphql-tag";

export const findUserQuery = gql`
  query FindUserQuery($id: String!) {
    findUser(id: $id) {
      id
      username
      email
      profile {
        name
        gender
        location
        profilePictureUrl
      }
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
