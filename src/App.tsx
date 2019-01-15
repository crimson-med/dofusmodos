import React, { FunctionComponent } from "react";
import "./App.css";
import { Form, Image, Button, Grid, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import ReCAPTCHA from "react-google-recaptcha";
import Modo from "./components/modo";
import ApolloClient, { gql } from "apollo-boost";
import { propTypes } from "react-recaptcha";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function validForm(): string {
  const schema = gql`
    {
      mutation {
        addModo(
          modo: {
            nom: "Valentin"
            server: "Nidas"
            evt: "Ban"
            lastpos: "Brak"
          }
        ) {
          nom
          server
          evt
          lastpos
        }
      }
    }
  `;

  return "";
}

const App: FunctionComponent = props => {
  return (
    <div className="App">
      <Form action={validForm()} size="tiny">
        <Image centered src="./img/modo.png" size="small" />
        <Grid centered columns={1}>
          <Grid.Column floated="left" width={6}>
            <Form.Input
              label="Nom du modérateur"
              placeholder="Tiavos.. "
              required
            />
            <Form.Input label="Serveur" placeholder="Ush/Oshimo.. " required />
            <Form.Input label="Action" placeholder="Ban/Mute.. " required />
            <Form.Input
              label="Nom du modérateur"
              placeholder="Tiavos.. "
              required
            />
            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Button type="submit">Partager</Button>
                </Grid.Column>
                <Grid.Column width={8}>
                  <ReCAPTCHA sitekey="6Ldp44kUAAAAAGmacWivKV8_xX0GJaH0RkzOy4QW" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column floated="right" width={10}>
            <Modo />
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  );
};

export default App;
