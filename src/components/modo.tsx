import React, { FunctionComponent } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { IModo } from "../models/IModo";

const query = gql`
  {
    modos {
      nom
      server
      lastpos
      evt
    }
  }
`;

const Modo: FunctionComponent = props => {
  return (
    <div>
      <Query query={query}>
        {result => {
          if (result.loading) return <p>loading...</p>;
          if (result.error) return <p>{result.error.message}</p>;
          return (
            <ul>
              {(result.data.modos as IModo[]).map((m, k) => (
                <li key={k}>
                  {m.server + " " + m.nom + " " + m.lastpos + " " + m.evt}
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    </div>
  );
};

export default Modo;
