import React from "react";
import { Query } from "react-apollo";
import { findUserQuery } from "../graphql/user/queries/findUserQuery";
import Container from "../ui/layout/Container";
import Nav from "../ui/layout/Nav";

const ProfileView = ({
  match: {
    params: { id },
  },
}) => (
  <Nav>
    <Query query={findUserQuery} variables={{ id: parseFloat(id) }}>
      {({ data: { findUser, me }, loading }) => {
        if (loading) {
          return (
            <Container>
              <div>loading...</div>
            </Container>
          );
        }

        return (
          <Container width="40%">
            {me.id === findUser.id && <div>conditionally show button</div>}
            <div>profile stuff</div>
            <ul>
              {findUser.posts.map((post) => (
                <li>{post.id}</li>
              ))}
            </ul>
          </Container>
        );
      }}
    </Query>
  </Nav>
);

export default ProfileView;
