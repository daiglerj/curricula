import React, {Component} from "react"
import "./../../../CSS/EditCourse.css"
import Instructions from "./../../Instructions"
import "./../../../App.css"
import {BuildCourseForm} from "./../../BuildCourse/BuildCourseForm"
import RaisedButton from 'material-ui/RaisedButton';

export default class Overview extends Component{

	render(){
		const statement = "This Overview section is what your students and instructors will see first. Create an intriguing title and a description to explain what the course covers. Then, let the world know why this course is for them, what will be learned, and what is needed to get there."
        var ButtonStyle = {
            marginTop: "30px",
            display: "inline-block",
            textAlign:"center"
            
        }
		return(
			<div className="Section">
				<Instructions statement = {statement} />
				<BuildCourseForm {...this.props} Title = {this.props.Title} Description = {this.props.Description} />
			</div>	
		)
	}
}

