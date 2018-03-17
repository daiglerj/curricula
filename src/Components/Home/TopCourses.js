import React, {Component} from "react";

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

export default class TopCourses extends Component{
    constructor(props){
        super(props)
        
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        
    }
    render(){
        var style = {
            marginTop: "30px",
            paddingBottom: "30px",
            borderBottom: "solid 1px #c7c7c7"
        }
        var chipStyle = {
            marginLeft:"20px",
            display:"inline-block"
        }
        
        return(
            <div style={style}>
                <span>Top Courses:</span>
                <Chip onClick={this.handleClick} style={chipStyle} labelColor="white" backgroundColor="#82ca9c">
                        Algebra
                </Chip>
                <Chip onClick={this.handleClick} style={chipStyle} labelColor="white" backgroundColor="#8493ca">
                        English
                </Chip>
                <Chip onClick={this.handleClick} style={chipStyle} labelColor="white" backgroundColor="#f4989d">
                        Finance 101
                </Chip>
            
                <Chip onClick={this.handleClick} style={chipStyle} labelColor="white" backgroundColor="#96d0e8">
                        Environment
                </Chip>
            </div>
        
        )
    }
}