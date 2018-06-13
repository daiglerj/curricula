import React, { Component } from 'react';
import './../../App.css';
import './../../CSS/Profile.css';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from "react-redux"

const mapStateToProps = (state) => {
  return {
      baseURL: state.app.baseURL,
      username: state.user.username,
      baseURL: state.app.baseURL,
      firstName: state.user.firstName,
      lastName: state.user.lastName, 
      userID: state.user.ID
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
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            username: this.props.username,
            phoneNumber: this.props.phoneNumber
        }
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
        this.handleLastNameChange = this.handleLastNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setUsername = this.setUsername.bind(this)
        this.setFirstName = this.setFirstName.bind(this)
        this.setPhoneNumber = this.setPhoneNumber.bind(this)
        this.setLastName = this.setLastName.bind(this)
    }
    componentWillReceiveProps(nextProps){
        /*
        this.setState({
            firstName: nextProps.firstName,
            lastName: nextProps.lastName,
            username: nextProps.username,
            phoneNumber: nextProps.phoneNumber || "",
            userID: nextProps.userID
        })
*/
    }
    componentDidMount(){
        let fetchURL = this.props.baseURL + "getUserInfo/" +  this.props.userID
        fetch(fetchURL).then((response)=>{
            response.json().then((result)=>{
                console.log(result)
                result = result[0]
                this.setState({
                    firstName: result.FirstName,
                    lastName: result.LastName,
                    username: result.Username,
                    phoneNumber: result.PhoneNumber || "",
                })
            })
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

    handleSubmit(){
        let id = this.props.userID
        this.setFirstName(id,this.state.firstName)
        this.setLastName(id,this.state.lastName)
        this.setUsername(id,this.state.username)
        this.setPhoneNumber(id, this.state.phoneNumber)
    }

    setFirstName(id,firstName){
        let fetchURL = this.props.baseURL + 'setFirstName'
        let fetchOptions = {
            method:"put",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UserID: id,
                FirstName: firstName
            })
        }
        fetch(fetchURL,fetchOptions)
    }

    setLastName(id, lastName){
        let fetchURL = this.props.baseURL + 'setLastName'
        let fetchOptions = {
            method:"put",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UserID: id,
                LastName: lastName
            })
        }
        fetch(fetchURL,fetchOptions)
    }
    setUsername(id,userName){
        let fetchURL = this.props.baseURL + 'setUserEmail'
        let fetchOptions = {
            method:"put",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UserID: id,
                Username: userName
            })
        }
        fetch(fetchURL,fetchOptions)        
    }
    setPhoneNumber(id,phoneNumber){
        let fetchURL = this.props.baseURL + 'setPhoneNumber'
        let fetchOptions = {
            method:"put",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UserID: id,
                PhoneNumber: phoneNumber
            })
        }
        fetch(fetchURL,fetchOptions)
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
                    <RaisedButton className =  "saveButton" label="Save" backgroundColor="#82ca9c" labelColor="white" onClick={this.handleSubmit}/>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileFields)
