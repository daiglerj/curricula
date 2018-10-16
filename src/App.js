import React, { Component } from 'react';
import {BrowserRouter, Router, Route, Switch} from 'react-router-dom';
import Home from "./Routes/Home"
import BuildCourse from "./Routes/BuildCourse"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import CourseDetail from "./Routes/CourseDetail"
import Profile from "./Routes/Profile"
import EditCourse from "./Routes/EditCourse"
import MyCourses from "./Routes/MyCourses"
import ViewCourse from "./Routes/ViewCourse"
import ForgotPassword from "./Routes/ForgotPassword"
import EditClass from "./Routes/EditClass"

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
            <div>
                <Navbar /> 
                <Route exact={true} path="/" component={()=>{return <Home />}} />
                <Route  path="/BuildCourse" component={()=>{return <BuildCourse />}} />
                <Route path="/EditCourse" component={()=>{return <EditCourse />}} />
                <Route  path="/CourseDetail" component={()=>{return <CourseDetail />}} />
                <Route  path="/Profile" component={()=>{return <Profile />}} />
                <Route  path="/MyCourses" component={()=>{return <MyCourses />}} />
                <Route  path="/ViewCourse" component={()=>{return <ViewCourse />}} />
                <Route  path="/ForgotPassword" component={()=>{return <ForgotPassword />}} />
                <Route  path="/EditClass" component={()=>{return <EditClass />}} />

                <Footer />
            </div>
        </BrowserRouter>
      </div>
     
    );
  }
}


export default App;
