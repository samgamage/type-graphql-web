import React from "react";
import { Mutation, Query } from "react-apollo";
import { deletePostMutation } from "../graphql/mutations";
import { postsQuery } from "../graphql/querys";
import Nav from "../ui/layout/Nav";

const Home = () => (
  <Query query={postsQuery}>
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
                  const { posts } = cache.readQuery({ query: postsQuery });
                  const newPosts = posts.filter(
                    (queryPost) => post.id !== queryPost.id
                  );
                  cache.writeQuery({
                    query: postsQuery,
                    data: {
                      posts: newPosts,
                    },
                  });
                }}
                key={post.id}
              >
                {(deletePost, { loading, error }) => (
                  <div>
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
                    <p>{post.title}</p>
                    <p>{post.description}</p>
                    <p>{post.content}</p>
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
