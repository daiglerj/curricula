import React, { Component } from 'react';
import './../App.css';
import {Link} from 'react-router-dom'
import { setUsername, setFirstName, setID, setLastName, signOut } from './../Actions/userActions'
import { connect } from "react-redux"

//Materials Imports
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {greenA200} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import Dialog from 'material-ui/Dialog';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import "./../App.css"

const mapStateToProps = (state) => {
  return {
      username: state.user.username,
      baseURL: state.app.baseURL,
      firstName: state.user.firstName
  }    
}
const mapDispatchToProps = (dispatch)=>{
    return{
        setUsername: (name)=>dispatch(setUsername(name)),
        setFirstName: (name)=>dispatch(setFirstName(name)),
        setLastName: (name)=>dispatch(setLastName(name)),
        setID: (id)=>dispatch(setID(id)),
        signOut: ()=>dispatch(signOut())
    }
}

class Navbar extends Component {
    render(){
        var navbarStyle = {
            color:"#51565a",
        }
        let rightElement  = ""
        if(this.props.username ==""){
            rightElement = <Login 
                                baseURL = {this.props.baseURL} 
                                setUsername={this.props.setUsername}
                                setFirstName = {this.props.setFirstName}
                                setLastName={this.props.setLastName}
                                setID = {this.props.setID}
                            />

        }
        else{
            rightElement = <LoggedIn name = {this.props.firstName} signOut={this.props.signOut}/>
        }
        return (
            <div>
            <AppBar 
                iconElementLeft = {<LeftElement />}
                iconElementRight = {rightElement}
                titleStyle= {navbarStyle}
                className= "navbar"
            />
            </div>
        )
    }
}

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            loginOpen: false,
            signupOpen: false,
            usernameField: "",
            passwordField: "",
            signUpError: "",
            loginError: "",
            teacher:false
        }
        this.handleLoginOpen = this.handleLoginOpen.bind(this)
        this.handleLoginClose = this.handleLoginClose.bind(this)
        this.handleLogin.bind(this)
        
        //Login input changes
        this.handleUserNameChange = this.handleUserNameChange.bind(this)
        
        //Sign Up Chages
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
        this.handlePasswordSignUpChange = this.handlePasswordSignUpChange.bind(this)
        this.handleLastNameChange = this.handleLastNameChange.bind(this)
        this.handleUsernameSignUpChange = this.handleUsernameSignUpChange.bind(this)
        this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this)
        this.handleSignupError = this.handleSignupError.bind(this)
        this.handleTeacherToggle = this.handleTeacherToggle.bind(this)
        //Supporting Functions
        this.signIn = this.signIn.bind(this)
    }
    
    
    /*
    *Modals
    */
    handleLoginOpen = () => {
        this.setState({loginOpen: true});
      };

    handleLoginClose = () => {
        this.setState({loginOpen: false});
      };

    handleSignupOpen = () => {
        this.setState({signupOpen: true});
      };

    handleSignupClose = () => {
        this.setState({signupOpen: false});
      };


    /*
    * Login inputs
    */
    handleUserNameChange = (event)=>{
        this.setState({
            usernameField : event.target.value
        })
    }
    handlePasswordChange = (event)=>{
        this.setState({
            passwordField : event.target.value
        })
    }
    
    /*
    * Sign Up inputs
    */
    handleUsernameSignUpChange = (event) =>{
        this.setState({
            usernameSignUp : event.target.value
        })
    }
    handlePasswordSignUpChange = (event) =>{
        this.setState({
            passwordSignUp : event.target.value
        })
    }
    handlePasswordConfirmChange = (event) =>{
        this.setState({
            passwordConfirm : event.target.value
        })
    }
    handleFirstNameChange = (event) =>{
        this.setState({
            firstName : event.target.value
        })
    }
    handleLastNameChange = (event) =>{
        this.setState({
            lastName : event.target.value
        })
    }

    handleTeacherToggle = (event)=>{
        this.setState({
            teacher: !this.state.teacher
        })
        console.log(this.state.teacher)
    }
    static muiName = 'FlatButton';

    /*
    * Login and Sign Up 
    */
    handleLogin = ()=>{        
        let login = this.signIn(this.state.usernameField,this.state.passwordField)
        if(login){
            this.setState({
                loginOpen:false
            })
        }

    }
    handleSignUp = ()=>{
        //need fetch request
        //Sign Up
        let url = this.props.baseURL + "signUp"
        let options = {
            method: "post",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Username: this.state.usernameSignUp,
                Password: this.state.passwordSignUp,
                FirstName: this.state.firstName,
                LastName: this.state.lastName,
                PhoneNumber: 0,
                Teacher: this.state.teacher
            })
            
        }
        fetch(url,options).then((response,body)=>{
            console.log(response)
            if(response.status==404){
                console.log(response.status)
                return false
            }
            else if(response.status==400){
                console.log(response)
                response.json().then(result=>{
                      this.handleSignupError(result.message)
                })
                return false
            }
            return true
        }).then((success)=>{
            if(success){
                console.log("Success")
                this.signIn(this.state.usernameSignUp,this.state.passwordSignUp)
            }
        })
        
        
    }

    handleSignupError(error){
        this.setState({
            signUpError: error
        })
    }
    signIn(username,password){
        let signInOptions = {
            method: "post",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Username: username,
                Password: password,
            })
        }
        let signInURL = this.props.baseURL + "signIn"
        fetch(signInURL,signInOptions).then((response,body)=>{
            console.log(response)
            if(response.status !=200){
                this.setState({
                    loginError: "Username and password do not match or user does not exist"
                })
                return  false
            }
            else{
                response.json().then(result=>{
                    this.props.setUsername(result.Username)
                    this.props.setFirstName(result.FirstName)
                    this.props.setLastName(result.LastName)
                    this.props.setID(result.ID)
                    return true
                })
            }
        })
    }

    /*
    * Visual DOM
    */
    render() {
        var buttonStyle = {
            color:"#51565a",
        }
        var loginButtonStyle = {
            color: "#82ca9c"
        }
        var goButtonStyle = {
            color:"white"
        }
        var labelStyle = {
            display:"block",
            marginBottom: "10px",
            marginTop: "20px"
        }
        var inputStyle = {
            height: "10px"
        }
        var checkboxStyle = {
            marginTop:"30px",
            display:"inline-block"
        }
        const loginActions = [
              <FlatButton
                label="Cancel"
                onClick={this.handleLoginClose}
              />,
                <FlatButton
                label="Log In"
                backgroundColor= "#82ca9c"
                labelStyle = {goButtonStyle}
                hoverColor="#59876a"
                onClick = {this.handleLogin}
            />
            ]
        const signupActions = [
              <FlatButton
                label="Cancel"
                onClick={this.handleSignupClose}
              />,
                <FlatButton
                label="Sign Up!"
                backgroundColor= "#82ca9c"
                labelStyle = {goButtonStyle}
                hoverColor="#59876a"
                onClick = {this.handleSignUp}
            />
            ]
        const errorStyle = {
            color:"red"
        }
        return (
            <div>
                <Link to = "/BuildCourse"><FlatButton {...this.props} style={buttonStyle} label="Build a Course" /></Link>
                <FlatButton {...this.props} style={buttonStyle} label="Sign Up" onClick = {this.handleSignupOpen} />
                <FlatButton {...this.props} style={loginButtonStyle} label="Login" onClick={this.handleLoginOpen} />
                
                <Dialog
                  title="Login"
                  actions={loginActions}
                  modal={false}
                  open={this.state.loginOpen}
                  onRequestClose={this.handleLoginClose}
                >
                <form>
                    <p style={errorStyle}>{this.state.loginError}</p>
                    <label style={labelStyle}>Username</label>
                    <input style = {inputStyle} onChange={this.handleUserNameChange} className = 'textInput' type="text" />
                    <label style = {labelStyle} >Password</label>
                    <input style = {inputStyle} onChange = {this.handlePasswordChange} className = 'textInput' type="password" />
                </form>
                <a href = "#" className="forgotPassword">Forgot your password?</a>
                </Dialog>
            

                <Dialog
                  title="SignUp"
                  actions={signupActions}
                  modal={false}
                  open={this.state.signupOpen}
                  onRequestClose={this.handleSignupClose}
                >
                <form>
                    <p style={errorStyle}>{this.state.signUpError}</p>
                    <label style={labelStyle}>Enter your Email</label>
                    <input style = {inputStyle} className = 'textInput' type="text" onChange = {this.handleUsernameSignUpChange}/>
                    <label style={labelStyle}>First Name</label>
                    <input style = {inputStyle} className = 'textInput' type="text" onChange = {this.handleFirstNameChange} />
                    <label style={labelStyle}>Last Name</label>
                    <input style = {inputStyle} className = 'textInput' type="text" onChange = {this.handleLastNameChange} />
                    <label style = {labelStyle} >Enter your Password</label>
                    <input style = {inputStyle} className = 'textInput' type="password" onChange = {this.handlePasswordSignUpChange}/>
                    <label style = {labelStyle} >Enter your password again</label>
                    <input style = {inputStyle} className = 'textInput' type="password" onChange = {this.handlePasswordConfirmChange} /> <br />
                    <input type="checkbox" id="group1" style={checkboxStyle} onClick = {this.handleTeacherToggle}/> <label for="group1">I am an instructor</label>
                </form>
                </Dialog>
            </div>
        );
    }
}


const BookIcon = (props) => (
    <SvgIcon {...props}>
        {<path d="M8.627,7.885C8.499,8.388,7.873,8.101,8.13,8.177L4.12,7.143c-0.218-0.057-0.351-0.28-0.293-0.498c0.057-0.218,0.279-0.351,0.497-0.294l4.011,1.037C8.552,7.444,8.685,7.667,8.627,7.885 M8.334,10.123L4.323,9.086C4.105,9.031,3.883,9.162,3.826,9.38C3.769,9.598,3.901,9.82,4.12,9.877l4.01,1.037c-0.262-0.062,0.373,0.192,0.497-0.294C8.685,10.401,8.552,10.18,8.334,10.123 M7.131,12.507L4.323,11.78c-0.218-0.057-0.44,0.076-0.497,0.295c-0.057,0.218,0.075,0.439,0.293,0.495l2.809,0.726c-0.265-0.062,0.37,0.193,0.495-0.293C7.48,12.784,7.35,12.562,7.131,12.507M18.159,3.677v10.701c0,0.186-0.126,0.348-0.306,0.393l-7.755,1.948c-0.07,0.016-0.134,0.016-0.204,0l-7.748-1.948c-0.179-0.045-0.306-0.207-0.306-0.393V3.677c0-0.267,0.249-0.461,0.509-0.396l7.646,1.921l7.654-1.921C17.91,3.216,18.159,3.41,18.159,3.677 M9.589,5.939L2.656,4.203v9.857l6.933,1.737V5.939z M17.344,4.203l-6.939,1.736v9.859l6.939-1.737V4.203z M16.168,6.645c-0.058-0.218-0.279-0.351-0.498-0.294l-4.011,1.037c-0.218,0.057-0.351,0.28-0.293,0.498c0.128,0.503,0.755,0.216,0.498,0.292l4.009-1.034C16.092,7.085,16.225,6.863,16.168,6.645 M16.168,9.38c-0.058-0.218-0.279-0.349-0.498-0.294l-4.011,1.036c-0.218,0.057-0.351,0.279-0.293,0.498c0.124,0.486,0.759,0.232,0.498,0.294l4.009-1.037C16.092,9.82,16.225,9.598,16.168,9.38 M14.963,12.385c-0.055-0.219-0.276-0.35-0.495-0.294l-2.809,0.726c-0.218,0.056-0.351,0.279-0.293,0.496c0.127,0.506,0.755,0.218,0.498,0.293l2.807-0.723C14.89,12.825,15.021,12.603,14.963,12.385"></path>}
    </SvgIcon>
);

class LoggedIn extends Component{
    render(){
        var buttonStyle = {
            color:"#51565a",
            marginRight:"10px"
        }
        var greetingStyle={
            color:"#82ca9c",
            marginRight: "10px",
            font:"robotica"
        }
        var vertButtonStyle = {
            verticalAlign: "middle"
        }
        var dropdownButtonStyle = {
            textDecoration: "none"
        }

        var name = this.props.name + "'s Profile"
        return(
            <div>
                <Link to = "/BuildCourse"><FlatButton {...this.props} style={buttonStyle} label="Build a Course" /></Link>

                  <IconMenu
                    iconButtonElement={
                      <IconButton style={vertButtonStyle} ><MoreVertIcon color="grey" /></IconButton>
                    } 
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <a href = "/MyCourses" style = {dropdownButtonStyle} ><MenuItem style= {dropdownButtonStyle} primaryText="My Courses" /></a>
                    <Link to = "/BuildCourse" style = {dropdownButtonStyle} ><MenuItem style= {dropdownButtonStyle} primaryText="Build a Course" /></Link>
                    <Link to ="/Profile" style = {dropdownButtonStyle}><MenuItem primaryText={name} /></Link>

                    <a href = "/" style = {dropdownButtonStyle} onClick={this.props.signOut} ><MenuItem primaryText="Sign out" /></a>
                  </IconMenu>

            </div>
        )
    }
}
class LeftElement extends Component {
    render(){
        var iconStyles = {
            marginRight: 24,
            color:"limegreen"
        };
        var labelStyle = {
            color:"#51565a",

          
        }
        return(
            <div>
                <FlatButton
                  href="/"
                  label="Curricula"
                  hoverColor="None"
                  labelStyle = {labelStyle}
                  secondary={true}
                  icon={<BookIcon />}
                  style= {iconStyles}
                  disableTouchRipple
                />
                
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)


