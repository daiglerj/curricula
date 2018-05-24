import React, { Component } from 'react';
import './../App.css';
import AppBar from 'material-ui/AppBar';
import Navbar from './../Components/Navbar';
import MyCoursesComponent from "./../Components/MyCourses/MyCoursesComponent.js"

class MyCourses extends Component {
  render() {
    return (
      <div className="App">
        <MyCoursesComponent />
      </div>
     
    );
  }
}


export default MyCourses;