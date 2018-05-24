import React, { Component } from 'react';
import './../App.css';
import AppBar from 'material-ui/AppBar';
import Navbar from './../Components/Navbar';
import ViewCourse from "./../Components/ViewCourse/ViewCourseComponent.js"

class ViewCourseRoute extends Component {
  render() {
    return (
      <div className="App">
        <ViewCourse />
      </div>
     
    );
  }
}


export default ViewCourseRoute;