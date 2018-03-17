import React, { Component } from 'react';
import './../App.css';
import AppBar from 'material-ui/AppBar';
import Navbar from './../Components/Navbar';
import BuildCourseForm from "./../Components/BuildCourse/BuildCourseForm.js"

class Home extends Component {
  render() {
    return (
      <div className="App">
        <BuildCourseForm />
      </div>
     
    );
  }
}


export default Home;