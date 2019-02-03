import { CircularProgress, withStyles } from "@material-ui/core";
import React from "react";
import { Query } from "react-apollo";
import { meQuery } from "../graphql/querys";
import Container from "../ui/layout/Container";
import Nav from "../ui/layout/Nav";

const styles = {
  card: {
    maxWidth: 445,
    minWidth: 345,
    float: "left",
    margin: "1rem",
  },
  media: {
    height: 140,
  },
  avatar: {
    margin: 10,
    float: "left",
  },
  username: {
    lineHeight: "100%",
  },
};

const AccountView = ({
  match: {
    params: { id },
  },
}) => (
  <Nav>
    <Query query={meQuery} variables={{ id: parseFloat(id) }}>
      {({ data: { me }, loading }) => {
        if (loading) {
          return (
            <Container>
              <CircularProgress color="secondary" />
            </Container>
          );
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

export default withStyles(styles)(AccountView);
