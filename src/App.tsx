import React, { FunctionComponent, useState, useRef } from "react";
import "./App.css";
import {
  Form,
  Image,
  Button,
  Grid,
  Confirm,
  InputOnChangeData,
  ConfirmProps
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import ReCAPTCHA from "react-google-recaptcha";
import Modo from "./components/modo";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const addModoGql = gql`
  mutation AddModo($type: ModoInput!) {
    addModo(modo: $type) {
      nom
      server
      evt
      lastpos
      heure
    }
  }
`;

const App: FunctionComponent = props => {
  const [nom, setNom] = useState("");
  const [serv, setServ] = useState("");
  const [action, setAction] = useState("");
  const [pos, setPos] = useState("");
  const [open, setOpen] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const nomChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setNom(data.value);
  };
  const servChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setServ(data.value);
  };
  const actionChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setAction(data.value);
  };
  const posChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setPos(data.value);
  };
  const cloze = (
    evt: React.MouseEvent<HTMLAnchorElement>,
    data: ConfirmProps
  ) => {
    setOpen(false);
  };
  return (
    <Mutation mutation={addModoGql}>
      {(addModo, { data }) => (
        <Form
          onSubmit={e => {
            e.preventDefault();
            if (
              !recaptchaRef ||
              (recaptchaRef && !recaptchaRef.current)
            ) {
              return;
            }
            const recaptchaValue = recaptchaRef.current!.getValue();
            if (!recaptchaValue) {
              setOpen(true);
              return;
            }
            addModo({
              variables: {
                type: { nom: nom, server: serv, lastpos: pos, evt: action }
              }
            });
          }}
          size="tiny"
        >
          <Image centered src="img/modo.png" size="small" />

          <Grid centered columns={1}>
            <Confirm
              size="mini"
              cancelButton="OK"
              content="Veuillez vérifier le captcha"
              open={open}
              onCancel={cloze}
              onConfirm={cloze}
            />
            <Grid.Column floated="left" width={6}>
              <Form.Input
                onChange={nomChange}
                label="Nom du modérateur"
                placeholder="Tiavos.. "
                required
              />
              <Form.Input
                onChange={servChange}
                label="Serveur"
                placeholder="Ush/Oshimo.. "
                required
              />
              <Form.Input
                onChange={actionChange}
                label="Action"
                placeholder="Ban/Mute.. "
                required
              />
              <Form.Input
                onChange={posChange}
                label="Dernière position"
                placeholder="Bonta/Brak.. "
                required
              />
              <Grid>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Button type="submit">Partager</Button>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6Ldp44kUAAAAAGmacWivKV8_xX0GJaH0RkzOy4QW"
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column floated="right" width={10}>
              <Modo addModo={data && data.addModo} />
            </Grid.Column>
          </Grid>
        </Form>
      )}
    </Mutation>
  );
};

export default App;
