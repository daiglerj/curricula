import React, {Component} from "react"
import {Chapter} from './Chapter'
import Instructions from "./../../Instructions"
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
//import download from 'downloadjs'
import "./../../../App.css"
				

export default class Curriculum extends Component{
	constructor(props){ 
		super(props)
		this.state = {
			addDocumentModalOpen:false,
			chapterFocus: -1,
		}
		this.addDocumentModalOpen = this.openAddDocumentModal.bind(this)
		this.closeAddDocumentModal = this.closeAddDocumentModal.bind(this)
		this.changeChapterFocus = this.changeChapterFocus.bind(this)
	}
	componentDidMount(){
		let fetchURL = this.props.baseURL + "sendFile/1"
		/*
		fetch(fetchURL).then(response=>{
			return response.blob()
		}).then(blob=>{
			download(blob, "myFile")
		})

		*/
	}

	openAddDocumentModal(){
		this.setState({
			addDocumentModalOpen:true
		})
	}
	closeAddDocumentModal(){
		this.setState({
			addDocumentModalOpen:false
		})
	}

	changeChapterFocus(id){
		this.setState({
			chapterFocus:id
		})
		console.log("Hello: " + this.state.chapterFocus)
	}


	render(){
		const statement = "The Curriculum section is the bread and butter of your course. Provide the materials that would generally be expected in a textbook. Create a tool to be used inside and outside the classroom for students to learn, instructors to teach, and moany to expand their knowledge."

		return(
			<div className="Section">
				<Instructions statement = {statement} />
				{this.props.Chapters.map((c)=>{
					console.log(c)
					return <Chapter key={c.ID} chapterID = {c.ID} title = {c.ChapterName} {...this.props} changeChapterFocus = {this.changeChapterFocus} addDocumentModalOpen = {this.addDocumentModalOpen} getChapterContent = {this.getChapterContent}/>
				})}
				
				<br />
				<AddSectionButton {...this.props} baseURL = {this.props.baseURL} />
			</div>
		)
	}
}

class AddSectionButton extends Component{
	constructor(props){
		super(props)
		this.state = {
			open:false,
		}
		this.handleClose = this.handleClose.bind(this)
		this.handleOpen = this.handleOpen.bind(this)
		this.handleChapterInput = this.handleChapterInput.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleChapterInput(event){
		this.setState({
			chapterInput: event.target.value
		})
	}
	handleOpen(){
		this.setState({
			open:true
		})
	}
	handleClose(){
		this.setState({
			open:false
		})
	}
	handleSubmit(){
		let fetchURL = this.props.baseURL + "addChapter"
		console.log(fetchURL)
		let fetchOptions = {
			method: "post",
			headers: {
                'Content-Type':'application/json'
            },
			body: JSON.stringify({
				Title: this.state.chapterInput,
				CourseID: this.props.CourseID
			})
		}
		fetch(fetchURL,fetchOptions).then(()=>{
			this.props.getChapters()
		})
		this.handleClose()
	}
	render(){
		let buttonStyle = {
			marginRight: "10px"
		}
		const actions = [
		      <RaisedButton
		        label="Cancel"
		        onClick={this.handleClose}
		        backgroundColor="lightgrey"
		        labelColor = "white"
		        style = {buttonStyle}
		      />,

		      <RaisedButton
		        label="Submit"
		        backgroundColor = "#82ca9c"
		        onClick={this.handleSubmit}
		        labelColor="white"


		      />,
		    ];
		return(
			<div>
				<RaisedButton label="Add Section" onClick = {this.handleOpen}labelColor="white" backgroundColor="#82ca9c"/>
				<Dialog
		          title="Create a new Chapter"
		          actions={actions}
		          open={this.state.open}
		          modal={false}
		          onRequestClose={this.handleClose}

		        >
		          <form>
		          	<input className="textInput" placeholder="Name your chapter" onChange = {this.handleChapterInput}/>

		          </form>
		        </Dialog>

			</div>
		)
	}
}



