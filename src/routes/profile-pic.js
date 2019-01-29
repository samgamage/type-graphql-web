import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";

const addProfilePictureMutation = gql`
  mutation AddProfilePicture($picture: Upload!) {
    addProfilePicture(picture: $picture)
  }
`;

const ProfilePic = () => (
  // <Query query={meQuery}>
  //   {({ data: { me } }) => (
  <Mutation mutation={addProfilePictureMutation}>
    {(addProfilePicture) => (
      <input
        type="file"
        required
        onChange={({
          target: {
            validity,
            files: [file],
          },
        }) => validity.valid && addProfilePicture({ variables: { picture: file } })}
      />
    )}
  </Mutation>
  //   )}
  // </Query>
);

export default ProfilePic;
