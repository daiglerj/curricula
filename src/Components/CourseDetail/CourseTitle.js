import React, {Component} from "react"

export default class CourseTitle extends Component{
    render(){
        return(
            <div className="CourseTitleOuter">
                <div className='block'></div>

                <h1>{this.props.Title}</h1>
                <hr />
                
            </div>
        )
    }
}