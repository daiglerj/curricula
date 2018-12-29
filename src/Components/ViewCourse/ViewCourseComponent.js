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
		var url_string = window.location.href;
		var url = new URL(url_string);
		let courseID = url.searchParams.get("courseID");
		this.state = {
			courseName: "",
			chapters: [],
			courseID: courseID,
			documentID: -1
		}
		this.getCourseInfo = this.getCourseInfo.bind(this)
		this.getChapters = this.getChapters.bind(this)
		this.changeDocumentID = this.changeDocumentID.bind(this)
	}
	componentDidMount(){
		console.log("Test: " + this.props.courseViewID)
		this.getCourseInfo()
		this.getChapters()
	}

	getCourseInfo(){
		let fetchURL = this.props.baseURL + "getCourseInfo/" + this.state.courseID

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
		let fetchURL = this.props.baseURL + "getChapters/" + this.state.courseID
		fetch(fetchURL).then((response)=>{
			response.json().then(result=>{
				this.setState({
					chapters: result
				})
			})
		})
	}
	changeDocumentID(docID){
		console.log("Hello" + docID)
		this.setState({
			documentID: docID
		})
	}
	render(){
		return(
			<div className = "courseViewBody">
			<div id = "leftNavbar">
					<Header Title={this.state.courseName} />
					<Description Description = {this.state.description} />
							{this.state.chapters.map((c)=>{
								console.log(c)
								return <Chapter changeDocumentID = {this.changeDocumentID} key={c.ID} chapterID = {c.ID} title = {c.ChapterName} {...this.props} />
							})}
			</div>
				<DocumentViewer documentID = {this.state.documentID}  {...this.props} />
			</div>
		)
	}
}

class Header extends Component{
	render(){
		let style = {
			marginBottom: "20px"
		}
		return(
			<div id="header" style = {style}>
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
			<div className = "Section" id="Description">
				<h1>Course Description</h1>
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
		//this.downloadFile = this.downloadFile.bind(this)
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
			let fetchURL = this.props.baseURL + "getChapterContent/" + this.props.chapterID + "/" + this.props.ID
			console.log(fetchURL)
			fetch(fetchURL).then((response)=>{
				response.json().then(result=>{
					this.setState({
						content: result
					})
				})
			})
		}
		/*
	downloadFile(fileID, fileName){
		let fetchURL = this.props.baseURL + "sendFile/" + fileID
		
		fetch(fetchURL).then(response=>{
			return response.blob()
		}).then(blob=>{
			download(blob, fileName)
		})
	}
	*/
	render(){
		let style ={
			display:'inline-block'
		}
		return(

			<div class = "chapter">	
				<div  class = "chapterTitle" onClick = {this.expandToggle} >
					{this.props.title}
				</div>
				<Card expanded = {this.state.expanded}>
				    <CardText expandable={true}>
				      <ul>
						{this.state.content.map(doc=>{
				      		return <li className = "documents" key = {doc.ID} id={doc.ID} onClick = {()=>{this.props.changeDocumentID(doc.ID)}}>{doc.Name}</li>
				      	})}				      
				      </ul>
				    </CardText>
				  </Card>
			</div>

		)
	}
}
class DocumentViewer extends Component {
	constructor(props){
		super(props)
		this.state = {
			documentPath: "test"
		}
		this.getDocumentPath = this.getDocumentPath.bind(this)
	}

	componentWillReceiveProps(props){
		console.log(this.props.documentID)
		this.getDocumentPath(this.props.documentID)
	}
	getDocumentPath(contentID){
		let fetchURL = this.props.baseURL + "getDocumentPath"
		let fetchOptions = {
			method: "POST",
			headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                documentID: this.props.documentID
            })
		}
		fetch(fetchURL,fetchOptions).then(response=>{
			response.json().then(result=>{
				console.log(result)
				if(result[0]){
					console.log("Test")
					this.setState({
						documentPath : result[0].Directory
					})
				}

			})
		})
	}
	render(){

		let outerStyle ={
			display:"inline-block",
			marginLeft:"50px",
			border:"solid",
			marginTop: "50px",

		}
		let style = {
			width:"800px",
			height:"1000px"
		}
		let fullDocumentPath = 'https://view.officeapps.live.com/op/embed.aspx?src=https://s3.amazonaws.com/curricula-docs/' + this.state.documentPath
		return(
				<div style = {outerStyle}>
					<iframe style = {style} src={fullDocumentPath}>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe>
				</div>
		)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewCourseComponent)
