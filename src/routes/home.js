import React from "react";
import { Query } from "react-apollo";
import { getPostsQuery } from "../graphql/post/queries/getPostsQuery";
import Container from "../ui/layout/Container";
import Nav from "../ui/layout/Nav";

const Home = ({ history }) => (
  <Query query={getPostsQuery}>
    {({ loading, error, data }) => {
      if (loading) {
        return (
          <Nav>
            <div>Loading</div>
          </Nav>
        );
      }
      if (error && error.graphQLErrors[0].message.includes("Not authenticated")) {
        history.push("/login");
        return null;
      }

      return (
        <Nav>
          <Container width="62%">
            {data.posts.map((post) => (
              <div>
                post stuff,
                {post.id}
              </div>
            ))}
          </Container>
        </Nav>
      );
    }}
  </Query>
);

export default Home;
