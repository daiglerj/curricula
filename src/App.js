import React, { Component } from 'react';
import {BrowserRouter, Router, Route, Switch} from 'react-router-dom';
import Home from "./Routes/Home"
import BuildCourse from "./Routes/BuildCourse"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import CourseDetail from "./Routes/CourseDetail"
import Profile from "./Routes/Profile"
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
            <div>
                <Navbar /> 

                <Route exact={true} path="/" component={()=>{return <Home />}} />
                <Route  path="/BuildCourse" component={()=>{return <BuildCourse />}} />
                <Route  path="/CourseDetail" component={()=>{return <CourseDetail />}} />
                <Route  path="/Profile" component={()=>{return <Profile />}} />

                <Footer />
            </div>
        </BrowserRouter>
      </div>
     
    );
  }
}


export default App;
