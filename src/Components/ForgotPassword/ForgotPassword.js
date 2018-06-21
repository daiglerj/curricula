import React, {Component} from "react"
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from "react-redux"

const mapStateToProps=(state)=>{
    return {
        baseURL: state.app.baseURL,
        ID: state.user.ID,

    }

}
export class CourseHeader extends Component{
	constructor(props){
		super(props)
		this.state = {
			username: ""
		}
		this.handleUsernameChange = this.handleUsernameChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleUsernameChange(event){
		this.setState({
			username:event.target.value,
			message: ""
		})
	}
	handleSubmit(event){
		let fetchURL = this.props.baseURL + "resetPassword/" + this.state.username
		fetch(fetchURL).then(response=>{
			response.json().then(result=>{
				this.setState({
					message: result.message
				})
			})
		})

	}

	render(){
		let cardStyle = {
			width:"80%",
			margin:"auto",
			marginTop:"30px"
		}
		let buttonStyle = {
			margin:"20px"
		}
		return(
			<div className="Section" style = {cardStyle}>
				<p>Enter your username below to reset your password</p>
				<p>{this.state.message}</p>
				<input class = "textInput small" type = "text" placeholder="Enter your username" onChange = {this.handleUsernameChange} /><br />
				<RaisedButton labelColor="white" backgroundColor="#82ca9c" style = {buttonStyle} label="Reset Password" onClick = {this.handleSubmit}/>
			</div>
		)
	}
}

export default connect(mapStateToProps)(CourseHeader)