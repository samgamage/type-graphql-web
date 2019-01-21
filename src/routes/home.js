import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Layout from "../layout";

class Home extends Component {
  render() {
    return (
      <Query
        query={gql`
          {
            hello
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {`${error.message}`}</p>;

          return (
            <Layout>
              <p>{data.hello}</p>
            </Layout>
          );
        }}
      </Query>
    );
  }
}

export default Home;
