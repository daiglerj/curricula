import React, { Component } from 'react';
import './../App.css';
import AppBar from 'material-ui/AppBar';
import Jumbotron from "./../Components/Jumbotron"
import CourseSearch from "./../Components/CourseSearch"
import MostPopular from "./../Components/Home/MostPopular"
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from "react-redux"


const mapStateToProps=(state)=>{
    return {
        baseURL: state.app.baseURL,

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
export default connect(mapStateToProps)(Home)
