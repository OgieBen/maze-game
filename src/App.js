import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { CellRow } from './components/cell-row/CellRow';

class App extends Component {
  render() {



    let rows = parseInt(window.prompt("Enter number of rows", ""));
    let cols = parseInt(window.prompt("Enter number of cols", ""));

    return (
      <div className="App">
      <h1> Please click on the box to begin </h1>
        <CellRow rows={rows} cols={cols} />

      </div>
    );
  }
}

export default App;
