import React, { Component } from 'react';
import './../../App.css';
import './../../CSS/Profile.css';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from "react-redux"

const mapStateToProps = (state) => {
  return {
      username: state.user.username,
      baseURL: state.app.baseURL,
      firstName: state.user.firstName,
      lastName: state.user.lastName, 
  }
      
}


const mapDispatchToProps = (dispatch)=>{
    return{
        
    }
}

class ProfileFields extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            firstName: this.props.firstName
        }
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
        this.handleLastNameChange = this.handleLastNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this)
        
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            firstName: nextProps.firstName,
            lastName: nextProps.lastName,
            username: nextProps.username,
            phoneNumber: nextProps.phoneNumber
        })
    }
    
    handleFirstNameChange(event){
        this.setState({
            firstName: event.target.value
        })
    }
    handleLastNameChange(event){
        this.setState({
            lastName: event.target.value
        })
    }
    handleEmailChange(event){
        this.setState({
            username: event.target.value
        })
    }
    handlePhoneNumberChange(event){
        this.setState({
            phoneNumber: event.target.value
        })
    }   
    render(){
        var emailColor = {
            color: "#82ca9c"
        }
        var firstNameColor = {
            color: "#8493ca"
        }
        var lastNameColor = {
            color: "#f4989d"
        }
        var phoneColor = {
            color: "#96d0e8"
        }
        
        return(
            <div className="Fields">
                    <i class="material-icons" style = {emailColor}>email</i><input className="textInput" placeholder="Email"  value = {this.state.username} onChange = {this.handleEmailChange}/><br />
                    <i class="material-icons" style={firstNameColor}>face</i><input className="textInput" placeholder="First Name"   value = {this.state.firstName} onChange={this.handleFirstNameChange}/><br />
                    <i class="material-icons" style={lastNameColor}>face</i><input className="textInput" placeholder="Last Name" onChange={this.handleLastNameChange} value = {this.state.lastName} /><br />
                    <i class="material-icons" style={phoneColor}>call</i><input className="textInput" placeholder = "Phone Number" onChange = {this.handlePhoneNumberChange} value = {this.state.phoneNumber} /> <br />
                    <RaisedButton className =  "saveButton" label="Save" backgroundColor="#82ca9c" labelColor="white"/>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileFields)
