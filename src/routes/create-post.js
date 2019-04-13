import { Input, message } from "antd";
import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import { createPostMutation } from "../graphql/post/mutations/createPostMutation";
import { getPostsQuery } from "../graphql/post/queries/getPostsQuery";
import { findUserQuery } from "../graphql/user/queries/findUserQuery";
import { meQuery } from "../graphql/user/queries/meQuery";
import Container from "../ui/layout/Container";
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
            <Container width="62%">
              <div>
                <Input
                  placeholder="title"
                  type="text"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                />
              </div>
              <div>
                <Input
                  placeholder="description"
                  type="text"
                  name="description"
                  value={description}
                  onChange={this.onChange}
                />
              </div>
              <div>
                <Input.TextArea
                  placeholder="content"
                  type="text"
                  name="content"
                  value={content}
                  onChange={this.onChange}
                />
              </div>
              <Query query={meQuery}>
                {({ loading, data: { me } }) => {
                  if (loading) {
                    return null;
                  }
                  return (
                    <button
                      type="submit"
                      onClick={async (e) => {
                        e.preventDefault();
                        const response = await createPost({
                          variables: { title, description, content },
                          refetchQueries: [
                            { query: getPostsQuery },
                            { query: findUserQuery, variables: { id: me.id } },
                          ],
                        });
                        this.setState({ title: "", description: "", content: "" });
                        if (response.data.createPost.ok) {
                          message.success("Created post");
                          this.props.history.push("/");
                        }
                      }}
                    >
                      Create Post
                    </button>
                  );
                }}
              </Query>
            </Container>
          )}
        </Mutation>
      </Nav>
    );
  }
}

export default CreatePost;
