import React, {Component} from "react"
import "./../../../CSS/EditCourse.css"
import "./../../../App.css"

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover/Popover';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import download from 'downloadjs'


export class Chapter extends Component {
	constructor(props){
		super(props)
		this.state={
			open:false,
			expanded:false,
			deletePromptOpen: false,
			content: []

		}
		this.handleAddClick = this.handleAddClick.bind(this)
		this.handleRequestClose = this.handleRequestClose.bind(this)
		this.handleExpand = this.handleExpand.bind(this)
		this.handleDeletePrompt = this.handleDeletePrompt.bind(this)
		this.handleDeletePromptClose = this.handleDeletePromptClose.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.getChapterContent = this.getChapterContent.bind(this)
		this.downloadFile = this.downloadFile.bind(this)
	}
	componentWillMount(){
		this.getChapterContent()
	}
	downloadFile(fileID, fileName){
		let fetchURL = this.props.baseURL + "sendFile/" + fileID
		
		fetch(fetchURL).then(response=>{
			return response.blob()
		}).then(blob=>{
			download(blob, fileName)
		})
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
	
	handleAddClick(event){
		   event.preventDefault();

		    this.setState({
		      open: true,
		      anchorEl: event.currentTarget,
		    });
		    this.props.changeChapterFocus(this.props.chapterID)
	}
	  handleRequestClose = () => {
	    this.setState({
		      open: false,
		    });
		};

	handleExpand(){
		this.setState({
			expanded: !this.state.expanded
		})
	}
	handleDeletePrompt(){
		this.setState({
			deletePromptOpen:true
		})
	}
	handleDeletePromptClose(){
		this.setState({
			deletePromptOpen:false
		})
	}
	handleDelete(){
		let fetchURL = this.props.baseURL + "deleteChapter"
		console.log(fetchURL)
		let fetchOptions = {
			method: "delete",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ChapterID : this.props.chapterID
            })
		}
		fetch(fetchURL,fetchOptions).then(()=>{
			this.props.getChapters()
		})
		this.handleDeletePromptClose()

	}

	render(){
		let expandStyle = {
			border:"none",
			boxShadow:"white",

		}
		let buttonStyle = {
			marginRight: "10px"
		}
		const deleteActions = [
		      <RaisedButton
		        label="Cancel"
		        onClick={this.handleDeletePromptClose}
		        backgroundColor="lightgrey"
		        labelColor = "white"
		        style = {buttonStyle}
		      />,

		      <RaisedButton
		        label="Submit"
		        backgroundColor = "#82ca9c"
		        onClick={this.handleDelete}
		        labelColor="white"


		      />,
		     ]
		return(
			<div className = "Chapter">
				<div className="Box">
					<span>{this.props.title}</span>
					<i class="material-icons" onClick={this.handleExpand}>reorder</i>

				  <Card expanded = {this.state.expanded} style={expandStyle}>
				    <CardText expandable={true}>
				      <ul className="Materials">
				      	{this.state.content.map(doc=>{
				      		return <li key = {doc.ID} id={doc.ID} onClick = {()=>this.downloadFile(doc.ID,doc.Name)}>{doc.Name}</li>
				      	})}
				      	
				      </ul>


				    </CardText>
				  </Card>
				</div>
			
			    <button className="addMaterial" onClick={this.handleAddClick}>
			    	<span>+</span>
			    </button>
			    <i class="material-icons" onClick={this.handleDeletePrompt}>delete</i>
			        <Popover
			          open={this.state.open}
			          anchorEl={this.state.anchorEl}
			          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
			          targetOrigin={{horizontal: 'left', vertical: 'top'}}
			          onRequestClose={this.handleRequestClose}

			        >
			          <Menu>
			            <MenuItem primaryText="Add a Document" onClick={this.props.addDocumentModalOpen} />
			            <MenuItem primaryText="Add a Homework" />
			            <MenuItem primaryText="Add a Quiz" />
			            <MenuItem primaryText="Add an Exam" />
			          </Menu>
			        </Popover> 

			       <Dialog
				          title="Are you sure you want to delete this chapter?"
				          actions={deleteActions}
				          open={this.state.deletePromptOpen}
				          modal={false}
				          onRequestClose={this.handleDeletePromptClose}
				    >
		         This action can not be undone!
		        </Dialog>       
			</div> 
		)
	}
}




export default Chapter