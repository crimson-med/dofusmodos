import React, { FunctionComponent, useState, useRef } from "react";
import "./App.css";
import {
  Form,
  Image,
  Button,
  Grid,
  Dropdown,
  InputOnChangeData,
  ConfirmProps,
  Confirm,
  DropdownProps
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
      origin
    }
  }
`;

const actionList = [
  {
    key: "Ban",
    value: "Ban",
    text: "Ban"
  },
  {
    key: "MP",
    value: "MP",
    text: "Message"
  },
  {
    key: "OnMap",
    value: "OnMap",
    text: "Sur une map"
  },
  {
    key: "Mute",
    value: "Mute",
    text: "Mute"
  }
];
const modoList = [
  {
    key: "Myghal",
    value: "Myghal",
    text: "Myghal"
  },
  {
    key: "Zesnow",
    value: "Zesnow",
    text: "Zesnow"
  },
  {
    key: "Tiavos",
    value: "Tiavos",
    text: "Tiavos"
  },
  {
    key: "Fiora",
    value: "Fiora",
    text: "Fiora"
  },
  {
    key: "TobliK",
    value: "TobliK",
    text: "TobliK"
  },
  {
    key: "Amun",
    value: "Amun",
    text: "Amun"
  },
  {
    key: "Nyom",
    value: "Nyom",
    text: "Nyom"
  },
  {
    key: "Flysthos",
    value: "Flysthos",
    text: "Flysthos"
  },
  {
    key: "Fuhrgrim",
    value: "Fuhrgrim",
    text: "Fuhrgrim"
  },
  {
    key: "Sionilam",
    value: "Sionilam",
    text: "Sionilam"
  },
  {
    key: "Loalys",
    value: "Loalys",
    text: "Loalys"
  },
  {
    key: "Aesylthia",
    value: "Aesylthia",
    text: "Aesylthia"
  },
  {
    key: "Luzagal",
    value: "Luzagal",
    text: "Luzagal"
  },
  {
    key: "Falgoryn",
    value: "Falgoryn",
    text: "Falgoryn"
  },
  {
    key: "Luzark",
    value: "Luzark",
    text: "Luzark"
  },
  {
    key: "Mibato",
    value: "Mibato",
    text: "Mibato"
  },
  {
    key: "Archelisle",
    value: "Archelisle",
    text: "Archelisle"
  },
  {
    key: "Kramilium",
    value: "Kramilium",
    text: "Kramilium"
  },
  {
    key: "Gowolik",
    value: "Gowolik",
    text: "Gowolik"
  }
];

const serverList = [
  {
    key: "Oshimo",
    text: "Oshimo",
    value: "Oshimo",
    image:
      "https://ankama.akamaized.net/games/dofus-tablette/assets/2.26.1_X1dx.X2e_yPlG7RRneyLq2ohaL%27U28kN/gfx/illus/illu_403.png"
  },
  {
    key: "Terra Cogita",
    text: "Terra Cogita",
    value: "Terra Cogita",
    image:
      "https://ankama.akamaized.net/games/dofus-tablette/assets/2.26.1_X1dx.X2e_yPlG7RRneyLq2ohaL%27U28kN/gfx/illus/illu_404.png"
  },
  {
    key: "Grandapan",
    text: "Grandapan",
    value: "Grandapan",
    image:
      "https://ankama.akamaized.net/games/dofus-tablette/assets/2.26.1_X1dx.X2e_yPlG7RRneyLq2ohaL%27U28kN/gfx/illus/illu_401.png"
  },
  {
    key: "Herdegrize",
    text: "Herdegrize",
    value: "Herdegrize",
    image:
      "https://ankama.akamaized.net/games/dofus-tablette/assets/2.26.1_X1dx.X2e_yPlG7RRneyLq2ohaL%27U28kN/gfx/illus/illu_405.png"
  },
  {
    key: "Brutas",
    text: "Brutas",
    value: "Brutas",
    image:
      "https://ankama.akamaized.net/games/dofus-tablette/assets/2.26.1_X1dx.X2e_yPlG7RRneyLq2ohaL%27U28kN/gfx/illus/illu_407.png"
  },
  {
    key: "Dodge",
    text: "Dodge",
    value: "Dodge",
    image:
      "https://ankama.akamaized.net/games/dofus-tablette/assets/2.26.1_X1dx.X2e_yPlG7RRneyLq2ohaL%27U28kN/gfx/illus/illu_406.png"
  }
];

const App: FunctionComponent = props => {
  const [nom, setNom] = useState("");
  const [serv, setServ] = useState("");
  const [action, setAction] = useState("");
  const [pos, setPos] = useState("");
  const [open, setOpen] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const nomChange = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setNom(data.value as string);
  };
  const servChange = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setServ(data.value as string);
  };
  const actionChange = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setAction(data.value as string);
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
            if (!recaptchaRef || (recaptchaRef && !recaptchaRef.current)) {
              //console.log("need cap");
              return;
            }
            const recaptchaValue = recaptchaRef.current!.getValue();
            console.log(recaptchaValue);
            if (!recaptchaValue) {
              //console.log("need cap 2 ", recaptchaValue);
              return;
            }
            addModo({
              variables: {
                type: {
                  nom: nom,
                  server: serv,
                  lastpos: pos,
                  evt: action,
                  origin: "Site"
                }
              }
            });
            //console.log("ok");
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
              <strong>
                Modérateur
                <span style={{ color: "red" }}> *</span>
              </strong>
              <Dropdown
                placeholder="Liste des modérateurs"
                fluid
                search
                selection
                options={modoList}
                onChange={nomChange}
              />
              <br />
              <strong>
                Serveur
                <span style={{ color: "red" }}> *</span>
              </strong>
              <Dropdown
                placeholder="Liste des serveurs"
                fluid
                selection
                options={serverList}
                onChange={servChange}
              />
              <br />
              <strong>
                Action
                <span style={{ color: "red" }}> *</span>
              </strong>
              <Dropdown
                placeholder="Liste des actions"
                fluid
                selection
                options={actionList}
                onChange={actionChange}
              />
              <br />
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
