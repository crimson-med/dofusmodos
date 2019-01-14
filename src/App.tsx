import React, { FunctionComponent } from "react";
import "./App.css";
import Modo from "./components/modo";

const App: FunctionComponent = props => {
  return (
    <div className="App">
      <Modo />
    </div>
  );
};

export default App;
