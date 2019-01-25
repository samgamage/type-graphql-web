import React from "react";
import { Mutation, Query } from "react-apollo";
import { deletePostMutation } from "../graphql/mutations";
import { homeQuery } from "../graphql/querys";
import Nav from "../ui/layout/Nav";

const Home = () => (
  <Query query={homeQuery}>
    {({ loading, error, data }) => {
      if (loading)
        return (
          <Nav>
            <p>Loading...</p>
          </Nav>
        );
      if (error)
        return (
          <Nav>
            <p>Error: {`${error.message}`}</p>
          </Nav>
        );

      return (
        <Nav>
          {data &&
            data.posts.map((post) => (
              <Mutation
                mutation={deletePostMutation}
                update={(cache) => {
                  const { posts } = cache.readQuery({ query: homeQuery });
                  const newPosts = posts.filter(
                    (queryPost) => post.id !== queryPost.id
                  );
                  cache.writeQuery({
                    query: homeQuery,
                    data: {
                      posts: newPosts,
                    },
                  });
                }}
                key={post.id}
              >
                {(deletePost, { loading, error }) => (
                  <div>
                    <p>{post.title}</p>
                    <p>{post.description}</p>
                    <p>{post.content}</p>
                    <p>{post.author.username}</p>
                    {data.me.id === post.author.id && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          deletePost({
                            variables: { postId: parseFloat(post.id, 10) },
                          });
                        }}
                      >
                        Delete Post
                      </button>
                    )}
                    {loading && <p>Loading...</p>}
                    {error && (
                      <p>
                        Error {error.message}, {error.name}
                      </p>
                    )}
                  </div>
                )}
              </Mutation>
            ))}
        </Nav>
      );
    }}
  </Query>
);

export default Home;
