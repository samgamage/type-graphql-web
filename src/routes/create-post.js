import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { createPostMutation } from "../graphql/mutations";
import { postsQuery } from "../graphql/querys";
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
        <Mutation
          mutation={createPostMutation}
          update={(
            cache,
            {
              data: {
                createPost: { post },
              },
            }
          ) => {
            const { posts } = cache.readQuery({ query: postsQuery });
            cache.writeQuery({
              query: postsQuery,
              data: {
                posts: posts.concat([post]),
              },
            });

            // (todo): display notification that the post was created
            this.props.history.push("/");
          }}
        >
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
                onClick={(e) => {
                  e.preventDefault();
                  createPost({ variables: { title, description, content } });
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
