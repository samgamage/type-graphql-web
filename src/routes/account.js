import React from "react";
import { Query } from "react-apollo";
import { meQuery } from "../graphql/user/queries/meQuery";
import Container from "../ui/layout/Container";
import Nav from "../ui/layout/Nav";

const AccountView = ({
  match: {
    params: { id },
  },
}) => (
  <Nav>
    <Query query={meQuery} variables={{ id: parseFloat(id) }}>
      {({ data: { me }, loading }) => {
        if (loading) {
          return <div>loading..</div>;
        }

        return (
          <Container width="60%">
            Account,
            {me.id}
          </Container>
        );
      }}
    </Query>
  </Nav>
);

export default AccountView;
