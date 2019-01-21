import React from "react";
import ReactDOM from "react-dom";
import Route from "./routes";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "same-origin",
});

const client = new ApolloClient({ cache: new InMemoryCache(), link });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Route />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
