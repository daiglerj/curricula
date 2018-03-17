import React, {Component} from 'react' 
import Jumbotron from "./../../Components/Jumbotron"
import RaisedButton from 'material-ui/RaisedButton';

export default class BuildCourseForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            Title: "",
            Subtitle: "",
            Description: "",
            LevelOfDifficulty: "",
            RequiredMaterials: "",
            RecommendedPrerequisites: ""
        }
        
        this.handleTitle = this.handleTitle.bind(this)
        this.handleSubtitle = this.handleSubtitle.bind(this)
        this.handleDescription = this.handleDescription.bind(this)
        this.handleRequiredMaterials = this.handleRequiredMaterials.bind(this)
        this.handleRecommendedPrerequisites = this.handleRecommendedPrerequisites.bind(this)

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
            RecommendedPrerequisites: event.target.value
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
                <Jumbotron />
                <Instructions />
                <form className="BuildCourseForm" style={formStyle}>                  
                    <TextInput label="Title" placeholder="Name your course" inputChange = {this.handleTitle} />
                    <TextInput label="Subtitle" placeholder="Add some flare" inputChange = {this.handleSubtitle}/>
                    <TextInput label="Description" placeholder="Just add more detail" LargeField inputChange = {this.handleDescription}/>
                    <DifficultyInput />
                    <TextInput label="Required Materials" placeholder="e.g. Microsoft Word, Adobe Photoshop, MySQL, etc." inputChange = {this.handleRequiredMaterials} />
                    <TextInput label="Recommended Prerequisites" placeholder="e.g. Introductory Biology, Calculus A, Algebra 101" inputChange = {this.handleRecommendedPrerequisites} />
                    <RaisedButton label="Next" backgroundColor="#82ca9c" labelColor="white" style={ButtonStyle}/>

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