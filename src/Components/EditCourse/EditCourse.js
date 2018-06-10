import React, {Component} from "react"
import {CourseHeader} from "./CourseHeader"
import Overview from "./EditCourseBody/Overview"
import Curriculum from "./EditCourseBody/Curriculum"
import Detail from "./EditCourseBody/Detail"

import "./../../App.css"
import { connect } from "react-redux"


const mapStateToProps=(state)=>{
    return {
        baseURL: state.app.baseURL,
        ID: state.user.ID,
        CourseID: state.courseEditor.courseID,
        Title: state.courseEditor.title,
        Subtitle:state.courseEditor.subTitle,
        Description: state.courseEditor.description,
        Prerequisites:state.courseEditor.prerequisites
    }

}
const mapDispatchToProps=(dispatch)=>{
    return {
       
    }  
}
class EditCourse extends Component{
	constructor(props){
		super(props)
		this.state = {
			active:"Overview",
			courseID:this.props.CourseID,
			Chapters: [],
			author: "",
			courseName: ""
		}
		this.changeActive = this.changeActive.bind(this)
		this.getChapters = this.getChapters.bind(this)
	}
	componentDidMount(){
		let fetchURL = this.props.baseURL + "getCourseInfo/" + this.state.courseID
		console.log(fetchURL)
		fetch(fetchURL).then(response=>{
			response.json().then(result=>{
				console.log(result)
				this.setState({
					author: result[0].FirstName + " " + result[0].LastName,
					courseName: result[0].CourseName,
					description: result[0].Description,
					subtitle: result[0].Subtitle,
					price: result[0].Price

				})
			})
		})
		this.getChapters()
	}

	getChapters(){
		let fetchURL = this.props.baseURL + "getChapters/" + this.state.courseID
		console.log(fetchURL)
		fetch(fetchURL).then((response)=>{
			response.json().then(result=>{
				this.setState({
					Chapters: result
				})
				console.log(result)
			})
		})
	}
	changeActive(active){
		this.setState({
			active:active
		})
	}
	render(){
		var body = null
		if(this.state.active == "Overview"){
			body = <Overview {...this.props} 
						Title = {this.state.courseName}
						Subtitle = {this.state.subtitle}
						Description = {this.state.description}
						/>
		}
		else if(this.state.active == "Curriculum"){
			body = <Curriculum {...this.props}  getChapters = {this.getChapters}  Chapters = {this.state.Chapters} CourseID = {this.props.CourseID} />
		}
		else{
			body = <Detail {...this.props} price={this.state.price} />
		}
		let style ={
			padding:"50px",
		}
		return(
			<div> 
				<CourseHeader courseTitle = {this.state.courseName} author = {this.state.author} {...this.props} changeActive={this.changeActive} Description = {this.description} active={this.state.active}/>
				<div style = {style}>
					{body}
				</div>

			</div>
		)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(EditCourse)