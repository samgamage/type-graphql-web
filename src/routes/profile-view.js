import { Button, Icon } from "antd";
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
    <Query query={findUserQuery} variables={{ id }}>
      {({ data: { findUser, me }, loading }) => {
        if (loading) {
          return (
            <Nav>
              <Container width="62%">
                <Icon type="loading" style={{ fontSize: 24 }} spin />
              </Container>
            </Nav>
          );
        }

        return (
          <Container width="40%">
            {me.id === findUser.id && <Button type="primary">Edit Profile</Button>}
            <div>profile stuff</div>
            <div>Posts</div>
            <ul>
              {findUser.posts.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          </Container>
        );
      }}
    </Query>
  </Nav>
);

export default ProfileView;
