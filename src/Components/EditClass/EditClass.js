import React, {Component} from "react" 
import { connect } from "react-redux"
import './../../CSS/EditClass.css';

const mapStateToProps = (state) => {
  return {
      baseURL: state.app.baseURL,

  } 
}
const mapDispatchToProps = (dispatch)=>{
	return{

	}
}

class EditClass extends Component {
	constructor(props){
		super(props)
		var url_string = window.location.href;
		var url = new URL(url_string);
		let classID = url.searchParams.get("classID");
		this.state = {
			classID: classID,
			classCode: "",
			className: ""
		}

	}
	componentWillMount(){
			let fetchURL = this.props.baseURL + "getClassInfo/" + this.state.classID
				console.log(fetchURL)
				fetch(fetchURL).then(response=>{
					response.json().then(result=>{
						console.log(result)
						this.setState({
							classCode: result[0].Code,
							className: result[0].ClassName
						})
					})
				})
	}
	render(){
		return(
			<div id="EditClass" class="Section MediumMargin" >
				<h1>{this.state.className} - {this.state.classCode}</h1>
				<p>Email the course code above to your students to have them enroll</p>
				<Courses {...this.props} classID = {this.state.classID}/>
			</div>

		)
	}
}

class Courses extends Component {
	constructor(props){
		super(props)
		this.state = {
			courseSearch: "", 
			courseSearchList: [],
			courseList: []
		}
		this.onSearchChange = this.onSearchChange.bind(this)
		this.searchCourses = this.searchCourses.bind(this)
		this.addCourse = this.addCourse.bind(this)
		this.getCourses = this.getCourses.bind(this)
		this.removeCourse = this.removeCourse.bind(this)
	}
	componentWillMount(){
		console.log(this.props.classID)
		this.getCourses()
	}
	onSearchChange(event){
		this.setState({
			courseSearch: event.target.value
		})
		this.searchCourses(event.target.value)
		console.log(this.state.courseSearchList)
	}
	searchCourses(text){
		if(text != ''){
			let fetchURL = this.props.baseURL + "searchCourses/" + text
				console.log(fetchURL)
				fetch(fetchURL).then(response=>{
					response.json().then(result=>{
						console.log(result)
						this.setState({
							courseSearchList:result
						})
					})
				})
		}
		else{
			this.setState({
				courseSearchList:[]
			})
		}

	}

	getCourses(){
		let fetchURL = this.props.baseURL + "getCoursesFromClass/" + this.props.classID
		console.log(fetchURL)
		fetch(fetchURL).then(response => {
			response.json().then(result=>{
				this.setState({
					courseList: result
				})
			})
		})
	}

	addCourse(courseID){
		let fetchURL = this.props.baseURL + "addCourseToClass"
		let fetchOptions = {
            method: "post",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                CourseID: courseID,
                ClassID: this.props.classID 
            })
            
        }
        fetch(fetchURL,fetchOptions).then(()=>{
        	console.log("hello")
        	this.getCourses()
        	this.setState({
        		courseSearchList:[],
        		courseSearch: ""
        	})
        }
        )
        
	}
	removeCourse(courseID){
		console.log("Removing course")
		let fetchURL = this.props.baseURL + "removeCourseFromClass"
		let fetchOptions = {
		            method: "delete",
		            headers: {
		                'Content-Type':'application/json'
		            },
		            body:JSON.stringify({
		                CourseID: courseID,
		                ClassID: this.props.classID //hard coded, change later
		            })
		            
		        }
		fetch(fetchURL,fetchOptions).then(()=>{
			this.getCourses()
		})
	}
	render(){
		return(
			<div >
					<AddCourses addCourse = {this.addCourse} courseSearchList = {this.state.courseSearchList} onSearchChange = {this.onSearchChange} />
					<RemoveCourses courseList = {this.state.courseList} removeCourse = {this.removeCourse} />
			</div>
		)
	}
}

class AddCourses extends Component{
	constructor(props){
		super(props)
	}

	render(){
		let searchStyle ={
			margin: "auto"
		}
		return(
			<div>

					<input type = "text" style = {searchStyle} class = "textInput" placeholder = "Begin typing to add a course you would like students to purchase for this class" onChange = {this.props.onSearchChange} />
					<div class = "searchCourse">
					{this.props.courseSearchList.map(course => {
						return <p  onClick = {()=>{this.props.addCourse(course.ID)}}>{course.CourseName}</p>
					})}
					</div>
			</div>
		)
	}
}
class RemoveCourses extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div>
				{this.props.courseList.map(course =>{
					return <p><span>{course.CourseName}</span><button class="remove" onClick = {()=>{this.props.removeCourse(course.ID)}}>x</button></p>
				})}
			</div>

		)
	}
}

class AddMaterials extends Component {
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div class="Section MediumMargin" >
				<h1>Add Materials</h1>
				<input type = "text" class = "inputText"/>

			</div>
		)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(EditClass)