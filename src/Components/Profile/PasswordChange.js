import React, {Component} from "react"
import './../../App.css';
import './../../CSS/Profile.css';
import RaisedButton from 'material-ui/RaisedButton';

export default class PasswordChange extends Component {
    constructor(props){
        super(props)
            this.state={
                currentPassword: '',
                newPassword: '',
                passwordConfirm: ''
            }
        }
        
        handleCurrentPasswordChange(event){
            this.setState({
                currentPassword: event.target.value
            })
        }
        
        handleNewPasswordChange(event){
            this.setState({
                newPassword: event.target.value
            })
        }
        
        handlePasswordConfirm(event){
            this.setState({
                passwordConfirm: event.target.value
            })
        }
        
        
    
    
    render(){
        var keyColor = {
            color: "#82ca9c"
        }
        var lockColor = {
            color: "#8493ca"
        }
        var lockOutlineColor = {
            color: "#96d0e8"
        }
        return(
            <div className="Fields">
                <i class="material-icons" style = {keyColor} >vpn_key</i><input className="textInput" placeholder="Enter your current password" onChange = {this.currentPasswordChange}/><br />
                <i class="material-icons" style = {lockColor}>lock</i><input className="textInput" placeholder="Enter your new password"   onChange={this.handlePassword}/><br />
                <i class="material-icons" style = {lockOutlineColor}>lock</i><input className="textInput" placeholder="Your new password just one more time" onChange={this.handlePasswordConfirm}  /><br />
                <RaisedButton className =  "saveButton" label="Save" backgroundColor="#82ca9c" labelColor="white"/>

            
            </div>
        )
    }
}