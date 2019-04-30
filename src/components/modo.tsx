import React, { FunctionComponent, useState, useRef } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { IModo } from "../models/IModo";
import moment from "moment";
import ReCAPTCHA from "react-google-recaptcha";
import "moment/locale/fr";
import { Table, Spin, Drawer, Button, TreeSelect } from "antd";
moment.locale("fr");

const query = gql`
  query Modos($afterDate: DateTime!) {
    modos(afterDate: $afterDate)  {
      nom
      server
      lastpos
      evt
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
    text: "OnMap"
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
    title: "Oshimo",
    value: "Oshimo",
    image:
      "https://ankama.akamaized.net/games/dofus-tablette/assets/2.26.1_X1dx.X2e_yPlG7RRneyLq2ohaL%27U28kN/gfx/illus/illu_403.png"
  },
  {
    key: "Terra Cogita",
    title: "Terra Cogita",
    value: "Terra Cogita",
    image:
      "https://ankama.akamaized.net/games/dofus-tablette/assets/2.26.1_X1dx.X2e_yPlG7RRneyLq2ohaL%27U28kN/gfx/illus/illu_404.png"
  },
  {
    key: "Grandapan",
    title: "Grandapan",
    value: "Grandapan",
    image:
      "https://ankama.akamaized.net/games/dofus-tablette/assets/2.26.1_X1dx.X2e_yPlG7RRneyLq2ohaL%27U28kN/gfx/illus/illu_401.png"
  },
  {
    key: "Herdegrize",
    title: "Herdegrize",
    value: "Herdegrize",
    image:
      "https://ankama.akamaized.net/games/dofus-tablette/assets/2.26.1_X1dx.X2e_yPlG7RRneyLq2ohaL%27U28kN/gfx/illus/illu_405.png"
  },
  {
    key: "Brutas",
    title: "Brutas",
    value: "Brutas",
    image:
      "https://ankama.akamaized.net/games/dofus-tablette/assets/2.26.1_X1dx.X2e_yPlG7RRneyLq2ohaL%27U28kN/gfx/illus/illu_407.png"
  },
  {
    key: "Dodge",
    title: "Dodge",
    value: "Dodge",
    image:
      "https://ankama.akamaized.net/games/dofus-tablette/assets/2.26.1_X1dx.X2e_yPlG7RRneyLq2ohaL%27U28kN/gfx/illus/illu_406.png"
  }
];

const columns = [{
  title: 'Nom du modérateur',
  dataIndex: 'nom',
  key: 'nom',
}, 
{
  title: 'Serveur',
  dataIndex: 'server',
  key: 'server',
}, 
{
  title: 'Dernière position',
  dataIndex: 'lastpos',
  key: 'lastpos',
}, 
{
  title: 'Action',
  dataIndex: 'evt',
  key: 'evt',
}, 
{
  title: 'Heure',
  dataIndex: 'heure',
  key: 'heure',
},
{
  title: 'Origine',
  dataIndex: 'origin',
  key: 'origin',
}];

export interface IModoProps {
  addModo?: IModo;
}

const Modo: FunctionComponent<IModoProps> = props => {

  const [visible,setVisible] = useState(false);
  const [server, setServer] = useState("");

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Query query={query} variables={{afterDate: moment().subtract(1,"days").toDate().toISOString().slice(0,10)}}>
      {result => {
        if (result.loading)
          return (
            <Spin tip="Chargement...">
              <Table columns={columns} bordered />
            </Spin>
          );
        if (result.error)
          return (
            <Spin tip="Impossible de récupérer les données">
              <Table columns={columns} bordered />
            </Spin>
          );
          const dataSource = (result.data.modos as IModo[]).sort(
            (a, b) =>
              moment(b.heure)
                .toDate()
                .getTime() -
              moment(a.heure)
                .toDate()
                .getTime()
          ).map((m, k) => (
           {key : k.toString(),
            nom : parseName(m.nom), 
            server: m.server, 
            lastpos: parsePos(m.lastpos), 
            evt: m.evt, 
            heure: moment(m.heure).fromNow(), 
            origin: m.origin }
          ))
          if(props.addModo){
            dataSource.unshift( 
              {key : props.addModo.nom,
              nom : parseName(props.addModo.nom), 
              server: props.addModo.server, 
              lastpos: parsePos(props.addModo.lastpos), 
              evt: props.addModo.evt, 
              heure: moment(props.addModo.heure).fromNow(), 
              origin: props.addModo.origin }
              )
          }
        return (
          <div>
            <div>
              <div className="header-logo"> 
                <h1 className="logo" ><img height="250" width="150" src="img/modo.png"/>DofusModos</h1>
                <Button className="buttonAddModo" type="primary" onClick={showDrawer}>
                  Ajouter un modo
                </Button>
              </div>
              <Drawer
                title="Ajouter un modérateur"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                width={500}
              >
              <div>
                <h3>Sélectionne un serveur </h3>
              <TreeSelect
                  treeIcon={false}
                  style={{ width: 300 }}
                  value={server}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={serverList}
                  onChange={setServer}
                  placeholder="Sélectionne un serveur"
                  treeDefaultExpandAll
                /><br/><br />
                <Button className="closeButton" type="danger" onClick={onClose}>Fermer</Button>
                <Button type="primary" >Ajouter</Button>
              </div>
              </Drawer>
            </div>
            <Table dataSource={dataSource} columns={columns} bordered />
          </div>
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
