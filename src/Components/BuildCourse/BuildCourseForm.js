import React, {Component} from 'react' 
import Jumbotron from "./../../Components/Jumbotron";
import {Link} from 'react-router-dom'

import RaisedButton from 'material-ui/RaisedButton';
import { connect } from "react-redux"
import {setTitle, setSubtitle, setDescription, setDifficulty, setRequiredMaterials,setPrerequisites, setCourseID, setPrice } from "./../../Actions/courseEditorActions"

const mapStateToProps=(state)=>{
    return {
        baseURL: state.app.baseURL,
        ID: state.user.ID,

    }

}
const mapDispatchToProps=(dispatch)=>{
    return {
        setTitle: (title)=>dispatch(setTitle(title)),
        setSubtitle: (subTitle)=>dispatch(setSubtitle(subTitle)),
        setDescription: (description)=>dispatch(setDescription(description)),
        setDifficulty: (difficulty)=>dispatch(setDifficulty(difficulty)),
        setRequiredMaterials: (requiredMaterials)=>dispatch(setRequiredMaterials(requiredMaterials)),
        setPrerequisites: (prerequisites)=>dispatch(setPrerequisites(prerequisites)),   
        setCourseID: (id)=>dispatch(setCourseID(id)),
    }  
}

class BuildCourse extends Component{
    
    render(){
        return(
            <div>
            <Jumbotron />
            <div className = "Section BuildCourse">
                <Instructions />
                <BuildCourseForm {...this.props} />
            </div>
            </div>
        )
    }
}
export class BuildCourseForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            Title: this.props.Title || "",
            Subtitle: this.props.Subtitle || "",
            Description: this.props.Description || "",
            Difficulty: "Novice",
            RequiredMaterials: this.props.RequiredMaterials,
            Prerequisites: this.props.Prerequisites,
            error: ""
        }
        
        this.handleTitle = this.handleTitle.bind(this)
        this.handleSubtitle = this.handleSubtitle.bind(this)
        this.handleDescription = this.handleDescription.bind(this)
        this.handleRequiredMaterials = this.handleRequiredMaterials.bind(this)
        this.handleRecommendedPrerequisites = this.handleRecommendedPrerequisites.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.setError = this.setError.bind(this)

    }

    componentWillReceiveProps(){
        console.log("Test: " + this.props.Title)
        console.log("Test: " + this.props.Description)
        console.log("hello")
        this.setState({
            Title: this.props.Title,
            Description: this.props.Description,
            Subtitle: this.props.Subtitle


        })
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

        
        let fetchURL = this.props.baseURL + "buildCourse"
        console.log(fetchURL)
        let fetchOptions = {
            method: "post",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Title: this.state.Title,
                Subtitle: this.state.Subtitle,
                Description: this.state.Description,
                Difficulty: this.state.Difficulty,
                Materials: this.state.RequiredMaterials,
                Prerequisites: this.state.Prerequisites,
                OwnerID: this.props.ID,
                Price: this.state.Price
            })
        }

        fetch(fetchURL,fetchOptions).then((response)=>{
            response.json().then(result=>{
                console.log(result)
                if(response.status==200){
                    this.props.setCourseID(result.insertId)

                    window.location = '/EditCourse';
                }
                else{
                    this.setError(result.message)
                }

            })
        })
        
    }
    onEdit(){
        let fetchURL = this.props.baseURL + "editCourse"


    }
    setError(err){
        this.setState({
            error: err
        })
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
                <form className="BuildCourseForm" style={formStyle}>  
                    <p className = "error">{this.state.error}</p>      
                    <TextInput label="Title" value = {this.state.Title} placeholder="Name your course" inputChange = {this.handleTitle} />
                    <TextInput label="Subtitle" value = {this.state.Subtitle} placeholder="Add some flare" inputChange = {this.handleSubtitle}/>
                    <TextInput label="Description" value = {this.state.Description} placeholder="Just add more detail" LargeField inputChange = {this.handleDescription}/>
                   
                   <RaisedButton label="Save" backgroundColor="#82ca9c" labelColor="white" style={ButtonStyle} onClick ={this.onSubmit} />
                    
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
            field = <input className="textInput" onChange = {this.props.inputChange} value= {this.props.value} placeholder={this.props.placeholder} />
        }
        else{
            field = <textarea  className="textInput" onChange = {this.props.inputChange} value = {this.props.value} placeholder={this.props.placeholder} />
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
export default connect(mapStateToProps,mapDispatchToProps)(BuildCourse)
