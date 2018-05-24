import React, {Component} from 'react'
import { connect } from "react-redux"
import { setCourseID } from "./../../Actions/courseEditorActions"
import "./../../CSS/ViewCourse.css"
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { setCourseViewID } from "./../../Actions/courseViewActions"
import download from 'downloadjs'

const mapStateToProps=(state)=>{
    return {
        baseURL: state.app.baseURL,
        ID: state.user.ID,
        courseViewID: state.courseView.courseViewID
    }
}
const mapDispatchToProps = (dispatch)=>{
	setCourseViewID: (id)=>dispatch(setCourseViewID(id))

}
class ViewCourseComponent extends Component {
	constructor(props){
		super(props)
		this.state = {
			courseName: "",
			chapters: []
		}
		this.getCourseInfo = this.getCourseInfo.bind(this)
		this.getChapters = this.getChapters.bind(this)
	}
	componentDidMount(){
		console.log("Test: " + this.props.courseViewID)
		this.getCourseInfo()
		this.getChapters()
	}

	getCourseInfo(){
		let fetchURL = this.props.baseURL + "getCourseInfo/" + this.props.courseViewID

		fetch(fetchURL).then(response=>{
			response.json().then(result=>{
				console.log(result)
				this.setState({
					author: result[0].FirstName + " " + result[0].LastName,
					courseName: result[0].CourseName,
					description: result[0].Description,

				})
			})
		})
	}

	getChapters(){
		let fetchURL = this.props.baseURL + "getChapters/" + this.props.courseViewID
		fetch(fetchURL).then((response)=>{
			response.json().then(result=>{
				this.setState({
					chapters: result
				})
			})
		})
	}
	render(){
		return(
			<div className = "courseViewBody">
				<Header Title={this.state.courseName} />
				<Description Description = {this.state.description} />

				{this.state.chapters.map((c)=>{
					console.log(c)
					return <Chapter key={c.ID} chapterID = {c.ID} title = {c.ChapterName} {...this.props} />
				})}

			</div>
		)
	}
}

class Header extends Component{
	render(){
		return(
			<div id="header">
				<div className="box"></div>
				<div>
					<h1>{this.props.Title}</h1>
					<div className = "underline"></div>
				</div>
			</div>
		)

	}
}

class Description extends Component{
	render(){
		return(
			<div id="Description">
				<h1>Course Description</h1>
				<div className="line"></div>
				<p>{this.props.Description}</p>

			</div>
		)
	}
}

class Chapter extends Component{
	constructor(props){
		super(props)
		this.state = {
			expanded: false,
			content: []
		}
		this.expandToggle = this.expandToggle.bind(this)
		this.getChapterContent = this.getChapterContent.bind(this)
		this.downloadFile = this.downloadFile.bind(this)
	}
	expandToggle(){
		this.setState({
			expanded: !this.state.expanded,

		})
	}
	componentDidMount(){
		this.getChapterContent()
	}
	getChapterContent(){
			let fetchURL = this.props.baseURL + "getChapterContent/" + this.props.chapterID
			console.log(fetchURL)
			fetch(fetchURL).then((response)=>{
				response.json().then(result=>{
					this.setState({
						content: result
					})
					console.log(this.state.content)
				})
			})
		}
	downloadFile(fileID, fileName){
		let fetchURL = this.props.baseURL + "sendFile/" + fileID
		
		fetch(fetchURL).then(response=>{
			return response.blob()
		}).then(blob=>{
			download(blob, fileName)
		})
	}
	
	render(){
		return(
			<div class = "chapter">	
				<div class = "chapterTitle" onClick = {this.expandToggle} >
					{this.props.title}
				</div>
				<Card expanded = {this.state.expanded}>
				    <CardText expandable={true}>
				      <ul>
						{this.state.content.map(doc=>{
				      		return <li className = "documents" key = {doc.ID} id={doc.ID} onClick = {()=>this.downloadFile(doc.ID,doc.Name)}>{doc.Name}</li>
				      	})}				      
				      </ul>
				    </CardText>
				  </Card>
			</div>

		)
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(ViewCourseComponent)
