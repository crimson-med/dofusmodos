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
import config from "./config";

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
const actionList = config.reasons;
const modoList = config.modos;
const serverList = config.servers;
const areaList = config.areas.map(a => {
    return {key: a.name, value: a.name, text: a.name}
});
const subAreaList = config.subAreas.map(a => {
    return {key: a.name, value: a.name, text: a.name}
});
const App: FunctionComponent = props => {
  const [nom, setNom] = useState("");
  const [serv, setServ] = useState("");
  const [isPosOk, setIsPosOk] = useState({color: "red", text: ""});
  const [action, setAction] = useState("");
  const [area, setArea] = useState(areaList[areaList.length - 1].value);
  const [subArea, setSubArea] = useState("");
  const [pos, setPos] = useState({posX: 0, posY:0});
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
  const areaChange = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    const ar = config.areas.filter(e => e.name == data.value);
    setArea(data.value as string);
  };
  const subAreaChange = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    // find our sub area
    const sub = config.subAreas.filter(e => e.name == data.value);
    // if we have found our sub area
    if (sub && sub.length > 0) {
        // Try to find the Master Area
        const ar = config.areas.filter(e => e.id == sub[0].areaId);
        // If we found the Master Area update it accordingly
        if  (ar && ar.length > 0) {
            setArea(ar[0].name as string);
        } else {
            // Set to unknown if can't recover Master Area
            setArea(config.areas[config.areas.length-1].name as string);
        }
    }
    setSubArea(data.value as string);
  };
  const posChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
      // Perfect coordinate regex
      let coord = data.value.match(/((\S?\d+)(,|;)(\S?\d+))/);
      let co = [];
      if (coord) {
          for (var i = 0; i < coord.length; i++) {
              // only keep matches which are numbers
              // we use as any because TS compiler can be to aggressive
              if (!isNaN(coord[i] as any)) {
                  co.push(coord[i]);
              }
          }
      }
      if (co.length == 2) {
          // We have our X & Y, update the state
          setPos({...pos, posX: Number(co[0]), posY: Number(co[1])});
          // Update visual help for noobs
          setIsPosOk({...isPosOk, color: "green", text: "Position is valid"});
      } else {
          // Reminding noobs of format
          setIsPosOk({...isPosOk, color: "red", text: "Position is in-valid. Leave blank or follow the format: 34,-4"});
      }
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
              <strong>
                Area
                <span style={{ color: "red" }}> *</span>
              </strong>
              <Dropdown
                placeholder="Area"
                fluid
                selection
                options={areaList}
                onChange={areaChange}
                value = {area}
                required
              />
              <br />
              <strong>
                Sub Area
                <span style={{ color: "red" }}> *</span>
              </strong>
              <Dropdown
                placeholder="Sub Area"
                fluid
                selection
                options={subAreaList}
                onChange={subAreaChange}
                defaultValue={subAreaList[subAreaList.length - 1].value}
                required
              />
              <br />
              <Form.Input
                onChange={posChange}
                label="Coordonnées"
                placeholder="12,-4"
              />
              <span style={{ color: isPosOk.color }}>{isPosOk.text}</span>
              <hr />
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
