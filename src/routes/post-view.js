import { Avatar, Button, CardActions, CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import { Mutation, Query } from "react-apollo";
import { deletePostMutation } from "../graphql/mutations";
import { getPostQuery, postsQuery } from "../graphql/querys";
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
              const { posts } = cache.readQuery({ query: postsQuery });
              const newPosts = posts.filter((queryPost) => id !== queryPost.id);
              cache.writeQuery({
                query: postsQuery,
                data: {
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
                  <CardActions>
                    <Avatar
                      alt={getPost.author.username}
                      src="https://picsum.photos/400/500/?image=2"
                    />
                    <Typography variant="subtitle1" gutterBottom>
                      {getPost.author.username}
                    </Typography>
                  </CardActions>
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
