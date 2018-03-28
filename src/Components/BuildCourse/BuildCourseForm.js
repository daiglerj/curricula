import React, {Component} from 'react' 
import Jumbotron from "./../../Components/Jumbotron"
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from "react-redux"
import {setTitle, setSubtitle, setDescription, setDifficulty, setRequiredMaterials,setPrerequisites } from "./../../Actions/courseEditorActions"

const mapStateToProps=(state)=>{
    
}
const mapDispatchToProps=(dispatch)=>{
    return {
        setTitle: (title)=>dispatch(setTitle(title)),
        setSubtitle: (subTitle)=>dispatch(setSubtitle(subTitle)),
        setDescription: (description)=>dispatch(setDescription(description)),
        setDifficulty: (difficulty)=>dispatch(setDifficulty(difficulty)),
        setRequiredMaterials: (requiredMaterials)=>dispatch(setRequiredMaterials(requiredMaterials)),
        setPrerequisites: (prerequisites)=>dispatch(setPrerequisites(prerequisites))        
    }  
}
class BuildCourseForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            Title: "",
            Subtitle: "",
            Description: "",
            Difficulty: "Novice",
            RequiredMaterials: "",
            Prerequisites: ""
        }
        
        this.handleTitle = this.handleTitle.bind(this)
        this.handleSubtitle = this.handleSubtitle.bind(this)
        this.handleDescription = this.handleDescription.bind(this)
        this.handleRequiredMaterials = this.handleRequiredMaterials.bind(this)
        this.handleRecommendedPrerequisites = this.handleRecommendedPrerequisites.bind(this)
        
        this.onSubmit = this.onSubmit.bind(this)

    }
    handleTitle(event){
     this.setState({
         Title: event.target.value
     })
    }
    
    handleSubtitle(event){
        this.setState({
            Subtitle: event.target.value, 
        })
    }  
    
    handleDescription(event){
        this.setState({
            Description: event.target.value, 
        })
    }
    
    handleRequiredMaterials(event){
        this.setState({
            RequiredMaterials: event.target.value, 
        })
    }
    
    handleRecommendedPrerequisites(event){
        this.setState({
            Prerequisites: event.target.value
        })
    }
    
    onSubmit(){
        console.log("Title: " + this.state.Title)
        //Set State
        this.props.setTitle(this.state.Title)
        this.props.setSubtitle(this.state.Subtitle)
        this.props.setDescription(this.state.Description)
        this.props.setDifficulty(this.state.Difficulty)
        this.props.setRequiredMaterials(this.state.RequiredMaterials)
        this.props.setPrerequisites(this.state.Prerequisites)
    }
    render(){
        var formStyle = {
            marginTop: "50px",
            //border:"solid",
            textAlign:"left",
            paddingLeft: "300px",
            marginBottom: "100px"
        }
        
        var ButtonStyle = {
            marginTop: "30px",
            display: "inline-block",
            textAlign:"center"
            
        }


        return(
            <div>
                <Jumbotron />
                <Instructions />
                <form className="BuildCourseForm" style={formStyle}>        
                    <TextInput label="Title" placeholder="Name your course" inputChange = {this.handleTitle} />
                    <TextInput label="Subtitle" placeholder="Add some flare" inputChange = {this.handleSubtitle}/>
                    <TextInput label="Description" placeholder="Just add more detail" LargeField inputChange = {this.handleDescription}/>
                    <DifficultyInput />
                    <TextInput label="Required Materials" placeholder="e.g. Microsoft Word, Adobe Photoshop, MySQL, etc." inputChange = {this.handleRequiredMaterials} />
                    <TextInput label="Recommended Prerequisites" placeholder="e.g. Introductory Biology, Calculus A, Algebra 101" inputChange = {this.handleRecommendedPrerequisites} />
                    <RaisedButton label="Next" backgroundColor="#82ca9c" labelColor="white" style={ButtonStyle} onClick ={this.onSubmit} />
                    
                </form>
            </div>
        )
    }
}

class TextInput extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        var style={
            marginTop: "20px"
        }

        let field = null
        if (!this.props.LargeField){
            field = <input className="textInput" onChange = {this.props.inputChange} placeholder={this.props.placeholder} />
        }
        else{
            field = <textarea  className="textInput" onChange = {this.props.inputChange} placeholder={this.props.placeholder} />
        }
        return(
            <div>
                <label style={style}>{this.props.label}</label>
                {field}
            </div>
        )
    }
}

class DifficultyInput extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let above = {
            display:"block",
            marginLeft:"0px",
            marginTop: "20px"
    }
    
     
        return(
            <div className="RadioInput">
            
                <label style={above}>Level of Difficulty(Select One)</label>
                
                <input type="radio" id="contactChoice2"
                 name="contact" value="phone" />
                <label>Novice</label>
        
                <input type="radio" id="contactChoice2"
                 name="contact" value="phone" />
                <label>Intermediate</label>
                
                <input type="radio" id="contactChoice3"
                 name="contact" value="mail" />
                <label>Advanced</label>
                
                <input type="radio" id="contactChoice3"
                 name="contact" value="mail" />
                <label for="contactChoice3">All Levels</label>
                
            </div>
        )
    }
}

const Instructions = ()=>{
    return(
        <p className="Instructions">Let's get things started. This "Overview" section is what your students and instructors will see first. Create an intriguing title and a description to explain what the course covers. Then, let the world know why this course is for them, what will be learned, and what is needed to get there. </p> 
    )
    
}

export default connect(mapStateToProps,mapDispatchToProps)(BuildCourseForm)