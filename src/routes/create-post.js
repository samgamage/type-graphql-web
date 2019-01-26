import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { createPostMutation } from "../graphql/mutations";
import Nav from "../ui/layout/Nav";

class CreatePost extends Component {
  state = {
    title: "",
    description: "",
    content: "",
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { title, description, content } = this.state;
    return (
      <Nav>
        <Mutation mutation={createPostMutation}>
          {(createPost) => (
            <div>
              <div>
                <input
                  placeholder="title"
                  type="text"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                />
              </div>
              <div>
                <input
                  placeholder="description"
                  type="text"
                  name="description"
                  value={description}
                  onChange={this.onChange}
                />
              </div>
              <div>
                <textarea
                  placeholder="content"
                  type="text"
                  name="content"
                  value={content}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  createPost({ variables: { title, description, content } });
                  this.setState({ title: "", description: "", content: "" });
                }}
              >
                Create Post
              </button>
            </div>
          )}
        </Mutation>
      </Nav>
    );
  }
}

export default CreatePost;
