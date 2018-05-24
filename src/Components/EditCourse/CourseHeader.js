import React, {Component} from "react"
import "./../../CSS/EditCourse.css"
import Links from "./Links"

export class CourseHeader extends Component{
	render(){
		return(
			<div className="CourseHeader">
				<div className="Circle"></div>
				<h1>{this.props.courseTitle}</h1>
				<p>{this.props.author}</p>
				<Links {...this.props} />
			</div>
		)
	}
}

export default CourseHeader