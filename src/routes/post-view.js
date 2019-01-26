import { Button } from "@material-ui/core";
import React from "react";
import { Mutation, Query } from "react-apollo";
import { deletePostMutation } from "../graphql/mutations";
import { getPostQuery, postsQuery } from "../graphql/querys";

export default ({
  match: {
    params: { id },
  },
  history,
}) => (
  <Query query={getPostQuery} variables={{ id: parseFloat(id) }}>
    {({ data: { getPost }, loading }) => {
      if (loading) {
        return <div>Loading...</div>;
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
          {(deletePost, { loading }) => {
            if (loading) {
              return <div>Loading</div>;
            }
            return (
              <>
                <Button
                  size="small"
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
                <div>{getPost.title}</div>
                <div>{getPost.author.username}</div>
                <div>{getPost.description}</div>
                <div>{getPost.content}</div>
              </>
            );
          }}
        </Mutation>
      );
    }}
  </Query>
);
