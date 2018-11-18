import React, {Component} from 'react'
import { connect } from "react-redux"
import { setCourseViewID } from "./../../Actions/courseViewActions"
import { setCourseID } from "./../../Actions/courseEditorActions"
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import {Link} from 'react-router-dom'


const mapStateToProps = (state) => {
  return {
      username: state.user.username,
      baseURL: state.app.baseURL,
      ID: state.user.ID,
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
						return <a href = {"/ViewCourse/?courseID=" + course.CourseID}><Card key = {course.CourseID} title = {course.CourseName} name = {course.author} onClick={()=>this.props.setCourseViewID(course.CourseID)} /></a>
					})}
				</div>
				<AuthoredCourses setCourseEditID={this.props.setCourseEditID} {...this.props}/>
				<MyClasses {...this.props}/>
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
		let body = ""
		if(this.state.AuthoredCourses.length == 0){
			body = "You haven't written any courses"
		}

		return(
			<div class = "Section" style = {style}>
				<h1>Courses I Wrote</h1>
				<p>{body}</p>
				{this.state.AuthoredCourses.map(course=>{
					return <a href="/EditCourse"><span onClick={()=>this.props.setCourseEditID(course.ID)}> <Card key = {course.CourseID} title = {course.CourseName} name = {course.author}  /></span></a>
				})}
			</div>
		)
	}
}

class MyClasses extends Component{
	constructor(props){
		super(props)
		this.state = {
			Classes: [],
			getLinkModalOpen:false,

		}
		this.handleGetLinkModal = this.handleGetLinkModal.bind(this)
		this.getClasses = this.getClasses.bind(this)
	}
	componentWillMount(){
		if(this.props.ID!=undefined){
			console.log(this.state)
			this.getClasses()
			console.log(this.state)
		}
		else{
			window.location = 'http://localhost:3000/';

		}		
	}
	componentDidMount(){
		console.log(this.state)
	}
    handleGetLinkModal(){
    	this.setState({
    		getLinkModalOpen:!this.state.getLinkModalOpen
    	})
    } 

    getClasses(){
    	console.log("here")
    	let fetchURL = this.props.baseURL + "getClassesByInstructor/" + this.props.ID
    	fetch(fetchURL).then(response=>{
    		response.json().then(result=>{
    			this.setState({
    				Classes:result
    			},()=>{
    				console.log(this.state)
    			})
    		})
    	})
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
		if(this.state.Classes.length == 0){
			body = "Create a class organize all the textbooks you want your students to purchase in one place. From there, share a code with your students to see who's purchased the materials. Click below to get started!"
		}


		return(
			<div class = "Section" style = {style}>
				<h1>My Classes</h1>
				<p>{body}</p>
				{this.state.Classes.map(className=>{
					let newLink = "/editclass/?classID=" + className.ID
					console.log(newLink)
					return <a href = {newLink}><Card title = {className.ClassName} /></a>
				})}
				<InviteStudents {...this.props} open ={this.state.getLinkModalOpen} handleGetLinkModal = {this.handleGetLinkModal} />
			</div>
		)
	}
}
class InviteStudents extends Component{
    componentDidMount(){
    }
    render(){
    	let style = {
    		marginTop:"70px"
    	}
        return(
            <div style = {style}>
                <RaisedButton label="Get a Class Code" backgroundColor="#82ca9c" labelColor="white" onClick = {this.props.handleGetLinkModal}/>
            	<GetLinkModal {...this.props} open = {this.props.open} />
            </div>
        )
    }
}

class GetLinkModal extends Component {
	constructor(props){
		super(props)
		this.state = {
			className: ""
		}
		this.handleClassName = this.handleClassName.bind(this)
		this.getClassCode = this.getClassCode.bind(this)

	}
	handleClassName(event){
		this.setState({
			className: event.target.value
		})
	}
	getClassCode(){
		console.log(this.props.ID)
		console.log(this.state.className)
		let fetchURL = this.props.baseURL + "createClassCode"
        let fetchOptions = {
            method: "put",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                InstructorID: this.props.ID,
                ClassName: this.state.className
            })
            
        }
        fetch(fetchURL,fetchOptions)
        this.props.handleGetLinkModal()

	}
	render(){
		const actions = [

		]
		return(
			<div>
			<Dialog
	          title="Get a Shareable Code"
	          modal = {false}
	          actions={actions}
	          open={this.props.open}
	          onRequestClose={this.props.handleGetLinkModal}

	        >
	        <p>By using a shareable code, you can see which students purchased the course and track their progress</p>
	        <p>You can view the students that have used the code in your settings</p>
	        <label>Class Name</label>
	        <input type = "text" onChange = {this.handleClassName} /><br />

	        <p>ex) Algebra I Fall 2018 </p>
	        <RaisedButton label="Get Code" onClick = {this.getClassCode}/>
		    </Dialog>
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
           <div style={style} >
                <h1 style={titleStyle}>{this.props.title}</h1>
                <p style = {paragraphStyle}>{this.props.name}</p>

           </div>
        )

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyCoursesComponent)