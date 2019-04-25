import React, { FunctionComponent } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { IModo } from "../models/IModo";
import { Table, Loader, Dimmer } from "semantic-ui-react";

const query = gql`
  {
    modos {
      nom
      server
      lastpos
      evt
      heure
      origin
    }
  }
`;

const Modo: FunctionComponent = props => {
  return (
    <Query query={query}>
      {result => {
        if (result.loading)
          return (
            <Dimmer active inverted>
              <Loader content="Loading" />
            </Dimmer>
          );
        if (result.error)
          return (
            <Dimmer active inverted>
              <Loader inverted content="Failed to fetch data" />
            </Dimmer>
          );
        return (
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nom du modérateur</Table.HeaderCell>
                <Table.HeaderCell>Serveur</Table.HeaderCell>
                <Table.HeaderCell>Dernière position</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
                <Table.HeaderCell>Heure</Table.HeaderCell>
                <Table.HeaderCell>Origin</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {(result.data.modos as IModo[]).map((m, k) => (
                <Table.Row key={k}>
                  <Table.Cell>{m.nom}</Table.Cell>
                  <Table.Cell>{m.server}</Table.Cell>
                  <Table.Cell>{m.lastpos}</Table.Cell>
                  <Table.Cell>{m.evt}</Table.Cell>
                  <Table.Cell>{m.heure}</Table.Cell>
                  <Table.Cell>{m.origin}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        );
      }}
    </Query>
  );
};

export default Modo;
