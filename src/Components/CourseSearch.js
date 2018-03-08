import React, { Component } from 'react';
import './../App.css';
import TextField from 'material-ui/TextField';

export default class CourseSearch extends Component {
    constructor(props){
        super(props)
    }
    
    render(){
        var inputStyle = {
            width: "600px"
        }
        return(
            <div className = "courseSearch">
                    <TextField
                        hintText="Find Lesson Plans and Course Material"
                        multiLine={true}
                        rows={2}
                        inputStyle={inputStyle}
                        underlineShow={false}
                    />
            </div>
        )
    }
}