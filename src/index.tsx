import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Row, Col } from 'antd';
import * as serviceWorker from "./serviceWorker";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "https://cookie-project.com:5050/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Row>
      <Col xs={{ span: 22, offset: 1 }}><App /></Col>
    </Row> 
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
