import gql from "graphql-tag";

export const meQuery = gql`
  {
    me {
      id
      profilePictureUrl
    }
  }
`;
