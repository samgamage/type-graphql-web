import gql from "graphql-tag";
import React, { Component } from "react";
import { Query } from "react-apollo";
import Layout from "../layout";

class Home extends Component {
  render() {
    return (
      <Query
        query={gql`
          {
            posts {
              title
              content
              published
              author {
                username
                email
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {`${error.message}`}</p>;

          return (
            <Layout>
              <p>{JSON.stringify(data.posts)}</p>
            </Layout>
          );
        }}
      </Query>
    );
  }
}

export default Home;
