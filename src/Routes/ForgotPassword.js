import React, { Component } from 'react';
import './../App.css';
import AppBar from 'material-ui/AppBar';
import Navbar from './../Components/Navbar';
import ForgotPassword from "./../Components/ForgotPassword/ForgotPassword.js"

class ViewCourseRoute extends Component {
  render() {
    return (
      <div className="App">
        <ForgotPassword />
      </div>
     
    );
  }
}


export default ViewCourseRoute;