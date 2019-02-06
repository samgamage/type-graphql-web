import React from "react";
import { Mutation } from "react-apollo";
import Dropzone from "react-dropzone";
import { addProfilePictureMutation } from "../graphql/user/mutations/addProfilePictureMutation";

const ProfilePic = () => (
  <Mutation mutation={addProfilePictureMutation}>
    {(addProfilePicture) => (
      <Dropzone
        onDrop={([file]) => addProfilePicture({ variables: { file } })}
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
