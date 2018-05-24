import React, {Component} from "react"

export default class CourseDescription extends Component{
    render(){
        return(
            <div className="Section CourseDescriptionOuter">
                <h1>Course Description</h1>
                <hr />
                <p>{this.props.Description}</p>

            </div>
        )
    }
}

