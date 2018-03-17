import React, { Component } from 'react';
import './../App.css';
import TopCourses from "./Home/TopCourses"
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
export default class CourseSearch extends Component {
    constructor(props){
        super(props)
    }
    
    render(){
        var formStyle = {
            border:"1px solid lightgray",
            borderRadius: "5px",
            width: "600px",
            margin:"auto",
            boxShadow: "-2px 1px #c7c7c7",
            padding: "5px"
        }
        var dropdownBox = {
            borderRight:"solid #c7c7c7 2px",
            paddingRight: "30px",
            marginRight: "30px",
            display:"inline-block",
            height: "30px",
            lineHeight:"30px"
        }
        var searchStyle = {
            padding: "10px",
            width: "300px",
            border:"none",
            fontSize: "15px"
        }
        var selectStyle = {
            width: "200px",
            height:"30px",
            border:"none",
            fontSize: "15px"
        }
        return(
            <div className = "courseSearch">
                <div style={formStyle}>
                    <span style = {dropdownBox}>
                        <select className= "selectCategory" style = {selectStyle}>
                            <option value="" disabled selected>Select education level</option>

                            <option>Freshman</option>
                            <option>Underclassman</option>
                            <option>Upperclassman</option>
                            <option>Graduate</option>

                        </select>
                    </span>
                    <input className="searchCourse" style={searchStyle} placeholder="Find Lesson Plans and Course Material" />
                </div>
            
                <TopCourses />
            </div>
        )
    }
}
