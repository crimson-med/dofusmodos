import React, { FunctionComponent } from "react";
import "./App.css";
import { Form, Image, Button, Label, Grid, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import ReCAPTCHA from "react-google-recaptcha";
import Modo from "./components/modo";

const App: FunctionComponent = props => {
  return (
    <div className="App">
      <Form size="tiny">
        <Grid centered columns={2}>
          <Grid.Column>
            <Image centered src="./img/modo.png" size="small" />
            <Form.Field>
              <label>Nom du modérateur</label>
              <Input required placeholder="Tiavos..." />
            </Form.Field>
            <Form.Field>
              <label>Serveur</label>
              <Input placeholder="Ush/Oshimo..." />
            </Form.Field>
            <Form.Field>
              <label>Dernière position</label>
              <Input placeholder="Bonta/Brakmar..." />
            </Form.Field>
            <Form.Field>
              <label>Action</label>
              <Input placeholder="Ban/Mute..." />
            </Form.Field>
            <Button type="submit">Partager</Button>
            <ReCAPTCHA sitekey="6Ldp44kUAAAAAGmacWivKV8_xX0GJaH0RkzOy4QW" />
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  );
};

export default App;
