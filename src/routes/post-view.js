import { Avatar, Button, CardActions, CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import { Mutation, Query } from "react-apollo";
import { Link } from "react-router-dom";
import { deletePostMutation } from "../graphql/mutations";
import { findUserQuery, getPostQuery, postsQuery } from "../graphql/querys";
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
              <CircularProgress color="secondary" />
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
                    <CircularProgress color="secondary" />
                  </Container>
                );
              }
              return (
                <Container width="60%">
                  {me.id === getPost.author.id && (
                    <Button
                      variant="contained"
                      color="primary"
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
                    </Button>
                  )}
                  <Typography variant="h4" gutterBottom>
                    {getPost.title}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {getPost.description}
                  </Typography>
                  <Link to={`/users/${getPost.author.id}`}>
                    <CardActions>
                      <Avatar
                        alt={getPost.author.username}
                        src={getPost.author.profilePictureUrl}
                      />
                      <Typography variant="subtitle1" gutterBottom>
                        {getPost.author.username}
                      </Typography>
                    </CardActions>
                  </Link>
                  <Typography variant="body1" gutterBottom>
                    {getPost.content}
                  </Typography>
                </Container>
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  </Nav>
);
