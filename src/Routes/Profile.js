import React, { Component } from 'react';
import './../App.css';
import AppBar from 'material-ui/AppBar';
import ProfileContainer from './../Components/Profile/ProfileContainer'

class Profile extends Component {
  render() {
    return (
      <div className="App">
        <ProfileContainer />
      </div>
     
    );
  }
}


export default Profile;