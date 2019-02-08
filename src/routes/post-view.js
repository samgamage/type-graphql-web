import { Button, Icon, message } from "antd";
import React from "react";
import { graphql, Mutation, Query } from "react-apollo";
import { deletePostMutation } from "../graphql/post/mutations/deletePostMutation";
import { getPostQuery } from "../graphql/post/queries/getPostQuery";
import { getPostsQuery } from "../graphql/post/queries/getPostsQuery";
import { findUserQuery } from "../graphql/user/queries/findUserQuery";
import { meQuery } from "../graphql/user/queries/meQuery";
import Container from "../ui/layout/Container";
import Nav from "../ui/layout/Nav";

const PostView = ({
  match: {
    params: { id },
  },
  history,
  data,
}) => (
  <Nav>
    <Query query={getPostQuery} variables={{ id }}>
      {({ data: { getPost }, loading }) => {
        if (loading) {
          return (
            <Container width="10%">
              <Icon type="loading" style={{ fontSize: 24 }} spin />
            </Container>
          );
        }

        return (
          <Mutation mutation={deletePostMutation}>
            {(deletePost) => {
              if (data.loading || loading) {
                return (
                  <Container width="62%">
                    <Icon type="loading" style={{ fontSize: 24 }} spin />
                  </Container>
                );
              }
              return (
                <Container width="60%">
                  {data.me.id === getPost.author.id && (
                    <Button
                      type="primary"
                      onClick={async (e) => {
                        e.preventDefault();
                        const response = await deletePost({
                          variables: { postId: id },
                          refetchQueries: [
                            { query: findUserQuery, variables: { id: data.me.id } },
                            { query: getPostsQuery },
                          ],
                        });
                        if (response.data.deletePost.ok) {
                          message.success("Deleted post");
                          history.push("/");
                        }
                      }}
                      loading={loading}
                    >
                      Delete
                    </Button>
                  )}

                  <div>{getPost.title}</div>
                  <div>{getPost.author.username}</div>
                  <div>{getPost.content}</div>
                </Container>
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  </Nav>
);

export default graphql(meQuery)(PostView);
