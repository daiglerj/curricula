import React, { Component } from 'react';
import './../App.css';
import AppBar from 'material-ui/AppBar';
import Navbar from './../Components/Navbar';
import EditClass from "./../Components/EditClass/EditClass.js"

class EditClassRoute extends Component {
  render() {
    return (
      <div className="App">
        <EditClass />
      </div>
     
    );
  }
}


export default EditClassRoute;