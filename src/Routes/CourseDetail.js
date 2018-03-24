import React, {Component} from "react"
import Navbar from "./../Components/Navbar"
import CourseDescription from "./../Components/CourseDetail/CourseDescription"
import CourseTitle from "./../Components/CourseDetail/CourseTitle"
import Purchase from "./../Components/CourseDetail/Purchase"

export default class CourseDetail extends Component{
    render(){

        return(
            <div>
                <CourseTitle />
                <CourseDescription />
                <Purchase />
            </div>
        )
    }
}