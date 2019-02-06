import gql from "graphql-tag";

export const addProfilePictureMutation = gql`
  mutation AddProfilePicture($file: Upload!) {
    addProfilePicture(file: $file)
  }
`;
