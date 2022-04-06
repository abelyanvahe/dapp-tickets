import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Tickets from './components/Tickets';

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  render() {
    return (
      <div className="App">
        <Tickets />
      </div>
    );
  }
}

export default App;
