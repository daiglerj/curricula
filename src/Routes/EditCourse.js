import React, { Component } from 'react';
import './../App.css';
import AppBar from 'material-ui/AppBar';
import Navbar from './../Components/Navbar';
import EditCourse from "./../Components/EditCourse/EditCourse.js"

class EditCourseRoute extends Component {
  render() {
    return (
      <div className="App">
        <EditCourse />
      </div>
     
    );
  }
}


export default EditCourseRoute;