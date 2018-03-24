import React, { Component } from 'react';
import './../../App.css';
import './../../CSS/Profile.css';
import BasicProfileFields from "./BasicProfileFields"
import PasswordChange from "./PasswordChange"
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
class ProfileContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            display: "Basic"
        }
        this.switchDisplay = this.switchDisplay.bind(this)
    }
    
    switchDisplay(display){
        this.setState({
            display:display
        })
        
    }
    render(){
        let ProfileFields = ''
        if(this.state.display == "Basic"){
            ProfileFields = <BasicProfileFields />
        }
        else if(this.state.display == "Password"){
            ProfileFields = <PasswordChange />
        }
            
        return(
            <div>
                <div className="outerDiv">
                    <h1>Profile</h1>
                    <p>View and edit your information</p>
                    <SideBar switchDisplay = {this.switchDisplay} />
                    {ProfileFields}
                </div>
                
            </div>
        )
    }
}



class SideBar extends Component{
    render(){
        return(
            <div className="sideBar">
                <button onClick = {()=>this.props.switchDisplay("Basic")}>Basic</button>
                <button onClick = {()=>this.props.switchDisplay("Password")}>Password</button>
                <button>Payment</button>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileContainer)
