import React, {Component} from 'react'
import { connect } from "react-redux"
import { setCourseViewID } from "./../../Actions/courseViewActions"
import { setCourseID } from "./../../Actions/courseEditorActions"

import {Link} from 'react-router-dom'


const mapStateToProps = (state) => {
  return {
      username: state.user.username,
      baseURL: state.app.baseURL,
      ID: state.user.ID

  } 
}
const mapDispatchToProps = (dispatch)=>{
	return{
		setCourseViewID: (id)=>dispatch(setCourseViewID(id)),
		setCourseEditID: (id)=>dispatch(setCourseID(id))
	}
}


class MyCoursesComponent extends Component{
	constructor(props){
		super(props)
		this.state = {
			purchasedCourses: []
		}
	}
	componentWillMount(){
		if(this.props.ID!=undefined){
			let fetchURL = this.props.baseURL + "getOwnedCourses/" + this.props.ID
			console.log(fetchURL)
			fetch(fetchURL).then(response=>{
				response.json().then(result=>{
					console.log(result)
					this.setState({
						purchasedCourses:result
					})
				})
			})
		}
		else{
			window.location = 'http://localhost:3000/';

		}
	}
	render(){
		let style = {
			padding: "30px",
			textAlign: "left",
			margin:"auto",
			marginTop: "70px",
			width: "70%"
		}
			let body = ""
			if(this.state.purchasedCourses.length ==0){
				body = "You haven't purchased any courses"
			}
		return(
			<div>
				<div class = "Section" style = {style}>
					<h1 >My Courses</h1>
					<p>{body}</p>
					{this.state.purchasedCourses.map(course=>{
						return <a href = "/ViewCourse" ><Card key = {course.CourseID} title = {course.CourseName} name = {course.author} onClick={()=>this.props.setCourseViewID(course.CourseID)} /></a>
					})}
				</div>
					<AuthoredCourses setCourseEditID={this.props.setCourseEditID} {...this.props}/>
			</div>
		)
	}
}

class AuthoredCourses extends Component{
	constructor(props){
		super(props)
		this.state = {
			AuthoredCourses: []
		}
	}
	componentWillMount(){
		if(this.props.ID!=undefined){
			let fetchURL = this.props.baseURL + "getCoursesWritten/" + this.props.ID
			console.log(fetchURL)
			fetch(fetchURL).then(response=>{
				response.json().then(result=>{
					console.log(result)
					this.setState({
						AuthoredCourses:result
					})
				})
			})
		}
		else{
			window.location = 'http://localhost:3000/';

		}		
	}

	render(){
		let style = {
			padding: "30px",
			textAlign: "left",
			margin:"auto",
			marginTop: "70px",
			width: "70%"
		}
		return(
			<div class = "Section" style = {style}>
				<h1>Courses I Wrote</h1>
				{this.state.AuthoredCourses.map(course=>{
					console.log(course)
					return <a href="/EditCourse"><span onClick={()=>this.props.setCourseEditID(course.ID)}> <Card key = {course.CourseID} title = {course.CourseName} name = {course.author}  /></span></a>
				})}
			</div>
		)
	}
}
class Card extends Component {
    render(){
        let style = {
            width: "200px",
            height: "200px",
            marginLeft: "20px",
            border: "solid 1px #c7c7c7",
            borderTop: "solid 12px #82ca9c",
            borderRadius: "9px",
            cursor:"pointer",
            display:"inline-block",
            textAlign:"Left",
            verticalAlign:"middle",
            position:"relative",
            padding:"10px",
            marginTop:"20px",
            background:"white"
            
        }
        let titleStyle = {
            fontSize: "20px",
            color:"#52575b",
            textAlign:"Left",
            marginLeft: "10px"
        }
        let paragraphStyle = {
            textAlign: "left",
            fontSize: "14px",
            color: "#8a949e",
            marginLeft: "20px",
            marginTop:"5px",
            paddingBottom: "10px",
            borderBottom: "solid 1px",
            width: "150px",
            position:"absolute",
            bottom: "100px"

        }


        return(
           <div style={style}>
                <h1 style={titleStyle}>{this.props.title}</h1>
                <p style = {paragraphStyle}>{this.props.name}</p>

           </div>
        )

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyCoursesComponent)