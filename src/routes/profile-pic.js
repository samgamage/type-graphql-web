import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";
import Dropzone from "react-dropzone";

const addProfilePictureMutation = gql`
  mutation AddProfilePicture($file: Upload!) {
    addProfilePicture(file: $file)
  }
`;

const ProfilePic = () => (
  <Mutation mutation={addProfilePictureMutation}>
    {(addProfilePicture) => (
      <Dropzone
        onDrop={([file]) => {
          console.log(file);
          addProfilePicture({ variables: { file } });
        }}
        accept="image/jpeg, image/png"
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Try dropping some files here, or click to select files to upload.</p>
          </div>
        )}
      </Dropzone>
    )}
  </Mutation>
);

export default ProfilePic;
