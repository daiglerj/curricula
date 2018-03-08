import React, { Component } from 'react';
import './App.css';
import AppBar from 'material-ui/AppBar';
import Navbar from './Components/Navbar';
import Jumbotron from "./Components/Jumbotron"
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Jumbotron />
      </div>
    );
  }
}


export default App;
