import gql from "graphql-tag";
import React, { Component } from "react";
import { graphql } from "react-apollo";
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

  handleSubmit = async () => {
    const { title, description, content } = this.state;

    const response = await this.props.mutate({
      variables: { title, description, content },
    });

    console.log(response);
  };

  render() {
    const { title, description, content } = this.state;
    return (
      <Nav>
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
        <button onClick={this.handleSubmit}>Create</button>
      </Nav>
    );
  }
}

const createPostMutation = gql`
  mutation CreatePostMutation(
    $title: String!
    $description: String!
    $content: String!
  ) {
    createPost(
      data: { title: $title, description: $description, content: $content }
    ) {
      ok
      error
    }
  }
`;

export default graphql(createPostMutation)(CreatePost);
