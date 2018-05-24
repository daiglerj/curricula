import React, {Component} from "react"
import "./../../CSS/EditCourse.css"


export default class Links extends Component{

	render(){
		return(
			<div className="Links">
				<ul>
					<Link {...this.props} section="Overview" />
					<Link {...this.props} section = "Curriculum" />
					<Link {...this.props} section = "Details" />		
				</ul>
			</div>
		)
	}
}

class Link extends Component{
	render(){
		var style = {}
		if(this.props.active == this.props.section){
			style = {
				borderBottom:" solid #82ca9c"
			}
		}

		return(
			<li onClick={()=>{this.props.changeActive(this.props.section)}} style={style}>{this.props.section}</li>
		)
	}
}