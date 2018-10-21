import React, { Component } from 'react';
import './../App.css';
import AppBar from 'material-ui/AppBar';
import Jumbotron from "./../Components/Jumbotron"
import CourseSearch from "./../Components/CourseSearch"
import MostPopular from "./../Components/Home/MostPopular"
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {connect} from "react-redux"


const mapStateToProps=(state)=>{
    return {
        baseURL: state.app.baseURL,
        userID: state.user.ID

    }
    this.getAllCourses = this.getAllCourses.bind(this)
}
class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            courses: []
        }
    }
  componentDidMount(){
    this.getAllCourses()
  }
  getAllCourses(){
    let fetchURL = this.props.baseURL + "getAllCourses"
    fetch(fetchURL).then((response)=>{
        response.json().then(result=>{
            console.log(result)
            this.setState({
                courses:result
            })
        })
    })
  }
  render() {
    return (
      <div className="App">
        <Jumbotron />
        <MostPopular courses = {this.state.courses} />
        <SearchClass {...this.props}  />
      </div>
     
    );
  }
}

const BottomButtons = ()=>{
    return(
        <div>
            <LargeButton backgroundColor="#f4989d" text="Build a Course" caption="Start making $$" />
            <LargeButton backgroundColor="#96d0e8" text="Find Syllabus" caption="Save time"/>
        </div>
    )
}

class LargeButton extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        let style = {
            marginTop:"50px",
        }
        let outerStyle = {
            display:"inline-block",
            marginLeft: "30px"
        }
        let paragraphStyle = {
            textAlign:"center",
        }
        return(
            <div style={outerStyle}>
                <RaisedButton style={style} labelColor="white" backgroundColor = {this.props.backgroundColor} label={this.props.text}  />
                <p style={paragraphStyle}>{this.props.caption}</p>
            </div>
            
        )        
    }   
}

class SearchClass extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchInput : "",
            modalOpen: false,
            coursesInClass: []
        }
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.getCourses = this.getCourses.bind(this)

    }

    handleSearchChange(event){
        this.setState({
            searchInput: event.target.value 
        })
    }

    toggleModal(){
        if(!this.state.modalOpen){
            this.getCourses()
        }
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    getCourses(){
        let fetchURL = this.props.baseURL + "getCoursesWithCode/" + this.state.searchInput
        fetch(fetchURL).then((response)=>{
            console.log(response)
            response.json().then((result)=>{
                this.setState({
                    coursesInClass:result
                })
            })

        })
    }

    render(){
        return(

            <div className="SelectClassComponent">
                <p>Have a code from your instructor? Enter it below!</p>
                <input class = "textInput small" onChange={this.handleSearchChange} />
                <RaisedButton label="Search" onClick = {this.toggleModal} />
                <SearchClassModal {...this.props} coursesInClass = {this.state.coursesInClass} modalOpen = {this.state.modalOpen} classCode = {this.state.searchInput} toggleModal = {this.toggleModal}/>
            </div>
        )
    }
}

class SearchClassModal extends Component {
    constructor(props){
        super(props)
        this.state  = {
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }



    handleSubmit(){
        console.log(this.props.classCode)
        let fetchURL = this.props.baseURL + "purchaseCoursesInClass"
        let options = {
            method: "put",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UserID: this.props.userID,
                ClassCode: this.props.classCode
            })
            
        }
        fetch(fetchURL,options).then(response=>{
            this.props.toggleModal()
        })    
    }

    render(){
        let style = {
            color:"white"
        }
        let actions = [
            <FlatButton
                label="Cancel"
                onClick={this.props.toggleModal}
              />,
                <FlatButton
                label="Purchase Course"
                backgroundColor= "#82ca9c"
                hoverColor="#59876a"
                onClick = {this.handleSubmit}
                labelStyle={style}
            />
        ]
        return(
            <div>
            <Dialog
                  title="Purchase Class"
                  actions={actions}
                  modal={false}
                  open={this.props.modalOpen}
                  onRequestClose={this.props.toggleModal}
                >
                <h1>Class code: {this.props.classCode}</h1>
                <p>Enter your payment information below to purchase all the courses needed for your class this sesmester. You're instructor will be notified once you have done so.</p>

                <p>Following are the courses you are about to purchase</p>
                {this.props.coursesInClass.map(course=>{
                    return <li>{course.CourseName}</li>
                })}
                </Dialog>
                {this.props.open}
            </div>
        )
    }
}
export default connect(mapStateToProps)(Home)
