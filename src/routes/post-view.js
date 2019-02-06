import React from "react";
import { Mutation, Query } from "react-apollo";
import { deletePostMutation } from "../graphql/post/mutations/deletePostMutation";
import { getPostQuery } from "../graphql/post/queries/getPostQuery";
import { findUserQuery } from "../graphql/user/queries/findUserQuery";
import Container from "../ui/layout/Container";
import Nav from "../ui/layout/Nav";

export default ({
  match: {
    params: { id },
  },
  history,
}) => (
  <Nav>
    <Query query={getPostQuery} variables={{ id: parseFloat(id) }}>
      {({ data: { getPost, me }, loading }) => {
        if (loading) {
          return (
            <Container>
              <div>loading..</div>
            </Container>
          );
        }

        return (
          <Mutation
            mutation={deletePostMutation}
            update={(cache) => {
              const postsData = cache.readQuery({ query: postsQuery });
              const newPosts = postsData.posts.filter((post) => id !== post.id);

              cache.writeQuery({
                query: postsQuery,
                data: {
                  ...postsData,
                  posts: newPosts,
                },
              });
            }}
          >
            {(deletePost) => {
              if (loading) {
                return (
                  <Container>
                    <div>loading..</div>
                  </Container>
                );
              }
              return (
                <Container width="60%">
                  {me.id === getPost.author.id && (
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        deletePost({
                          variables: { postId: parseFloat(id, 10) },
                          refetchQueries: [
                            { query: findUserQuery, variables: { id: parseFloat(me.id) } },
                          ],
                        });
                        history.push("/");
                      }}
                    >
                      Delete
                    </button>
                  )}
                  <div>post stuff</div>
                </Container>
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  </Nav>
);
