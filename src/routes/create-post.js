import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import { createPostMutation } from "../graphql/mutations";
import { findUserQuery, meQuery, postsQuery } from "../graphql/querys";
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
              <Query query={meQuery}>
                {({ data: { me }, loading }) => {
                  if (loading) return null;
                  return (
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        createPost({
                          variables: { title, description, content },
                          refetchQueries: [
                            { query: postsQuery },
                            { query: findUserQuery, variables: { id: parseFloat(me.id) } },
                          ],
                        });
                        this.setState({ title: "", description: "", content: "" });
                      }}
                    >
                      Create Post
                    </button>
                  );
                }}
              </Query>
            </div>
          )}
        </Mutation>
      </Nav>
    );
  }
}

export default CreatePost;
