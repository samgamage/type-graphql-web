import React from "react";
import { Query } from "react-apollo";
import { getPostQuery } from "../graphql/querys";

export default ({
  match: {
    params: { id },
  },
}) => {
  return (
    <Query query={getPostQuery} variables={{ id: parseFloat(id) }}>
      {({ data }) => <div>{JSON.stringify(data)}</div>}
    </Query>
  );
};
