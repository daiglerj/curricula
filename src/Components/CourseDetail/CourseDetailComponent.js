import React, {Component} from "react"
import CourseDescription from "./CourseDescription"
import CourseTitle from "./CourseTitle"
import Purchase from "./Purchase"
import { connect } from "react-redux"
import {Elements} from 'react-stripe-elements';
import {StripeProvider} from 'react-stripe-elements';
import {injectStripe} from 'react-stripe-elements';
import InjectedForm from './injectedForm'
import {CardElement} from 'react-stripe-elements';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import './../../CSS/CourseDetail.css';

const mapStateToProps=(state)=>{
    return {
        baseURL: state.app.baseURL,
        ID: state.user.ID,
        coursePurchaseID: state.courseView.coursePurchaseID,

    }
}

class CourseDetail extends Component{
	constructor(props){
		super(props)
		this.state = {
			courseName: "",
			description: "",
			author: "",
			paymentModalOpen: false,
			materials: []
		}
		this.getCourseInfo = this.getCourseInfo.bind(this)
		this.handlePaymentModal = this.handlePaymentModal.bind(this)
	}
	componentDidMount(){
    	this.getCourseInfo()
    }
    handlePaymentModal(){
    	this.setState({
    		paymentModalOpen: !this.state.paymentModalOpen
    	})
    }
    handlePaymentModalClose(){
    	console.log("test")
    	this.setState({
    		paymentModalOpen: false
    	})
    }
    getCourseInfo(){
		let fetchURL = this.props.baseURL + "getCourseInfo/" + this.props.coursePurchaseID

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
    render(){

        return(
            <div>
                <CourseTitle Title = {this.state.courseName} />

                <Purchase handlePaymentModal = {this.handlePaymentModal} />

                <Overview />
                <CourseDescription Description={this.state.description} />
                <StoreCheckoutModal {...this.props} handlePaymentModal = {this.handlePaymentModal} open = {this.state.paymentModalOpen}/>

                <CourseMaterials {...this.props} />
            </div>
        )
    }
}


class StoreCheckoutModal extends Component{
		render(){
		const actions = [


		    ];
		return(
			<div>
				<Dialog
			          title="Purchase Course"
			          actions={actions}
			          open={this.props.open}
			          onRequestClose={this.props.handlePaymentModal}

			        >
			    	<MyStoreCheckout {...this.props} />
		        </Dialog>
			</div>
		)
	}
}

class MyStoreCheckout extends React.Component {
  render() {
    return (
    <StripeProvider apiKey="pk_test_oY3lWa6MVn7Y9dpeVyNfsKn5">
		  <Elements>
		  	<InjectedForm {...this.props}/>
		  </Elements>
      </StripeProvider>
    );
  }
}

class CourseMaterials extends Component{
	constructor(props){
		super(props)
		this.state = {
			materials: []
		}
		this.getChatpers = this.getChapters.bind(this)
	}

	componentWillMount(){
		this.getChapters()
	}
	getChapters(){
		let fetchURL = this.props.baseURL + "getChapters/" + this.props.coursePurchaseID
		fetch(fetchURL).then((response)=>{
			response.json().then(result=>{
				this.setState({
					materials: result
				})
			})
		})
	}
	render(){
		return(
			<div class='Section CourseDescriptionOuter'>
                <h1>Course Curriculum</h1>
                <hr />
                {this.state.materials.map(c=>{
                	console.log(c)
                	return <Chapter title = "test" chapterID={c.ID} baseURL={this.props.baseURL} />
                })}

			</div>
		)
	}
}
class Chapter extends Component{
	
	constructor(props){
		super(props)
		this.state={
			expanded:false,
			content: []

		}
		this.handleExpand = this.handleExpand.bind(this)
		this.getChapterContent = this.getChapterContent.bind(this)
	}
	componentWillReceiveProps(){
		console.log(this.props.chapterID)
		this.getChapterContent()
	}
	
	getChapterContent(){
			let fetchURL = this.props.baseURL + "getChapterContent/" + this.props.chapterID
			console.log(fetchURL)
			fetch(fetchURL).then((response)=>{
				response.json().then(result=>{
					console.log(result)
					this.setState({
						content: result
					})
				})
			})
		}


	handleExpand(){
		this.setState({
			expanded: !this.state.expanded
		})
	}
	render(){
		let expandStyle = {
			border:"none",
			boxShadow:"none",
			backgroundColor:"white",
			padding:"0px",
			margin:"0px"

		}
		let style = {
			
			color:"grey",
			border:"solid #bcbfc4 1px",
			cursor: "pointer",
			marginBottom: "0px"
		}

		let listStyle = {
			color:"#52575b",
			border: "solid #bcbfc4 1px",
			padding: "5px",
			fontSize:"16px"
		}
		let textColor = {
			color: "#52575b",
			fontSize: "18px"
		}
		let iconStyle = {
			cursor:"pointer",

		}
		return(
			<div>
				<div className="Box" style={style}>
					<span style = {textColor}>{this.props.title}</span>
					<i class="material-icons" style = {iconStyle} onClick={this.handleExpand}>reorder</i>
				</div>
				  <Card expanded = {this.state.expanded} style={expandStyle}>
				    <CardText expandable={true}>
				      <ul className="Materials" style={expandStyle}>
				      	{this.state.content.map(doc=>{
				      		console.log(doc)
				      		return <li style={listStyle} key = {doc.ID} id={doc.ID}>{doc.Name}</li>
				      	})}
				      	
				      </ul>
				    </CardText>
				  </Card>

			


			       
			</div> 
		)
	}
}

class Overview extends Component{
	render(){
		let style = {
			textAlign: "left"
		}
		return(
			<div class = "Section CourseOverview" >
				<h1>Overview</h1>
				<hr />
				<p>Price: Free</p>
				<p>Chapters: 10</p>
			</div>
		)
	}
}
		
export default connect(mapStateToProps)(CourseDetail)