import React, { FunctionComponent, useEffect } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { IModo } from "../models/IModo";
import { Table, Loader, Dimmer } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");

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

export interface IModoProps {
  addModo?: IModo;
}

const Modo: FunctionComponent<IModoProps> = props => {
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
                <Table.HeaderCell>Origine</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {(result.data.modos as IModo[])
                .sort(
                  (a, b) =>
                    moment(b.heure)
                      .toDate()
                      .getTime() -
                    moment(a.heure)
                      .toDate()
                      .getTime()
                )
                .map((m, k) => (
                  <Table.Row key={k}>
                    <Table.Cell>{parseName(m.nom)}</Table.Cell>
                    <Table.Cell>{m.server}</Table.Cell>
                    <Table.Cell>{parsePos(m.lastpos)}</Table.Cell>
                    <Table.Cell>{m.evt}</Table.Cell>
                    <Table.Cell>{moment(m.heure).fromNow()}</Table.Cell>
                    <Table.Cell>{m.origin}</Table.Cell>
                  </Table.Row>
                ))}
              {props.addModo && (
                <Table.Row>
                  <Table.Cell>{parseName(props.addModo.server)}</Table.Cell>
                  <Table.Cell>{props.addModo.nom}</Table.Cell>
                  <Table.Cell>{parsePos(props.addModo.lastpos)}</Table.Cell>
                  <Table.Cell>{props.addModo.evt}</Table.Cell>
                  <Table.Cell>
                    {moment(props.addModo.heure).fromNow()}
                  </Table.Cell>
                  <Table.Cell>{props.addModo.origin}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        );
      }}
    </Query>
  );
};

export default Modo;

const parsePos = (data: string) => {
  try {
    let pos = JSON.parse(data);
    let final = "";
    if (pos.area != undefined) {
      final += `${pos.area}`;
    }
    if (pos.subArea != undefined) {
      if (final != "") {
        final += ` - ${pos.subArea}`;
      } else {
        final += ` ${pos.subArea}`;
      }
    }
    if (pos.posX != undefined && pos.posY != undefined) {
      final += ` [${pos.posX};${pos.posY}]`;
    }
    if (final === "") {
      return data;
    }
    return final;
  } catch (error) {
    return data;
  }
};

const parseName = (data: string) => {
  try {
    if (data.match("(])")) {
      let final = data.replace("[", "");
      return final.replace("]", "");
    } else {
      return data;
    }
  } catch (error) {
    return data;
  }
};
